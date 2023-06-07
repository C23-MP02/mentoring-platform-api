import { DateTime } from "luxon";

export function compareDate(
  date1: Date,
  operator: string,
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

export function dateManipulation(
  date: Date,
  daysToAddOrSubtract: number
): Date {
  return DateTime.fromJSDate(date)
    .plus({ days: daysToAddOrSubtract })
    .toJSDate();
}
