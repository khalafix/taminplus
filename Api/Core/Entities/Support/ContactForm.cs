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
    [Table("ContactForms", Schema = "Support")]
    public class ContactForm
    {
        [Key]
        public int Id { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Remark { get; set; }
        public string Subject { get; set; }


        public bool IsVisited { get; set; }

        public DateTime CreateDate { get; set; }

        public virtual ICollection<ContactFormAttachment> ContactFormAttachments { get; set; }
   

        public ContactForm()
        {
            ContactFormAttachments = new HashSet<ContactFormAttachment>();
        }
    }

    [Table("ContactFormAttachments", Schema = "Support")]
    public class ContactFormAttachment
    {
        [Key]
        public Guid Id { get; set; }
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
        public int ContactFormId { get; set; }
        public virtual ContactForm ContactForm { get; set; }

    }
}
