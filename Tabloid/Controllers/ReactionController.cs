using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ReactionController : Controller
    {
        private readonly IReactionRepository _reactionRepository;

        public ReactionController(IReactionRepository reactionRepository)
        {
            _reactionRepository = reactionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reactionRepository.GetAllReactions());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var reactionsFromPost = _reactionRepository.GetReactionsByPostId(id);
            if (reactionsFromPost == null)
            {
                return NotFound();
            }
            return Ok(reactionsFromPost);
        }

        [HttpPost]
        public IActionResult Post(Reaction reaction)
        {
            _reactionRepository.AddReaction(reaction);
            return CreatedAtAction("Get", new { id = reaction.Id }, reaction);
        }

        [HttpPost("{id}")]
        public IActionResult Post(int postId, int reactionId)
        {
            _reactionRepository.AddPostReaction(postId, reactionId);

        }
    }
}
