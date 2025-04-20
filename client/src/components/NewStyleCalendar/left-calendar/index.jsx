import { Avatar, Calendar, Checkbox, Col, Row, Tooltip } from "antd";
import "./styles.css";
import dayjs from "dayjs";
import { CheckCircleFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import MeetingSVG2 from "assets/jsx-svg/MeetingSVG2";
import useGetDeskEmployees from "services/Desk/Querys/useGetDeskEmployees";
import { stringAvatar } from "utils/string";
import { AllUsersDeskSVG } from "assets/jsx-svg";

const LeftCalendar = ({ setTday, today, collapsed, selectedDesk, setSelectedDesk }) => {
  const { data, isLoading } = useGetDeskEmployees(null, {
    refetchOnMount: true,

    select: (data) => {
      return data.data.data;
    },
  });
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
            padding: "12px",
          }}>
          <div style={{ fontSize: "14px", fontWeight: 500 }}>{monthText}</div>
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
  const handleSelectDesk = (value) => {
    setSelectedDesk(value);
  };

  return (
    <div className="left-calendar">
      {collapsed && <MeetingSVG2 style={{ margin: "30px" }} />}
      {!collapsed && (
        <>
          <Row>
            <Col className="container-title">
              <MeetingSVG2 style={{ marginRight: "15px" }} />
              <div className="title">All Schedules</div>
            </Col>
          </Row>

          <Calendar
            headerRender={headerRender}
            fullscreen={false}
            value={today || dayjs()}
            onSelect={onSelect}
          />

          <div className="container-checkbox">
            <div className="title">My Calendars</div>
            <Checkbox.Group
              defaultValue={["Leaves and attendance", "Meetings", "Events"]}
              onChange={onChange}>
              <Row style={{ gap: "10px" }}>
                <Col span={24}>
                  <Checkbox className="meet" value="Meetings">
                    Meetings
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox className="leaves" value="Leaves and attendance">
                    Leaves and attendance
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox className="events" value="Events">
                    Events
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
        </>
      )}
      {
        <div
          style={{ maxHeight: !collapsed ? "320px" : "calc(100vh - 190px)", overflowY: "auto" }}
          className="container-desks">
          <div className="title">Desks</div>

          {!isLoading ? (
            <Row style={{ gap: "10px" }}>
              {([{ name: "All", id: "all" }, ...(data || [])] || []).map((item) => {
                const AllAvatarProps =
                  item.id === "all"
                    ? {
                        style: { background: "#D0D6EC" },
                        src: <AllUsersDeskSVG width={20} height={16} />,
                      }
                    : {};

                return (
                  <Col key={item.id} span={24}>
                    <Tooltip title={item.name} placement="right">
                      <div
                        onClick={() => handleSelectDesk(item.id)}
                        style={{
                          borderRadius: "8px",
                          padding: !collapsed ? "4px 12px 4px  12px" : "2px",
                          background: item.id === selectedDesk && "#699D4826",
                          cursor: "pointer",
                          display: "flex",
                          fontWeight: 600,
                          fontSize: "12px",
                          justifyContent: "space-between",
                        }}
                        className="meet"
                        value={item.id}>
                        <div>
                          <Avatar
                            style={{
                              marginLeft: "0px !important",
                            }}
                            {...stringAvatar(item.name)}
                            {...AllAvatarProps}
                            size="default"
                          />
                          {!collapsed && item.name}
                        </div>
                        {!collapsed && item.id === selectedDesk && "#699D4826" && (
                          <CheckCircleFilled
                            style={{
                              fontSize: "16px",
                              color: "#699D48",
                            }}
                          />
                        )}
                      </div>
                    </Tooltip>
                  </Col>
                );
              })}
            </Row>
          ) : (
            "Loading"
          )}
        </div>
      }
    </div>
  );
};
export default LeftCalendar;
