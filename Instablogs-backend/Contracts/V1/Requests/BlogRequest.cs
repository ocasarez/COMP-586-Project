using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Instablogs.Contracts.V1.Requests
{
    public class BlogRequest
    {
        public string Username { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Timestamp { get; set; }
    }
}
