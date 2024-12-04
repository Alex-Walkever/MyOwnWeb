using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using MyOwnWeb.Interfaces;

namespace MyOwnWeb.Controllers
{
    [Route("api/aboutme")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AboutMeController : CustomBaseController
    {
        private const string cacheTag = "aboutme";
        private readonly AppDBContext context;
        private readonly IOutputCacheStore outputCacheStore;
        private readonly IMapper mapper;
        private readonly IFileStorage fileStorage;

        public AboutMeController(AppDBContext context, IOutputCacheStore outputCacheStore, IMapper mapper, IFileStorage fileStorage)
            :base(context, outputCacheStore, mapper, cacheTag)
        {
            this.context = context;
            this.outputCacheStore = outputCacheStore;
            this.mapper = mapper;
            this.fileStorage = fileStorage;
        }
    }
}
