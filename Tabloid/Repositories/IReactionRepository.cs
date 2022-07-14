using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface IReactionRepository
    {
        public List<Reaction> GetAllReactions();
        public List<Reaction> GetReactionsByPostId(int id);
        public void AddReaction(Reaction reaction);
        public void AddPostReaction(int postId, int reactionId);
        public void RemoveReactionFromPost(int postReactionId);
    }
}
