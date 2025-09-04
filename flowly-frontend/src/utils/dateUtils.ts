import { DateTime, Info } from "luxon";

export const formatDateMMyyyy = (date: Date): string => {
  const months = Info.months("long", { locale: "en" });

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatDateMMdd = (date: DateTime, long = false): string => {
  const month = Info.months(`${long ? "long" : "short"}`, { locale: "en" });

  return `${month[date.month - 1]} ${date.day}`;
};
