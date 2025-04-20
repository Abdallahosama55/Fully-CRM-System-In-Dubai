import PopoverCalendar from "components/Calendar/popover-calendar";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { Row, Col } from "antd";
import DropdownItems from "views/Collaboration/CallsAndMeetingsAdd/DropdownItems";
import BookedMeetingService from "services/bookedMeeting.service";
import { axiosCatch } from "utils/axiosUtils";
import { useNotification } from "context/notificationContext";

function MonthMeet({ events, current, setEvents, meetingsPage, setRefresh }) {
  const { openNotificationWithIcon } = useNotification();
  const confirm = async (id) => {
    try {
      await BookedMeetingService.deleteMeeting(id);
      setEvents((prev) => {
        const obj = {};
        for (const dateKey in prev) {
          const dateData = prev[dateKey];
          if ("meetings" in dateData) {
            dateData.meetings = dateData.meetings.filter((meeting) => meeting.id !== id);
            obj[dateKey] = { meetings: dateData.meetings };
          }
        }
        return obj;
      });
      openNotificationWithIcon("success", "Deleted successfully");
    } catch (err) {
      axiosCatch(err);
    }
  };
  return (
    <>
      {events &&
        Object.entries(events)?.map(([key, event], i) => (
          <Fragment key={i}>
            {event?.meetings?.map((meet, j) => (
              <Fragment key={j}>
                {dayjs(key).format("YYYY MMMM DD") === dayjs(current).format("YYYY MMMM DD") && (
                  <PopoverCalendar
                    meetingsPage={meetingsPage}
                    data={meet}
                    date={key}
                    setRefresh={setRefresh}>
                    <div key={i} className="current">
                      <Row
                        style={{ margin: 0 }}
                        align="middle"
                        justify="space-between"
                        gutter={5}
                        wrap={false}>
                        <Col>
                          <div style={{ overflow: "auto" }} className="fz-10">
                            {meet.name ? meet.name : "new Meeting"}
                          </div>
                        </Col>
                        {meetingsPage && (
                          <Col>
                            <DropdownItems
                              id={meet.id}
                              setRefresh={setRefresh}
                              confirm={confirm}
                              width={10}
                              color={"#3A5EE3"}
                            />
                          </Col>
                        )}
                      </Row>
                    </div>
                  </PopoverCalendar>
                )}
              </Fragment>
            ))}
          </Fragment>
        ))}
    </>
  );
}

export default MonthMeet;
