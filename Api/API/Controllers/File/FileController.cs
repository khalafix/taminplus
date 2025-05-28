using Application.Interfaces;
using Infrastructure.Common;
using Infrastructure.Models.Project;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Infrastructure.Models;

namespace API.Controllers.File
{
    public class FileController : BaseController
    {
        private readonly IFileService _service;
        public FileController(IFileService service)
        {
            _service = service;
        }

        /// <summary>
        ///   برگرداندن Archive Media 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetById/{id}/{companyType}")]
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id, CompanyType companyType)
        {
            var result = await _service.GetArchiveMedia(id, companyType);
            return Ok(result);
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete(FileItemDto model)
        {
            var result = await _service.DeleteFile(model);
            return Ok(result);
        }

    }
}
