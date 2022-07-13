using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        public void Add(Tag tag);
        public void Update(Tag tag);
        public void Delete(int id);
    }
}