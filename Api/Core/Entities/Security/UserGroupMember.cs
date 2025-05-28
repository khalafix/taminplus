using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Table("UserGroupMembers", Schema = "Security")]
    public class UserGroupMember
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid UserGroupId { get; set; }
        public UserGroup UserGroup { get; set; }
        //public virtual ICollection<UserGroupAction> UserGroupActions { get; set; }

        //public UserGroupMember()
        //{
        //    UserGroupActions = new HashSet<UserGroupAction>();
        //}

    }
}
