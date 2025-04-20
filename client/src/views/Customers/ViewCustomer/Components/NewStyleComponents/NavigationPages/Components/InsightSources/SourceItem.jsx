import { UserAddOutlined, WindowsFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import { CalenderSVG2, TimeSVG } from "assets/jsx-svg";

export const SourceItem = ({ type, name, time, date, from }) => {
  return (
    <div className="item">
      <div className="frame">
        {/* <img className="img" alt="Banner" src="image.svg" /> */}
        <Tooltip title={name}>
          <div className="meeting-ID">{name}</div>
        </Tooltip>
        <div className="div">#{type}</div>
      </div>
      <div className="frame-2">
        <div className="frame-3">
          {from in ICON_LABEL ? ICON_LABEL?.[from] ?? <></> : <></>}
          <div className="text-wrapper-2">
            from {from in FROM_LABEL ? FROM_LABEL?.[from] ?? from : from}
          </div>
        </div>

        {/* <Sources banner="banner-2.svg" className="sources-instance" property1="event" /> */}
        <div className="frame-3">
          <TimeSVG color="#030713"></TimeSVG>
          <div className="text-wrapper-2">{time}</div>
        </div>
        <div className="frame-4">
          <CalenderSVG2 color="#030713" />
          <div className="text-wrapper-2">{date}</div>
        </div>
      </div>
    </div>
  );
};

const ICON_LABEL = {
  FROM_COLLABORATION_WIDGET: <WindowsFilled style={{ color: "#0092D8" }} />,
  FROM_INVITED_PARTICIPANT: <UserAddOutlined style={{ color: "#0092D8" }} />,
};
const FROM_LABEL = {
  FROM_COLLABORATION_WIDGET: "Widget",
  FROM_INVITED_PARTICIPANT: "Participant",
};
