import { useState } from "react";
import DeskCardButton from "components/common/DeskCardButton";
import { Col, Form, Row, Select, Switch, TimePicker } from "antd";
import useRerender from "hooks/useRerender";

// constant
import allTimezones from "constants/TIME_ZONES";
// icons
import { DateSVG } from "assets/jsx-svg";
// style
import "./styles.css";

const WEEK_DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DesksAndWorkingTimes = ({ desksCards, form }) => {
  const [activeDeskId, setActiveDeskId] = useState();
  const rerender = useRerender();

  const flipAll = (checkValue) => {
    const values = form.getFieldValue(["desks", activeDeskId]);
    if (values) {
      WEEK_DAYS.forEach((day) => {
        values[day] = { ...values[day], isActive: checkValue };
      });
      form.setFieldValue(["desks", activeDeskId], { ...values });
      rerender();
    }
  };

  return (
    <div className="desks_and_working_times">
      <div className="desks">
        {desksCards?.map((desk, index) => (
          <DeskCardButton
            key={index}
            onClick={() => setActiveDeskId(desk.id)}
            isActive={activeDeskId === desk.id}
            name={desk.name}
            image={desk.image}
          />
        ))}
      </div>
      <div className="space-between enable_all">
        <div>
          <p className="fz-14">Enable</p>
          <p className="fz-12 gc">
            Quickly enable or disable business hours at{" "}
            <span className="bc">"{desksCards?.find((el) => el.id === activeDeskId)?.name}"</span>{" "}
            desk
          </p>
        </div>
        <Switch defaultChecked onChange={flipAll} />
      </div>

      <div className="time_zone">
        <Row>
          <Col span={8}>
            <p className="fz-14 time_zone_label">Time Zone</p>
          </Col>
          <Col span={16}>
            <Form.Item name={["desks", activeDeskId, "time_zone"]}>
              <Select
                showSearch
                options={allTimezones.map((el) => ({ value: el, label: el }))}
                style={{ width: "100%" }}
                placeholder="Select timezone"
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="days_board">
        {WEEK_DAYS.map((day) => {
          return (
            <Row key={day}>
              <Col span={8}>
                <div className="day_switch">
                  <Form.Item
                    valuePropName="checked"
                    name={["desks", activeDeskId, day, "isActive"]}>
                    <Switch onChange={rerender} />
                  </Form.Item>
                  <div>{day}</div>
                </div>
              </Col>

              {form.getFieldValue(["desks", activeDeskId, day, "isActive"]) ? (
                <Col span={16}>
                  <Form.Item name={["desks", activeDeskId, day, "time"]}>
                    <TimePicker.RangePicker className="w-100" format={"h:mm a"} />
                  </Form.Item>
                </Col>
              ) : (
                <Col span={16}>
                  <div className="holiday">
                    <DateSVG /> Holiday
                  </div>
                </Col>
              )}
            </Row>
          );
        })}
      </div>
    </div>
  );
};

export default DesksAndWorkingTimes;
