using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{

    [Table("Origins", Schema = "Base")]
    public class Origin
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(256)]
        public string Title { get; set; }

        public bool IsActive { get; set; }
    }
}
