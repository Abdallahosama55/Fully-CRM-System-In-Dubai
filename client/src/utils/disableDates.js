export const disablePastDates = (current, date) => {
  return current && current.isBefore(date, "day");
};

export const disableAfterDates = (current, date) => {
  return current && current.isAfter(date, "day");
};
