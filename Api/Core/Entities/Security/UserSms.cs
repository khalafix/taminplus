using Core.Entities;
using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BI.Core.Entities
{
    [Table("UserSmss", Schema = "Security")]

    public class UserSms
    {
        [Key]
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
        public string Code { get; set; }
        public SmsType Type { get; set; }
        public DateTime ActionTime { get; set; }
        public bool Status { get; set; }
        public string PhoneNumber { get; set; }
        public string Message { get; set; }

    }
}
