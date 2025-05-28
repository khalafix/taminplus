using Core.Entities.Catalog;
using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Support
{
    [Table("UserLetMeKnows", Schema = "Support")]
    public class UserLetMeKnow
    {
        [Key]
        public int Id { get; set; }

        public string Mobile { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public Guid? UserId { get; set; }
        public virtual User User { get; set; }

        public DateTime CreateDate { get; set; }

     
    }

  
}
