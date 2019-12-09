using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Instablogs.Models
{
    public class Blogs
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int AuthorId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string BlogTimeStamp { get; set; }
    }
}
