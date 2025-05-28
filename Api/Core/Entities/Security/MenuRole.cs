using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Table("MenuRoles", Schema = "Security")]
    public class MenuRole
    {
        public int Id { get; set; }
        public int MenuId { get; set; }
        public int RoleId { get; set; }
        public Menu Menu { get; set; }
        public Role Role { get; set; }
    }
}
