namespace TasteHub.Business.Interfaces
{
    public interface IEmailSenderService
    {
        Task<bool> SendEmailAsync(string to, string subject, string body);
    }
}
