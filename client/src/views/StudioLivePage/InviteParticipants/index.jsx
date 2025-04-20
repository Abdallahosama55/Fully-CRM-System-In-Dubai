import { useContext, useEffect, useState } from "react";
import { Avatar, Button, Col, Input, Row, Typography, message } from "antd";

import { LineOutlined, LinkOutlined, LoadingOutlined } from "@ant-design/icons";
import { CopySVG, LinkSVG, PlusSVG, SearchSiderSVG, TrueSVG } from "assets/jsx-svg";
import { axiosCatch } from "utils/axiosUtils";
import userContext from "context/userContext";
import CommonService from "services/common.service";

import "./styles.css";

export default function InviteParticipants({ onEmployeeSelect, dropdownRef }) {
  const { user } = useContext(userContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invitedParticipants, setInvitedParticipants] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            setLoading(true);
            const res = await CommonService.searchFriends(searchQuery);

            setParticipants(res.data.data.filter((emp) => emp.id !== user.id));
          } catch (err) {
            axiosCatch(err);
          } finally {
            setLoading(false);
          }
        })();
      },
      searchQuery.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, user.id]);

  return (
    <Row className="invite-participants-menu" gutter={[0, 16]} ref={dropdownRef}>
      <Col xs={24}>
        <Row justify="space-between" gutter={[12, 0]}>
          <Col>
            <Typography.Text className="fz-12 fw-600">Add Participants</Typography.Text>
          </Col>
          <Col>
            <Row
              align="middle"
              gutter={[8, 0]}
              className="clickable"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                message.success("Link Copied Successfully");
              }}>
              <Col>
                <LinkOutlined className="fz-12 fw-500" style={{ color: "#3A5EE3" }} />
              </Col>
              <Col>
                <Typography.Text className="fz-12 fw-500" style={{ color: "#3A5EE3" }}>
                  Copy URL
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <Input
          placeholder="Search"
          addonAfter={
            <div className="clickable center-items">
              <SearchSiderSVG color="#000" />
            </div>
          }
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </Col>
      <Col xs={24}>
        <Row
          style={{
            maxHeight: "280px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          gutter={[0, 12]}
          justify="center">
          {loading ? (
            <LoadingOutlined />
          ) : (
            participants.map((participant) => {
              const invited = invitedParticipants.includes(participant.id);
              return (
                <Col
                  xs={24}
                  key={participant.id}
                  className="employee-item"
                  onClick={() => onEmployeeSelect(participant.id)}>
                  <Row justify="space-between" wrap={false} align="middle">
                    <Col flex={1}>
                      <Row align="middle" wrap={false} gutter={[16, 0]}>
                        <Col>
                          <Avatar
                            src={participant.profileImage}
                            size={32}
                            style={{ objectFit: "cover" }}
                          />
                        </Col>
                        <Col>
                          <Typography.Text ellipsis style={{ maxWidth: "145px" }} className="fz-12">
                            {participant.firstName} {participant.lastName}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Button
                        type="text"
                        style={{
                          padding: "6px",
                          pointerEvents: invited && "none",
                        }}
                        onClick={() => setInvitedParticipants((prev) => [...prev, participant.id])}>
                        <Row gutter={[8, 0]} wrap={false} align="middle">
                          <Col>
                            <Row align="middle">
                              {invited ? (
                                <TrueSVG />
                              ) : (
                                <PlusSVG fill="#000" width="8px" height="8px" />
                              )}
                            </Row>
                          </Col>
                          <Col>
                            <Typography.Text
                              className="fz-12 fw-500"
                              style={{ color: invited && "#3A5EE3" }}>
                              {invited ? "Sent" : "Invite"}
                            </Typography.Text>
                          </Col>
                        </Row>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              );
            })
          )}
        </Row>
      </Col>
    </Row>
  );
}
