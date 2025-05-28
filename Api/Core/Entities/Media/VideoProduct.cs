using Core.Entities.Catalog;
using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Blog;

namespace Core.Entities.Media
{
    [Table("VideoProducts", Schema = "Media")]
    public class VideoProduct
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public int VideoId { get; set; }
        public virtual Video Video { get; set; }

      
    }
}
