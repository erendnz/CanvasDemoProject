using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public class BaseManager<TEntity> : ICRUD<TEntity> where TEntity : class
    {
        private DbSet<TEntity> _dbSet; 
        private CanvasDemoContext _context; 

        public BaseManager()
        {
            _context = new CanvasDemoContext();
            _dbSet = _context.Set<TEntity>();
        }

        public TEntity Find(int entityID)
        {
            var x = _dbSet.Find(entityID);
            _context.Entry(x).State = EntityState.Detached; 
            return x;
        }

        public void Add(TEntity entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public List<TEntity> List()
        {
            return _dbSet.ToList();
        }

        public void Remove(int entityID)
        {
            _dbSet.Remove(_dbSet.Find(entityID));
            _context.SaveChanges();
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.Where(predicate).ToList();
        }

        public async Task<List<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

    }
}
