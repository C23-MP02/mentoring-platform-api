import { DateTime } from "luxon";

/**
 * Compares two dates using the specified operator.
 * @param date1 - The first date to compare.
 * @param operator - The operator to use for comparison. Supported operators: '>', '>=', '<', '<=', '==='.
 * @param date2 - The second date to compare.
 * @returns True if the comparison is true, false otherwise.
 * @throws Throws an error if an invalid operator is provided.
 */
export function compareDate(
  date1: Date,
  operator: ">" | ">=" | "<" | "<=" | "===",
  date2: Date
): boolean {
  const luxonDate1 = DateTime.fromJSDate(date1);
  const luxonDate2 = DateTime.fromJSDate(date2);

  switch (operator) {
    case ">":
      return luxonDate1 > luxonDate2;
    case ">=":
      return luxonDate1 >= luxonDate2;
    case "<":
      return luxonDate1 < luxonDate2;
    case "<=":
      return luxonDate1 <= luxonDate2;
    case "===":
      return luxonDate1 === luxonDate2;
    default:
      throw new Error("Invalid operator provided");
  }
}

/**
 * Adds or subtracts a specified number of days from a date.
 * @param date - The date to manipulate.
 * @param daysToAddOrSubtract - The number of days to add (if positive) or subtract (if negative).
 * @returns The manipulated date.
 */
export function dateManipulation(
  date: Date,
  daysToAddOrSubtract: number
): Date {
  return DateTime.fromJSDate(date)
    .plus({ days: daysToAddOrSubtract })
    .toJSDate();
}

/**
 * Adds or subtracts a specified number of hours from a date.
 * @param date - The date to manipulate.
 * @param hoursToAddOrSubtract - The number of hours to add (if positive) or subtract (if negative).
 * @returns The manipulated date.
 */
export function timeManipulation(
  date: Date,
  hoursToAddOrSubtract: number
): Date {
  return DateTime.fromJSDate(date)
    .plus({ hours: hoursToAddOrSubtract })
    .toJSDate();
}
