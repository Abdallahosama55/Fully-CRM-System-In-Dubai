import { useContext, useState } from "react";
import { Avatar, Col, Dropdown, Menu, Row, Typography } from "antd";
import dayjs from "dayjs";

import PostsService from "services/posts.service";
import userContext from "context/userContext";
import { axiosCatch } from "utils/axiosUtils";
import { MoreSVG } from "assets/jsx-svg";
import { stringAvatar } from "utils/string";

export default function CommentReply({ reply, setRepliesList, setPostsList, postId }) {
  const { user } = useContext(userContext);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const own = user?.id === reply.accountId;

  const deleteReply = () => {
    setDeleteLoading(true);
    PostsService.deleteComment(reply.id)
      .then(() => {
        setRepliesList((prev) => prev.filter((rep) => rep.id !== reply.id));

        setPostsList((prev) => {
          const postIndex = prev.findIndex((post) => post.id === postId);
          const commentIndex = prev[postIndex].comment.findIndex(
            (comment) => comment.id === reply.postId,
          );
          let copy = [...prev];
          copy[postIndex].comment[commentIndex].comments -= 1;
          return [...copy];
        });
        setDeleteLoading(false);
      })
      .catch((err) => {
        setDeleteLoading(false);
        axiosCatch(err);
      });
  };

  const menu = (
    <Menu
      items={[
        own && {
          label: (
            <Typography.Text type="danger" className="fz-12 fw-500 w-100">
              Delete
            </Typography.Text>
          ),
          key: "2",
          onClick: deleteReply,
        },
      ]}
    />
  );

  return (
    <Row
      align="top"
      gutter={[8, 0]}
      wrap={false}
      className="reply-main"
      style={{ opacity: deleteLoading ? 0.5 : 1 }}>
      <Col>
        <Avatar
          size={32}
          src={reply.account.profileImage}
          className="center-items "
          {...(reply.account.profileImage ? {} : { ...stringAvatar(reply.account?.fullName) })}
        />
      </Col>
      <Col flex={1}>
        <Row className="reply-info">
          <Col xs={24}>
            <Row justify="space-between" align="middle" wrap={false}>
              <Col>
                <Typography.Text className="fw-600 underline reply-fullName" ellipsis>
                  {reply.account.fullName}
                </Typography.Text>
              </Col>
              <Col>
                <Row align="middle" gutter={[4, 0]}>
                  <Col>
                    <Row align="middle">
                      <Dropdown dropdownRender={() => menu} trigger={["click"]}>
                        <MoreSVG className="clickable" />
                      </Dropdown>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={23}>
            <Typography.Text className="reply-description">{reply.description}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography.Text className="fz-12" style={{ color: "#8e8e93" }}>
              {dayjs(reply.createdAt).fromNow()}
            </Typography.Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
