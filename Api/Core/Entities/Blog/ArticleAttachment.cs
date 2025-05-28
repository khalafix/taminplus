using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Blog
{
    [Table("ArticleAttachments", Schema = "Blog")]
    public class ArticleAttachment
    {
        [Key]
        public Guid Id { get; set; }
        public int ArticleId { get; set; }
        public virtual Article Article { get; set; }

        [MaxLength(128)]
        public string FileName { get; set; }
        //[MaxLength(16)]
        public string FileExtension { get; set; }
        //[MaxLength(64)]
        public string FileContentType { get; set; }
        //[MaxLength(32)]
        public string FileSize { get; set; }
        public FileType FileType { get; set; }
        //[MaxLength(512)]
        public string FilePath { get; set; }
        public DateTime CreateDate { get; set; }

    }
}
