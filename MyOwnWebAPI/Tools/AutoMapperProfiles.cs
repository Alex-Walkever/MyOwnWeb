using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MyOwnWeb.DTOs;
using MyOwnWeb.Entities;

namespace MyOwnWeb.Tools
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            ConfigureExperienceMapping();
            ConfigureUserMapping();
            ConfigureContactMeMapping();
            ConfigureAboutMeMapping();
        }

        private void ConfigureExperienceMapping()
        {
            CreateMap<ExperienceCreationDTO, Experience>();
            CreateMap<Experience, ExperienceDTO>();
        }

        private void ConfigureUserMapping()
        {
            CreateMap<IdentityUser, UserDTO>().ForMember(x => x.Claims, 
                userDTO => userDTO.Ignore());
        }

        private void ConfigureContactMeMapping()
        {
            CreateMap<ContactMeCreationDTO, ContactMe>(); 
            CreateMap<ContactMe, ContactMeDTO>();
        }

        private void ConfigureAboutMeMapping()
        {
            CreateMap<AboutMeCreationDTO, AboutMe>().ForMember(x => x.Pictures, 
                options => options.Ignore());
            CreateMap<AboutMe, AboutMeDTO>();
        }
    }
}
