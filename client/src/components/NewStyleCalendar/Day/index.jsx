import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./styles.css";
import useGetMeetings from "services/calendar/Querys/useGetMeetings";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import { Modal, Typography } from "antd";

import PopoverCalendar from "../popover-calendar";
import LoadingPage from "components/common/LoadingPage";
import Box from "components/Box";
import { invertHex } from "utils/color-picker";
import { corvetDateTimeToTimeZone, dayjs, getDateTimeToTimeZone } from "utils/time";
import { useDrawer } from "hooks/useDrawer";
const EventItem = ({ info }) => {
  const {
    event: { title, extendedProps, start, end, id, backgroundColor },
  } = info;

  return (
    <PopoverCalendar
      // refetch={refetch}
      data={{
        ...extendedProps,
        time: dayjs(start).format("HH:mm A") + " " + dayjs(end).format("HH:mm A"),
        id,
        title: title,
      }}
      showJoin={true}>
      <Typography.Text
        style={{
          color: `${invertHex(backgroundColor)}`,

          fontSize: "12px",
          height: "100%",
          width: "100%",
        }}
        ellipsis>
        {title}
      </Typography.Text>
    </PopoverCalendar>
  );
};

const Day = ({ calendarRef, setCurrentDate, today, selectedDesk }) => {
  const { confirm } = Modal;
  const DrawerAPI = useDrawer();

  const { data, isLoading } = useGetMeetings(
    {
      type: "day",
      date: dayjs(today).format("YYYY-MM-DD"),
      deskId: selectedDesk === "all" ? undefined : selectedDesk,
    },
    {
      select: (data) => {
        const newEvents = data?.data?.data.rows?.[
          `${dayjs(today).format("YYYY-MM-DD")}`
        ]?.meetings.map((meeting) => {
          const start = getDateTimeToTimeZone(meeting.date, localStorage.getItem("time-zone"));
          const end = start.add(meeting.durationInMinutes, "minute");
          // Convert duration to milliseconds

          return {
            editable: false,
            ...meeting,
            backgroundColor: meeting?.meetingColor ?? "#3a5ee3",
            color: meeting?.meetingColor ?? "#3a5ee3",
            fullDate: meeting.date,
            start: corvetDateTimeToTimeZone(
              meeting.date,
              localStorage.getItem("time-zone"),
              "YYYY-MM-DDTHH:mm:ss",
            ),
            end: corvetDateTimeToTimeZone(
              end,
              localStorage.getItem("time-zone"),
              "YYYY-MM-DDTHH:mm:ss",
            ),
          };
        });

        return newEvents;
      },
    },
  );

  const moveToSpecificDate = (date) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(date);
    }
  };

  useEffect(() => {
    if (today) {
      moveToSpecificDate(dayjs(today).format("YYYY-MM-DD"));
    }
  }, [today]);

  const handleSelect = (info) => {
    const { start, end } = info;

    confirm({
      centered: true,
      okText: "Yes, Sure",
      cancelText: "No",
      content: (
        <Typography.Text>
          Do you agree to create a new meeting from
          <Typography.Text strong style={{ margin: "5px" }}>
            {dayjs(start).format("hh:mm A")}
          </Typography.Text>
          to
          <Typography.Text strong style={{ margin: "5px" }}>
            {dayjs(end).format("hh:mm A")}
          </Typography.Text>
          ?
        </Typography.Text>
      ),
      onOk: () => {
        DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd startDate={start} endDate={end} DrawerAPI={DrawerAPI}/>);
        DrawerAPI.open("40%");
      },
    });
  };

  const handleDateClick = (arg) => {
    setCurrentDate(arg.date);
  };

  return (
    <div className="day">
      {DrawerAPI.Render}
      {isLoading && (
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              zIndex: 212,
              width: "100%",
              "& .center-items": {
                background: "#ffffff4a !important",
              },
            }}>
            <LoadingPage></LoadingPage>
          </Box>
        </Box>
      )}
      <FullCalendar
        ref={calendarRef}
        editable={false}
        headerToolbar={false}
        handleWindowResize
        lazyFetching={true}
        events={data}
        select={handleSelect}
        dateClick={handleDateClick}
        eventContent={(info) => <EventItem info={info} />}
        plugins={[timeGridPlugin, interactionPlugin]}
        views={{
          dayGrid: {
            editable: false,
            day: "2-digit",
            month: "short",
            year: "numeric",
          },
        }}
        initialView="timeGridDay"
        slotMaxTime="24:00:00"
        height="auto"
        dayMaxEvents={true} // Show "more" link when too many events
        dayMaxEventRows={2} // Limit number of event rows
        selectable={true} // Allow selection
        eventResizableFromStart={true} // Allow resize from start
        eventDurationEditable={true} // Allow event duration editing
        allDaySlot={true} // Hide all-day slot
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: true,
        }} // Format slot labels
        slotLabelInterval={{ hours: 1 }} // Set slot label interval
        slotDuration="00:30:00" // Set slot duration
        slotEventOverlap={false} // Prevent events from overlapping
        selectMirror={true} // Show mirror when selecting
        selectOverlap={false} // Prevent selecting overlapping events
        selectMinDistance={10} // Set minimum distance for selecting
        nowIndicator={true} // Show current time indicator
        navLinks={true} // Allow navigation to URLs
        // eventClick={(info) => console.log("$$  sda", info.event.title)} // Handle event click
      />
    </div>
  );
};

export default Day;
