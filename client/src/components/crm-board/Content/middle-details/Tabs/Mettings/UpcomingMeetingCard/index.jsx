import { Col, Divider, Menu, Row, Select } from "antd";
import CustomCollapse from "../../components/CustomCollapse";
// icons
import { MeetingsSmallSVG } from "assets/jsx-svg";
import { attendanceItems } from "../../utils";
import useUpdateMeetingDuration from "services/CustomerLeadBoard/Mutations/useUpdateMeetingDuration";
import useUpdateMeetingReminder from "services/CustomerLeadBoard/Mutations/useUpdateMeetingReminder";
const UpcomingMeetingCard = ({ id, by, Due, title, description, note }) => {
  const { updateMeetingDuration } = useUpdateMeetingDuration({});
  const { updateMeetingReminder } = useUpdateMeetingReminder({});
  const handelChangeReminder = (e) => {
    updateMeetingDuration({ meetingId: id, durationId: e });
  };
  const handelChangeDuration = (e) => {
    updateMeetingReminder({ meetingId: id, statusId: e });
  };
  return (
    <CustomCollapse
      isWithOutMenu={true}
      by={by}
      by_label={"Meeting by"}
      by_icon={<MeetingsSmallSVG />}
      Due={Due}>
      <Row>
        <Col span={2}>
          <div className="call-icon">
            <MeetingsSmallSVG />
          </div>
        </Col>
        <Col span={20}>
          <div>
            <div className="fw-500">{title}</div>
            <div style={{ color: "#AEAEB2", fontSize: "12px" }}>{description}</div>
            <Divider style={{ margin: "12px 0px" }} />
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <p className="fs-10 gc">Reminder</p>
              <Select
                onChange={handelChangeReminder}
                style={{ width: 130 }}
                size="small"
                bordered={false}
                defaultValue={"5-min"}
                options={[
                  { value: "5-min", label: "5 min before" },
                  { value: "10-min", label: "10 min before" },
                  { value: "20-min", label: "20 min before" },
                  { value: "30-min", label: "30 min before" },
                  { value: "1-hour", label: "1 hour before" },
                ]}
              />
            </div>
            <div>
              <p className="fs-10 gc">Duration</p>
              <Select
                onChange={handelChangeDuration}
                style={{ width: 100 }}
                size="small"
                bordered={false}
                defaultValue={"5-min"}
                options={[
                  { value: "5-min", label: "5 min" },
                  { value: "10-min", label: "10 min" },
                  { value: "20-min", label: "20 min" },
                  { value: "30-min", label: "30 min" },
                  { value: "1-hour", label: "1 hour" },
                ]}
              />
            </div>
            <div>
              <p className="fs-10 gc">Attendance</p>
              <Menu
                className="collapse-menu fz-12"
                mode="inline"
                style={{
                  width: 210,
                  color: "#000",
                }}
                items={attendanceItems}
              />
            </div>
          </div>
          {note && (
            <div className="notes">
              <p className="fz-10 gc">Note</p>
              <p className="fz-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua
              </p>
            </div>
          )}
        </Col>
      </Row>
    </CustomCollapse>
  );
};

export default UpcomingMeetingCard;
