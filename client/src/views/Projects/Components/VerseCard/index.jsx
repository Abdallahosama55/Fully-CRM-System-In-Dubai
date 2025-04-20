import React from "react";
import { Col, Row, Dropdown } from "antd";
import { MoreDimentionSVG } from "assets/jsx-svg";
import { Link } from "react-router-dom";
import CardContent from "./CardContent";
import "./styles.css";
import { useDrag } from "react-dnd";

function VerseCard({
  data,
  setRenameModal,
  setVerseModalOpen,
  DimMenu,
  className,
  deleteDim,
  joinLink,
  settingLink,
  isMetaverseExternalLink,
  isOpenExternalPage,
  // linkStyle,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "FOLDER",
    item: { data },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Row
      ref={drag}
      gutter={[10, 10]}
      className={`explore-card verse-card`}
      style={{ height: "100%", opacity: isDragging ? 0.5 : 1 }}>
      <Col xs={24}>
        {DimMenu && (
          <Dropdown
            dropdownRender={() => DimMenu()}
            trigger={["click"]}
            placement="bottomRight"
            arrow>
            <div className="explore-card-options">
              <MoreDimentionSVG color="#030713" style={{ rotate: "0deg" }} />
            </div>
          </Dropdown>
        )}

        <CardContent
          data={data}
          className={className}
          isExternalLink={isMetaverseExternalLink}
          joinLink={joinLink}
          settingLink={settingLink}
          isOpenExternalPage={isOpenExternalPage}
        />
      </Col>
    </Row>
  );
}

export default VerseCard;
