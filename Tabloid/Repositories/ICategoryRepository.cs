using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        public List<Category> GetAll();
        void Add(Category category);
        public void Delete(int id);
    }
}
