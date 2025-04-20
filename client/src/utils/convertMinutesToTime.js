import dayjs from "dayjs";
import { utc } from "dayjs";
dayjs.extend(utc);

const convertMinutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return dayjs().startOf("day").add(hours, "hours").add(mins, "minutes").format("HH:mm");
};

export default convertMinutesToTime;
