namespace TasteHub.DTOs.Token
{
    public class AccessTokenDTO
    {
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public DateTime IssuedAt { get; set; }
    }
}
