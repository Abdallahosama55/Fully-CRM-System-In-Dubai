import {
  add,
  isSameHour,
  isSameDay,
  addHours,
  eachDayOfInterval,
  startOfDay,
  getDay,
  isSameWeek,
  startOfWeek,
  format,
  differenceInMinutes,
} from "date-fns";

export const daysToWeekObject = (events, startWeek) => {
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const weekObject = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };

  if (events == null) {
    return weekObject;
  }

  for (const googleEventIndex in events) {
    const eventStartTimeDay = events[googleEventIndex].startTime;
    const eventEndTimeDay = events[googleEventIndex].endTime;

    if (!isSameDay(eventStartTimeDay, eventEndTimeDay)) {
      const result = eachDayOfInterval({
        start: eventStartTimeDay,
        end: eventEndTimeDay,
      });
      for (const dayInterval in result) {
        const splitedEvent = { ...events[googleEventIndex] };
        splitedEvent.startTime = result[dayInterval];
        splitedEvent.endTime = result[dayInterval];
        const weekObjectKey = dayNames[getDay(new Date(result[dayInterval]))];
        isSameWeek(startWeek, splitedEvent.startTime) &&
          weekObject[weekObjectKey].push(splitedEvent);
      }
    } else {
      const weekObjectKey = dayNames[getDay(eventStartTimeDay)];
      weekObject[weekObjectKey].push(events[googleEventIndex]);
    }
  }

  return weekObject;
};

export const getDayHoursEvents = (value, weekObject) => {
  const ALL_DAY_EVENT = 0;
  const events = [];
  for (let i = 0; i < 26; i++) {
    const startDate = add(startOfDay(startOfWeek(value.startDate)), {
      days: 1,
    });
    const hour = addHours(startDate, i - 1);

    events.push({
      id: i,
      hourObject: hour,
      hour: i != ALL_DAY_EVENT ? format(hour, "hh a") : "all-day",
      Monday:
        weekObject?.monday &&
        weekObject?.monday.filter((e) => {
          return e.allDay ? i === ALL_DAY_EVENT : isSameHour(e.startTime, hour);
        }),
      Tuesday:
        weekObject?.tuesday &&
        weekObject?.tuesday.filter((e) => {
          return e.allDay
            ? i === ALL_DAY_EVENT
            : isSameHour(e.startTime, add(hour, { days: 1 }));
        }),
      Wednesday:
        weekObject?.wednesday &&
        weekObject?.wednesday.filter((e) => {
          return e.allDay
            ? i === ALL_DAY_EVENT
            : isSameHour(e.startTime, add(hour, { days: 2 }));
        }),
      Thursday:
        weekObject?.thursday &&
        weekObject?.thursday.filter((e) => {
          return e.allDay
            ? i === ALL_DAY_EVENT
            : isSameHour(e.startTime, add(hour, { days: 3 }));
        }),
      Friday:
        weekObject?.friday &&
        weekObject?.friday.filter((e) => {
          return e.allDay
            ? i === ALL_DAY_EVENT
            : isSameHour(e.startTime, add(hour, { days: 4 }));
        }),
      Saturday:
        weekObject?.saturday &&
        weekObject?.saturday.filter((e) => {
          return e.allDay
            ? i === ALL_DAY_EVENT
            : isSameHour(e.startTime, add(hour, { days: 5 }));
        }),
      Sunday:
        weekObject?.sunday &&
        weekObject?.sunday.filter((e) => {
          return e.allDay
            ? i === ALL_DAY_EVENT
            : isSameHour(e.startTime, add(hour, { days: 6 }));
        }),
    });
  }

  return events;
};

const HOUR_TO_DECIMAL = 1.666666667;
export const MIN_BOX_SIZE = 40;

export const sizeEventBox = (event, hour) => {
  const eventStartTime = new Date(event.startTime);
  const eventEndTime = new Date(event.endTime);
  const boxSize =
    Math.floor(
      differenceInMinutes(eventEndTime, eventStartTime) * HOUR_TO_DECIMAL,
    ) < MIN_BOX_SIZE
      ? MIN_BOX_SIZE
      : Math.floor(
          differenceInMinutes(eventEndTime, eventStartTime) * HOUR_TO_DECIMAL,
        );
  const boxPosition =
    differenceInMinutes(hour, eventStartTime) * HOUR_TO_DECIMAL > 100
      ? 0
      : differenceInMinutes(eventStartTime, hour) * HOUR_TO_DECIMAL;

  return { boxPosition: boxPosition, boxSize: boxSize };
};

export function getDatesInWeek(date) {
  const result = [];
  const day = date.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
  const diff = date.getDate() - day + (day === 0 ? -6 : 0); // Calculate the starting date of the week

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), diff + i);
    result.push(currentDate);
  }

  return result;
}
