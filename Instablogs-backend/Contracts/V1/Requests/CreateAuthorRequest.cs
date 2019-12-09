using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Instablogs.Contracts.V1.Requests
{
    public class CreateAuthorRequest
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
