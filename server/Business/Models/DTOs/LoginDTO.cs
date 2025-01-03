using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.DTOs
{
    public class LoginDto 
    { 
        public string EmailOrUsername { get; set; } 
        public string Password { get; set; } 
    }
}
