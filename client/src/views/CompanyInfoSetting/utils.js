import { calculateDuration } from "utils/time";

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const calculateTotalHours = (schedule) => {
  let totalHours = 0;

  for (const day in schedule) {
    const { startTime, endTime } = schedule[day];
    const { hours, minutes } = calculateDuration(startTime, endTime);
    totalHours += hours + minutes / 60;
  }

  return totalHours;
};
