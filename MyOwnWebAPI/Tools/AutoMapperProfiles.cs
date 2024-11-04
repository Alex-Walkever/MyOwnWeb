using AutoMapper;
using MyOwnWeb.DTOs;
using MyOwnWeb.Entities;

namespace MyOwnWeb.Tools
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            ConfigureExperienceMapping();
        }

        private void ConfigureExperienceMapping()
        {
            CreateMap<ExperienceCreationDTO, Experience>();
            CreateMap<Experience, ExperienceDTO>();
        }
    }
}
