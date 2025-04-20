import { Col, Row } from "antd";
import dayjs from "dayjs";

import { getHeight, getTop } from "../utils";
import { IconlyBoldVideo } from "assets/jsx-svg";
import DropdownItems from "views/Collaboration/CallsAndMeetingsAdd/DropdownItems";
import PopoverCalendar from "components/Calendar/popover-calendar";

import "../styles.css";
import BookedMeetingService from "services/bookedMeeting.service";
import { axiosCatch } from "utils/axiosUtils";
import { useNotification } from "context/notificationContext";

function Hours({ hour, today, events, meetingsPage, setRefresh, setEvents, numberOfHours }) {
  const { openNotificationWithIcon } = useNotification();
  const confirm = async (id) => {
    try {
      await BookedMeetingService.deleteMeeting(id);
      const filterdData = Object.values(events)[0].meetings.filter((call) => call.id !== id);
      setEvents((prev) => {
        prev[dayjs(today).format("YYYY-MM-DD")].meetings = filterdData;
        return { ...prev };
      });
      openNotificationWithIcon("message", "Deleted sucessfully");
    } catch (err) {
      axiosCatch(err);
    }
  };
  return (
    <div className="hours">
      <Col className="hour" span={2}>
        <div>{hour}</div>
      </Col>
      <Col className="events" span={22}>
        <>
          {events &&
            Object.entries(events).map(([key, event], i) => (
              <div key={i}>
                {event.meetings.length >= 1 &&
                  event.meetings.map((meet, i) => (
                    <div key={i}>
                      {dayjs(key).format("YYYY MMMM D") === dayjs(today).format("YYYY MMMM D") &&
                        dayjs(`${key}T${meet.fromTime}`).format("h A") === hour &&
                        numberOfHours < 24 && (
                          <>
                            {meetingsPage ? (
                              <PopoverCalendar
                                data={meet}
                                showJoin={false}
                                date={key}
                                setRefresh={setRefresh}
                                meetingsPage={true}
                                day={true}>
                                <div
                                  className="event-container"
                                  style={{
                                    height: getHeight(meet, key),
                                    top: getTop(meet, key),
                                  }}>
                                  <div className="icon-title">
                                    <div className="icon">
                                      <IconlyBoldVideo />
                                    </div>
                                    <div>
                                      <p className="fz-14">
                                        {meet?.name ? meet?.name : "New Meet"}
                                      </p>
                                      <p className="fz-12 gc">{`${dayjs(
                                        `${key}T${meet.fromTime}`,
                                      ).format("h:m")} -${dayjs(`${key}T${meet.toTime}`).format(
                                        "h:m A",
                                      )}`}</p>
                                    </div>
                                  </div>

                                  <Row align="middle" gutter={5}>
                                    <Col>
                                      <a
                                        href={meet.meetingLink}
                                        className="join-meet"
                                        target="_blank"
                                        rel="noreferrer">
                                        Join
                                      </a>
                                    </Col>
                                    <Col>
                                      <DropdownItems
                                        id={meet.id}
                                        setRefresh={setRefresh}
                                        confirm={confirm}
                                        color={"#3A5EE3"}
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              </PopoverCalendar>
                            ) : (
                              <>
                                <div
                                  className="event-container"
                                  style={{
                                    height: getHeight(meet, key),
                                    top: getTop(meet, key),
                                  }}>
                                  <div className="icon-title">
                                    <div className="icon">
                                      <IconlyBoldVideo />
                                    </div>
                                    <div>
                                      <p className="fz-14">
                                        {meet?.name ? meet?.name : "New Meet"}
                                      </p>
                                      <p className="fz-12 gc">{`${dayjs(
                                        `${key}T${meet.fromTime}`,
                                      ).format("h:m")} -${dayjs(`${key}T${meet.toTime}`).format(
                                        "h:m A",
                                      )}`}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <a href={meet.meetingLink} target="_blank" rel="noreferrer">
                                      Join
                                    </a>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                    </div>
                  ))}
              </div>
            ))}
        </>
      </Col>
    </div>
  );
}

export default Hours;
