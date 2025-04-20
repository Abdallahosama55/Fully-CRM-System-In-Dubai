import { useState } from "react";
import dayjs from "dayjs";
import { Calendar, Skeleton, Typography, message } from "antd";
import useGetSessionById from "services/travel/experiance/AvailabilityTab/Querys/useGetSessionById";
import CustomButton from "components/common/Button";
import DayCalendar from "../DayCalendar";
import { REPEAT_TYPES } from "constants/EXPERIENCE";
import { BackArrow } from "assets/jsx-svg";
// style
import "./styles.css";

const ViewSession = ({ sessionId, back }) => {
  const [selectedDay, setSelectedDay] = useState([]);
  const {
    data: sessionData,
    isError,
    isPending: isLoading,
    isFetching,
    error,
  } = useGetSessionById(sessionId, { initialData: [] });

  if (isError) {
    message.error(error.message);
  }

  const isDateInSessionRange = (current, range) => {
    if (
      (dayjs(current).isAfter(dayjs(range?.fromDate)) &&
        dayjs(current).isBefore(dayjs(range?.toDate))) ||
      dayjs(current).isSame(dayjs(range?.toDate), "day") ||
      dayjs(current).isSame(dayjs(range?.fromDate), "day")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isDateInAnyRange = (current) => {
    let temp = false;

    sessionData.forEach((range) => {
      if (!temp) {
        temp = isDateInSessionRange(current, range);
      }
    });

    return temp;
  };

  const cellRender = (current, info) => {
    if (info.type === "date") {
      return isDateInAnyRange(current) ? (
        <div
          className="date_in_range"
          onClick={() => {
            const dayRanges = sessionData.filter((range) => isDateInSessionRange(current, range));
            if (dayRanges[0]?.repeatType === REPEAT_TYPES.HOURLY) {
              setSelectedDay(dayRanges);
            }
          }}
        />
      ) : null;
    }

    return info.originNode;
  };

  if (isLoading || isFetching) {
    return <Skeleton active />;
  }

  if (selectedDay.length > 0) {
    return (
      <div>
        <div className="space-between mb-1">
          <CustomButton size="small" icon={<BackArrow />} onClick={() => setSelectedDay([])}>
            Back
          </CustomButton>
          <p className="fz-18">{dayjs(selectedDay[0].fromDate).format("YYYY-MM-DD")}</p>
        </div>
        <DayCalendar sessions={selectedDay} />
      </div>
    );
  }

  return (
    <div className="view_session">
      <div className="space-between">
        <CustomButton size="small" icon={<BackArrow />} onClick={back}>
          Back
        </CustomButton>
        {sessionData[0]?.repeatType !== REPEAT_TYPES.HOURLY && (
          <Typography.Title level={5}>
            Time range: {dayjs(sessionData[0]?.startTime, "hh:mm:ss").format("hh:mm A")} -{" "}
            {dayjs(sessionData[0]?.endTime, "hh:mm:ss").format("hh:mm A")}
          </Typography.Title>
        )}
      </div>
      <Calendar cellRender={cellRender} headerRender={() => { }} />
    </div>
  );
};

export default ViewSession;
