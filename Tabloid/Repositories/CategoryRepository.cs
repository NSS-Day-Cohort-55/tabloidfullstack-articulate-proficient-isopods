﻿using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configutation) : base(configutation) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                            SELECT Id, Name
                                            FROM Category
                                            ORDER BY Name
                                       ";
                    var reader = cmd.ExecuteReader();
                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        public void Add(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                            INSERT INTO Category (Name)
                                            OUTPUT INSERTED.ID
                                            VALUES (@Name)
                                       ";
                    DbUtils.AddParameter(cmd, "@Name" , category.Name);

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}