using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Models
{



    public class SmsDto
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string ActionTime { get; set; }
        public string Code { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }


    }



    public class SmsFilterModel
    {
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public SmsType? SmsType { get; set; }
        public bool? Status { get; set; }
        public string PhoneNumber { get; set; }


    }



}
