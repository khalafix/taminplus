using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Models
{



    public class DashboardDto
    {
        public string Icon { get; set; }
        public string Title { get; set; }
        public int Total { get; set; }
        public string Color { get; set; }
        public string Path { get; set; }

    }

   
}
