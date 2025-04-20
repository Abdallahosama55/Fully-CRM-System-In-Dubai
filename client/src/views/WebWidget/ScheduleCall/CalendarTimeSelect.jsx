import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Calendar, Col, Divider, Row, Select, Space, Spin, Typography } from "antd";
import { CalendarSVG } from "assets/jsx-svg";

import { useCallback, useMemo, useState } from "react";
import "./styles.css";
import allTimezones from "constants/TIME_ZONES";
import Box from "components/Box";
import { dayjs } from "utils/time";
import { useLocation, useSearchParams } from "react-router-dom";

export default function CalendarTimeSelect({
  availableMeetingsTimes,
  onTimeSelected,
  onSelectCalenderDay,
  onSelectedTimeZone,
  isLoading,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const textColor = queryParams.get("textColor") || "#272944";

  const [searchParams] = useSearchParams();
  const linkColor = searchParams.get("linkColor");
  const [today, setTday] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectTimeZone, setSelectTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const handleSelectDay = (day) => {
    setTday(dayjs(day));
    setSelectedDay(day);
    setSelectedTime();
    onSelectCalenderDay(day ? true : false);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmTime = () => {
    onTimeSelected(selectedDay, selectedTime);
  };

  const availableTimes = useMemo(
    () =>
      availableMeetingsTimes?.[selectedDay?.format("YYYY-MM-DD")]?.meetings?.map(
        ({ start }) => start,
      ) ?? [],
    [selectedDay],
  );

  const getDisplayTime = (time) =>
    dayjs(selectedDay.format("YYYY-MM-DD " + time)).format("hh:mm A");

  const timeZoneOption = useMemo(() => {
    return allTimezones.map((el) => ({
      value: el,
      label: el + " (" + dayjs(new Date()).tz(el).format("HH:MM A") + ")",
    }));
  }, []);

  const handleChangeTimeZone = useCallback((value) => {
    setSelectedDay();
    onSelectedTimeZone(value);
    setSelectTimeZone(value);
  }, []);

  const handleReset = () => {
    setSelectedDay();
  };

  // Default rendering if no customization is needed
  const headerRender = ({ value, onChange }) => {
    const monthFormat = "MMMM YYYY";
    const monthText = value.format(monthFormat);

    const onPrev = () => {
      onChange(prevMonth);
      setTday(prevMonth);
      handleReset();
    };

    const onNext = () => {
      onChange(nextMonth);
      setTday(nextMonth);
      handleReset();
    };

    const prevMonth = value.clone().subtract(1, "month");
    const nextMonth = value.clone().add(1, "month");

    return (
      <div className="calendar-header">
        <Button size="small" icon={<LeftOutlined />} onClick={onPrev} />
        {value.format("MMM YYYY")}
        <Button size="small" icon={<RightOutlined />} onClick={onNext} />
      </div>
    );
  };

  return (
    <Spin spinning={isLoading}>
      <Row className="calendar-time-select">
        <Col xs={selectedDay ? 0 : 24} md={selectedDay && availableTimes?.length ? 14 : 24}>
          <Space>
            <CalendarSVG color={textColor} />
            <Typography className="fz-16">Select Date & Time</Typography>
          </Space>
          <Calendar
            fullscreen={false}
            mode="month"
            onSelect={handleSelectDay}
            value={today}
            disabledDate={(currentDate) => {
              return !Object.keys(availableMeetingsTimes ?? {})?.includes(
                currentDate.format("YYYY-MM-DD"),
              );
            }}
            headerRender={headerRender}
          />
        </Col>

        {selectedDay && availableTimes?.length ? (
          <Col xs={selectedDay ? 24 : 0} md={10}>
            <Row gutter={[0, 20]} className="times-list">
              <Col span={24}>
                <Row>
                  <Col xs={3} md={0}>
                    <ArrowLeftOutlined
                      className="clickable"
                      width={24}
                      height={24}
                      onClick={handleReset}
                    />
                  </Col>

                  <Typography className="fz-14">{selectedDay.format("dddd, MMM D")}</Typography>
                </Row>
                <Col xs={24} md={0} flex={1}>
                  <Box sx={{ width: "100%", marginTop: "16px" }}>
                    <Select
                      value={selectTimeZone}
                      onChange={handleChangeTimeZone}
                      defaultValue={selectTimeZone}
                      className="select-time-zone "
                      options={timeZoneOption}></Select>
                  </Box>
                </Col>
              </Col>
              <Col className="text-center " span={24} md={0}>
                <Divider className="mb-1 mt-0"></Divider>
                Select a Time
              </Col>
              {availableTimes.map((time) => (
                <Col
                  key={time}
                  span={24}
                  className="d-flex justify-between align-center "
                  style={{ gap: 8 }}>
                  <div
                    className="time"
                    onClick={() => handleSelectTime(time)}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      paddingInline: selectedTime === time && "1px",
                      borderColor: linkColor,
                      borderWidth: selectedTime === time ? 2 : 1,
                      color: linkColor,
                    }}>
                    {getDisplayTime(time)}
                  </div>
                  {selectedTime === time && (
                    <div className="d-flex" style={{ flex: 1 }}>
                      <Button type="primary" className="w-100" onClick={handleConfirmTime}>
                        Next
                      </Button>
                    </div>
                  )}
                </Col>
              ))}
            </Row>
          </Col>
        ) : null}
        <Col xs={0} md={24} flex={1}>
          <Box sx={{ width: "100%", marginTop: "16px" }}>
            <Select
              showSearch
              value={selectTimeZone}
              onChange={handleChangeTimeZone}
              defaultValue={selectTimeZone}
              className="select-time-zone "
              options={timeZoneOption}></Select>
          </Box>
        </Col>
      </Row>
    </Spin>
  );
}
