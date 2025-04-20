import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const calculateDuration = (startTime, endTime) => {
  const start = new Date(`01/01/2000 ${startTime}`);
  const end = new Date(`01/01/2000 ${endTime}`);
  const duration = (end - start) / 1000; // Duration in seconds
  const hours = Math.floor(duration / 3600); // Duration in hours
  const minutes = Math.floor((duration % 3600) / 60); // Duration in minutes

  return { hours, minutes };
};

function convertTimeToAmPm(time) {
  const hour = time.substr(0, 2);
  const minutes = time.substr(2);

  const suffix = Number(hour) < 12 ? "am" : "pm";
  return `${Number(hour)}${Number(minutes) ? ":" + Number(minutes) : ""} ${suffix}`;
}
export const corvetDateTimeToTimeZone = (date, timeZone, format = "YYYY-MM-DDTHH:mm:ss.SSSZ") => {
  const localTime = dayjs(date).tz(timeZone).format(format);
  return localTime;
};
export const getDateTimeToTimeZone = (dataTime, tz) => {
  return dayjs(dataTime).tz(tz);
};
export const setDefaultTimeZone = (timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) => {
  dayjs.tz.setDefault(timeZone);
};

const TimeUtils = {
  calculateDuration,
  convertTimeToAmPm,
};
export { dayjs };
export default TimeUtils;
