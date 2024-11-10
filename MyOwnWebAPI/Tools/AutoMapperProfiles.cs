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
    }
}
