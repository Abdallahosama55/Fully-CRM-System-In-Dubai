import { useEffect, useState } from "react";
import { Checkbox, Col, Form, Input, Row, TimePicker } from "antd";

import { diffStarTimeEndTime, filterWorkingHoursObject, separateDays } from "utils/WokingHours";
import { calculateTotalHours, days } from "../utils";
import dayjs from "dayjs";

export default function WorkingTimes({ form, data, checkedDays, setCheckedDays }) {
  const [allDayChecked, setAllDayChecked] = useState(false);
  const [allDayCheckedTime, setAllDayCheckedTime] = useState([]);
  const [total, setTotal] = useState(0);

  const formWorkingTimes = Form.useWatch(`workingTimes`, form);

  useEffect(() => {
    const filterdValues = filterWorkingHoursObject(formWorkingTimes);
    const result = separateDays(filterdValues);

    const formatObj = {};

    result.forEach((day) => {
      formatObj[day.day] = {
        startTime: day.startTime,
        endTime: day.endTime,
      };
    });
    setTotal(calculateTotalHours(formatObj));
  }, [formWorkingTimes]);

  useEffect(() => {
    if (allDayChecked) {
      setCheckedDays(days);
      days.forEach((day) => {
        form.setFieldValue([`workingTimes`, `${day}Time`], allDayCheckedTime);
        form.setFieldValue([`workingTimes`, `${day}Select`], true);
        form.setFieldValue(
          [`workingTimes`, `${day}Total`],
          diffStarTimeEndTime(allDayCheckedTime[0], allDayCheckedTime[1]),
        );
      });
    }
  }, [allDayChecked, allDayCheckedTime, form]);

  useEffect(() => {
    if (data?.companyWorkingTimes?.workingTimes) {
      let days = [];

      data?.companyWorkingTimes?.workingTimes.forEach((day) => {
        days.push(day.dayName);
        const startTime = dayjs(day.daySlips?.[0]?.startTime, "HH:mm");
        const endTime = dayjs(day.daySlips?.[0]?.endTime, "HH:mm");
        form.setFieldValue(["workingTimes", `${day.dayName}Time`], [startTime, endTime]);
        form.setFieldValue(
          ["workingTimes", `${day.dayName}Select`],
          isDayDefaultChecked(day.dayName, days),
        );
        form.setFieldValue(
          [`workingTimes`, `${day.dayName}Total`],
          diffStarTimeEndTime(startTime, endTime),
        );
      });
      setCheckedDays(days);
    }
  }, [data]);

  const getDayTimeRange = (day) => {
    const dayData = data?.companyWorkingTimes?.workingTimes?.find((d) => d.dayName === day);
    if (dayData) {
      const today = dayjs();
      return [
        dayjs(today.format("YYYY-MM-DD") + dayData.daySlips?.[0]?.startTime),
        dayjs(today.format("YYYY-MM-DD") + dayData.daySlips?.[0]?.endTime),
      ];
    }
    return undefined;
  };

  const isDayDefaultChecked = (day, days) => {
    return days.includes(day);
  };

  const getInitialDayTotal = (day) => {
    const dayData = data?.companyWorkingTimes?.workingTimes?.find((d) => d.dayName === day);
    if (dayData) {
      console.log({ dayData });
      const startTime = dayData.daySlips?.[0]?.startTime;
      const endTime = dayData.daySlips?.[0]?.endTime;
      const diffHours = +endTime?.split(":")[0] - +startTime?.split(":")[0];
      const diffMin = +endTime?.split(":")[1] - +startTime?.split(":")[1];
      return `${diffHours}:${diffMin}`;
    }

    return "-";
  };

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
                  form.setFieldValue([`workingTimes`, `${day}Time`], []);
                  form.setFieldValue([`workingTimes`, `${day}Select`], false);
                  form.setFieldValue([`workingTimes`, `${day}Total`], "-");
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
      <Form.List name={`workingTimes`}>
        {() => (
          <>
            {days.map((day) => {
              return (
                <Row style={{ margin: "16px 0", width: "100%" }} key={day}>
                  <Col span={4} className="center-items">
                    <Form.Item
                      name={`${day}Select`}
                      initialValue={isDayDefaultChecked(day, checkedDays)}
                      valuePropName="checked">
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
                            form.setFieldValue([`workingTimes`, `${day}Time`], []);
                            form.setFieldValue([`workingTimes`, `${day}Total`], "-");
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
                      initialValue={getDayTimeRange(day)}
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
                            [`workingTimes`, `${day}Total`],
                            diffStarTimeEndTime(value[0], value[1]),
                          )
                        }
                        disabled={!checkedDays.includes(day)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2} className="center-items">
                    <Form.Item initialValue={getInitialDayTotal(day)} name={`${day}Total`}>
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
