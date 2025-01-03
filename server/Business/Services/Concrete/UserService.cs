using Business.Services.Abstract;
using DataLayer;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Concrete
{
    public class UserManager : IUserService 
    { 
        private readonly BaseManager<User> _userDal; 

        public UserManager(BaseManager<User> userDal) 
        { 
            _userDal = userDal; 
        } 
        public void Add(User user) 
        { 
            _userDal.Add(user); 
        } 
        public void Update(User user) 
        { 
            _userDal.Update(user); 
        } 
        public void Delete(int userId) 
        { 
            _userDal.Remove(userId); 
        } 
        public User GetById(int userId) 
        { 
            return _userDal.Find(userId); 
        } 
        public List<User> GetAll()
        { 
            return _userDal.List(); 
        }
        public User FindByEmailOrUsername(string emailOrUsername, string password) 
        { 
            var user = _userDal.List()
                .FirstOrDefault(u => 
                (u.Email == emailOrUsername || u.Username == emailOrUsername) && 
            u.Password == password); 
            
            return user; 
        }
    }
}
