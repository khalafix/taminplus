using Infrastructure.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Models.Base
{
    public class CooperationFormDto
    {
        public int Id { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Education { get; set; }

        public int JobOpportunityId { get; set; }
        public string JobOpportunityTitle { get; set; }

        public string CreateDate { get; set; }
        public bool IsVisited { get; set; }

        public List<FileItemDto> File { get; set; }
    }

    public class UserCooperationFormDtoDto
    {
        public int Id { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Education { get; set; }

        public int JobOpportunityId { get; set; }

    }

    public class CooperationFormInputModel
    {
        public string Captcha { get; set; }
        public string CaptchaKey { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Education { get; set; }

        public int JobOpportunityId { get; set; }

        public List<IFormFile> File { get; set; }


    }
}
