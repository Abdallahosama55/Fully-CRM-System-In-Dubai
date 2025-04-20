import { useRef, useState } from "react";
import { Layout, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Header from "components/NewStyleCalendar/header";
import LeftCalendar from "components/NewStyleCalendar/left-calendar";
import Month from "components/NewStyleCalendar/Month";
import Week from "components/NewStyleCalendar/week";
import Day from "components/NewStyleCalendar/Day";
import Agenda from "components/NewStyleCalendar/Agenda";
import dayjs from "dayjs";
import TableFiltersProvider from "context/TableFilterContext";
import { useSearchParams } from "react-router-dom";

const { Content, Sider } = Layout;

const Meeting = ({ isDesk }) => {
  const calendarRef = useRef(null);
  const [convert, setConvert] = useState(isDesk ? "Agenda" : "Week");
  const [today, setTday] = useState(dayjs());
  const [searchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(isDesk ? true : false); // Add state for collapsed
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDesk, setSelectedDesk] = useState(
    searchParams.get("meetingType") === "MEETING_DESK"
      ? Number(searchParams.get("desk_id")) ?? "all"
      : "all",
  );
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handlePrev = () => {
    setCurrentDate((prevDate) => {
      const prevDay = dayjs(prevDate).subtract(1, "day").toDate();
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.gotoDate(prevDay);
      }
      return prevDay;
    });
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      const nextDay = dayjs(prevDate).add(1, "day").toDate();
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.gotoDate(nextDay);
      }
      return nextDay;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(new Date());
    }
  };

  return (
    <TableFiltersProvider>
      <Layout>
      {
        window.innerWidth > 768 && (
          <Sider
          width={320}
          style={{ background: "#fff" }}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapse}
          trigger={null}>
          <LeftCalendar
            selectedDesk={selectedDesk}
            setSelectedDesk={setSelectedDesk}
            today={today}
            setTday={setTday}
            collapsed={collapsed}
          />
        </Sider>
        )
      }
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "white",
            width: 25,
            height: 25,
            position: "absolute",
            left: collapsed ? 67 : 307,
            top: 28,
            zIndex: 1,
            borderRadius: "6px",
            border: "1px solid #F2F2F7",
            padding: 1,
          }}
        />
        <Content>
          <Header
            today={today}
            setConvert={setConvert}
            setTday={setTday}
            convert={convert}
            collapsed={collapsed}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleToday={handleToday}
          />
          {/* {convert === "Year" && <Year today={today} />} */}
          {convert === "Month" && (
            <Month
              selectedDesk={selectedDesk}
              setCurrentDate={() => {}}
              collapsed={collapsed}
              today={today}
            />
          )}
          {convert === "Week" && (
            <Week
              selectedDesk={selectedDesk}
              setCurrentDate={() => {}}
              collapsed={collapsed}
              today={today}
            />
          )}
          {convert === "Day" && (
            <Day
              selectedDesk={selectedDesk}
              collapsed={collapsed}
              today={today}
              calendarRef={calendarRef}
              // handlePrev={handlePrev}
              // handleNext={handleNext}
              // handleToday={handleToday}
              setCurrentDate={setCurrentDate}
            />
          )}
          {convert === "Agenda" && <Agenda selectedDesk={selectedDesk} today={today} />}
        </Content>
      </Layout>
    </TableFiltersProvider>
  );
};

export default Meeting;
