import dayjs from "dayjs";

// style
import "./styles.css";
const DayCalendar = ({ sessions }) => {
  return (
    <div className="day_calender">
      {sessions.map((el, index) => {
        const diffrance = dayjs(el?.endTime, "hh:mm").isBefore(dayjs(el?.endTime, "hh:mm"))
          ? dayjs(el?.startTime, "hh:mm").diff(dayjs(el?.endTime, "hh:mm"), "minute")
          : dayjs(el?.endTime, "hh:mm").diff(dayjs(el?.startTime, "hh:mm"), "minute");
        let isHasConflict = false;

        if (sessions?.length - 1 !== index) {
          isHasConflict = dayjs(el?.endTime, "hh:mm").isAfter(
            dayjs(sessions[index + 1]?.startTime, "hh:mm"),
          );
        } else {
          isHasConflict = dayjs(el?.startTime, "hh:mm").isBefore(
            dayjs(sessions[index - 1]?.endTime, "hh:mm"),
          );
        }

        return (
          <div
            key={`${el.startTime} + ${index}`}
            className="session_card"
            style={{
              top: `calc(var(--minute) * ${-dayjs("00:00", "hh:mm").diff(
                dayjs(el?.startTime, "hh:mm"),
                "minute",
              )})`,
              height: `calc(var(--minute) * ${diffrance})`,
              width: isHasConflict
                ? `calc((100% - 70px) / ${sessions?.length}`
                : "calc(100% - 70px)",
              insetInlineStart: isHasConflict
                ? `calc((((100% - 70px) / ${sessions?.length}) * ${index}) + 70px)`
                : "70px",
            }}>
            {
              <div
                className={`${
                  diffrance < 60
                    ? "w-100 fz-10 space-between short-duration"
                    : `long-duration ${isHasConflict ? "hasConflict" : ""}`
                }`}>
                <span>{dayjs(el?.startTime, "hh:mm").format("hh:mm A")}</span>
                <span>{dayjs(el?.endTime, "hh:mm").format("hh:mm A")}</span>
              </div>
            }
          </div>
        );
      })}
      {[...new Array(24)].map((el, index) => {
        return (
          <div key={index} className="day_hour">
            {dayjs(`${index}:00`, "HH:mm").format("hh:mm a")}
          </div>
        );
      })}
    </div>
  );
};

export default DayCalendar;

/*
-780
startTime : 00:14 AM
endTime :13:14 PM
*/
