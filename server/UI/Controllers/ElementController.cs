using Business.Models.DTOs;
using Business.Services.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElementController : ControllerBase
    {
        private readonly IElementService _elementService;

        public ElementController(IElementService elementService)
        {
            _elementService = elementService;
        }

        [HttpGet]
        public ActionResult<List<Element>> GetAll()
        {
            return _elementService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Element> GetById(int id)
        {
            return _elementService.GetById(id);
        }

        [HttpPost]
        public ActionResult Add(Element element)
        {
            _elementService.Add(element);
            return Ok();
        }

        [HttpPut]
        public ActionResult Update(Element element)
        {
            _elementService.Update(element);
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _elementService.Delete(id);
            return Ok();
        }

        [HttpPost("save")] 
        public IActionResult SaveElements([FromBody] List<ElementDTO> elements) 
        { 
            try 
            { 
                _elementService.SaveElements(elements); 
                return Ok("Elements saved successfully."); 
            } 
            catch (Exception ex) 
            { 
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            } 
        }

        [HttpGet("getCanvasElements/{canvasId}")]
        public async Task<IActionResult> GetCanvasElements(int canvasId)
        {
            try
            {
                var elements = await _elementService.GetCanvasElementsAsync(canvasId);
                return Ok(elements);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }
}
