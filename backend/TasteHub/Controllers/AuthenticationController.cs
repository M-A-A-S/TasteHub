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

                return FromResult(Result<LoginResponseDTO>.Success(result.Data?.LoginResponse));
            }
            return FromResult(Result<LoginResponseDTO>.Failure(result.Code, result.StatusCode));
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

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["tasteHub_refreshToken"];

            if (!string.IsNullOrEmpty(refreshToken))
            {
                await _service.LogoutAsync(refreshToken);
            }

            var result = await _service.RefreshTokenAsync(refreshToken);

            if (!result.IsSuccess)
            {
                return Unauthorized();
            }

            Response.Cookies.Delete("tasteHub_refreshToken", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            return FromResult(Result<bool>.Success(true));
        }

        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordRequestDTO request)
        {

            return FromResult(await _service.ForgetPasswordAsync(request.Email));
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO request)
        {

            return FromResult(await _service.ResetPasswordAsync(request));
        }

        [HttpPost("verify-code")]
        public async Task<IActionResult> VerifyCode([FromBody] VerifyCodeRequestDTO request)
        {

            return FromResult(await _service.VerifyCodeAsync(request.Code));
        }


        [HttpPost("resend-code")]
        public async Task<IActionResult> ResendVerificationCode([FromBody] ResendVerificationCodeRequestDTO request)
        {

            return FromResult(await _service.ResendVerificationCodeAsync(request.Email));
        }


    }
}
