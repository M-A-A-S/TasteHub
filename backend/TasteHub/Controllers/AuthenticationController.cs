using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Attendance;
using TasteHub.DTOs.Authentication;
using TasteHub.Utilities;

namespace TasteHub.Controllers
{
    [Route("api/auth")]
    public class AuthenticationController : BaseController
    {
        private readonly IAuthenticationService _service;
        private readonly JwtOptions _jwtOptions;

        public AuthenticationController(IAuthenticationService service, 
            IOptions<JwtOptions> jwtOptions)
        {
            _service = service;
            _jwtOptions = jwtOptions.Value;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Create([FromBody] LoginDTO DTO)
        {
            var result = await _service.LogInAsync(DTO);
            if (result.IsSuccess)
            {
                Response.Cookies.Append("tasteHub_refreshToken", result.Data.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationDays)
                });
            }
            return FromResult(Result<LoginResponseDTO>.Success(result.Data?.LoginResponse));
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["tasteHub_refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized();
            }

            var result = await _service.RefreshTokenAsync(refreshToken);

            if (!result.IsSuccess)
            {
                return Unauthorized();
            }

            if (result.IsSuccess)
            {
                Response.Cookies.Append("tasteHub_refreshToken", result.Data.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationDays)
                });
            }
            return FromResult(Result<LoginResponseDTO>.Success(result.Data?.LoginResponse));
        }
    }
}
