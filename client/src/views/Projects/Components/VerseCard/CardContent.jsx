import React, { useState } from "react";
import { Image, Typography, Avatar, Row, Col } from "antd";
import defaultDim from "assets/images/house.png";
import "./styles.css";
import newColorFind from "utils/randomColor";
import { Link, useNavigate } from "react-router-dom";
import IframeModal from "components/common/IframeModal";

function CardContent({ className, data, settingLink, isExternalLink, joinLink, isOpenExternalPage }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={`${className}`} style={{ position: "relative", height: "100%" }}>
      {(!isOpenExternalPage && isExternalLink) && <IframeModal title={data?.name} isOpen={isOpen} close={() => setIsOpen(false)} link={joinLink} />}
      <div className="image-holder">
        {!isExternalLink ? (
          <Link to={settingLink}>
            <Image
              preview={false}
              src={data?.image || defaultDim}
              alt="dimension"
              width="100%"
              height="100%"
              className="explore-card-img"
            />
          </Link>
        ) : (
          <Image
            style={{ cursor: "pointer" }}
            onClick={() => !isOpenExternalPage ? setIsOpen(true) : window.location.assign(`${settingLink}`)}
            preview={false}
            src={data?.image || defaultDim}
            alt="dimension"
            width="100%"
            height="100%"
            className="explore-card-img"
          />
        )}
      </div>
      <div className="image-text-holder">
        <Row align="middle" justify="space-between">
          <Col>
            <Row>
              <Col xs={24}>
                {" "}
                <Typography.Text
                  className="explore-card-subtitle"
                  ellipsis
                  style={{ fontWeight: 500 }}>
                  {data?.name}
                </Typography.Text>
              </Col>
              <Col xs={24}>
                {data?.employees && (
                  <div className="employees">{data?.employees?.length} Employees</div>
                )}
              </Col>
            </Row>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {!isExternalLink ? (
                  <Link to={joinLink}>
                    <button className="join-btn">Join</button>
                  </Link>
                ) : (
                  !isOpenExternalPage ? <button
                onClick={() => setIsOpen(true)}
                className="join-btn">
                Join
              </button> : <button
                    onClick={() => window.location.assign(`//${joinLink}`)}
                    className="join-btn">
                    Join
                  </button>
                )
                
                
                
              }
            </div>
            {data?.employees && (
              <Avatar.Group
                maxCount={2}
                size={"small"}
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}>
                {data?.employees?.map((employee) => (
                  <Avatar
                    size={"small"}
                    src={employee?.account?.profileImage}
                    key={employee?.account?.id}
                    icon={<div>{employee?.account?.fullName?.slice(0, 2)}</div>}
                    style={{
                      backgroundColor:
                        !employee?.account?.profileImage &&
                        `${newColorFind(employee?.account?.id)}`,
                    }}
                  />
                ))}
              </Avatar.Group>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CardContent;
