using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Instablogs.Models
{
    public class OktaUser
    {
        public string Id { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime Activated { get; set; }
        public DateTime StatusChanged { get; set; }
        public DateTime LastLogin { get; set; }
        public DateTime LastUpdated { get; set; }
        public DateTime PasswordChanged { get; set; }

    }

    internal class Profile
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobilePhone { get; set; }
        public string SecondEmail { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }

    }
}
