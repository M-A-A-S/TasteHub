using TasteHub.DTOs.Person;
using TasteHub.DTOs.Token;
using TasteHub.DTOs.User;

namespace TasteHub.DTOs.Authentication
{
    public class LoginResponseDTO
    {
        //public PersonDTO Person { get; set; }
        public PublicUserDTO User { get; set; }
        public AccessTokenDTO AccessToken { get; set; }
    }
}
