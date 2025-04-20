import { useContext, useEffect, useState } from "react";
import {
  ActivitiesSVG,
  ChatSVG2,
  ChatSiderSVG,
  CurrentLeadSVG,
  NewLeadSVG,
  NotesSVG2,
  QueueSVG,
  SearchSVG,
} from "assets/jsx-svg";
import { Avatar, Col, Row, Divider, Tooltip } from "antd";
// style
import "./styles.css";
// context
// drawer pages
import EmployeeService from "services/Employee/employee.service";
import DeskQueue from "components/DeskQueue";
import dragContext from "context/dragContext";
import CRMBoard from "components/crm-board";

// images
import DiskTicket from "assets/jsx-svg/DiskTicketSVG";
import newColorFind from "utils/randomColor";
import useRightSlide from "context/rightSlideContext";
import { stringAvatar } from "utils/string";
import { useDrawer } from "hooks/useDrawer";

export default function RightSide({ isFull }) {
  const { dragData, setDragData } = useContext(dragContext);
  // const [employees, setEmployees] = useState([]);
  const DrawerAPI = useDrawer();
  const { state, close } = useRightSlide();

  // const getEpmloyees = async () => {
  //   const res = await EmployeeService.search({
  //     limit: 100,
  //   });
  //   setEmployees(res.data.data.rows);
  // };
  // useEffect(() => {
  //   getEpmloyees();
  // }, []);
  if (!state) {
    return <></>;
  }
  return (
    <WrapperSide>
      {(scrollTop) => {
        return (
          <aside
            className="right-side"
            style={{ top: isFull ? 0 : scrollTop ? "0" : "80px", transition: "all 0.2s ease" }}>
            {DrawerAPI.Render}
            <Row gutter={[0, 16]} style={{ flexDirection: "column" }}>
              {links.map((link) => (
                <Col xs={24} key={link.id}>
                  <div
                    style={{
                      background: link.background && link.background,
                    }}
                    onClick={() => {
                      DrawerAPI.open(link.width);
                      DrawerAPI.setDrawerContent(link.component);
                    }}
                    className={`right-side-icon`}>
                    {link.icon}
                  </div>
                </Col>
              ))}
              {/* <Divider className="divider" /> */}
              {ContactIcons.map((icon) => (
                <Col xs={24} key={icon.id + icon.id}>
                  <div className="right-side-ContactIcons" style={{ background: icon.background }}>
                    <icon.icon />
                  </div>
                </Col>
              ))}

              <Divider className="divider" />

              <Col xs={24}>
                <div className={`right-side-icon `}>{<SearchSVG />}</div>
              </Col>

              <Col
                xs={24}
                className="epmloyeesCol"
                style={{ maxHeight: "calc(100vh - 380px)", overflow: "auto" }}>
                <Row
                  gutter={[0, 8]}
                  style={{
                    flexDirection: "column",
                  }}
                  wrap={true}>
                  {/* {employees.map((user) => (
                    <Col xs={24} key={user.id}>
                      <div
                        className="text-center"
                        draggable
                        onDragStart={() =>
                          setDragData({
                            dragging: true,
                            employeeId: user.id,
                            dropText: `Assign This Ticket to The ${user.fullName}`,
                          })
                        }
                        onDragEnd={() =>
                          setDragData({
                            dragging: false,
                            dropText: "",
                            employeeId: null,
                          })
                        }>
                        <Tooltip
                          style={{ display: dragData.dragging && "none" }}
                          title={!dragData.dragging && user.fullName}
                          placement="left">
                          <Avatar
                            src={user?.profileImage}
                            size={30}
                            {...stringAvatar(user?.fullName)}
                          />
                        </Tooltip>
                      </div>
                    </Col>
                  ))} */}
                </Row>
              </Col>
            </Row>
          </aside>
        );
      }}
    </WrapperSide>
  );
}

const links = [
  {
    id: 1,
    icon: <ChatSVG2 />,
    label: "label",
    component: <DeskQueue />,
    width: "70%",
    background: "#9CDBF6",
  },
  {
    id: 2,
    icon: <NewLeadSVG />,
    label: "label",
    component: <CRMBoard />,
    width: "90%",
    background: "#9A42A9",
  },
  {
    id: 3,
    icon: <CurrentLeadSVG />,
    label: "label",
    component: <CRMBoard />,
    width: "90%",
    background: "#F82E8E",
  },
  {
    id: 4,
    icon: <NotesSVG2 />,
    label: "label",
    component: <CRMBoard />,
    width: "90%",
    background: "#3A5EE3",
  },
  {
    id: 5,
    icon: <ActivitiesSVG />,
    label: "label",
    component: <CRMBoard />,
    width: "90%",
    background: "#6A2EF8",
  },
];

const ContactIcons = [
  // { id: 8, icon: DiskTicket, label: "label", background: "#9CDBF6" },
  // { id: 9, icon: ChatSiderSVG, label: "label", background: "#9A42A9" },
  // { id: 10, icon: QueueSVG, label: "label", background: "#F82E8E" },
];

const WrapperSide = ({ children }) => {
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 55) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return children(scrollTop);
};
