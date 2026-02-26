namespace TasteHub.Utilities.ResultCodes
{
    public partial class ResultCodes
    {
        public const string PayrollAlreadyGenerated = "payroll_already_generated_for_this_month";
        public const string AllAttendanceMustBeApproved = "all_attendance_must_be_approved";
        public const string PayrollNotFound = "payroll_not_found";
        public const string PayrollMustBeApprovedFirst = "payroll_must_be_approved_first";
        public const string OnlyDraftPayrollCanBeApproved = "only_draft_payroll_can_be_approved";
        public const string OnlyDraftPayrollCanBeEdited = "only_draft_payroll_can_be_edited";
        public const string InvalidOperation = "cannot_change_payroll_month_year_employee";

    }
}
