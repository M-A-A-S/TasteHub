using TasteHub.DTOs.User;
using TasteHub.Enums;

namespace TasteHub.DTOs.ConfirmationToken
{
    public class ConfirmationTokenDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public string Code { get; set; }
        public ConfirmationPurpose Purpose { get; set; }
        public DateTime ExpireAt { get; set; }
        public bool IsUsed { get; set; }
        public PublicUserDTO User {  get; set; }
    }
}
