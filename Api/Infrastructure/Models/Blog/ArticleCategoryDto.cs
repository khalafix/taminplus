using Infrastructure.Common;
using Infrastructure.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models.Catalog
{
    public class ArticleCategoryDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsActive { get; set; }
        public string IsActiveTitle { get; set; }
        public int? SortOrder { get; set; }
    }


}
