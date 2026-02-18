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
