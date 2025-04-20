import { Button, Input, Row, Col, Select, Divider } from "antd";
import { SearchSVG } from "assets/jsx-svg";

import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { convertButtons } from "./utils";
import "./styles.css";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import { useSidebar } from "layout/MainLayout_OLD/SidebarProvider";
import MeetingFilterIcon from "assets/jsx-svg/MeetingFilterIcon";
import MeetingRequestsIcon from "assets/jsx-svg/MeetingRequestsIcon";
import MeetingAddIcon from "assets/jsx-svg/MeetingAddIcon";
import { useState } from "react";
import FilterSection from "./FilterSection/FilterSection";
import { useTableFilters } from "context/TableFilterContext";
import { useDrawer } from "hooks/useDrawer";

function Header({
  convert,
  today,
  setConvert,
  setTday,
  setRefresh,
  collapsed,
  handlePrev,
  handleNext,
  handleToday,
}) {
  const { setTableFilters } = useTableFilters();

  const DrawerAPI = useDrawer();
  const { isOpen } = useSidebar();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const addTody = () => {
    setTday(dayjs());
    handleToday();
  };

  const next = () => {
    let nextDate;

    switch (convert) {
      case "Year":
        nextDate = dayjs(today).add(1, "year");
        break;
      case "Month":
        nextDate = dayjs(today).add(1, "M");
        break;
      case "Week":
        nextDate = dayjs(today).add(1, "week");
        break;
      case "Day":
      case "Agenda":
        nextDate = dayjs(today).add(1, "day");
        break;

      default:
        break;
    }

    setTday(nextDate);

    handleNext();
  };

  const prev = () => {
    let prevDate;
    switch (convert) {
      case "Year":
        prevDate = dayjs(today).subtract(1, "year");
        break;
      case "Month":
        prevDate = dayjs(today).subtract(1, "M");
        break;
      case "Week":
        prevDate = dayjs(today).subtract(1, "week");
        break;
      case "Day":
      case "Agenda":
        prevDate = dayjs(today).subtract(1, "day");
        break;
      default:
        break;
    }

    setTday(prevDate);

    handlePrev();
  };

  const todayText = () => {
    return {
      Year: dayjs(today).format("YYYY"),
      Month: dayjs(today).format("MMMM"),
      Week: `${dayjs(today).startOf("week").format("DD")}-${dayjs(today)
        .endOf("week")
        .format("DD MMMM")}`,
      Day: dayjs(today).format("D MMMM YYYY"),
      Agenda: dayjs(today).format("ddd,D MMM YYYY"),
    };
  };

  return (
    <>
      {DrawerAPI.Render}
      <Row
        className="new-style-calender-header"
        style={{ justifyContent: !isOpen && !collapsed ? "flex-end" : "space-between" }}>
        <Button onClick={addTody} className="today">
          {todayText()[convert]}
        </Button>

        <Row className="arrows">
          <LeftOutlined onClick={prev} />
          <RightOutlined onClick={next} />
        </Row>

        <Button className="requests-btn">
          <Row align="middle" gutter={[8, 0]}>
            <Col>
              <Row align="middle">
                <MeetingRequestsIcon />
              </Row>
            </Col>
            <Col>Requests(0)</Col>
          </Row>
        </Button>

        <Button className="today-btn" onClick={addTody}>
          Today
        </Button>

        <Divider type="vertical" className="divider" />

        <div className="search">
          <Input
            addonBefore={<SearchSVG color="#272942" />}
            onChange={(e) => setTableFilters({ agenda: { searchText: e.target.value } })}
            placeholder="Search"
          />
        </div>

        <Button
          className="requests-btn"
          icon={<MeetingFilterIcon />}
          onClick={() => {
            setIsFilterVisible(!isFilterVisible);
          }}
        />

        <Select
          value={convert}
          onChange={(value) => setConvert(value)}
          popupMatchSelectWidth={false}>
          {convertButtons.map((button, i) => (
            <Select.Option key={i} value={button}>
              {button}
            </Select.Option>
          ))}
        </Select>

        <Button
          style={{ background: "#3A5EE3", color: "#fff" }}
          onClick={() => {
            DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd setRefresh={setRefresh} DrawerAPI={DrawerAPI}/>);
            DrawerAPI.open("40%");
          }}>
          <Row align="middle" gutter={[8, 0]}>
            <Col>
              <Row align="middle">
                <MeetingAddIcon fill="#fff" />
              </Row>
            </Col>
            <Col>Add Schedule</Col>
          </Row>
        </Button>
      </Row>
      {isFilterVisible && convert === "Agenda" && <FilterSection />}
    </>
  );
}

export default Header;
