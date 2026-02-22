using System;

namespace TasteHub.Utilities.ResultCodes
{
    public partial class ResultCodes
    {
        public const string AlreadyCheckedIn = "already_checked_in";
        public const string CheckInRequired = "check_in_required";
        public const string AlreadyCheckedOut = "already_checked_out";
        public const string NotWithinShiftTime = "not_within_shift_time";
        public const string EarlyCheckoutNotAllowed = "early_checkout_not_allowed";
        public const string NoActiveWorkScheduleForToday = "no_active_work_schedule_for_today";
    }
}
