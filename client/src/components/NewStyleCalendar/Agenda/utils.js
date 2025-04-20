import dayjs from "dayjs";

export const hours = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
  "12 AM",
];

export const getHeight = (meet, date) => {
  const heightHours =
    dayjs(`${date}T${meet.toTime}`).format("H") - dayjs(`${date}T${meet.fromTime}`).format("H");
  const heightMinutes =
    dayjs(`${date}T${meet.toTime}`).format("mm") - dayjs(`${date}T${meet.fromTime}`).format("mm");

  const calcHeight = (heightMinutes / 60 + heightHours) * 60;
  return calcHeight >= 60 ? calcHeight : 60;
};
export const getTop = (meet, date) => {
  const top = dayjs(`${date}T${meet.fromTime}`).format("m");
  return (top / 60) * 60;
};
