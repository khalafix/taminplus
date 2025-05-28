using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Media
{
    [Table("VideoCategories", Schema = "Media")]
    public class VideoCategory
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(256)]
        public string Title { get; set; }

        public bool IsActive { get; set; }
        public int? SortOrder { get; set; }

        public string Remark { get; set; }
    }
}
