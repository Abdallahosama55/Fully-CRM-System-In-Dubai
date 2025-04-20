import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, Card, Col, Divider, Flex, Row, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  LoadingOutlined,
  NotificationOutlined,
  TagsOutlined,
} from "@ant-design/icons";

import useDeleteCommunity from "services/Community/Mutations/useDeleteCommunity";
import startMeetBg from "assets/images/startMeetBgV2.jpg";
import houseImage from "assets/images/house.png";
import { AvatarShapeSVG, EmailSVG } from "assets/jsx-svg";
import { stringAvatar } from "utils/string";

export default function CommunityCard({ community, listCommunityQueryKey }) {
  const queryClient = useQueryClient();
  const { mutate: deleteCommunity, isPending: isDeleteCommunityPending } = useDeleteCommunity({
    onSuccess: (_, communityId) => {
      queryClient.setQueryData(listCommunityQueryKey, (prev) => {
        const newData = prev.data.data.rows.filter((community) => community.id !== communityId);

        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              rows: newData,
            },
          },
        };
      });
    },
  });

  return (
    <NavLink to={`/community/${community.id}`}>
      <div className="community-list-card">
        <div className="community-list-card-header">
          <Flex gap={8} className="community-list-card-header-actions">
            <NavLink
              to={`/community/edit/${community.id}`}
              className="community-list-card-header-btn">
              <EditOutlined style={{ color: "#000" }} />
            </NavLink>
            <div
              className="community-list-card-header-btn"
              onClick={(e) => {
                e.preventDefault();
                deleteCommunity(community.id);
              }}>
              {isDeleteCommunityPending ? (
                <LoadingOutlined style={{ color: "#000" }} />
              ) : (
                <DeleteOutlined style={{ color: "#000" }} />
              )}
            </div>
          </Flex>
          <img src={community.banner || startMeetBg} className="community-list-card-banner" />
          <AvatarShapeSVG
            image={community.logo || houseImage}
            className="community-list-card-logo"
          />
        </div>

        <div className="community-list-card-body">
          <Flex vertical gap={6}>
            <Typography.Text className="fz-16 fw-600">{community.name}</Typography.Text>
            <Typography.Text className="fz-12 gc">{community.decription}</Typography.Text>
            {community.keywords && (
              <Flex gap={12} align="center">
                <KeyOutlined style={{ color: "#000" }} />{" "}
                <div>
                  {community.keywords.split(",").map((tag) => (
                    <Tag key={tag} color="green">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Flex>
            )}

            {community.tags && (
              <Flex gap={12} align="center">
                <TagsOutlined style={{ color: "#000" }} />
                <div>
                  {community.tags.split(",").map((tag) => (
                    <Tag key={tag} color="magenta">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Flex>
            )}

            {community.interests && (
              <Flex gap={12} align="center">
                <NotificationOutlined style={{ color: "#000" }} />{" "}
                <div>
                  {community.interests.split(",").map((tag) => (
                    <Tag key={tag} color="orange">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Flex>
            )}
          </Flex>

          <Divider />
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                {community.company.name && (
                  <Flex align="center" gap={8}>
                    <Avatar
                      src={community.company.image || houseImage}
                      size={48}
                      style={{ marginRight: "12px" }}
                      {...(community.company.image
                        ? {}
                        : { ...stringAvatar(community.company.name) })}
                    />
                    <div>
                      <Typography.Text strong className="fz-16">
                        {community.company.name}
                      </Typography.Text>
                      <br />
                      {community.company.domain && (
                        <Typography.Text type="secondary">
                          {community.company.domain}
                        </Typography.Text>
                      )}
                    </div>
                  </Flex>
                )}
              </Col>
            </Row>

            <Divider style={{ margin: "12px 0" }} />

            {community.company.email && (
              <Flex gap={8} align="center" className="info-row">
                <EmailSVG width={14} />
                <Typography.Text>{community.company.email}</Typography.Text>
              </Flex>
            )}
          </Card>
        </div>
      </div>
    </NavLink>
  );
}
