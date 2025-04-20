import React from "react";
import { Image, Typography, Avatar, Row, Col, Button, Flex, Tooltip } from "antd";
import defaultDim from "assets/images/house.png";
import "./styles.css";
import newColorFind from "utils/randomColor";

function CardContent({
  className,
  data,
  styleImageTextHolder = {},
  onClickJoinMeeting,
  isLoadingJoin,
}) {
  return (
    <div
      className={`${className}`}
      style={{
        position: "relative",
      }}>
      <div style={{ position: "relative" }} className="image-holder">
        <Image
          preview={false}
          src={data?.image || defaultDim}
          alt="dimension"
          width="100%"
          height="167px"
          className="explore-card-img"
        />
        <Avatar.Group
          maxCount={3}
          size={"small"}
          style={{ position: "absolute", bottom: 8, left: 8 }}
          maxStyle={{
            color: "white",
            backgroundColor: "#3A5EE380",
          }}>
          {data?.employees?.map((employee) => (
            <Avatar
              size={"small"}
              src={employee?.account?.profileImage}
              key={employee.id}
              icon={<div>{employee?.account?.fullName?.slice(0, 2)}</div>}
              style={{
                backgroundColor: !employee?.account?.profileImage && `${newColorFind(employee.id)}`,
              }}
            />
          ))}
        </Avatar.Group>{" "}
      </div>
      <div style={styleImageTextHolder} className="image-text-holder">
        <Row align="middle" justify="space-between">
          <Col>
            <Row>
              <Col xs={24}>
                {" "}
                <Typography.Text className="explore-card-subtitle" ellipsis>
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
            <Flex gap={4}>
              {onClickJoinMeeting && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Tooltip trigger={"hover"} title="Join desk">
                    <Button
                      loading={isLoadingJoin}
                      onClick={onClickJoinMeeting}
                      size="small"
                      style={{
                        borderRadius: "10px",
                        color: "white",
                        background: " #3A5EE3",
                      }}>
                      Join
                    </Button>
                  </Tooltip>
                </div>
              )}
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CardContent;
