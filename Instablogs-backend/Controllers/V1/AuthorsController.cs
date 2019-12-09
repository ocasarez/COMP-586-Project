using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Instablogs.Data;
using Instablogs.Models;
using Instablogs.Contracts.V1.Responses;
using Instablogs.Contracts.V1;
using Instablogs.Contracts.V1.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace Instablogs.Controllers.V1
{
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly InstablogsContext _context;

        public AuthorsController(InstablogsContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet(ApiRoutes.AuthorApi.GetAllAuthors)]
        public async Task<IActionResult> GetAuthor()
        {
            List<Author> authors = await _context.Author.ToListAsync();

            return Ok(authors);
        }
        [Authorize]
        [HttpGet(ApiRoutes.AuthorApi.GetAuthor)]
        public async Task<IActionResult> GetAuthor(string username)
        {
            if (!AuthorExists(username))
            {
                return NotFound();
            }

            var author = await _context.Author.FindAsync(FindIdByUsername(username));

            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }
        [Authorize]
        [HttpPost(ApiRoutes.AuthorApi.CreateAuthor)]
        public async Task<IActionResult> PostAuthor(Author author)
        {
            if (AuthorExists(author.Username))
            {
                return BadRequest();
            }

            _context.Author.Add(author);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuthor", new { id = author.Id }, author);
        }
        [Authorize]
        [HttpDelete(ApiRoutes.AuthorApi.DeleteAuthor)]
        public async Task<IActionResult> DeleteAuthor(string username)
        {
            var author = await _context.Author.FindAsync(FindIdByUsername(username));
            if (author == null)
            {
                return NotFound();
            }

            _context.Author.Remove(author);
            await _context.SaveChangesAsync();

            return Ok(author);
        }

        #region Helper Functions
        private bool AuthorExists(string username)
        {
            return _context.Author.Any(e => e.Username == username);
        }

        private int FindIdByUsername(string username)
        {
            return _context
                .Author
                .Where(e => e.Username == username)
                .Select(e => e.Id)
                .SingleOrDefault();
        }
        #endregion
    }
}
