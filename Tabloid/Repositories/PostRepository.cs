using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {

        public PostRepository(IConfiguration configuration)
            : base(configuration) { }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, 
                                               Title, 
                                               Content, 
                                               ImageLocation, 
                                               CreateDateTime, 
                                               IsApproved, 
                                               CategoryId, 
                                               UserProfileId
                                          FROM Post
                                            ORDER BY CreateDateTime DESC";

                    using (var reader = cmd.ExecuteReader())
                    {
                        var posts = new List<Post>();

                        while (reader.Read())
                        {
                            if (reader.GetBoolean(reader.GetOrdinal("IsApproved")))
                            {
                                var post = new Post
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Content = reader.GetString(reader.GetOrdinal("Content")),
                                    ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                    IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))

                                };
                                posts.Add(post);

                            }
                        }
                        return posts;
                    }
                }
            }
        }

        public Post GetPostById(int Id)
        {
            throw new System.NotImplementedException();
        }

        public void Update(Post post)
        {
            throw new System.NotImplementedException();
        }
    }
}
