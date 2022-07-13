﻿using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAllTags()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name 
                        FROM Tag
                        ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tags = new List<Tag>();
                        while (reader.Read())
                        {
                            tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            });
                        }

                        conn.Close();
                        return tags;
                    }
                }
            }
        }
        public Tag GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name
                        FROM TAG
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Tag tag = null;
                        if (reader.Read())
                        {
                            tag = new Tag()
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                        };

                        return tag;
                    }
                }
            }
        }

        public void Add(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Tag (Name)
                    OUTPUT INSERTED.ID
                    VALUES (@Name)
                    ";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);

                    tag.Id = (int)cmd.ExecuteScalar();
                }

                conn.Close();
            }
        }

        public void Update (Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Tag
                        SET Name = @Name
                    WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    DbUtils.AddParameter(cmd, "@Id", tag.Id);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }

        public void Delete (int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Tag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }
    }
}
