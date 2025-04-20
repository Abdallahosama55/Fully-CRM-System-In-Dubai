import { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./styles.css";
import { Modal, Typography } from "antd";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import { corvetDateTimeToTimeZone, dayjs, getDateTimeToTimeZone } from "utils/time";
import useGetMeetings from "services/calendar/Querys/useGetMeetings";
import PopoverCalendar from "../popover-calendar";
import Box from "components/Box";
import LoadingPage from "components/common/LoadingPage";
import { invertHex } from "utils/color-picker";
import { useDrawer } from "hooks/useDrawer";

const EventItem = ({ info }) => {
  const {
    event: { title, extendedProps, start, end, id, backgroundColor },
  } = info;
  console.log("extendedProps", extendedProps);

  return (
    <PopoverCalendar
      data={{
        ...extendedProps,
        id: id,
        title,
        time: dayjs(start).format("HH:mm A") + " " + dayjs(end).format("HH:mm A"),
      }}
      showJoin={true}>
      <Typography.Text
        style={{
          paddingInline: "2px",
          borderRadius: "2px",
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

const Week = ({ setCurrentDate, today, selectedDesk }) => {
  const { confirm } = Modal;
  const DrawerAPI = useDrawer();
  const calendarRef = useRef(null);
  const { data, isLoading } = useGetMeetings(
    {
      deskId: selectedDesk === "all" ? undefined : selectedDesk,
      type: "week",
      date: today,
    },
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
            editable: false,
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
            backgroundColor: item?.meetingColor ?? "#3a5ee3",
            fullDate: item.date,
            color: item?.meetingColor ?? "#3a5ee3",
          };
        });
      },
    },
  );
  const handleSelect = (info) => {
    const { start, end } = info;

    confirm({
      centered: true,
      okText: "Yes, Sure",
      cancelText: "No",
      content: (
        <div>
          Do you agree to create a new meeting from{" "}
          <strong>{dayjs(start).format("DD/MM hh:mm A")}</strong> to{" "}
          <strong>{dayjs(end).format("DD/MM hh:mm A")}</strong> ?
        </div>
      ),
      onOk: () => {
        DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd startDate={start} endDate={end} DrawerAPI={DrawerAPI}/>);
        DrawerAPI.open("40%");
      },
    });
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

  const handleDateClick = (arg) => {
    setCurrentDate(arg.date);
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
      calendarApi.setOption("selectable", true);
      calendarApi.setOption("selectAllow", function (selectInfo) {
        const selectedStartDate = selectInfo.start;
        const selectedEndDate = selectInfo.end;

        // Check if the selected range spans only one day
        return selectedStartDate.getUTCDay() === selectedEndDate.getUTCDay();
      });
      calendarApi.on("dayRender", dayRenderHandler);
      return () => {
        calendarApi.off("dayRender", dayRenderHandler);
      };
    }
  }, []);

  return (
    <div className="week">
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
        editable
        headerToolbar={false}
        events={data}
        select={handleSelect}
        dateClick={handleDateClick}
        eventContent={(info) => <EventItem info={info} />}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" // Show only weekly view
        height="auto"
        // slotMinTime="06:00:00"
        slotMaxTime="24:00:00"
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
        eventClick={(info) => console.log("$$  sda", info.event)} // Handle event click
      />
    </div>
  );
};

export default Week;
