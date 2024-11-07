using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyOwnWeb.DTOs;
using MyOwnWeb.Tools;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyOwnWeb.Controllers
{
    [Route("api/security")]
    [ApiController]
    public class SecurityController: ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly AppDBContext context;
        private readonly IMapper mapper;

        public SecurityController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration,
            AppDBContext context, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("UserList")]
        public async Task<ActionResult<List<UserDTO>>> UserList([FromQuery] PaginationDTO pagination)
        {
            var queryable = context.Users.AsQueryable();
            await HttpContext.InsertPaginationParametersInHeader(queryable);
            var users = await queryable.ProjectTo<UserDTO>(mapper.ConfigurationProvider)
                .OrderBy(x => x.Email).Pagination(pagination).ToListAsync();

            return users;
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticationResponseDTO>> Register(UserCredentialsDTO userCredentials)
        {
            var user = new IdentityUser
            {
                Email = userCredentials.Email,
                UserName = userCredentials.Username
            };

            var result = await userManager.CreateAsync(user, userCredentials.Password);

            if(result.Succeeded)
            {
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

        [HttpDelete]
        public async Task<IActionResult> Delete(string username)
        {
            var user = await userManager.FindByNameAsync(username);
            if(user is null) return NotFound();
            
            var result = await userManager.DeleteAsync(user);

            if(result.Succeeded)
                return NoContent();

            return BadRequest(result.Errors);
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
    }
}
