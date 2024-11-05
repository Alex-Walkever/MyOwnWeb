using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.OutputCaching;
using MyOwnWeb.DTOs;
using MyOwnWeb.Tools;
using System.Linq.Expressions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MyOwnWeb.Interfaces;

namespace MyOwnWeb.Controllers
{
    public class CustomBaseController : ControllerBase
    {
        private readonly AppDBContext context;
        private readonly IOutputCacheStore outputCacheStore;
        private readonly IMapper mapper;
        private readonly string cacheTag;

        public CustomBaseController(AppDBContext context, IOutputCacheStore outputCacheStore, IMapper mapper,
            string cacheTag)
        {
            this.context = context;
            this.outputCacheStore = outputCacheStore;
            this.mapper = mapper;
            this.cacheTag = cacheTag;
        }

        protected async Task<List<TDTO>> Get<TEntity, TDTO>(PaginationDTO pagination, 
            Expression<Func<TEntity, object>> orderBy)
            where TEntity : class
        {
            var quaryable = context.Set<TEntity>().AsQueryable();
            await HttpContext.InsertPaginationParametersInHeader(quaryable);
            return await quaryable
                .OrderBy(orderBy)
                .Pagination(pagination)
                .ProjectTo<TDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        protected async Task<ActionResult<TDTO>> Get<TEntity, TDTO>(int id)
            where TEntity : class, IId
            where TDTO : IId
        {
            var entity = await context.Set<TEntity>()
                .ProjectTo<TDTO>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id ==  id);

            if(entity is null) 
                return NotFound();

            return entity;
        }

        protected async Task<IActionResult> Post<TCreationDTO, TEntity,  TDTO>
            (TCreationDTO creationDTO, string pathname)
            where TEntity : class, IId
        {
            var entity = mapper.Map<TEntity>(creationDTO);
            context.Add(entity);

            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            var entityDTO = mapper.Map<TDTO>(entity);
            return CreatedAtRoute(pathname, new { id = entity.Id }, entityDTO);
        }

        protected async Task<IActionResult> Put<TCreationDTO, TEntity>(int id, TCreationDTO creationDTO)
            where TEntity : class, IId
        {
            var entityExist = await context.Set<TEntity>().AnyAsync(x => x.Id == id);

            if(entityExist is false) return NotFound();

            var entity = mapper.Map<TEntity>(creationDTO);
            entity.Id = id;

            context.Update(entity);
            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            return NoContent();
        }

        protected async Task<IActionResult> Delete<TEntidad>(int id)
            where TEntidad : class, IId
        {
            var deleteRecords = await context.Set<TEntidad>().Where(x => x.Id == id).ExecuteDeleteAsync();

            if(deleteRecords == 0) return NotFound();

            await outputCacheStore.EvictByTagAsync(cacheTag, default);
            return NoContent();
        }
    }
}
