using AutoMapper;
using Core.Entities;
using Infrastructure.Models.Project;

namespace Application
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Project, ProjectDto>().ReverseMap();
        }
    }
}
