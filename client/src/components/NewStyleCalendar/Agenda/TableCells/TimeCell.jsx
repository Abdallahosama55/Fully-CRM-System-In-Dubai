import { Tooltip } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import ReactTimeAgo from "react-timeago";

const TimeCell = ({ record }) => {
  const dateRangeTooltipContent = useMemo(() => {
    const eventDate = dayjs(record.date).tz(localStorage.getItem("time-zone"));
    const formattedDate = eventDate.format("h:mm A");
    const endDate = eventDate.add(record.durationInMinutes, "minutes");
    const formattedEndDate = endDate.format("h:mm A");

    return <div style={{ color: "#000" }}>{`${formattedDate} - ${formattedEndDate}`}</div>;
  }, [record.date, record.durationInMinutes]);

  return (
    <Tooltip title={dateRangeTooltipContent} color="#FFF">
      <ReactTimeAgo date={record.date} />
    </Tooltip>
  );
};

export default TimeCell;
