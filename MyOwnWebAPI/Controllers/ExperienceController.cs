using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using MyOwnWeb.DTOs;
using MyOwnWeb.Entities;
using MyOwnWeb.Tools;

namespace MyOwnWeb.Controllers
{
    [ApiController]
    [Route("api/experience")]
    public class ExperienceController : CustomBaseController
    {
        private readonly AppDBContext context;
        private readonly IOutputCacheStore outputCacheStore;
        private readonly IMapper mapper;
        private const string cacheTag = "experience";

        public ExperienceController(AppDBContext context, IOutputCacheStore outputCacheStore, IMapper mapper) 
            :base(context, outputCacheStore, mapper, cacheTag)
        {
            this.context = context;
            this.outputCacheStore = outputCacheStore;
            this.mapper = mapper;
        }

        [HttpGet]
        [OutputCache(Tags = [cacheTag])]
        public async Task<List<ExperienceDTO>> Get([FromQuery] PaginationDTO pagination)
        {
            var quaryable = context.Set<Experience>().AsQueryable();
            await HttpContext.InsertPaginationParametersInHeader(quaryable);
            return await quaryable
                .OrderByDescending(g => g.StartDate)
                .Pagination(pagination)
                .ProjectTo<ExperienceDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        [HttpGet("allExperiences")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<List<ExperienceDTO>> Get()
        {
            var quaryable = context.Set<Experience>().AsQueryable();
            await HttpContext.InsertPaginationParametersInHeader(quaryable);
            return await quaryable
                .OrderByDescending(g => g.StartDate)
                .ProjectTo<ExperienceDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        [HttpGet("{id:int}", Name = "GetById")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<ActionResult<ExperienceDTO>> Get(int id)
        {
            return await Get<Experience, ExperienceDTO>(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ExperienceCreationDTO experienceCreation)
        {
            return await Post<ExperienceCreationDTO, Experience, ExperienceDTO>(experienceCreation, "GetById");
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] ExperienceCreationDTO experienceCreation)
        {
            return await Put<ExperienceCreationDTO, Experience>(id, experienceCreation);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await Delete<Experience>(id);
        }
    }
}
