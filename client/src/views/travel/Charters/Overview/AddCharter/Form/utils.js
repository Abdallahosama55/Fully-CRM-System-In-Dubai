import dayjs from "dayjs";

const getDatesBetween = (startDate, endDate, validDays) => {
  const dayMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  const validDayIndices = validDays.map((day) => dayMap[day.toLowerCase()]);
  let currentDate = new Date(startDate);
  const dates = [];

  while (currentDate <= new Date(endDate)) {
    if (validDayIndices.includes(currentDate.getDay())) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
const addDays = (days) => (date) => {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
};

const swapAirport = (source, destination) => {
  return {
    source: destination?.name,
    destination: source?.name,
    fromAirportId: destination.id,
    toAirportId: source.id,
  };
};
// Convert input to desired format
const convertInputToOutput = (input) => {
  console.log(input);
  try {
    const dates = getDatesBetween(input.fromDate, input.toDate, input.valid_days);
    const data = (dates || []).map((date) => {
      const itemDate = dayjs(date).format("YYYY-MM-DD");
      const departure = dayjs(input.departure).format("HH:mm");
      const arrive = dayjs(input.arrival).format("HH:mm");

      return {
        type: input.type.toUpperCase(),
        date,
        outboundFlight: {
          ...input,
          alotment: parseInt(input.allotment, 10) || 0,
          adult: undefined,
          child: undefined,
          infant: undefined,
          fromDateTime: itemDate + " " + departure,
          fromTime: departure,
          toTime: arrive,
          toDate:
            departure > arrive
              ? dayjs(addDays(1)(new Date(itemDate))).format("YYYY-MM-DD")
              : itemDate,
          toDateTime:
            departure > arrive
              ? dayjs(addDays(1)(new Date(itemDate))).format("YYYY-MM-DD") + " " + arrive
              : itemDate + " " + arrive,
          allotment: parseInt(input.allotment, 10) || 0,
        },
      };
    });
    if (input.type.toUpperCase() === "TWOWAY") {
      let items = [];
      data.forEach((item) => {
        const minutesDiff = dayjs(item.outboundFlight.toDateTime, "YYYY-MM-DD HH:mm").diff(
          dayjs(item.outboundFlight.fromDateTime, "YYYY-MM-DD HH:mm"),
          "minutes",
        );

        const returnAfterTime = dayjs(item.outboundFlight.return_after_hours);
        const returnDepartureDate = dayjs(dayjs(item.outboundFlight.toDate).format("YYYY-MM-DD"))
          .add(returnAfterTime.hour(), "h")
          .add(returnAfterTime.minute(), "m")
          .add(dayjs(item.outboundFlight.toTime, "HH:mm").hour(), "h")
          .add(dayjs(item.outboundFlight.toTime, "HH:mm").minute(), "m")
          .format("YYYY-MM-DD");
        const returnDeparture = dayjs(item.outboundFlight.toTime, "HH:mm")
          .add(returnAfterTime.hour(), "h")
          .add(returnAfterTime.minute(), "m");

        items.push(item);
        items.push({
          ...item,
          outboundFlight: {
            ...item.outboundFlight,
            ...swapAirport(
              { name: input.source, id: input.fromAirportId },
              { name: input.destination, id: input.toAirportId },
            ),
            flightNo: input.return_flightNo,
            fromDateTime: returnDepartureDate + " " + returnDeparture.format("HH:mm"),
            toDateTime: dayjs(
              returnDepartureDate + " " + returnDeparture.format("HH:mm"),
              "YYYY-MM-DD HH:mm",
            )
              .add(minutesDiff, "minutes")
              .format("YYYY-MM-DD HH:mm"),
          },
        });
      });
      return items;
    }
    return data;
  } catch (e) {
    return [];
  }
};

export { convertInputToOutput };
