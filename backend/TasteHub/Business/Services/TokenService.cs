using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Token;
using TasteHub.DTOs.User;
using TasteHub.Utilities;

namespace TasteHub.Business.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtOptions _jwtOptions;
        public TokenService(IOptions<JwtOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
        }

        public AccessTokenDTO GenerateAccessToken(UserDTO DTO)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, DTO.Id.ToString()),
                new Claim(ClaimTypes.Email, DTO.Email)
            };

            foreach (var role in DTO.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Role.NameEn));
            }

            var signingKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwtOptions.SigningKey));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtOptions.Issuer,
                Audience = _jwtOptions.Audience,
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.AccessTokenExpirationMinutes),
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return new AccessTokenDTO
            {
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.AccessTokenExpirationMinutes)
            };
        }
    
        public string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        public string GenerateResetToken(int length = 32)
        {
            var bytes = RandomNumberGenerator.GetBytes(length);
            return WebEncoders.Base64UrlEncode(bytes);
        }
    }
}
