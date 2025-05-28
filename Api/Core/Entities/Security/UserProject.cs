using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Table("UserProjects", Schema = "Security")]
    public class UserProject
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
