﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebApi8_CarsApp.DTO.Car;
using WebApi8_CarsApp.DTO.User;
using WebApi8_CarsApp.Models;
using WebApi8_CarsApp.Services.User;

namespace WebApi8_CarsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserInterface _userInterface;
        public UserController(IUserInterface userInterface)
        {
            _userInterface = userInterface;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseModel<List<UserModel>>>> GetAll()
        {
            var users = await _userInterface.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseModel<UserModel>>> GetById(Guid id)
        {
            var user = await _userInterface.GetById(id);
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<ResponseModel<UserModel>>> Register([FromBody] UserRegisterDTO userRegister)
        {
            var car = await _userInterface.Register(userRegister);
            return Ok(car);
        }

        [HttpDelete]
        public async Task<ActionResult<ResponseModel<UserModel>>> Delete(Guid id)
        {
            var user = await _userInterface.Delete(id);
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseModel<UserModel>>> Login([FromBody] UserLoginDTO userLogin)
        {
            var user = await _userInterface.Login(userLogin.Email, userLogin.Password, HttpContext);
            return Ok(user);
        }
    }
}
