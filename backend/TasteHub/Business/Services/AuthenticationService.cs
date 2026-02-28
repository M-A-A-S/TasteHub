using Azure.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess;
using TasteHub.DTOs.Authentication;
using TasteHub.DTOs.User;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordService _passwordService;
        private readonly ITokenService _tokenService;
        private readonly JwtOptions _jwtOptions;

        public AuthenticationService(IUnitOfWork unitOfWork,
            IPasswordService passwordService,
            ITokenService tokenService,
            IOptions<JwtOptions> jwtOptions
            )
        {
            _unitOfWork = unitOfWork;
            _passwordService = passwordService;
            _tokenService = tokenService;
            _jwtOptions = jwtOptions.Value;
        }

        public async Task<Result<LoginResult>> LogInAsync(LoginDTO request)
        {
            var userResult = await _unitOfWork.Users
                .FindByAsync(predicate: u =>
                    u.Email == request.Email, 
                    include: q => q.Include(u => u.Person)
                        .Include(u => u.Roles)
                            .ThenInclude(ur => ur.Role)
                    );

            if (!userResult.IsSuccess || userResult.Data == null)
            {
                return Result<LoginResult>.Failure(ResultCodes.InvalidEmailOrPassword);
            }



            if (!userResult.Data.IsActive)
            {
                return Result<LoginResult>.Failure(ResultCodes.UserDisabled);
            }

            if (!userResult.Data.Roles.Any(r => r.IsActive))
            {
                return Result<LoginResult>.Failure(ResultCodes.UserHasNoActiveRoles);
            }

            if (!_passwordService.VerifyPassword<UserDTO>(userResult.Data.ToDTO(), userResult.Data.Password, request.Password))
            {
                return Result<LoginResult>.Failure(ResultCodes.InvalidEmailOrPassword);
            }

            var accessToken = _tokenService.GenerateAccessToken(userResult.Data.ToDTO());
            var refreshToken = _tokenService.GenerateRefreshToken();

            await _unitOfWork.RefreshTokens.AddAsync(new RefreshToken 
            { 
                Token = refreshToken,
                UserId = userResult.Data.Id,
                IsUsed = false,
                Expires = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationDays),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            });

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<LoginResult>.Failure(saveResult.Code);
            }

            return Result<LoginResult>.Success(new LoginResult
            {
                LoginResponse = new LoginResponseDTO
                {
                    User = userResult.Data.ToPublicDTO(),
                    AccessToken = accessToken,
                },
                RefreshToken = refreshToken,
            });
        }
  
        public async Task<Result<LoginResult>> RefreshTokenAsync(string refreshToken)
        {
            var storedTokenResult = await _unitOfWork.RefreshTokens
                .FindByAsync(r =>
                    r.Token == refreshToken &&
                    r.Expires > DateTime.UtcNow,
                    q => q.Include(r => r.User));

            if (!storedTokenResult.IsSuccess || storedTokenResult.Data == null)
            {
                return Result<LoginResult>.Failure(ResultCodes.InvalidToken);
            }

            var newAccessToken =
                _tokenService.GenerateAccessToken(
                    storedTokenResult.Data.User.ToDTO());
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            storedTokenResult.Data.IsUsed = true;

            await _unitOfWork.RefreshTokens.AddAsync(new RefreshToken
            {
                Token = refreshToken,
                UserId = storedTokenResult.Data.User.Id,
                Expires = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationDays),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            });

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<LoginResult>.Failure(saveResult.Code);
            }

            return Result<LoginResult>.Success(new LoginResult
            {
                LoginResponse = new LoginResponseDTO
                {
                    User = storedTokenResult.Data.User.ToPublicDTO(),
                    AccessToken = newAccessToken,
                },
                RefreshToken = newRefreshToken,
            });
        }

        public async Task<Result<bool>> LogoutAsync(string refreshToken)
        {
            var storedTokenResult = await _unitOfWork.RefreshTokens
                .FindByAsync(r =>
                    r.Token == refreshToken &&
                    !r.IsUsed);

            if (storedTokenResult.IsSuccess && storedTokenResult.Data != null)
            {
                storedTokenResult.Data.IsUsed = true;

                var saveResult = await _unitOfWork.SaveChangesAsync();
                if (!saveResult.IsSuccess)
                {
                    return Result<bool>.Failure(saveResult.Code);
                }
            }

            return Result<bool>.Success(true);
        }

    }
}
