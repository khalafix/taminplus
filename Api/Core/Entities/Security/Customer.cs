using Core.Entities.Base;
using Core.Entities.Security;
using Core.Entities.Sourcing;
using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("Customers", Schema = "Security")]
    public class Customer
    {
        [Key]
        public Guid Id { get; set; }
        [Required, MaxLength(128)]
        public Guid UserId { get; set; }
        public User User { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsActive { get; set; }
        public string Address { get; set; }

        public string NatinalCode { get; set; }

        public int? CityId { get; set; }

        public City City { get; set; }

        public Province? Province { get; set; }

        public int? GoldIranCityId { get; set; }

        public int? GoldIranProvinceId { get; set; }
        public int? RegionId { get; set; }
        public int? ParishId { get; set; }

        public string CityTitle { get; set; }

        public string ProvinceTitle { get; set; }
        public string RegionTitle { get; set; }
        public string ParishTitle { get; set; }



        public string DeliveryAddress { get; set; }
        public string PostCode { get; set; }

    }
}
