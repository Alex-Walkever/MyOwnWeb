using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using MyOwnWeb.DTOs;
using MyOwnWeb.Entities;

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
            return await Get<Experience, ExperienceDTO>(pagination, orderBy: g => g.StartDate); 
        }

        [HttpGet("{id:int}", Name = "GetById")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<ActionResult<ExperienceDTO>> Get(int id)
        {
            return await Get<Experience, ExperienceDTO>(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ExperienceCreationDTO creationDTO)
        {
            return await Post<ExperienceCreationDTO, Experience, ExperienceDTO>(creationDTO, "GetById");
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await Delete<Experience>(id);
        }
    }
}
