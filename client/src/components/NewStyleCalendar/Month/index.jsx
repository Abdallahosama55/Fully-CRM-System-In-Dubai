import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./styles.css";
import useGetMeetings from "services/calendar/Querys/useGetMeetings";
import dayjs from "dayjs";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import { Modal, Typography } from "antd";
import PopoverCalendar from "../popover-calendar";
import Box from "components/Box";
import LoadingPage from "components/common/LoadingPage";
import { invertHex } from "utils/color-picker";
import { corvetDateTimeToTimeZone, getDateTimeToTimeZone } from "utils/time";
import { useDrawer } from "hooks/useDrawer";

const EventItem = ({ info }) => {
  const {
    event: { title, extendedProps, start, end, id, backgroundColor },
  } = info;

  return (
    <PopoverCalendar
      id={id}
      data={{
        ...extendedProps,
        title,
        id,
        time: dayjs(start).format("HH:mm A") + " " + dayjs(end).format("HH:mm A"),
      }}
      showJoin={true}>
      <Typography.Text
        style={{
          paddingInline: "2px",
          borderRadius: "2px",
          color: `${invertHex(
            backgroundColor === "null" ? "#3a5ee3" : backgroundColor ?? "#3a5ee3",
          )}`,
          background: `${backgroundColor === "null" ? "#3a5ee3" : backgroundColor ?? "#3a5ee3"}`,
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
const { confirm } = Modal;
const Month = ({ setCurrentDate, today, selectedDesk }) => {
  const DrawerAPI = useDrawer();
  const calendarRef = useRef(null);
  const { data, isLoading, refetch } = useGetMeetings(
    { type: "month", date: today, deskId: selectedDesk === "all" ? undefined : selectedDesk },
    {
      select: (data) => {
        //  data.data.data.rows.reduce(()=>)
        const allMeetingsArray = Object.values(data.data.data.rows).reduce((acc, { meetings }) => {
          acc.push(...meetings);
          return acc;
        }, []);

        return allMeetingsArray.map((item) => {
          const start = getDateTimeToTimeZone(item.date, localStorage.getItem("time-zone"));

          const end = new Date(start.add(item.durationInMinutes, "minute"));
          return {
            ...item,
            fullDate: item.date,
            meetingColor: item?.meetingColor ?? "#3a5ee3",
            backgroundColor: item?.meetingColor,

            start: corvetDateTimeToTimeZone(
              item.date,
              localStorage.getItem("time-zone"),
              "YYYY-MM-DDTHH:mm:ss",
            ),
            end: corvetDateTimeToTimeZone(
              end,
              localStorage.getItem("time-zone"),
              "YYYY-MM-DDTHH:mm:ss",
            ),
            color: item?.meetingColor ?? "#3a5ee3",
          };
        });
      },
    },
  );
  const handleSelect = (info) => {
    const { start, end } = info;

    // const eventNamePrompt = prompt("Enter event name");
    // if (eventNamePrompt) {
    //   setEvents([
    //     ...events,
    //     {
    //       start,
    //       end,
    //       title: eventNamePrompt,
    //       id: uuid(),
    //     },
    //   ]);
    // }
  };
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
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const dayRenderHandler = (info) => {
        if (info.date.getDate() === calendarApi.getDate().getDate()) {
          const dayCell = info.el;
          dayCell.style.backgroundColor = "green"; // Set background color to green
        }
      };

      calendarApi.on("dayRender", dayRenderHandler);
      return () => {
        calendarApi.off("dayRender", dayRenderHandler);
      };
    }
  }, []);
  const handleDateClick = (arg) => {
    confirm({
      centered: true,
      okText: "Yes, Sure",
      cancelText: "No",
      content: (
        <div>
          Do you agree to create a new meeting from{" "}
          <strong>{dayjs(arg.date).format("DD/MM ")}</strong> to{" "}
          <strong>{dayjs(arg.date).add(30, "minutes").format("DD/MM ")}</strong> ?
        </div>
      ),
      onOk: () => {
        DrawerAPI.setDrawerContent(
          <CallsAndMeetingsAdd startDate={arg.date} endDate={dayjs(arg.date).add(30, "minutes")} DrawerAPI={DrawerAPI}/>,
        );
        DrawerAPI.open("40%");
      },
    });
    setCurrentDate(arg.date);
  };
  return (
    <div className="month">
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
            <LoadingPage />
          </Box>
        </Box>
      )}
      <FullCalendar
        loading={isLoading}
        ref={calendarRef}
        editable={false}
        headerToolbar={false}
        events={{
          events: data,
        }}
        select={handleSelect}
        dateClick={handleDateClick}
        eventContent={(info) => <EventItem info={info} />}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Set initial view to monthly
        height="auto"
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        dayMaxEvents={true} // Show "more" link when too many events
        dayMaxEventRows={4} // Limit number of event rows
        selectable={false} // Allow selection
        eventResizableFromStart={false} // Allow resize from start
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
        eventClick={(info) => console.log("$$  sda", info.event)} // Handle event click
      />
    </div>
  );
};

export default Month;
