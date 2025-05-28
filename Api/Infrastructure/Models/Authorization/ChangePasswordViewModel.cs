using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BIDashboard.Dtos.Authorization
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "رمز عبور اجباری می باشد")]
        [MaxLength(32, ErrorMessage ="حداکثر 32 کاراکتر")]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }
        [Required(ErrorMessage = "رمز عبور جدید اجباری می باشد")]
        [MaxLength(32, ErrorMessage = "حداکثر 32 کاراکتر")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
        [Required(ErrorMessage = "تکرار رمز عبور جدید اجباری می باشد")]
        [MaxLength(32, ErrorMessage = "حداکثر 32 کاراکتر")]
        [DataType(DataType.Password)]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; }
    }
}
