
using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Table("DataEntryHistories", Schema = "Base")]
    public class DataEntryHistory
    {
        public int Id { get; set; }
        public Guid Code { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
        public bool? IsAdminUser { get; set; }
    }
}
