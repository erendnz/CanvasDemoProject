using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class User : IEntity { 
        public int UserId { get; set; } 
        public string Username { get; set; } 
        public string Email { get; set; } 
        public string Password { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now; 
    }
    
}
