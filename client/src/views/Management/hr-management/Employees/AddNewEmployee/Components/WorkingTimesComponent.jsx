import React, { useEffect, useState } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import DeleteSVG from "../../../../../../assets/jsx-svg/Delete";
import AddSVG from "../../../../../../assets/jsx-svg/Add";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Checkbox } from "antd";

export default function WorkingTimesComponent({ items, setItems }) {
  const DefaultStartTime = "07:00";
  const DefaultEndTime = "10:00";
  const Days_FO = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const difaultWorkingHours = [
    {
      id: 1,
      isChecked: false,
      dayName: Days_FO[0],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 2,
      isChecked: false,
      dayName: Days_FO[1],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 3,
      isChecked: false,
      dayName: Days_FO[2],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 4,
      isChecked: false,
      dayName: Days_FO[3],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 5,
      isChecked: false,
      dayName: Days_FO[4],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 6,
      isChecked: false,
      dayName: Days_FO[5],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 7,
      isChecked: false,
      dayName: Days_FO[6],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
  ];

  function getTimeDifference(startTime, endTime) {
    var d1 = new Date("March 13, 08 " + startTime);
    var d2 = new Date("March 13, 08 " + endTime);
    var d3 = new Date(d2 - d1);

    var hour = (d3.getHours() - 2).toString();
    var minute = d3.getMinutes().toString();

    if (hour.length === 1) {
      hour = "0" + hour;
    }
    if (minute.length === 1) {
      minute = "0" + minute;
    }
    var noOfHours = hour + ":" + minute;
    // return endTimeNo - startTimeNo;
    noOfHours = noOfHours.includes("-") ? "Non" : noOfHours;
    if (d3.getHours() - 2 == 0 && d3.getMinutes() < 30) noOfHours = "Non";
    return noOfHours;
  }
  const format = "HH:mm";
  function startTime(time, timeString, itemId, slipId) {
    const itemToEdit = items.filter((item) => item.id == itemId)[0];

    const newDaySlips = itemToEdit.daySlips.map((daySlip) => {
      if (daySlip.slipId == slipId) {
        return {
          ...daySlip,
          startTime: timeString,
          noHours: getTimeDifference(timeString, daySlip.endTime),
        };
      } else {
        return daySlip;
      }
    });

    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            daySlips: newDaySlips,
          };
        } else {
          return {
            ...item,
          };
        }
      }),
    );
  }
  const addDaySlip = (itemId) => {
    const newDaySlips = {
      slipId: uuidv4(),
      startTime: DefaultStartTime,
      endTime: DefaultEndTime,
      noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
    };
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            daySlips: [...item.daySlips, newDaySlips],
          };
        } else {
          return {
            ...item,
          };
        }
      }),
    );
  };
  const romveDaySlip = (itemId, daySlipId) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            daySlips: item.daySlips.filter((daySlip) => daySlip.slipId != daySlipId),
          };
        } else {
          return {
            ...item,
          };
        }
      }),
    );
  };
  function endTime(time, timeString, itemId, slipId) {
    // console.log("Time111111" + time);
    // console.log("Time222222" + time.format("HH:mm"));

    const itemToEdit = items.filter((item) => item.id == itemId)[0];

    const newDaySlips = itemToEdit.daySlips.map((daySlip) => {
      if (daySlip.slipId == slipId) {
        return {
          ...daySlip,
          endTime: timeString,
          noHours: getTimeDifference(daySlip.startTime, timeString),
        };
      } else {
        return daySlip;
      }
    });
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            daySlips: newDaySlips,
          };
        } else {
          return {
            ...item,
          };
        }
      }),
    );
  }
  const [SelectAll, setSelectAll] = useState(false);
  // const [items, setItems] = useState(difaultWorkingHours);

  useEffect(() => {
    setItems(items?.length > 0 ? items : difaultWorkingHours);
    if (items.filter((item) => item.isChecked).length == 7) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, []);
  function handelSelectAll(e) {
    var newItems = items.map((item) => {
      return {
        ...item,
        isChecked: e.target.checked,
      };
    });
    setItems(newItems);
    setSelectAll(!SelectAll);
  }
  function handelCheckbox(e, itemIndex) {
    //check if the number of checed elemnt =6 and the given elemnt is checked then make sellect all checked
    if (items.filter((item) => item.isChecked).length == items.length - 1 && e.target.checked) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
    setItems(
      items.map((item, index) => {
        if (index === itemIndex) {
          return {
            ...item,
            isChecked: e.target.checked,
          };
        } else {
          return { ...item };
        }
      }),
    );
  }

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledEndDateTime = (startHour) => ({
    disabledHours: () => range(0, 24).splice(0, startHour),
  });
  const disabledStartDateTime = (endHour) => ({
    disabledHours: () => range(0, 24).splice(endHour, 24),
  });
  return (
    <div>
      <Row style={{ padding: 5 }}>
        <Col span={24}>
          <Row>
            <Col xs={24} sm={8} md={6} lg={6}>
              <Row>
                <Col xs={8} md={8}>
                  <Checkbox
                    className="form-check-input"
                    onChange={handelSelectAll}
                    checked={SelectAll}
                  />
                </Col>
                <Col xs={16} md={16}>
                  Select all
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {items.map((item, index) => (
        <Row style={{ padding: 5 }} key={item.id}>
          <Col span={24}>
            <Row gutter={[22, 22]}>
              <Col xs={24} sm={8} md={6} lg={6}>
                <Row>
                  <Col xs={8} md={8}>
                    <Checkbox
                      className="form-check-input"
                      onChange={(e) => handelCheckbox(e, index)}
                      checked={item.isChecked}
                    />
                  </Col>
                  <Col xs={16} md={16} style={{ color: "gray" }}>
                    {item.dayName}
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={12} md={14} lg={14}>
                {item.daySlips.map((daySlip, index) => (
                  <Row
                    key={daySlip.slipId}
                    gutter={[16, 16]}
                    style={{ marginTop: index !== 0 ? 7 : 0 }}>
                    <Col xs={24} sm={4} md={6}>
                      <TimePicker
                        disabledTime={() => disabledStartDateTime(daySlip.endTime?.split(":")[0])}
                        disabled={!item.isChecked}
                        placeholder="Time"
                        value={dayjs(
                          daySlip.startTime === "" ? "00:00" : daySlip.startTime,
                          format,
                        )}
                        format={format}
                        onChange={(time, timeString) =>
                          startTime(time, timeString, item.id, daySlip.slipId)
                        }
                      />
                    </Col>
                    <Col xs={24} sm={4} md={2} style={{ margin: "auto" }}>
                      -
                    </Col>
                    <Col xs={24} sm={4} md={6}>
                      <TimePicker
                        disabledTime={() => disabledEndDateTime(daySlip.startTime?.split(":")[0])}
                        disabled={!item.isChecked}
                        placeholder="Time"
                        value={dayjs(daySlip.endTime === "" ? "00:00" : daySlip.endTime, format)}
                        format={format}
                        onChange={(time, timeString) =>
                          endTime(time, timeString, item.id, daySlip.slipId)
                        }
                      />
                    </Col>
                    <Col xs={24} sm={1} md={1}></Col>
                    <Col xs={24} sm={4} md={4}>
                      <input
                        style={{
                          width: "100%",
                          height: "100%",
                          color: daySlip.noHours === "Non" && "red",
                        }}
                        data-index={index}
                        className="text-center WorkingHoursDiff"
                        disabled
                        value={daySlip.noHours}
                      />
                    </Col>
                    <Col
                      xs={24}
                      sm={4}
                      md={4}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {index !== 0 && (
                        <span
                          onClick={() => romveDaySlip(item.id, daySlip.slipId)}
                          style={{ cursor: "pointer" }}
                          title="Delete Intervel">
                          <DeleteSVG />
                        </span>
                      )}
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col xs={24} sm={4} md={4} lg={4} style={{ textAlign: "center" }}>
                <span
                  onClick={() => addDaySlip(item.id)}
                  style={{ cursor: "pointer" }}
                  title="Add Intervel">
                  <AddSVG />
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  );
}
