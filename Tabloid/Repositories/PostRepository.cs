using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

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
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id AS PostId, p.Title, p.Content, p.ImageLocation AS PostImage, 
                                               p.CreateDateTime AS PostDate, p.IsApproved, p.CategoryId, p.UserProfileId,
                                                
                                               up.Id AS ProfileId, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName,
                                               up.Email, up.CreateDateTime AS ProfileDate, up.ImageLocation AS ProfileImage, up.UserTypeId
                                          FROM Post p
                                     LEFT JOIN UserProfile up ON up.Id=p.UserProfileId
                                         WHERE p.Id=@id";
                                            

                    cmd.Parameters.AddWithValue("@id", Id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
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
                                    Id = reader.GetInt32(reader.GetOrdinal("ProfileId")),
                                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("ProfileDate")),
                                    ImageLocation = reader.GetString(reader.GetOrdinal("ProfileImage")),
                                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId"))

                                }

                            };

                            return post;

                        }
                    }
                    return null;
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            { 
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Post
                                           SET Title=@title, Content=@content, ImageLocation=@image, CreateDateTime=@date
                                         WHERE Id=@id";

                    cmd.Parameters.AddWithValue("@content", post.Content);
                    cmd.Parameters.AddWithValue("@title", post.Title);
                    cmd.Parameters.AddWithValue("@image", post.ImageLocation);
                    cmd.Parameters.AddWithValue("@date", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@id", post.Id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public List<Post> GetPostByTagName(string name)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
	                        p.Id AS PostId, p.Title
                        FROM PostTag pt
	                        JOIN Post p ON pt.PostId = p.Id
	                        JOIN Tag t ON pt.PostId = t.Id
                        WHERE t.Name LIKE '%' + @name + '%'
                        ";

                    DbUtils.AddParameter(cmd, "@name", name);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            posts.Add(new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                Title = DbUtils.GetString(reader, "p.Title"),
                            });
                        }

                        conn.Close();
                        return posts;
                    }
                }
            }
        }
    }
}
