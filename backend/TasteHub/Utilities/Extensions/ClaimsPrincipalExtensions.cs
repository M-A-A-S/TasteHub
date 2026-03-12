using System.Security.Claims;

namespace TasteHub.Utilities.Extensions
{
    public static class ClaimsPrincipalExtensions
    {

        public static Result<int> TryGetUserId(this ClaimsPrincipal user)
        {
            if (user == null)
                return Result<int>.Failure("User context is null.");

            var claim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(claim))
                return Result<int>.Failure("User ID claim not found.");

            if (!int.TryParse(claim, out var userId))
                return Result<int>.Failure("Invalid user ID format.");

            return Result<int>.Success(userId);
        }

    }
}
