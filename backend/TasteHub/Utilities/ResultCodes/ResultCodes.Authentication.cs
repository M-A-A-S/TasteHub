namespace TasteHub.Utilities.ResultCodes
{
    public partial class ResultCodes
    {
        public const string InvalidUsernameOrPassword = "invalid_username_or_password";
        public const string InvalidEmailOrPassword = "invalid_email_or_password";
        public const string UserDisabled = "user_disabled";
        public const string UserHasNoActiveRoles = "user_has_no_active_roles";
        public const string SuccessfullyLoggedIn = "successfully_logged_in";
        public const string InvalidToken = "invalid_token";
        public const string ResetLinkSent = "reset_link_sent";
        public const string LinkWasSent = "link_was_sent";
        public const string AccountConfirmationLinkSent = "account_confirmation_link_sent";
        public const string ResetPasswordConfirmationLinkSent = "reset_password_confirmation_link_sent";
        public const string TokenIsRequired = "token_is_required";
        public const string InvalidOrExpiredToken = "invalid_or_expired_token";
        public const string ValidToken = "valid_token";
        public const string CodeIsRequired = "code_is_required";
        public const string InvalidOrExpiredCode = "invalid_or_expired_code";
        public const string ValidCode = "valid_code";
        public const string VerificationSuccess = "verification_success";
        public const string SuccessfullyResendVerificationCode = "successfully_resend_verification_code";
        public const string UnsupportedConfirmationType = "unsupported_confirmation_type";
    }
}
