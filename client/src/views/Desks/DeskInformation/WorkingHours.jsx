import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, TimePicker } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { diffStarTimeEndTime } from "utils/WokingHours";
import { axiosCatch } from "utils/axiosUtils";

export default function WorkingHours({ form, employeeId, loading, setIsEdit, workingHours }) {
  const [checkedDays, setCheckedDays] = useState([]);
  const [allDayChecked, setAllDayChecked] = useState(false);
  const [fetchloading, setFetchLoading] = useState(false);
  const [allDayCheckedTime, setAllDayCheckedTime] = useState([]);
  useEffect(() => {
    if (allDayChecked) {
      setCheckedDays(days);
      days.forEach((day) => {
        form.setFieldValue(`${day}Time`, allDayCheckedTime);
        form.setFieldValue(`${day}Select`, true);
        form.setFieldValue(
          `${day}Total`,
          diffStarTimeEndTime(allDayCheckedTime[0], allDayCheckedTime[1]),
        );
      });
    }
  }, [allDayChecked, allDayCheckedTime, form]);

  useEffect(() => {
    if (employeeId) {
      (async () => {
        try {
          setIsEdit(true);
          const days = [];
          for (const [key, value] of Object.entries(workingHours)) {
            form.setFieldValue(`${key}Time`, [
              dayjs(value.startTime, "HH:mm"),
              dayjs(value.endTime, "HH:mm"),
            ]);
            form.setFieldValue(`${key}Select`, true);
            form.setFieldValue(
              `${key}Total`,
              diffStarTimeEndTime(dayjs(value.startTime, "HH:mm"), dayjs(value.endTime, "HH:mm")),
            );
            days.push(key);
          }
          setCheckedDays(days);
        } catch (err) {
          axiosCatch(err);
        } finally {
          setFetchLoading(false);
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  return (
    <>
      {fetchloading ? (
        <Row justify="center" align="middle" style={{ height: "336px" }}>
          <LoadingOutlined />
        </Row>
      ) : (
        <>
          <Row style={{ padding: "16px 0" }}>
            <Col span={6} className="center-items">
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
                      form.setFieldValue(`${day}Time`, []);
                      form.setFieldValue(`${day}Select`, false);
                      form.setFieldValue(`${day}Total`, "-");
                    });
                  }
                }}>
                All Days
              </Checkbox>
            </Col>
            <Col span={14} className="center-items">
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
            <Col span={4} className="center-items">
              {allDayChecked
                ? diffStarTimeEndTime(allDayCheckedTime[0], allDayCheckedTime[1])
                : "-"}
            </Col>
          </Row>
          {days.map((day, i) => {
            return (
              <Row
                style={{
                  padding: "16px 0",
                  width: "100%",
                  borderRadius: i % 2 === 0 && "12px",
                  backgroundColor: i % 2 === 0 && "#FBFBFD",
                }}
                key={day}>
                <Col span={6} className="center-items">
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
                          form.setFieldValue(`${day}Time`, []);
                          form.setFieldValue(`${day}Total`, "-");
                        } else {
                        }
                      }}
                      style={{ width: "120px" }}>
                      {day}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={14} className="center-items">
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
                        form.setFieldValue(`${day}Total`, diffStarTimeEndTime(value[0], value[1]))
                      }
                      disabled={!checkedDays.includes(day)}
                    />
                  </Form.Item>
                </Col>
                <Col span={4} className="center-items">
                  <Form.Item initialValue={"-"} name={`${day}Total`}>
                    <Input variant="borderless" style={{ textAlign: "center" }} />
                  </Form.Item>
                </Col>
              </Row>
            );
          })}
        </>
      )}

      <Row justify="end" style={{ marginTop: "2rem" }}>
        <Col>
          <Row align="middle" gutter={[16, 16]}>
            <Col>
              <Button type="ghost" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Form.Item noStyle>
                <Button htmlType="submit" type="primary" loading={loading}>
                  Edit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
