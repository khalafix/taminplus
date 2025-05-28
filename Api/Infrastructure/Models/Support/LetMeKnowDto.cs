using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Models
{

    public class UserRegisterLetMeKnowDtoDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string ProductName { get; set; }
        public string CategoryName { get; set; }

        public string Mobile { get; set; }
        public string CreateDate { get; set; }

    }


    public class UserLetMeKnowDto
    {
        public int ProductId { get; set; }

        public string Mobile { get; set; }
        public string Captcha { get; set; }
        public string CaptchaKey { get; set; }
    }

}
