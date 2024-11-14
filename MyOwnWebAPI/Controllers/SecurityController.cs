using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyOwnWeb.DTOs;
using MyOwnWeb.Tools;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace MyOwnWeb.Controllers
{
    [Route("api/security")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly AppDBContext context;
        private readonly IMapper mapper;
        private readonly IOutputCacheStore outputCacheStore;
        private const string cacheTag = "security";

        public SecurityController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration,
            AppDBContext context, IMapper mapper, IOutputCacheStore outputCacheStore)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
            this.outputCacheStore = outputCacheStore;
        }

        [HttpGet("userList")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<ActionResult<List<UserDTO>>> UserList([FromQuery] PaginationDTO pagination)
        {
            var queryable = context.Users.AsQueryable();
            await HttpContext.InsertPaginationParametersInHeader(queryable);
            var users = await queryable.ProjectTo<UserDTO>(mapper.ConfigurationProvider)
                .OrderBy(x => x.Email).Pagination(pagination).ToListAsync();

            foreach(var userDTO in users)
            {
                var user = await userManager.FindByNameAsync(userDTO.Username);
                if (user != null)
                {
                    var claims = await userManager.GetClaimsAsync(user);
                    userDTO.Claims = new ClaimDTO() { ClaimType = ClaimsToArray(claims), Username = userDTO.Username };
                }
            }

            return users;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticationResponseDTO>> Register(UserCredentialsDTO userCredentials)
        {
            var user = new IdentityUser
            {
                Email = userCredentials.Email,
                UserName = userCredentials.Username
            };

            var result = await userManager.CreateAsync(user, userCredentials.Password);

            if (result.Succeeded)
            {
                await outputCacheStore.EvictByTagAsync(cacheTag, default);
                return await BuildToken(user);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("loginEmail")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticationResponseDTO>> Login(UserCredentialsEmailDTO userCredentials)
        {
            var user = await userManager.FindByEmailAsync(userCredentials.Email);

            return await Login(user!, userCredentials.Password);
        }

        [HttpPost("loginUsername")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticationResponseDTO>> Login(UserCredentialsUsernameDTO userCredentials)
        {
            var user = await userManager.FindByNameAsync(userCredentials.Username);

            return await Login(user!, userCredentials.Password);
        }

        [HttpPost("addClaim")]
        public async Task<IActionResult> AddClaim(ClaimDTO claimDTO)
        {
            var user = await userManager.FindByNameAsync(claimDTO.Username);

            if (user is null) return NotFound();

            var claims = await userManager.GetClaimsAsync(user);

            var newClaims = CompareClaims(claimDTO.ClaimType, claims);

            if (newClaims.Count == 0)
            {
                return BadRequest(CustomErrorsMessages.ThisUserAlreadyClaim());
            }

            foreach (string dtoType in newClaims)
            {
                await userManager.AddClaimAsync(user, new Claim(dtoType, "true"));
            }

            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            return NoContent();
        }

        [HttpPost("removeClaim")]
        public async Task<IActionResult> RemoveClaim(ClaimDTO claimDTO)
        {
            var user = await userManager.FindByNameAsync(claimDTO.Username);

            if (user is null) return NotFound();
            foreach (string dtoType in claimDTO.ClaimType)
            {
                await userManager.RemoveClaimAsync(user, new Claim(dtoType, "true"));
            }
            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            return NoContent();
        }

        [HttpGet("{username}")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<ActionResult<ClaimDTO>>GetClaimsFromUser(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user is null) return NotFound();

            var claims = await userManager.GetClaimsAsync(user);

            ClaimDTO claimDTO = new ClaimDTO() { ClaimType = [], Username = username };

            claimDTO.ClaimType = ClaimsToArray(claims);

            return claimDTO;
        }

        [HttpDelete("{username}")]
        public async Task<IActionResult> Delete(string username)
        {
            var user = await userManager.FindByNameAsync(username);
            if(user is null) return NotFound();
            
            var result = await userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                await outputCacheStore.EvictByTagAsync(cacheTag, default);

                return NoContent();
            }

            return BadRequest(result.Errors);
        }

        private string[] ClaimsToArray(IList<Claim> claims)
        {
            var tmpList = new List<string>();

            foreach (var claim in claims)
            {
                tmpList.Add(claim.Type);
            }

            return tmpList.ToArray();
        }

        private async Task<ActionResult<AuthenticationResponseDTO>> Login(IdentityUser user, string password)
        {
            if(user is null)
            {
                var err = CustomErrorsMessages.FailToLogin();
                return BadRequest(err);
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure: false);

            if(result.Succeeded)
            {
                return await BuildToken(user);
            }
            else
            {
                var err = CustomErrorsMessages.FailToLogin();
                return BadRequest(err);
            }
        }

        private async Task<AuthenticationResponseDTO> BuildToken(IdentityUser identityUser)
        {
            var claims = new List<Claim>
            {
                new Claim("email", identityUser.Email!),
                new Claim("username", identityUser.UserName!)
            };

            var claimsDB = await userManager.GetClaimsAsync(identityUser);

            claims.AddRange(claimsDB);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwtkey"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var tokenDeSeguridad = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: creds);

            var token = new JwtSecurityTokenHandler().WriteToken(tokenDeSeguridad);

            return new AuthenticationResponseDTO
            {
                Token = token,
                Expiration = expiration
            };
        }

        private List<string> CompareClaims(string[] claimType, IList<Claim> claims)
        {
            var rntTypes = new List<string>(claimType);
            var tmpList = new List<string>();
            foreach (var claim in claims)
            {
                foreach (var type in rntTypes)
                {
                    if (claim.Type == type)
                    {
                        tmpList.Add(type);
                        continue;
                    }
                }
            }

            return rntTypes.Except(tmpList).ToList();
        }
    }
}
