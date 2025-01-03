using Business.Models.DTOs;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Abstract
{
    public interface ICanvasService 
    { 
        void Add(CanvasDTO canvas); 
        void Update(Canvas canvas); 
        void Delete(int canvasId); 
        Canvas GetById(int canvasId); 
        List<Canvas> GetAll(); 
    }
}
