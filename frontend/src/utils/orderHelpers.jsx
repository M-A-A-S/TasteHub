export const ORDER_TYPES = {
  0: "dineIn",
  1: "takeaway",
  2: "delivery",
};

export const ORDER_STATUS = {
  0: "pending",
  1: "preparing",
  2: "completed",
  3: "cancelled",
  5: "Served",
};

export const STATUS_STYLES = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

  preparing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

  completed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

  served:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export const TYPE_STYLES = {
  dineIn:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",

  takeaway:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",

  delivery: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};
