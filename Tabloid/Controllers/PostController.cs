using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        { 
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        { 
            return Ok(_postRepository.GetAllPosts());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            _postRepository.Update(post);
            return NoContent();
        }


        [HttpGet("tagName")]
        public IActionResult GetByTagName(string tagName)
        {
            if (string.IsNullOrEmpty(tagName))
            {
                return NotFound();
            }
            return Ok(_postRepository.GetPostByTagName(tagName));
        }

    }
}
