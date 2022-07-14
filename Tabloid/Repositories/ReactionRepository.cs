using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;
using System;

namespace Tabloid.Repositories
{
    public class ReactionRepository: BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Reaction> GetAllReactions()
        {
            throw new NotImplementedException();
        }
        public List<Reaction> GetReactionsByPostId(int postId)
        {
            throw new NotImplementedException();
        }
        public void AddReaction(Reaction reaction)
        {
            throw new NotImplementedException();
        }
        public void AddPostReaction(int postId, int reactionId)
        {
            throw new NotImplementedException();
        }
        public void RemoveReactionFromPost(int postReactionId)
        {
            throw new NotImplementedException();
        }
    }
}
