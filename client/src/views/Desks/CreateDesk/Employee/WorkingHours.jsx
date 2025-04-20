import { useEffect, useState } from "react";
import { Checkbox, Col, Form, Input, Row, TimePicker } from "antd";

import { diffStarTimeEndTime, filterWorkingHoursObject, separateDays } from "utils/WokingHours";
import { calculateTotalHours } from "./utilts";

export default function WorkingHours({ form, employeeId, employeeData }) {
  const [checkedDays, setCheckedDays] = useState([]);
  const [allDayChecked, setAllDayChecked] = useState(false);
  const [allDayCheckedTime, setAllDayCheckedTime] = useState([]);
  const [total, setTotal] = useState(0);

  const employeeTime = Form.useWatch(`employee${employeeId}`, form);

  useEffect(() => {
    const filterdValues = filterWorkingHoursObject(employeeTime);
    const result = separateDays(filterdValues);

    const formatObj = {};

    result.forEach((day) => {
      formatObj[day.day] = {
        startTime: day.startTime,
        endTime: day.endTime,
      };
    });
    setTotal(calculateTotalHours(formatObj));
  }, [employeeTime]);

  useEffect(() => {
    if (allDayChecked && employeeId) {
      setCheckedDays(days);
      days.forEach((day) => {
        form.setFieldValue([`employee${employeeId}`, `${day}Time`], allDayCheckedTime);
        form.setFieldValue([`employee${employeeId}`, `${day}Select`], true);
        form.setFieldValue(
          [`employee${employeeId}`, `${day}Total`],
          diffStarTimeEndTime(allDayCheckedTime[0], allDayCheckedTime[1]),
        );
      });
    }
  }, [allDayChecked, allDayCheckedTime, employeeId, form]);

  useEffect(() => {
    if (employeeData && employeeData.length && employeeData[0].deskEmployee.workingHours) {
      let days = [];
      Object.keys(employeeData[0].deskEmployee.workingHours)?.forEach((day) => {
        days.push(day);
      });
      setCheckedDays(days);
    }
  }, [employeeData, employeeId]);

  return (
    <>
      <Row>
        <Col span={4} className="center-items">
          <Checkbox
            style={{ width: "120px" }}
            checked={allDayChecked}
            onChange={(e) => {
              setAllDayChecked(e.target.checked);
              if (e.target.checked) {
                setCheckedDays(days);
              } else {
                setCheckedDays([]);
                days.forEach((day) => {
                  form.setFieldValue([`employee${employeeId}`, `${day}Time`], []);
                  form.setFieldValue([`employee${employeeId}`, `${day}Select`], false);
                  form.setFieldValue([`employee${employeeId}`, `${day}Total`], "-");
                });
              }
            }}>
            All Days
          </Checkbox>
        </Col>
        <Col span={18} className="center-items">
          <TimePicker.RangePicker
            format="HH:mm"
            placement={"bottomRight"}
            style={{ width: "100%" }}
            allowClear={false}
            value={allDayCheckedTime}
            onChange={(e) => setAllDayCheckedTime(e)}
            disabled={!allDayChecked}
          />
        </Col>
        <Col span={2} className="center-items">
          {allDayChecked ? diffStarTimeEndTime(allDayCheckedTime[0], allDayCheckedTime[1]) : "-"}
        </Col>
      </Row>
      <Form.List name={`employee${employeeId}`}>
        {(fields) => (
          <>
            {days.map((day) => {
              return (
                <Row style={{ margin: "16px 0", width: "100%" }} key={day}>
                  <Col span={4} className="center-items">
                    <Form.Item name={`${day}Select`} valuePropName="checked">
                      <Checkbox
                        onChange={(e) => {
                          setCheckedDays((prev) => {
                            const found = prev.find((checkedDay) => checkedDay === day);
                            if (found) {
                              const filterd = prev.filter((checkedDay) => checkedDay !== day);
                              return filterd;
                            } else {
                              return [...prev, day];
                            }
                          });
                          if (!e.target.checked) {
                            form.setFieldValue([`employee${employeeId}`, `${day}Time`], []);
                            form.setFieldValue([`employee${employeeId}`, `${day}Total`], "-");
                          } else {
                          }
                        }}
                        style={{ width: "120px" }}>
                        {day}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={18} className="center-items">
                    <Form.Item
                      name={`${day}Time`}
                      className="w-100"
                      rules={[
                        {
                          required: checkedDays.includes(day) ? true : false,
                          message: "Please Add Time",
                        },
                      ]}>
                      <TimePicker.RangePicker
                        format="HH:mm"
                        placement={"bottomRight"}
                        style={{ width: "100%" }}
                        allowClear={false}
                        onChange={(value) =>
                          form.setFieldValue(
                            [`employee${employeeId}`, `${day}Total`],
                            diffStarTimeEndTime(value[0], value[1]),
                          )
                        }
                        disabled={!checkedDays.includes(day)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2} className="center-items">
                    <Form.Item initialValue={"-"} name={`${day}Total`}>
                      <Input variant="borderless" style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                </Row>
              );
            })}
          </>
        )}
      </Form.List>
      <Row className="total-working" align="middle" justify="space-between">
        <Col className="fw-500">Total Working Times:</Col>
        <Col className="fw-500">{total} Hrs</Col>
      </Row>
    </>
  );
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
