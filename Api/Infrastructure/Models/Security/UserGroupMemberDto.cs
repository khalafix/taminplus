using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class UserGroupMemberDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid UserGroupId { get; set; }


    }
}
