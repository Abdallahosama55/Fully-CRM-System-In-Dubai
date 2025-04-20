import { ArrowLeftOutlined, CloseCircleFilled, CloseOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Divider, Row, Space, Typography, message } from "antd";
import IframeBGPNG from "assets/images/iframe_bg.png";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useGetCustomerDesk from "services/CustomerDesk/Querys/useGetCustomerDesk";
import CustomerMeetingService from "services/customerMeeting.service";
import { axiosCatch } from "utils/axiosUtils";
import BookingInformation from "./BookingInformation";
import BookingSuccess from "./BookingSuccess";
import CalendarTimeSelect from "./CalendarTimeSelect";
import DesksList from "./DesksList";
import UserForm from "./UserForm";
import "./styles.css";
import Logo from "components/common/Logo";

export default function ScheduleCall({ isInModal, onCloseModal }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const backgroundType = queryParams.get("backgroundType");
  const backgroundImage = queryParams.get("backgroundImage");
  const backgroundColor = queryParams.get("backgroundColor");
  const textColor = queryParams.get("textColor") || "#272944";
  const linkAndBtnColor = queryParams.get("linkColor") || "#272944";

  const { data, isLoading: isDesksLoading } = useGetCustomerDesk("MEETING_DESK", {
    select: (res) => {
      return res.data.data;
    },
  });

  const company = useMemo(() => data?.company, [data]);
  const desks = useMemo(() => data?.rows, [data]);

  const [searchParams] = useSearchParams();
  const deskId = searchParams.get("desk_id");
  const frameColor = searchParams.get("frameColor");
  const [selectedDeskInfo, setSelectedDeskInfo] = useState();
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectTimeZone, setSelectTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [meetingStep, setMeetingStep] = useState(deskId ? 2 : 1);
  const [selectedTime, setSelectedTime] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState();
  const [availableMeetingsTimes, setAvailableMeetingsTimes] = useState({});
  const [isSelectedDate, setIsSelectedDate] = useState(false);

  const handleSelectDesk = (desk) => {
    if (desk.aiAgent) {
      setMeetingStep(3);
    } else {
      setMeetingStep(2);
    }
    getDeskData(desk?.id);
  };

  const handleTimeSelected = (day, time) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setMeetingStep(3);
  };

  const handleBack = () => {
    if (selectedDeskInfo?.desk?.aiAgent) {
      setMeetingStep(1);
      return;
    }
    if (meetingStep <= 4) {
      setSelectedDay();
      setSelectedTime();
    }

    if (meetingStep == 2) {
      setSelectedDeskInfo();
    }

    setBookingData();
    setMeetingStep(meetingStep - 1);
  };

  const handleConfirmSchedule = async (userValues) => {
    try {
      if (!selectedDeskInfo?.desk?.aiAgent) {
        if (!selectedDay) {
          message.info("You Must Select Date");
          return;
        }

        if (!selectedTime) {
          message.info("You Must Select Time");
          return;
        }
      }
      setIsLoading(true);
      console.log(selectedDay);
      const res = await CustomerMeetingService.book({
        email: userValues.email,
        fullName: userValues.name,
        deskId: deskId || selectedDeskInfo?.desk?.id,
        timeZone: selectTimeZone,
        date: !selectedDeskInfo?.desk?.aiAgent
          ? dayjs(selectedDay)
            .tz(selectTimeZone)
            .set("hour", dayjs(selectedTime, "HH").format("HH"))
            .set("minute", dayjs(selectedTime, "HH:mm").format("mm"))
            .set("second", 0)
            .set("millisecond", 0)
            ?.format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : new Date(),
        customerInfo: [],
      });
      setBookingData({
        name: userValues.name,
        day: selectedDay,
        time: selectedTime,
        link: res.data.data.meetingLink,
        id: res.data.data.meetingId,
      });
      if (selectedDeskInfo.desk.aiAgent) {
        window.open(res.data.data.meetingLink, "_self");
      } else setMeetingStep(4);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeskData = async (id) => {
    if (id) {
      try {
        setIsLoading(true);
        const res = await CustomerMeetingService.getByDay(selectTimeZone, id);
        // Initialize an empty object to store the meetings
        const meetingsByDate = {};
        const deskInfo =
          {
            desk: res.data.data?.desk,
            employee: res.data.data?.employee,
          } || {};
        // Iterate over the appointments and format them as desired
        res.data.data?.appointments?.forEach((day) => {
          const date = day.date;
          const meetingsMap = day.appointments?.reduce(
            (acc, curr) => ({ ...acc, [curr.start]: curr }),
            {},
          );

          const meetings = Object.values(meetingsMap || {}).map((app) => ({
            start: app.start,
            end: app.end,
          }));
          meetingsByDate[dayjs(date).format("YYYY-MM-DD")] = { meetings };
        });
        setSelectedDeskInfo(deskInfo);
        setAvailableMeetingsTimes(meetingsByDate);
      } catch (err) {
        setMeetingStep(1);
        setSelectedDeskInfo();
        message.error("Error while fetching desk data!");
        axiosCatch(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const shouldShowBack = useMemo(
    () => (meetingStep !== 2 || !deskId) && meetingStep !== 1,
    [meetingStep, deskId],
  );

  const handleSelectedDate = (value) => {
    setIsSelectedDate(value);
  };

  const resetCallSchedule = () => {
    setIsSelectedDate(false);
    setMeetingStep(deskId ? 2 : 1);
    setSelectedDay();
    setBookingData();
    setSelectedTime();
  };

  const handleCloseModal = () => {
    resetCallSchedule();
    onCloseModal?.();
  };

  useEffect(() => {
    if (selectedDeskInfo?.desk?.aiAgent) {
      setMeetingStep(3);
    }
    setIsSelectedDate(false);
  }, [selectedDeskInfo?.desk?.id]);

  useEffect(() => {
    if (+deskId) {
      getDeskData(+deskId);
    }
  }, [deskId]);
  const mountRef = useRef(false);
  useEffect(() => {
    if (mountRef.current) {
      getDeskData(+selectedDeskInfo?.desk?.id);
    }
    mountRef.current = true;
  }, [selectTimeZone]);
  return (
    <section
      className="widget-schedule-call"
      style={{
        background: backgroundType == 1 || !backgroundColor ? "transparent" : backgroundColor,
        backgroundImage:
          backgroundType == 1 || !backgroundColor
            ? `url(${backgroundImage || IframeBGPNG})`
            : "none",
        backgroundSize: backgroundType == 1 || !backgroundColor ? "cover" : "auto",
        backgroundPosition: backgroundType == 1 || !backgroundColor ? "center" : "initial",
        height: "100vh",
        overflow: "auto",
      }}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: linkAndBtnColor,
            },
          },
          token: {
            colorPrimary: linkAndBtnColor,
            colorText: textColor,
          },
        }}>
        <div
          className="schedule-call-card"
          style={{
            background:
              frameColor ||
              "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)",
          }}>
          <Row>
            <Col
              xs={24}
              md={meetingStep > 1 ? 12 : 24}
              style={{
                padding: "32px 24px",
              }}>
              <Typography className="fz-18 fw-800">
                <Space size="middle">
                  {shouldShowBack && (
                    <ArrowLeftOutlined
                      className="clickable"
                      width={24}
                      height={24}
                      onClick={handleBack}
                    />
                  )}
                  <span className="d-flex">
                    <Logo width={40} />
                  </span>
                  <span>{company?.name}</span>
                </Space>
              </Typography>
              <Divider />
              {meetingStep === 1 && (
                <Col xs={24} className="d-flex align-center flex-column align-center">
                  <DesksList
                    desks={desks}
                    onDeskSelected={handleSelectDesk}
                    isLoading={isDesksLoading}
                  />
                </Col>
              )}
              {meetingStep > 1 && (
                <Col xs={24}>
                  <BookingInformation employeeName="Vindo Demo" deskInfo={selectedDeskInfo} />
                </Col>
              )}

              <Typography className="powered-by-text">
                <Logo width={20} />
              </Typography>
            </Col>
            {meetingStep === 2 && (
              <Col xs={24} md={12}>
                <CalendarTimeSelect
                  onSelectedTimeZone={setSelectTimeZone}
                  onSelectCalenderDay={handleSelectedDate}
                  availableMeetingsTimes={availableMeetingsTimes}
                  onTimeSelected={handleTimeSelected}
                  isLoading={isLoading}
                />
              </Col>
            )}
            {meetingStep === 3 && (
              <Col xs={24} md={12} className="user-form">
                <UserForm
                  aiAgent={selectedDeskInfo?.desk?.aiAgent}
                  onConfirm={handleConfirmSchedule}
                  isLoading={isLoading}
                />
              </Col>
            )}
            {meetingStep === 4 && (
              <Col xs={24} md={12} className="schedule-success">
                <BookingSuccess bookingData={bookingData} />
              </Col>
            )}
          </Row>
          {isInModal && (
            <Button
              type="text"
              className="close-modal-button"
              icon={<CloseOutlined />}
              onClick={handleCloseModal}
            />
          )}
        </div>
      </ConfigProvider>
    </section>
  );
}
