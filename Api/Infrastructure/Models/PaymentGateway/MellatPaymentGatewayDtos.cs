using System;

namespace Infrastructure.Models.PaymentGateway
{
    public class MellatGatewaySubmissionFormDto
    {
        public string RefId { get; set; }
    }

    public class SalePaymentRequestModel
    {
        public string OrderNumber { get; set; }
        public Guid OrderIdValue { get; set; }
        public Guid UserPaymentId { get; set; }
        public long OrderId { get; set; }
        public long Amount { get; set; }
        public string CustomerMobileNumber { get; set; }
    }

    public class MellatGatewayResponseDto
    {
        public string ResCode { get; set; }
        public string RefId { get; set; }
        public long SaleReferenceId { get; set; }
        public long SaleOrderId { get; set; }
        public string CardHolderPan { get; set; }
    }
}
