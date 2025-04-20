import { Col, Row, Typography } from "antd";
import "./styles.css";
import { EyeSVG } from "assets/jsx-svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { addOpacityToColor } from "utils/color-picker";
import shortenString from "components/common/shortenString";

function Index({ piplineName, piplineId, stages }) {
  const navigate = useNavigate();

  const handelViewPipline = () => {
    navigate("/crm/pipelines/" + piplineId);
  };
  return (
    <div className="pipline-card">
      <div className="title">
        <h3>{piplineName}</h3>
        <span title="View" className="view-button" onClick={handelViewPipline}>
          <EyeSVG /> View
        </span>
      </div>
      <div className="pipline-stages-section">
        <Row gutter={[7, 7]}>
          {stages
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <Col span={8}>
                <div
                  className="stage-item"
                  style={{ background: addOpacityToColor(item?.color ?? "black", 0.12) }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography.Text title={item.label}>
                      {shortenString(item.label, 7)}
                    </Typography.Text>
                  </div>
                  <div style={{ background: item.color }} className="number-of-card">
                    {item.count}
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Index;
