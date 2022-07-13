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
                    cmd.CommandText = @"SELECT p.Id AS PostId, p.Title, p.Content, p.ImageLocation AS PostImage, 
                                               p.CreateDateTime AS PostDate, p.IsApproved, p.CategoryId, p.UserProfileId,
                                                
                                               up.Id, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName,
                                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId
                                          FROM Post p
                                     LEFT JOIN UserProfile up ON up.Id=p.UserProfileId
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
                                    Id = reader.GetInt32(reader.GetOrdinal("PostId")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Content = reader.GetString(reader.GetOrdinal("Content")),
                                    ImageLocation = reader.GetString(reader.GetOrdinal("PostImage")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("PostDate")),
                                    IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    Profile = new UserProfile 
                                    {
                                        Id=reader.GetInt32(reader.GetOrdinal("Id")),
                                        FirebaseUserId=reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                        DisplayName=reader.GetString(reader.GetOrdinal("DisplayName")),
                                        FirstName=reader.GetString(reader.GetOrdinal("FirstName")),
                                        LastName=reader.GetString(reader.GetOrdinal("LastName")),
                                        Email=reader.GetString(reader.GetOrdinal("Email")),
                                        CreateDateTime=reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                        ImageLocation=reader.GetString(reader.GetOrdinal("ImageLocation")),
                                        UserTypeId=reader.GetInt32(reader.GetOrdinal("UserTypeId"))

                                    }

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
