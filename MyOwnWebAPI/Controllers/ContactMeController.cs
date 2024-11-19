using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using MyOwnWeb.DTOs;
using MyOwnWeb.Entities;
using MyOwnWeb.Tools;
using System.Net;
using System.Net.Mail;
using static Microsoft.EntityFrameworkCore.Query.Internal.ExpressionTreeFuncletizer;

namespace MyOwnWeb.Controllers
{
    [Route("api/contactMe")]
    [ApiController]
    public class ContactMeController : CustomBaseController
    {
        private readonly AppDBContext context;
        private readonly IConfiguration configuration;
        private readonly IOutputCacheStore outputCacheStore;
        private readonly IMapper mapper;
        private const string cacheTag = "contactMe";

        public ContactMeController(AppDBContext context, IConfiguration configuration, IOutputCacheStore outputCacheStore, IMapper mapper)
            : base(context, outputCacheStore, mapper, cacheTag)
        {
            this.context = context;
            this.configuration = configuration;
            this.outputCacheStore = outputCacheStore;
            this.mapper = mapper;
        }

        [HttpGet]
        [OutputCache(Tags = [cacheTag])]
        public async Task<List<ContactMeDTO>> Get([FromQuery] PaginationDTO pagination)
        {
            return await Get<ContactMe, ContactMeDTO>(pagination, orderBy: x => x.Id);
        }

        [HttpGet("{id:int}", Name = "GetContactMeById")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<ActionResult<ContactMeDTO>> Get(int id)
        {
            return await Get<ContactMe, ContactMeDTO>(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ContactMeCreationDTO contactMeCreation)
        {
            var entity = mapper.Map<ContactMe>(contactMeCreation);
            entity.Readed = false;
            entity.Obtained = System.DateTime.Now;
            context.Add(entity);

            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            var entityDTO = mapper.Map<ContactMeDTO>(entity);
            return CreatedAtRoute("GetContactMeById", new { id = entity.Id }, entityDTO);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] bool readed)
        {
            var entityExist = await context.Set<ContactMe>().FindAsync(id);

            if (entityExist is null) return NotFound();

            entityExist.Readed = readed;

            context.Update(entityExist);
            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await Delete<ContactMe>(id);
        }

        private void SendEmail(ContactMeCreationDTO contactMeCreation) {
            string to = configuration["emailId"]!;
            string from = to;
            MailMessage message = new MailMessage(from, to);

            message.Subject = contactMeCreation.Name + "Sending from web API";
            message.Body = contactMeCreation.Message + contactMeCreation.Email;
            message.Priority = MailPriority.High;


            var smtpClient = new SmtpClient();
            smtpClient.UseDefaultCredentials = false;

            smtpClient.Credentials = new NetworkCredential(to, configuration["passwordId"], "smtp.gmail.com");
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.Port = 587;
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;

            smtpClient.Send(message);
        }
    }
}
