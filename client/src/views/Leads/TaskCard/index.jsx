import { Draggable } from "react-beautiful-dnd";
import "./styles.css";
import { Avatar, Divider, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import {
  CallSVG,
  DateSVG,
  EnvelopeRegularSVG,
  PersonSVG,
  UsersThreeRegularSVG,
} from "assets/jsx-svg";
import dayjs from "dayjs";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import LeadsPopover from "../LeadsPopover";
import { useDrawer } from "context/drawerContext";
import CRMBoard from "components/crm-board";
import shortenString from "components/common/shortenString";
const TaskCard = ({ item, index, popover, handleOnLeadClick }) => {
  return (
    <Draggable key={item.id} draggableId={item.id + "999999"} index={index}>
      {(provided, snapshot) => (
        <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
          {(style) => (
            <div>
              {snapshot.isDragging && <div className="placeholder"></div>}
              <LeadsPopover popover={popover}>
                <div
                  onClick={handleOnLeadClick}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="leads-card"
                  style={style}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        gap: "7px",
                      }}>
                      <div>{item.title}</div>
                      <div>${item.budget}</div>
                      {/* <div>{item.app}</div> */}
                    </div>
                    <div className="header-pointer-color" style={{ background: item?.color }}></div>
                  </div>
                  <Divider style={{ margin: "5px 0px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "7px" }}>
                      <div>
                        <Avatar
                          size={32}
                          icon={<AntDesignOutlined />}
                          src={item?.customer?.profileImage}
                        />
                      </div>
                      <div>
                        <div className="name" title={item?.customer?.account?.fullName}>
                          {item?.customer?.account?.fullName
                            ? shortenString(item?.customer?.account?.fullName)
                            : "-"}
                        </div>
                        <div className="time">
                          <DateSVG width={"9px"} height="9px" color="#aeaeb2" />
                          {dayjs(item.createdAt).format("ddd, MMMM D, YYYY")}
                        </div>
                      </div>
                    </div>
                    <div className="members">
                      <Avatar
                        size={32}
                        icon={<AntDesignOutlined />}
                        src={item?.assignee?.profileImage || "-"}
                      />
                    </div>
                  </div>
                  <div className="assignee-by">
                    <PersonSVG
                      width="8px"
                      color="#000"
                      height="8px"
                      style={{ marginRight: "2px" }}
                    />
                    By {item?.assignee?.account?.fullName || "-"}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "14.5px",
                    }}>
                    <div className="status">Via {item?.source || "-"}</div>
                    <div style={{ display: "flex", gap: "7px" }}>
                      <div className="icon">
                        <CallSVG color={"#000"} width="10px" height="10px" />
                      </div>
                      <div className="icon">
                        <EnvelopeRegularSVG />
                      </div>
                      <div className="icon">
                        <UsersThreeRegularSVG />
                      </div>
                    </div>
                  </div>
                </div>
              </LeadsPopover>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
};

export default TaskCard;
