using Business.Models.DTOs;
using Business.Services.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> GetAll()
        {
            return _userService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetById(int id)
        {
            return _userService.GetById(id);
        }

        [HttpPost]
        public ActionResult Add(User user)
        {
            _userService.Add(user);
            return Ok();
        }

        [HttpPut]
        public ActionResult Update(User user)
        {
            _userService.Update(user);
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }

        [HttpPost("find")] 
        public ActionResult<User> Find([FromBody] LoginDto loginDto) 
        { 
            var user = _userService.FindByEmailOrUsername(loginDto.EmailOrUsername, loginDto.Password); 
            if (user != null) { return Ok(user); } return Unauthorized(); 
        }
    }
}
