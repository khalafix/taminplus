using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BIDashboard.Dtos
{
    public class MenuDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }
        public string To { get; set; }
        public int? ParentId { get; set; }
        public string _tag { get; set; }
        public List<MenuDto>? _children { get; set; }

    }



}
