using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class OriginDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public bool IsActive { get; set; }
        public string IsActiveTitle { get; set; }

    }
}
