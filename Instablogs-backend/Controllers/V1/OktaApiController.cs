using Microsoft.AspNetCore.Authorization;
using RestSharp;
using Microsoft.AspNetCore.Mvc;
using Instablogs.Contracts.V1;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;


namespace Instablogs.Controllers.V1
{
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class OktaApiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string OKTA_API_KEY;

        public OktaApiController(IConfiguration configuration)
        {
            _configuration = configuration;
            OKTA_API_KEY = _configuration["OktaApiKey"];
        }

        [Authorize]
        [HttpGet(ApiRoutes.OktaApi.GetUsersFromAuthorsGroup)]
        public IActionResult GetAuthors()
        {
            var oktaDomain = _configuration["OktaDomain"];
            var authorGroup = _configuration["AuthorGroup"];
            var url = oktaDomain + "/api/v1/groups/" + authorGroup + "/users?limit=200";

            var client = new RestClient(url);
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", "SSWS " + OKTA_API_KEY);
            IRestResponse response = client.Execute(request);

            return Ok(response.Content);
        }
        [Authorize]
        [HttpGet(ApiRoutes.OktaApi.GetUsersFromViewersGroup)]
        public IActionResult GetViewers()
        {
            var oktaDomain = _configuration["OktaDomain"];
            var viewerGroup = _configuration["ViewerGroup"];
            var url = oktaDomain + "/api/v1/groups/" + viewerGroup + "/users?limit=200";

            var client = new RestClient(url);
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", "SSWS " + OKTA_API_KEY);
            IRestResponse response = client.Execute(request);

            return Ok(response.Content);
        }
        [Authorize]
        [HttpPut(ApiRoutes.OktaApi.GrantAuthorAccess)]
        public IActionResult AddUserToAuthor(string id)
        {
            var oktaDomain = _configuration["OktaDomain"];
            var authorGroup = _configuration["AuthorGroup"];
            var url = oktaDomain + "/api/v1/groups/" + authorGroup + "/users/" + id;

            var client = new RestClient(url);
            var request = new RestRequest(Method.PUT);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", "SSWS " + OKTA_API_KEY);
            client.Execute(request);

            return NoContent();
        }
        [Authorize]
        [HttpDelete(ApiRoutes.OktaApi.RevokeAuthorAccess)]
        public IActionResult DeleteFromAuthor(string id)
        {
            var oktaDomain = _configuration["OktaDomain"];
            var authorGroup = _configuration["AuthorGroup"];
            var url = oktaDomain + "/api/v1/groups/" + authorGroup + "/users/" + id;

            var client = new RestClient(url);
            var request = new RestRequest(Method.DELETE);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", "SSWS " + OKTA_API_KEY);
            client.Execute(request);

            return NoContent();
        }
    }
}
