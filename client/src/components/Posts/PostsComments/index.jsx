import { useState, useContext } from "react";
import { Avatar, Button, Col, Dropdown, Form, Input, Row, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import PostComment from "./PostComment";
import { useForm } from "antd/es/form/Form";
import PostsService from "services/posts.service";
import userContext from "context/userContext";
import { axiosCatch } from "utils/axiosUtils";
import { ReactionSVG } from "assets/jsx-svg";
import { stringAvatar } from "utils/string";

import "./styles.css";

export default function PostsComments({
  postId,
  commentsCount,
  commentList,
  setPostsList,
  inputRef,
}) {
  const [form] = useForm();
  const { user } = useContext(userContext);
  const [commentsOffset, setCommentsOffset] = useState(3);
  const [hasMoreItems, setHasMoreItems] = useState(commentsCount > 3);
  const [loadCommentsLoading, setLoadCommentsLoading] = useState(false);
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const loadComments = (offest) => {
    setLoadCommentsLoading(true);
    PostsService.getPostComments(postId, offest, 3, commentList[0]?.createdAt)
      .then(({ data }) => {
        setCommentsOffset((prev) => prev + data.data.rows.length);
        setPostsList((prev) => {
          const postIndex = prev.findIndex((post) => post.id === postId);
          let copy = [...prev];
          copy[postIndex].comment = copy[postIndex].comment.concat(data.data.rows);
          return [...copy];
        });

        if (commentsOffset + data.data.rows.length >= commentsCount) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        setLoadCommentsLoading(false);
      })
      .catch((err) => {
        setLoadCommentsLoading(false);
        axiosCatch(err);
      });
  };
  const onFinish = (values) => {
    if (user) {
      setAddCommentLoading(true);
      PostsService.addPostComment(postId, values.comment)
        .then(({ data }) => {
          delete data.data.files;
          delete data.data.deletedAt;

          setPostsList((prev) => {
            const postIndex = prev.findIndex((post) => post.id === postId);
            let copy = [...prev];
            copy[postIndex].comment.unshift({
              ...data.data,
              communityPostLikes: [],
              account: {
                fullName: user.fullName,
                profileImage: user.profileImage,
              },
            });
            copy[postIndex].comments += 1;
            return [...copy];
          });
          setAddCommentLoading(false);
        })
        .catch((err) => {
          setAddCommentLoading(false);
          axiosCatch(err);
        });
      form.setFieldValue("comment", "");
    }
  };

  return (
    <section>
      <Form form={form} onFinish={onFinish} className="mb-16">
        <Row
          align="middle"
          gutter={[0, 0]}
          wrap={false}
          style={{ margin: "0 1rem", columnGap: "16px" }}>
          <Col>
            <Avatar
              size={32}
              src={user?.profileImage}
              className="center-items clickable"
              {...(user?.profileImage ? {} : { ...stringAvatar(user?.fullName) })}
            />
          </Col>
          <Col flex={1}>
            <Form.Item name="comment" noStyle>
              <Input
                ref={inputRef}
                className="comment-input"
                style={{
                  opacity: addCommentLoading ? 0.5 : 1,
                }}
                placeholder="Write a Comment"
                suffix={
                  <Row style={{ columnGap: "14px" }}>
                    {addCommentLoading ? (
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} />} spinning />
                    ) : (
                      <Dropdown
                        trigger={["click"]}
                        placement="topLeft"
                        open={open}
                        dropdownRender={() => (
                          <Picker
                            data={data}
                            onEmojiSelect={(emoji) => {
                              form.setFieldValue(
                                "comment",
                                form.getFieldValue("comment")
                                  ? form.getFieldValue("comment") + emoji.native
                                  : emoji.native,
                              );
                            }}
                            portal={false}
                            onClickOutside={() => setOpen(false)}
                          />
                        )}>
                        <div
                          className="clickable center-items"
                          style={{ display: "flex" }}
                          onClick={() => {
                            setTimeout(() => {
                              setOpen((prev) => !prev);
                            }, 10);
                          }}>
                          <ReactionSVG width="16px" height="16px" color="#D1D1D6" />
                        </div>
                      </Dropdown>
                    )}
                  </Row>
                }
                disabled={addCommentLoading}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {addCommentLoading && (
        <Row justify="center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} spinning />
        </Row>
      )}

      {commentList.length > 0 &&
        commentList.map((comment) => {
          return (
            <PostComment
              key={comment.id}
              id={comment.id}
              comment={{
                comment: comment.description,
                userName: comment.account.fullName,
                profilePic: comment.account.profileImage,
                date: comment.createdAt,
              }}
              repliesCount={comment.comments}
              postId={comment.communityPostId}
              likesCount={comment.likes}
              isLiked={comment.communityPostLikes?.length > 0}
              accountId={comment.accountId}
              setPostsList={setPostsList}
            />
          );
        })}
      <Row justify="start" style={{ marginTop: 10, marginLeft: "16px" }}>
        {!hasMoreItems && commentsCount > 0 ? (
          <Typography.Text className="fw-500 fz-14">No more comments to show.</Typography.Text>
        ) : hasMoreItems && commentsCount > 0 ? (
          <Button
            type="text"
            style={{ minWidth: "100px" }}
            className="fw-500 fz-14"
            loading={loadCommentsLoading}
            onClick={() => loadComments(commentsOffset)}>
            View More Comments
          </Button>
        ) : null}
        {commentsCount === 0 && <Typography.Text>Be the first person to comment.</Typography.Text>}
      </Row>
    </section>
  );
}
