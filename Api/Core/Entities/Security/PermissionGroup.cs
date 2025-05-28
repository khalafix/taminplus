using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Table("PermissionGroups", Schema = "Security")]
    public class PermissionGroup
    {
        public int Id { get; set; }
        [Required, MaxLength(64)]
        public string Title { get; set; }
        [MaxLength(64)]
        public string EnTitle { get; set; }
        [Required, MaxLength(256)]
        public string Icon { get; set; }
        public bool ShowInMenu { get; set; }
        public int? SortOrder { get; set; }
        public bool? IsActive { get; set; }
        public ICollection<Permission> Permissions { get; set; }
    }
}
