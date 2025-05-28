using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("Projects", Schema = "Base")]
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(256)]
        public string  Title { get; set; }

        [MaxLength(256)]
        public string ProjectTitle { get; set; }

        public bool IsActive{ get; set; }

        [MaxLength(32)]
        public string Code { get; set; }

        [MaxLength(512)]
        public string Description { get; set; }
        public DateTime? CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
        public int? OrganizationUnitId { get; set; }
        public virtual Role OrganizationUnit { get; set; }
    }
}
