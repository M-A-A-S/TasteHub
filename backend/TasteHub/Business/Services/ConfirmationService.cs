using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess;
using TasteHub.DTOs.User;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class ConfirmationService : IConfirmationService
    {
        private readonly IEmailSenderService _emailSenderService;
        private readonly ITokenService _tokenService;
        private readonly ICodeService _codeService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly ILogger<IConfirmationService> _logger;

        public ConfirmationService(
            IEmailSenderService emailSenderService,
            ITokenService tokenService, 
            ICodeService codeService,
            IUnitOfWork unitOfWork,
            IConfiguration configuration,
            ILogger<IConfirmationService> logger
            )
        {
            _emailSenderService = emailSenderService;
            _tokenService = tokenService;
            _codeService = codeService;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<Result<bool>> SendForgetPasswordConfirmationAsync(UserDTO userInfo)
        {
            var confirmationTokenResult = await CreateAndSaveConfirmationTokenAsync((int)userInfo.Id, ConfirmationPurpose.ResetPassword, 15);
            string resetUrl = $"{_configuration.GetValue<string>("EMAIL_CONFIGURATION:FRONTEND_DOMAIN")}/reset-password?token={confirmationTokenResult.Data.Token}";
            string body = $@"
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body {{
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }}
    .container {{
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }}
    .header {{
      background-color: #e67e22;
      color: #fff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 1px;
    }}
    .content {{
      padding: 30px 20px;
      color: #333;
      font-size: 16px;
      line-height: 1.6;
    }}
    .code {{
      display: inline-block;
      background-color: #e67e22;
      color: #fff;
      font-weight: bold;
      font-size: 22px;
      padding: 12px 24px;
      border-radius: 6px;
      letter-spacing: 4px;
      text-align: center;
      margin: 20px 0;
    }}
    .button {{
      display: inline-block;
      background-color: #e67e22;
      color: #fff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: bold;
      margin-top: 20px;
    }}
    .divider {{
      margin: 30px 0;
      border-top: 1px solid #eee;
    }}
    .rtl {{
      direction: rtl;
      text-align: right;
    }}
    .footer {{
      padding: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
      background-color: #fafafa;
    }}
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>TasteHub</div>

    <div class='content'>

      <!-- English Section -->
      <p>Hello,</p>

      <p>We received a request to reset your TasteHub account password.</p>

      <p>You can use the verification code below or click the button to securely reset your password:</p>

      <div class='code'>{confirmationTokenResult.Data.Code}</div>

      <p style='text-align:center;'>
        <a href='{resetUrl}' class='button'>Reset Password</a>
      </p>

      <p>This code will expire shortly for security reasons.</p>

      <p>If you didn’t request this, you can safely ignore this email.</p>

      <p>Stay delicious,<br/>The TasteHub Team 🍽️</p>

      <div class='divider'></div>

      <!-- Arabic Section -->
      <div class='rtl'>
        <p>مرحباً،</p>

        <p>لقد تلقينا طلبًا لإعادة تعيين كلمة المرور الخاصة بحسابك في TasteHub.</p>

        <p>يمكنك استخدام رمز التحقق أدناه أو الضغط على الزر لإعادة تعيين كلمة المرور بشكل آمن:</p>

        <div class='code'>{confirmationTokenResult.Data.Code}</div>

        <p style='text-align:center;'>
          <a href='{resetUrl}' class='button'>إعادة تعيين كلمة المرور</a>
        </p>

        <p>سينتهي صلاحية هذا الرمز قريبًا لأسباب أمنية.</p>

        <p>إذا لم تقم بطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذه الرسالة بأمان.</p>

        <p>مع أطيب التحيات،<br/>فريق TasteHub 🍽️</p>
      </div>

    </div>

    <div class='footer'>
      &copy; {DateTime.UtcNow.Year} TasteHub. All rights reserved.
    </div>
  </div>
</body>
</html>";
            await SendConfirmationEmailAsync(userInfo.Email, "RESET PASSWORD", body, ResultCodes.ResetPasswordConfirmationLinkSent);
            return Result<bool>.Success(true, ResultCodes.ResetPasswordConfirmationLinkSent);
        }

        public async Task<Result<ConfirmationToken>> CreateAndSaveConfirmationTokenAsync(int UserId,
             ConfirmationPurpose purpose, int MinutesToExpires = 15, string successMessage = "token_created_successfully")
        {
            string token = _tokenService.GenerateResetToken();
            string code = _codeService.GenerateCode(4);

            var confirmationToken = new ConfirmationToken
            {
                UserId = UserId,
                Token = token,
                Code = code,
                Purpose = purpose,
                ExpireAt = DateTime.UtcNow.AddMinutes(MinutesToExpires),
                IsUsed = false
            };

            var saveTokenResult = await _unitOfWork.ConfirmationTokens.AddAndSaveAsync(confirmationToken);

            if (!saveTokenResult.IsSuccess)
            {
                return Result<ConfirmationToken>.Failure(ResultCodes.ServerError);
            }

            return await _unitOfWork.ConfirmationTokens.AddAsync(confirmationToken);

        }


        public Task SendConfirmationEmailAsync(string toEmail, string subject, string body, string successMessage = ResultCodes.LinkWasSent)
        {
            _ = Task.Run(async () =>
            {
                try
                {
                    await _emailSenderService.SendEmailAsync(toEmail, subject, body);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex,
                        "Failed to send email. Subject: {Subject}, To: {To}",
                        subject, toEmail);
                }
            });
            return Task.CompletedTask;
        }


        public async Task<Result<ConfirmationToken>> ValidateTokenAsync(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return Result<ConfirmationToken>.Failure(ResultCodes.TokenIsRequired);
            }

            var confirmationTokenResult = await _unitOfWork.ConfirmationTokens
                .FindByAsync(c => c.Token == token, 
                q => q.Include(c => c.User));

            if (!confirmationTokenResult.IsSuccess || 
                confirmationTokenResult.Data == null)
            {
                return Result<ConfirmationToken>.Failure(ResultCodes.InvalidOrExpiredToken);
            }

            if (confirmationTokenResult.Data.IsUsed || 
                confirmationTokenResult.Data.ExpireAt < DateTime.UtcNow)
            {
                return Result<ConfirmationToken>.Failure(ResultCodes.InvalidOrExpiredToken);
            }

            return Result<ConfirmationToken>.Success(confirmationTokenResult.Data, ResultCodes.ValidToken);
        }


        public async Task<Result<ConfirmationToken>> ValidateCodeAsync(string code)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                return Result<ConfirmationToken>.Failure(ResultCodes.CodeIsRequired);
            }

            var confirmationTokenResult = await _unitOfWork.ConfirmationTokens
                .FindByAsync(c => c.Code == code);

            if (!confirmationTokenResult.IsSuccess ||
                confirmationTokenResult.Data == null)
            {
                return Result<ConfirmationToken>.Failure(ResultCodes.InvalidOrExpiredCode);
            }

            if (confirmationTokenResult.Data.IsUsed ||
                confirmationTokenResult.Data.ExpireAt < DateTime.UtcNow)
            {
                return Result<ConfirmationToken>.Failure(ResultCodes.InvalidOrExpiredCode);
            }

            return Result<ConfirmationToken>.Success(confirmationTokenResult.Data, ResultCodes.ValidCode);
        }

    }
}
