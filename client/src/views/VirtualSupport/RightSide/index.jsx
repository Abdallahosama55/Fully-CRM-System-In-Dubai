import {
  AddListSVG,
  NotificationSiderSVG,
  QueueSVG,
  SearchSiderSVG,
  ChatSiderSVG,
  CalenderSiderSVG,
  ListSiderSVG,
} from "assets/jsx-svg";
import "./styles.css";
import { Avatar, Col, Divider, Row, Tooltip } from "antd";

import person1 from "assets/images/person1.png";
import person2 from "assets/images/person2.png";
import person3 from "assets/images/person3.png";
import person4 from "assets/images/person4.png";
import person5 from "assets/images/person5.png";
import person6 from "assets/images/person6.png";
import person7 from "assets/images/person7.png";

export default function RightSide() {
  return (
    <aside className="right-side">
      <Row gutter={[0, 16]} style={{ flexDirection: "column" }}>
        {icons.map((icon) => (
          <Col xs={24} key={icon.id}>
            <div
              className="right-side-icon"
              style={{ background: icon.id > 5 && "#272942" }}
            >
              <icon.icon />
            </div>
          </Col>
        ))}

        <Col xs={24} style={{ maxHeight: "50vh", overflow: "auto" }}>
          <Row
            gutter={[0, 16]}
            style={{
              flexDirection: "column",
            }}
            wrap={true}
          >
            {epmloyees.map((user) => (
              <Col xs={24} key={user.id}>
                <Tooltip title={user.name} placement="left">
                  <Avatar src={user.image} size={40} />
                </Tooltip>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </aside>
  );
}

const icons = [
  { id: 1, icon: NotificationSiderSVG, label: "label" },
  { id: 2, icon: CalenderSiderSVG, label: "label" },
  { id: 3, icon: QueueSVG, label: "label" },
  { id: 4, icon: ChatSiderSVG, label: "label" },
  { id: 5, icon: AddListSVG, label: "label" },
  { id: 6, icon: ListSiderSVG, label: "label" },
  { id: 7, icon: SearchSiderSVG, label: "label" },
];

const epmloyees = [
  { id: 1, image: person1, name: "Sami" },
  { id: 2, image: person2, name: "Mohammed" },
  { id: 3, image: person3, name: "Abdallah" },
  { id: 4, image: person4, name: "Ameen" },
  { id: 5, image: person5, name: "Waleed" },
  { id: 6, image: person6, name: "Abd-Alqader" },
  { id: 7, image: person7, name: "Hazem" },
];
