import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Card, Col, Divider, Flex, Row, Tag, Typography } from "antd";
import { KeyOutlined, NotificationOutlined, TagsOutlined } from "@ant-design/icons";

import useGetCommunityById from "services/Community/Querys/useGetCommunityById";
import LoadingPage from "components/common/LoadingPage";
import CreatePost from "components/CreatePost";
import Posts from "components/Posts";

import { AvatarShapeSVG, EmailSVG } from "assets/jsx-svg";
import houseImage from "assets/images/house.png";
import { axiosCatch } from "utils/axiosUtils";
import { stringAvatar } from "utils/string";

import "./styles.css";

export default function CommunityView() {
  const { communityId } = useParams();
  const [postsList, setPostsList] = useState([]);

  const getCommunityByIdQuery = useGetCommunityById(communityId, {
    select: (res) => res.data.data,
  });

  useEffect(() => {
    if (getCommunityByIdQuery.isError) {
      axiosCatch(getCommunityByIdQuery.error);
    }
  }, [getCommunityByIdQuery.error, getCommunityByIdQuery.isError]);

  console.log("getCommunityByIdQuery", getCommunityByIdQuery);

  if (getCommunityByIdQuery.isLoading) {
    return <LoadingPage />;
  }

  if (!getCommunityByIdQuery?.data) {
    return <>There's no community with this id</>;
  }
  return (
    <main className="community-main-view">
      <div
        className="community-main-view-header"
        style={{ background: `url(${getCommunityByIdQuery.data.banner || houseImage})` }}>
        <Flex
          justify="space-between"
          align="center"
          gap={16}
          className="community-main-view-header-info">
          <Flex align="center" gap={12}>
            <AvatarShapeSVG
              image={getCommunityByIdQuery.data.logo || houseImage}
              setPostsList={setPostsList}
            />
            <Flex vertical gap={4}>
              <Typography.Text className="fz-22 fw-700">
                {getCommunityByIdQuery.data.name}
              </Typography.Text>
              <Typography.Text>{getCommunityByIdQuery.data.decription}</Typography.Text>
            </Flex>
          </Flex>

          <Flex vertical gap={6}>
            {getCommunityByIdQuery.data.keywords && (
              <Flex gap={12} align="center">
                <KeyOutlined style={{ color: "#000" }} />{" "}
                <div>
                  {getCommunityByIdQuery.data.keywords.split(",").map((tag) => (
                    <Tag color="green" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Flex>
            )}

            {getCommunityByIdQuery.data.tags && (
              <Flex gap={12} align="center">
                <TagsOutlined style={{ color: "#000" }} />
                <div>
                  {getCommunityByIdQuery.data.tags.split(",").map((tag) => (
                    <Tag color="magenta" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Flex>
            )}

            {getCommunityByIdQuery.data.interests && (
              <Flex gap={12} align="center">
                <NotificationOutlined style={{ color: "#000" }} />{" "}
                <div>
                  {getCommunityByIdQuery.data.interests.split(",").map((tag) => (
                    <Tag color="orange" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Flex>
            )}
          </Flex>

          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                {getCommunityByIdQuery?.data.company.name && (
                  <Flex align="center" gap={8}>
                    <Avatar
                      src={getCommunityByIdQuery?.data.company.image || houseImage}
                      size={48}
                      style={{ marginRight: "12px" }}
                      {...(getCommunityByIdQuery?.data.company.image
                        ? {}
                        : { ...stringAvatar(getCommunityByIdQuery?.data.company.name) })}
                    />
                    <div>
                      <Typography.Text strong className="fz-16">
                        {getCommunityByIdQuery?.data.company.name}
                      </Typography.Text>
                      <br />
                      {getCommunityByIdQuery?.data.company.domain && (
                        <Typography.Text type="secondary">
                          {getCommunityByIdQuery?.data.company.domain}
                        </Typography.Text>
                      )}
                    </div>
                  </Flex>
                )}
              </Col>
            </Row>

            <Divider style={{ margin: "12px 0" }} />

            {getCommunityByIdQuery?.data.company.email && (
              <Flex gap={8} align="center" className="info-row">
                <EmailSVG width={14} />
                <Typography.Text>{getCommunityByIdQuery?.data.company.email}</Typography.Text>
              </Flex>
            )}
          </Card>
        </Flex>
      </div>

      <div className="community-main-view-body">
        <CreatePost setPostsList={setPostsList} />
        <Posts postsList={postsList} setPostsList={setPostsList} />
      </div>
    </main>
  );
}
