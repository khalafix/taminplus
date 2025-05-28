using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class PersonnelDto
    {
        public int Id { get; set; }
        public string NationalCode { get; set; }
        public string  FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime? BirthDate { get; set; }
        public Sex Sex { get; set; }
        public Guid DataEntryHistoryCode { get; set; }
    }
}
