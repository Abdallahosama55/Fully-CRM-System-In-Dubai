import { Col, Dropdown, Row, Typography, Popconfirm } from "antd";

import { DeleteCircleSVG, EditSVG, EyeSVG, MoreSVG } from "assets/jsx-svg";
import CallsAndMeetingsDetails from "../CallsAndMeetingsDetails";
import CallsAndMeetingsAdd from ".";

import "./styles.css";
import { useDrawer } from "hooks/useDrawer";

function DropdownItems({ id, setRefresh, confirm, width, color }) {
  const DrawerAPI = useDrawer();

  return (
    <Dropdown
      className="dropdown-items-meet"
      menu={{
        items: [
          {
            label: (
              <Row align="middle" gutter={[8, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <EyeSVG />
                  </Row>
                </Col>
                <Col>
                  <Typography.Text>View Details</Typography.Text>
                </Col>
              </Row>
            ),
            key: "1",
            onClick: () => {
              DrawerAPI.open("40%");
              DrawerAPI.setDrawerContent(<CallsAndMeetingsDetails id={id} DrawerAPI={DrawerAPI}/>);
            },
          },

          {
            label: (
              <Row align="middle" gutter={[8, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <EditSVG />
                  </Row>
                </Col>
                <Col>
                  <Typography.Text>Edit</Typography.Text>
                </Col>
              </Row>
            ),
            key: "2",
            onClick: () => {
              DrawerAPI.open("40%");
              DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd id={id} setRefresh={setRefresh} DrawerAPI={DrawerAPI}/>);
            },
          },
          {
            label: (
              <Popconfirm
                title="Delete the meet"
                description="Are you sure to delete this meet?"
                onConfirm={() => confirm(id)}
                okText="Yes"
                cancelText="No">
                <Row align="middle" gutter={[8, 0]} wrap={false}>
                  <Col>
                    <Row align="middle">
                      <DeleteCircleSVG fill="#f60808" />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text style={{ color: "#f60808" }}>Decline</Typography.Text>
                  </Col>
                </Row>
              </Popconfirm>
            ),
            key: "3",
          },
        ],
      }}
      trigger={["click"]}
      placement="topRight">
      {DrawerAPI.Render}
      <div className="more-btn-meet">
        <MoreSVG color={color} width={width} style={{ rotate: "90deg" }} />
      </div>
    </Dropdown>
  );
}

export default DropdownItems;
