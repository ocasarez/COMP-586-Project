using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Instablogs.Contracts.V1.Responses
{
    public class BlogResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string TimeStamp { get; set; }
    }
}
