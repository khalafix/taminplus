using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Catalog
{
    [Table("Symbols", Schema = "Catalog")]
    public class Symbol
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(256)]
        public string  Title { get; set; }
        public int? ParentId { get; set; }

        public bool IsActive{ get; set; }

    }
}
