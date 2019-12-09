using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Instablogs.Contracts.V1
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string Version = "v1";
        public const string Base = Root + "/" + Version;
        public static class AuthorApi
        {
            public const string GetAllAuthors = Base + "/Authors";
            public const string GetAuthor = Base + "/Authors/{username}";
            
            public const string DeleteAuthor = Base + "/Authors/{username}";

            public const string CreateAuthor = Base + "/Authors";
        }

        public static class BlogApi
        {
            public const string GetAllBlogs = Base + "/Blogs";
            public const string GetBlog = Base + "/Blogs/{id}";

            public const string CreateBlog = Base + "/Blogs";

            public const string DeleteBlog = Base + "/Blogs/{id}";
        }
        public static class OktaApi
        {
            public const string GetUsersFromViewersGroup = Base + "/ViewersGroup/Users";
            public const string GetUsersFromAuthorsGroup = Base + "/AuthorsGroup/Users";
            public const string GrantAuthorAccess = Base + "/RequestAccess/{id}";
            public const string RevokeAuthorAccess = Base + "/RevokeAccess/{id}";
        }
    }
}
