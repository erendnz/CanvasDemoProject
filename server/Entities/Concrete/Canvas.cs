using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
        public class Canvas : IEntity { 
            public int CanvasId { get; set; } 
            public string CanvasName { get; set; } 
            public int CreatedBy { get; set; }  
            public DateTime CreatedAt { get; set; } = DateTime.Now; 
            public DateTime? UpdatedAt { get; set; } 
        }
}
