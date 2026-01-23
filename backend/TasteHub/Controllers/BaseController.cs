using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Utilities;

namespace TasteHub.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected virtual IActionResult FromResult<T>(Result<T> result)
        {
            if (result.IsSuccess)
            {
                return Ok(result);
            } 

            
            return result.StatusCode switch
            {
                404 => NotFound(result),
                500 => StatusCode(500, result),
                _ => BadRequest(result)
            };

        }
    }
}
