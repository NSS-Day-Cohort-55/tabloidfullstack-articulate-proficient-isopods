using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        List<Tag> GetAllTagsByName(string name);
        public void Add(Tag tag);
        public Tag GetById(int id);
        public void Update(Tag tag);
        public void Delete(int id);
    }
}