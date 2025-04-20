import dayjs from "dayjs";

function filterWorkingHoursObject(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== false && !(Array.isArray(value) && value.length === 0)) {
      result[key] = value;
    }
  }
  return result;
}

function separateDays(obj) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const result = [];

  for (const day of days) {
    const selectKey = day + "Select";
    const timeKey = day + "Time";

    if (obj[selectKey] && Array.isArray(obj[timeKey]) && obj[timeKey].length > 0) {
      result.push({
        day: day,
        startTime: dayjs(obj[timeKey][0]).format("HH:mm"),
        endTime: dayjs(obj[timeKey][1]).format("HH:mm"),
      });
    }
  }

  return result;
}

const diffStarTimeEndTimeSeparated = (startTime, endTime) => {
  const date1 = dayjs(startTime);
  const date2 = dayjs(endTime);
  let mins = 0;
  if (date1 > date2) {
    mins = date1.diff(date2, "minutes", true);
  } else {
    mins = date2.diff(date1, "minutes", true);
  }
  let totalHours = parseInt(mins / 60);
  let totalMins = dayjs().minute(mins).$m;
  return { totalHours, totalMins };
};

const diffStarTimeEndTime = (startTime, endTime) => {
  const times = diffStarTimeEndTimeSeparated(startTime, endTime);
  return `${times.totalHours}:${times.totalMins}`;
};

export {
  filterWorkingHoursObject,
  separateDays,
  diffStarTimeEndTime,
  diffStarTimeEndTimeSeparated,
};
