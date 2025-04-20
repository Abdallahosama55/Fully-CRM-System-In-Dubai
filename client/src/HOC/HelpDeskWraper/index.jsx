import { useState } from "react";
import { Col, Grid, Row } from "antd";
import HelpDeskAsaid from "components/HelpDeskAsaid";
import MeetAsaider from "components/HelpDeskAsaid/MeetAsaider";

import "./styles.css";
export default function HelpDeskWraper({
  children,
  isHelpDesk,
  setIsHelpDesk,
}) {
  const [activeBtn, setActiveBtn] = useState("participant");
  const [hideSide, setHideSide] = useState(true);
  const screenSize = Grid.useBreakpoint();

  return (
    <Row
      className="help-desk-wraper"
      style={{ height: isHelpDesk && "100vh", width: "100%" }}
    >
      {isHelpDesk && (
        <Col>
          <HelpDeskAsaid
            isHelpDesk={isHelpDesk}
            setIsHelpDesk={setIsHelpDesk}
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
            setHideSide={setHideSide}
            hideSide={hideSide}
          />
        </Col>
      )}
      <Col flex={1}>{children}</Col>

      {isHelpDesk && !screenSize.xl && (
        <Col xs={24} xl={0}>
          <div className="help-desk-aside">
            <MeetAsaider
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setHideSide={setHideSide}
              isHelpDesk={isHelpDesk}
              setIsHelpDesk={setIsHelpDesk}
            />
          </div>
        </Col>
      )}
    </Row>
  );
}
