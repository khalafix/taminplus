using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BI.Core.Entities
{
    
    [Table("SmsLogs", Schema = "Security")]
    public class SmsLog
    {
        [Key]
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public DateTime ActionTime { get; set; }
        public bool Status { get; set; }

        public SmsType SmsType { get; set; }
    }
}
