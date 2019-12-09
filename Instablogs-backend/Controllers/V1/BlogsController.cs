using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Instablogs.Data;
using Instablogs.Models;
using Instablogs.Contracts.V1;
using Instablogs.Contracts.V1.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Instablogs.Contracts.V1.Responses;

namespace Instablogs.Controllers.V1
{
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly InstablogsContext _context;
        private readonly IDataRepository<Blogs> _repo;

        public BlogsController(InstablogsContext context, IDataRepository<Blogs> repo)
        {
            _context = context;
            _repo = repo;
        }
        [AllowAnonymous]
        [HttpGet(ApiRoutes.BlogApi.GetAllBlogs)]
        public async Task<IActionResult> GetBlogs()
        {
            List<Blogs> blogs = await _context.Blogs.ToListAsync();
            List<BlogResponse> blogResponses = new List<BlogResponse>();
            blogs.ForEach(b => blogResponses.Add(new BlogResponse
            {
                Id = b.Id,
                Title = b.Title,
                Username = GetUsernameFromId(b.AuthorId),
                Content = b.Content,
                TimeStamp = b.BlogTimeStamp
            }));

            return Ok(blogResponses);
        }
        [AllowAnonymous]
        [HttpGet(ApiRoutes.BlogApi.GetBlog)]
        public async Task<IActionResult> GetBlogs([FromRoute] int id)
        {

            Blogs blogs = await _context.Blogs.FindAsync(id);

            BlogResponse response = new BlogResponse
            {
                Id = blogs.Id,
                Username = GetUsernameFromId(blogs.AuthorId),
                Title = blogs.Title,
                Content = blogs.Content,
                TimeStamp = blogs.BlogTimeStamp
            };

            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }
        [Authorize]
        [HttpPost(ApiRoutes.BlogApi.CreateBlog)]
        public async Task<IActionResult> PostBlogs(BlogRequest request)
        {
            if (!AuthorExists(request.Username))
            {
                return BadRequest();
            }

            Blogs blog = new Blogs
            {
                AuthorId = GetIdFromUsername(request.Username),
                Title = request.Title,
                Content = request.Content,
                BlogTimeStamp = request.Timestamp
            };

            _repo.Add(blog);
            await _repo.SaveAsync(blog);

            return CreatedAtAction("GetBlogs", new { id = blog.Id }, blog);
        }
        [Authorize]
        [HttpDelete(ApiRoutes.BlogApi.DeleteBlog)]
        public async Task<IActionResult> DeleteBlogs([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            _repo.Delete(blog);
            await _repo.SaveAsync(blog);

            return NoContent();
        }

        #region Helper Functions
        private bool AuthorExists(string username)
        {
            return _context.Author.Any(e => e.Username == username);
        }
        private bool BlogsExists(int id)
        {
            return _context.Blogs.Any(e => e.Id == id);
        }
        private int GetIdFromUsername(string username)
        {
            return _context
                .Author
                .Where(el => el.Username == username)
                .Select(el => el.Id)
                .SingleOrDefault();
        }

        private string GetUsernameFromId(int id)
        {
            return _context
                .Author
                .Where(el => el.Id == id)
                .Select(el => el.Username)
                .SingleOrDefault();
        }
        #endregion
    }
}
