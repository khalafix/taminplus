using Core.Entities.Catalog;
using Infrastructure.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Catalog
{
    [Table("OrderLogs", Schema = "Catalog")]
    public class OrderLog
    {
        [Key]
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public virtual Order Order { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public string OrderStatusRemark { get; set; }

        public DateTime CreateDate { get; set; }


    }
}
