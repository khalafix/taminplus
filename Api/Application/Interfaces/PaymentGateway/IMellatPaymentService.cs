using Infrastructure.Common;
using Infrastructure.Models.PaymentGateway;
using System.Threading.Tasks;

namespace Application.Interfaces.PaymentGateway
{
    public interface IMellatPaymentService
    {
        Task<GoldiranActionResult<MellatGatewaySubmissionFormDto>> SalePayment(SalePaymentRequestModel model);
        Task<GoldiranActionResult<bool>> SalePaymentConfirm(MellatGatewayResponseDto model);
    }
}
