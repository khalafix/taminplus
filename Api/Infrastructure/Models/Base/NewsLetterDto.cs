using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class NewsLetterDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Template { get; set; }
        public string Remark { get; set; }
        public string IsActiveTitle { get; set; }
        public bool IsActive { get; set; }

        public string CreateDate { get; set; }

    }
    public class UserRegisterNewsLetterDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }

        public string Email { get; set; }
        public string CreateDate { get; set; }

    }


    public class UserNewsLetterDto
    {
        public string Email { get; set; }
        public string Captcha { get; set; }
        public string CaptchaKey { get; set; }
    }

}
