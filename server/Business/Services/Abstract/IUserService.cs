using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Abstract
{
    public interface IUserService 
    { 
        void Add(User user); 
        void Update(User user); 
        void Delete(int userId); 
        User GetById(int userId); 
        List<User> GetAll();
        User FindByEmailOrUsername(string emailOrUsername, string password);
    }
}
