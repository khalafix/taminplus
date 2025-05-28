using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{

    [Table("Cities", Schema = "Base")]
    public class City
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(256)]
        public string Title { get; set; }

        public Province ProvinceId { get; set; }
        public bool IsActive { get; set; }
    }
}
