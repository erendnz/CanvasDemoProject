using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DataLayer
{
    public class CanvasDemoDB
    {
        public BaseManager<User> Users { get; set; }
        public BaseManager<Element> Elements { get; set; }
        public BaseManager<Canvas> Canvases { get; set; }

        public CanvasDemoDB()
        {
            Users = new BaseManager<User>();
            Elements = new BaseManager<Element>();
            Canvases = new BaseManager<Canvas>();
        }
    }
}
