using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public interface ICRUD<TEntity> where TEntity : class
    {
        void Add(TEntity entity); 
        void Update(TEntity entity); 
        void Remove(int entityID); 
        List<TEntity> List(); 
        TEntity Find(int entityID); 
    }
}
