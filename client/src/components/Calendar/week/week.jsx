import React, { useEffect, useRef } from "react";
import { add, format, getDay, setDay, differenceInMinutes } from "date-fns";
import { Table, Row, Col, Avatar, Tooltip } from "antd";

import { getDayHoursEvents, sizeEventBox, MIN_BOX_SIZE } from "./utils";
import dayjs from "dayjs";
import PopoverCalendar from "../popover-calendar";
import DropdownItems from "views/Collaboration/CallsAndMeetingsAdd/DropdownItems";
import BookedMeetingService from "services/bookedMeeting.service";
import { axiosCatch } from "utils/axiosUtils";
import Typography from "antd/es/typography/Typography";
import { useNotification } from "context/notificationContext";

const BOX_POSITION_OFFSET = 26;
const SCROLL_TO_ROW = 19;
const ALL_DAY_ROW = 0;

const EventBlock = ({ event, index, hour, meetingsPage, setEvents, setRefresh, id }) => {
  const { openNotificationWithIcon } = useNotification();
  const getEventDay = getDay(new Date(event.endTime));
  const fitHourToDate = setDay(hour, getEventDay);

  const boxStyle = event.allDay
    ? { boxSize: MIN_BOX_SIZE, boxPosition: index * BOX_POSITION_OFFSET }
    : sizeEventBox(event, fitHourToDate);
  const confirm = async (id) => {
    try {
      await BookedMeetingService.deleteMeeting(id);
      setEvents((prev) => prev.filter((meet) => meet.eventId !== id));
      openNotificationWithIcon("success", "Deleted sucessfully");
    } catch (err) {
      axiosCatch(err);
    }
  };

  return (
    <PopoverCalendar
      data={event}
      meetingsPage={meetingsPage}
      showJoin={true}
      setRefresh={setRefresh}>
      <div
        className="event-block"
        style={{
          display:
            !event.allDay && differenceInMinutes(new Date(event.endTime), fitHourToDate) === 0
              ? "none"
              : "block",
          top: boxStyle.boxPosition + "%",
          backgroundColor: event.backgroundColor ? event.backgroundColor : "#3A5EE31F",
        }}
        key={index}>
        <Row align="middle" justify={"space-between"}>
          <Col>
            <p className="event-title">{event.title}</p>
          </Col>
          {meetingsPage && (
            <Col>
              <DropdownItems setRefresh={setRefresh} id={id} confirm={confirm} width={10} />
            </Col>
          )}
        </Row>

        <p className="event-time">{`${dayjs(event.startTime).format("h:mm")} - ${dayjs(
          event.endTime,
        ).format("h:mm A")}`}</p>
        {meetingsPage && (
          <Row align="middle" justify={"space-between"}>
            <Col>
              {event.invites && (
                <Avatar.Group
                  maxCount={3}
                  size={14}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                  {event.invites.map((invite) => (
                    <Tooltip title={invite} placement="top">
                      <Avatar size={14} icon={<div>{invite.slice(0, 2)}</div>} />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              )}
            </Col>
            <Col>
              <a
                href={event.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="fz-10 fw-500 clickable"
                style={{ color: "#3A5EE3" }}>
                join
              </a>
            </Col>
          </Row>
        )}
      </div>
    </PopoverCalendar>
  );
};

function Calendar({
  weekDates,
  getDayEvents,
  onEventClick,
  weekends,
  meetingsPage,
  setEvents,
  setRefresh,
}) {
  const rowRef = useRef(null);
  useEffect(() => {
    if (rowRef.current) {
      rowRef.current?.scrollIntoView();
    }
  }, [rowRef]);

  const dayList = weekends
    ? ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const dayColumns = dayList.map((day, counter) => {
    const columnDate = add(new Date(weekDates.startDate), {
      days: counter,
    });
    const formattedDayandMonth = format(columnDate, "iii") + " " + format(columnDate, "dd");

    return {
      title: (
        <div
          className={`${
            dayjs(columnDate).format("YYYY MMMM D") === dayjs().format("YYYY MMMM D") &&
            "header-week"
          }`}>
          {formattedDayandMonth}
        </div>
      ),
      dataIndex: day,
      key: day,
      width: 2,

      render: function (events, row) {
        if (events && events.length > 0 && events instanceof Array) {
          const eventsBlock = events.map(function (event, index) {
            return (
              <EventBlock
                key={event.eventId}
                id={event.eventId}
                event={event}
                index={index}
                hour={row.hourObject}
                setEvents={setEvents}
                setRefresh={setRefresh}
                events={events.length}
                onEventClick={onEventClick}
                meetingsPage={meetingsPage}
              />
            );
          });

          return {
            props: {
              style: {
                position: "relative",
                padding: "0",
              },
            },
            children: <>{eventsBlock}</>,
          };
        }
        return undefined;
      },
    };
  });
  const hourColumn = {
    title: (
      <Tooltip title={"GMT+03"} placement="top">
        <Typography.Text ellipsis>GMT+03</Typography.Text>
      </Tooltip>
    ),
    dataIndex: "hour",
    key: "hour",
    width: 1.3,

    onCell: (hour, id) => {
      return {
        props: {
          style: { width: "10%", backgroundColor: "#fafafb", fontWeight: 500 },
        },
        children:
          SCROLL_TO_ROW === id ? (
            <Tooltip title={hour} placement="top">
              <Typography.Text ref={rowRef} ellipsis>
                {hour}
              </Typography.Text>
            </Tooltip>
          ) : (
            <Tooltip title={hour} placement="top">
              <Typography.Text ellipsis>{hour}</Typography.Text>
            </Tooltip>
          ),
      };
    },
  };
  const tableColumns = [hourColumn, ...dayColumns];

  return (
    <div>
      <Table
        rowClassName="custom-row"
        rowKey={(record) => record.id}
        dataSource={getDayHoursEvents(weekDates, getDayEvents)}
        columns={tableColumns}
        pagination={false}
        bordered={true}
        showHeader={true}
        onRow={(_, rowIndex) => {
          if (rowIndex === ALL_DAY_ROW) {
            return {
              style: {
                backgroundColor: "white",
                zIndex: 1,
                top: 0,
              },
            };
          }
          return {};
        }}
        scroll={{
          y: 1000,
        }}
      />
    </div>
  );
}

export default Calendar;
