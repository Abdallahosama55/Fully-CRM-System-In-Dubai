import { Calendar, Checkbox, Col, Collapse, Input, Row } from "antd";
import "./styles.css";
import { IconlyLighOutline2User, SearchSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const LeftCalendar = ({ setTday, today }) => {
  const onSelect = (value) => {
    setTday(value);
  };

  const headerRender = ({ value, onChange }) => {
    const monthFormat = "MMMM YYYY";
    const monthText = value.format(monthFormat);

    const onPrev = () => {
      onChange(prevMonth);
      setTday(prevMonth);
    };

    const onNext = () => {
      onChange(nextMonth);
      setTday(nextMonth);
    };

    const prevMonth = value.clone().subtract(1, "month");
    const nextMonth = value.clone().add(1, "month");

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 600 }}>{monthText}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <LeftOutlined className="prev-arrow" onClick={onPrev} />
            <RightOutlined className="next-arrow" onClick={onNext} />
          </div>
        </div>
      </div>
    );
  };

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <div className="left-calendar">
      <Calendar
        headerRender={headerRender}
        fullscreen={false}
        value={today || dayjs()}
        onSelect={onSelect}
      />
      <div className="search">
        <Input
          className="general-table-search"
          placeholder="Search For People"
          prefix={
            <>
              <IconlyLighOutline2User />
            </>
          }
          addonAfter={
            <div
              className="clickable center-items search"
              style={{
                width: "44px",
                height: "42px",
                borderRadius: "0 8px 8px 0",
              }}
            >
              <SearchSVG />
            </div>
          }
          suffix={<SearchSVG />}
        />
      </div>

      <div className="collapse">
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="My Calender" key="1">
            <Checkbox.Group
              defaultValue={["Leaves and attendance", "Meetings", "Events"]}
              onChange={onChange}
            >
              <Row style={{ gap: "10px" }}>
                <Col span={24}>
                  <Checkbox className="leaves" value="Leaves and attendance">
                    Leaves and attendance
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox className="meet" value="Meetings">
                    Meetings
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox className="events" value="Events">
                    Events
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>
  );
};
export default LeftCalendar;
