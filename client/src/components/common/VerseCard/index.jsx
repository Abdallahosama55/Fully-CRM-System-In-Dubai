import { Col, Row, Dropdown } from "antd";
import { MoreSVG } from "assets/jsx-svg";
import { Link } from "react-router-dom";
import CardContent from "./CardContent";
import "./styles.css";

function VerseCard({
  data,
  styleImageTextHolder,
  DimMenu,
  className,
  isLoadingJoin,
  link,
  linkStyle,
  onClickJoinMeeting,
  onClick,
  deskDropdownVisible,
  setDeskDropdownVisible,
}) {
  return (
    <Row onClick={onClick} gutter={[10, 10]} className={`explore-card verse-card`}>
      <Col xs={24}>
        {DimMenu && (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown
              onOpenChange={(nextOpen, info) => {
                if (info.source === "trigger" || nextOpen) {
                  setDeskDropdownVisible({
                    open: nextOpen,
                    id: data.id,
                  });
                }
              }}
              open={deskDropdownVisible?.open && deskDropdownVisible?.id === data.id}
              dropdownRender={() => DimMenu()}
              trigger={["click"]}
              placement="bottomRight"
              arrow>
              <div className="explore-card-options">
                <MoreSVG color="#fff" style={{ rotate: "90deg" }} />
              </div>
            </Dropdown>
          </div>
        )}
        {link ? (
          <Link to={link} style={linkStyle}>
            <CardContent
              isLoadingJoin={isLoadingJoin}
              onClickJoinMeeting={onClickJoinMeeting}
              styleImageTextHolder={styleImageTextHolder}
              data={data}
              className={className}
            />
          </Link>
        ) : (
          <CardContent
            isLoadingJoin={isLoadingJoin}
            onClickJoinMeeting={onClickJoinMeeting}
            styleImageTextHolder={styleImageTextHolder}
            data={data}
            className={className}
          />
        )}
      </Col>
    </Row>
  );
}

export default VerseCard;
