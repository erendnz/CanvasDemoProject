using Business.Models.DTOs;
using Business.Services.Abstract;
using DataLayer;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class CanvasManager : ICanvasService
    {
        private readonly BaseManager<Canvas> _canvasDal;

        public CanvasManager(BaseManager<Canvas> canvasDal)
        {
            _canvasDal = canvasDal;
        }

        public void Add(CanvasDTO canvas)
        {
            var newCanvas = new Canvas
            {
                CanvasName = canvas.CanvasName,
                CreatedBy = canvas.CreatedBy
            };
            _canvasDal.Add(newCanvas);
        }

        public void Update(Canvas canvas)
        {
            _canvasDal.Update(canvas);
        }

        public void Delete(int canvasId)
        {
            _canvasDal.Remove(canvasId);
        }

        public Canvas GetById(int canvasId)
        {
            return _canvasDal.Find(canvasId);
        }

        public List<Canvas> GetAll()
        {
            return _canvasDal.List();
        }
    }
}

