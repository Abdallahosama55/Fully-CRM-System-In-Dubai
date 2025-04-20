import { Calendar, Col, Row } from "antd";

import "./styles.css";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";
import CalendarService from "services/calendar.service";

function Year({ today, refresh }) {
  const [months] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await CalendarService.getData("year", today);
      setEvents(res.data.data);
    })();
  }, [today, refresh]);

  const cellRender = (current, info) => {
    return (
      <>
        {events &&
          Object.entries(events)?.map(([key, event], i) => (
            <Fragment key={i}>
              {event?.meetings?.map((meet, j) => (
                <Fragment key={j}>
                  {dayjs(key).format("YYYY MMMM DD") === dayjs(current).format("YYYY MMMM DD") && (
                    <div className="current" style={{ right: j * 6 }}></div>
                  )}
                </Fragment>
              ))}
            </Fragment>
          ))}
      </>
    );
  };

  return (
    <div className="year">
      <Row className="row" gutter={16} justify="space-around">
        {months?.map((month, i) => (
          <Col key={i}>
            <div className="col" onClick={() => console.log("clicked")}>
              <Calendar
                cellRender={cellRender}
                value={dayjs(today).month(month)}
                headerRender={() => {
                  return (
                    <div className="head fz-14 fw-600">
                      {dayjs(today).month(month).format("MMMM")}
                    </div>
                  );
                }}
                fullscreen={false}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Year;
