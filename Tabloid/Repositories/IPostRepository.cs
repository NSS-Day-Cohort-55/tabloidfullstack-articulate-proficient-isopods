using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        Post GetPostById(int Id);

        void Delete(int id);

        void Update(Post post);

        void AddPost(Post post);

    }
}