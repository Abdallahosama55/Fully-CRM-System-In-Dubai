import { Button, Col, Row, Select, Typography } from "antd";
import MeetingHistoryCard from "./MeetingHistoryCard";
import UpcomingMeetingCard from "./UpcomingMeetingCard";
// icons
import { PluseSVG, UsersThreeRegularSVG } from "assets/jsx-svg";
import useGetMeetings from "services/CustomerLeadBoard/Querys/useGetMeetings";
function Meetings() {
  const { data: meetings } = useGetMeetings({});
  const MockMeetings = [
    {
      id: 1,
      title: "Meeting with Jerome Bell",
      due: "Today, 12:00 PM",
      note: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi voluptates officia sapiente corrupti ad dicta?",
      by: "Esther Howard",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi voluptates officia sapiente corrupti ad dicta?",
    },
    {
      id: 2,
      title: "Meeting with Jerome Bell",
      due: "Today, 12:00 PM",
      note: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi voluptates officia sapiente corrupti ad dicta?",
      by: "Esther Howard",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi voluptates officia sapiente corrupti ad dicta?",
    },

    {
      id: 3,
      title: "Meeting with Jerome Bell",
      due: "Today, 12:00 PM",
      note: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi voluptates officia sapiente corrupti ad dicta?",
      by: "Esther Howard",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi voluptates officia sapiente corrupti ad dicta?",
    },
  ];
  return (
    <div className="calls">
      <Row align="middle" justify="space-between" gutter={[12, 12]}>
        <Col span={8}>
          <Select
            className="general-table-select"
            style={{ width: "100%" }}
            defaultValue="newest"
            options={[
              {
                value: "newest",
                label: (
                  <Typography.Text className="fz-12">
                    <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                    <span style={{ color: "#AEAEB2" }}>All employees</span>
                  </Typography.Text>
                ),
              },
            ]}
          />
        </Col>
        <Col span={6}>
          <Select
            className="general-table-select"
            style={{ width: "100%" }}
            defaultValue="newest"
            options={[
              {
                value: "newest",
                label: (
                  <Typography.Text className="fz-12">
                    Sort by: <span className="fw-600">Newest</span>
                  </Typography.Text>
                ),
              },
            ]}
          />
        </Col>
        <Col span={6} offset={4}>
          <Button style={{ background: "#3A5EE3", color: "#fff", width: "100%" }}>
            <Row align="middle" justify={"center"} gutter={[8, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <PluseSVG color="#fff" />
                </Row>
              </Col>
              <Col>Create Meeting</Col>
            </Row>
          </Button>
        </Col>
      </Row>
      <div>
        <div style={{ paddingTop: "24px", paddingBottom: "16px" }}>Upcoming meetings</div>
        <div>
          {MockMeetings.map((item) => (
            <UpcomingMeetingCard
              id={item.id}
              title={item.title}
              Due={item.due}
              note={item.note}
              by={item.by}
              description={item.description}
            />
          ))}
        </div>
        <div style={{ paddingTop: "24px", paddingBottom: "16px" }}>
          <Typography.Text>Meeting history</Typography.Text>
          <br />
          <Typography.Text className="fz-12 gc">June 24, 2023</Typography.Text>
        </div>
        <div>
          <MeetingHistoryCard
            Due={"Today, 12:00 PM"}
            title={"Meeting scheduled with Jerome Bell"}
            by={"Esther Howard"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi voluptates officia sapiente corrupti ad dicta?"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Meetings;
