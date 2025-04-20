import { Col, Grid, Row } from "antd";

import MeetAsaider from "./MeetAsaider";
import MeetNavigateSide from "./MeetNavigateSide";

import "./styles.css";

export default function HelpDeskAsaid({
  isHelpDesk,
  setIsHelpDesk,
  activeBtn,
  setActiveBtn,
  hideSide,
  setHideSide,
}) {
  const screenSize = Grid.useBreakpoint();

  return (
    <Row wrap={false} className="h-100 help-desk">
      <Col flex={hideSide && 1} className="help-desk-nav-sider-holder">
        <div className="help-desk-nav-sider">
          <MeetNavigateSide
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
            setHideSide={setHideSide}
            setIsHelpDesk={setIsHelpDesk}
          />
        </div>
      </Col>
      {!hideSide && (screenSize.xl || screenSize.xxl) && (
        <Col flex={1} className="help-desk-aside-hide">
          <div className="help-desk-aside">
            <MeetAsaider
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setHideSide={setHideSide}
              isHelpDesk={isHelpDesk}
            />
          </div>
        </Col>
      )}
    </Row>
  );
}
