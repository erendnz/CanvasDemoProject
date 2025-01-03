using Business.Models.DTOs;
using Business.Services.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CanvasController : ControllerBase
    {
        private readonly ICanvasService _canvasService;

        public CanvasController(ICanvasService canvasService)
        {
            _canvasService = canvasService;
        }

        [HttpGet]
        public ActionResult<List<Canvas>> GetAll()
        {
            return _canvasService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Canvas> GetById(int id)
        {
            return _canvasService.GetById(id);
        }

        [HttpPost]
        public ActionResult Add([FromBody] CanvasDTO canvas)
        {
            _canvasService.Add(canvas);
            return Ok("Canvas saved successfully.");
        }

        [HttpPut]
        public ActionResult Update(Canvas canvas)
        {
            _canvasService.Update(canvas);
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _canvasService.Delete(id);
            return Ok();
        }
    }
}
