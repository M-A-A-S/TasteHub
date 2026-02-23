export const SORTING_TERMS = {
  NEWEST: 1,
  OLDEST: 2,
  PRICE_ASC: 3,
  PRICE_DESC: 4,
};

export const IngredientUnits = [
  { value: 0, key: "kilogram" },
  { value: 1, key: "gram" },
  { value: 2, key: "liter" },
  { value: 3, key: "milliliter" },
  { value: 4, key: "piece" },
];

export const Genders = [
  { value: 0, key: "unknown" },
  { value: 1, key: "male" },
  { value: 2, key: "female" },
  { value: 3, key: "other" },
];

export const StockMovementType = {
  IN: 0,
  OUT: 1,
};

export const StockMovementReasons = [
  { value: 0, key: "sale" },
  { value: 1, key: "purchase" },
  { value: 2, key: "adjustment" },
  { value: 3, key: "waste" },
  { value: 4, key: "usage" },
  { value: 5, key: "return" },
];

export const STOCK_REASON = {
  SALE: 0,
  PURCHASE: 1,
  WASTE: 3,
  USAGE: 4,
  RETURN: 5,
};

export const ADDITION_REASONS = [STOCK_REASON.PURCHASE, STOCK_REASON.RETURN];

export const DEDUCTION_REASONS = [
  STOCK_REASON.SALE,
  STOCK_REASON.WASTE,
  STOCK_REASON.USAGE,
];

export const EmploymentStatuses = [
  { value: 1, key: "active" },
  { value: 2, key: "on_leave" },
  { value: 3, key: "suspended" },
  { value: 4, key: "terminated" },
];

export const DaysOfWeek = [
  { value: 0, key: "sunday" },
  { value: 1, key: "monday" },
  { value: 2, key: "tuesday" },
  { value: 3, key: "wednesday" },
  { value: 4, key: "thursday" },
  { value: 5, key: "friday" },
  { value: 6, key: "saturday" },
];

export const AttendanceStatus = [
  { value: 0, key: "not_recorded" },
  { value: 1, key: "present" },
  { value: 2, key: "absent" },
  { value: 3, key: "leave" },
  { value: 4, key: "holiday" },
  { value: 5, key: "weekend" },
];

export const LeaveStatuses = [
  { value: 0, key: "pending" },
  { value: 1, key: "approved" },
  { value: 2, key: "rejected" },
  { value: 3, key: "cancelled" },
];

export const LeaveStatus = {
  pending: 0,
  approved: 1,
  rejected: 2,
  cancelled: 3,
};
