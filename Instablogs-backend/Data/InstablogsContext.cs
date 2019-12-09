using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Instablogs.Models;

namespace Instablogs.Data
{
    public class InstablogsContext : DbContext
    {
        public InstablogsContext (DbContextOptions<InstablogsContext> options)
            : base(options)
        {
        }

        public DbSet<Author> Author { get; set; }

        public DbSet<Blogs> Blogs { get; set; }

    }
}
