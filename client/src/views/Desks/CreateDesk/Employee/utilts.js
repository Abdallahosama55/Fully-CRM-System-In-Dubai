const calculateDuration = (startTime, endTime) => {
  const start = new Date(`01/01/2000 ${startTime}`);
  const end = new Date(`01/01/2000 ${endTime}`);
  const duration = (end - start) / 1000; // Duration in seconds
  const hours = Math.floor(duration / 3600); // Duration in hours
  const minutes = Math.floor((duration % 3600) / 60); // Duration in minutes

  return { hours, minutes };
};

export const calculateTotalHours = (schedule) => {
  let totalHours = 0;

  for (const day in schedule) {
    const { startTime, endTime } = schedule[day];
    const { hours, minutes } = calculateDuration(startTime, endTime);
    totalHours += hours + minutes / 60;
  }

  return totalHours;
};
