
using Business.Models.DTOs;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Abstract
{
    public interface IElementService 
    { 
        void Add(Element element); 
        void Update(Element element); 
        void Delete(int elementId); 
        Element GetById(int elementId); 
        List<Element> GetAll();
        void SaveElements(List<ElementDTO> elements);
        List<ElementDTO> GetCanvasElements(int canvasId);
        Task<List<ElementDTO>> GetCanvasElementsAsync(int canvasId);
    }
}
