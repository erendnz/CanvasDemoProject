using Business.Models.DTOs;
using Business.Services.Abstract;
using DataLayer;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class ElementManager : IElementService
    {
        private readonly BaseManager<Element> _elementDal;

        public ElementManager(BaseManager<Element> elementDal)
        {
            _elementDal = elementDal;
        }

        public void Add(Element element)
        {
            _elementDal.Add(element);
        }

        public void Update(Element element) 
        { 
            var existingElement = _elementDal.Find(element.ElementId); 

            if (existingElement != null) 
            { 
                existingElement.PositionX = element.PositionX; 
                existingElement.PositionY = element.PositionY; 
                existingElement.Width = element.Width; 
                existingElement.Height = element.Height; 
                existingElement.Rotation = element.Rotation; 
                existingElement.StartValue = element.StartValue; 
                existingElement.EndValue = element.EndValue;
                existingElement.StartTime = element.StartTime;
                existingElement.EndTime = element.EndTime;
                existingElement.Value = element.Value;
                existingElement.StepTime = element.StepTime;

                _elementDal.Update(existingElement); 
            } 
            else { 
                throw new Exception("Element not found"); 
            } 
        }

        public void Delete(int elementId)
        {
            _elementDal.Remove(elementId);
        }

        public Element GetById(int elementId)
        {
            return _elementDal.Find(elementId);
        }

        public List<Element> GetAll()
        {
            return _elementDal.List();
        }

        public void SaveElements(List<ElementDTO> elements)
        {
            var canvasId = elements.First().CanvasId;
            var existingElements = _elementDal.Find(e => e.CanvasId == canvasId).ToList();

            var newElementIds = elements.Select(e => e.ElementId).ToList();

            foreach (var element in existingElements)
            {
                if (!newElementIds.Contains(element.ElementId))
                {
                    _elementDal.Remove(element.ElementId);
                }
            }

            foreach (var elementDto in elements)
            {
                var element = existingElements.FirstOrDefault(e => e.ElementId == elementDto.ElementId);

                if (element != null)
                {
                    element.ElementType = elementDto.ElementType;
                    element.OperatorType = elementDto.OperatorType;
                    element.InputType = elementDto.InputType;
                    element.PositionX = elementDto.PositionX;
                    element.PositionY = elementDto.PositionY;
                    element.Width = elementDto.Width;
                    element.Height = elementDto.Height;
                    element.Rotation = elementDto.Rotation;
                    element.StartValue = elementDto.StartValue;
                    element.EndValue = elementDto.EndValue;
                    element.StartTime = elementDto.StartTime;
                    element.EndTime = elementDto.EndTime;
                    element.Value = elementDto.Value;
                    element.StepTime = elementDto.StepTime;

                    _elementDal.Update(element);
                }
                else
                {
                    element = new Element
                    {
                        CanvasId = canvasId,
                        ElementType = elementDto.ElementType,
                        OperatorType = elementDto.OperatorType,
                        InputType = elementDto.InputType,
                        PositionX = elementDto.PositionX,
                        PositionY = elementDto.PositionY,
                        Width = elementDto.Width,
                        Height = elementDto.Height,
                        Rotation = elementDto.Rotation,
                        StartValue = elementDto.StartValue,
                        EndValue = elementDto.EndValue,
                        StartTime = elementDto.StartTime,
                        EndTime = elementDto.EndTime,
                        Value = elementDto.Value,
                        StepTime = elementDto.StepTime

                    };

                    _elementDal.Add(element);
                }
            }
        }


        public List<ElementDTO> GetCanvasElements(int canvasId)
        {
            var elements = _elementDal.Find(e => e.CanvasId == canvasId).ToList();
            var elementDtos = elements.Select(e => new ElementDTO
            {
                ElementId = e.ElementId,
                CanvasId = e.CanvasId,
                ElementType = e.ElementType,
                OperatorType = e.OperatorType,
                InputType = e.InputType,
                PositionX = e.PositionX,
                PositionY = e.PositionY,
                Width = e.Width,
                Height = e.Height,
                Rotation = e.Rotation,
                StartValue = e.StartValue,
                EndValue = e.EndValue,
                StartTime = e.StartTime,
                EndTime = e.EndTime,
                Value = e.Value,
                StepTime = e.StepTime
            }).ToList();

            return elementDtos;
        }
        public async Task<List<ElementDTO>> GetCanvasElementsAsync(int canvasId)
        {
            var elements = await _elementDal.FindAsync(e => e.CanvasId == canvasId);
            var elementDtos = elements.Select(e => new ElementDTO
            {
                ElementId = e.ElementId,
                CanvasId = e.CanvasId,
                ElementType = e.ElementType,
                OperatorType = e.OperatorType,
                InputType = e.InputType,
                PositionX = e.PositionX,
                PositionY = e.PositionY,
                Width = e.Width,
                Height = e.Height,
                Rotation = e.Rotation,
                StartValue = e.StartValue,
                EndValue = e.EndValue,
                StartTime = e.StartTime,
                EndTime = e.EndTime,
                Value = e.Value,
                StepTime = e.StepTime
            }).ToList();

            return elementDtos;
        }

    }
}
