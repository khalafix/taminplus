using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Project;
using Infrastructure.Models.User;
using BIDashboard.Dtos;
using Infrastructure.Models;
using Infrastructure.Models.Base;

namespace Application.Interfaces
{
    public interface IEmailTemplateService
    {
        Task<GoldiranActionResult<List<EmailTemplateDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(EmailTemplateDto model);
        Task<GoldiranActionResult<int>> Update(EmailTemplateDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<EmailTemplateDto>> GetById(int id);
        Task<List<ComboItemDto>> GetTemplateTypesForCombo();
        Task<string> GenerateEmailTemplate(EmailTemplateType emailTemplateType, EmailSenderInfoDto emailSenderInfo, params string[] values);
        Task<string> GenerateEmailTemplateWithMessageBody(EmailSenderInfoDto emailSenderInfo, string messageBody);
        Task<GoldiranActionResult<bool>> ResetTemplate(int id);
    }
}
