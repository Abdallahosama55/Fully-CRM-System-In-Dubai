import { useContext, useState, useEffect } from "react";
import { Avatar, Button, Col, Dropdown, Form, Input, Menu, Row, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";

import MoreSVG from "assets/jsx-svg/MoreSVG";
import LikeSVG from "assets/jsx-svg/LikeSVG";
import PostsService from "services/posts.service";
import userContext from "context/userContext";

import CommentReply from "./CommentReply";
import { axiosCatch } from "utils/axiosUtils";
import { LoveSVG, ReactionSVG } from "assets/jsx-svg";
import { stringAvatar } from "utils/string";

import "./styles.css";

export default function PostComment({
  comment,
  postId,
  repliesCount,
  id,
  isLiked,
  accountId,
  setPostsList,
}) {
  const [form] = useForm();
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);
  const [addReplyLoading, setAddReplyLoading] = useState(false);
  const [getReplyLoading, setGetReplyLoading] = useState(false);
  const [repliesOffest, setRepliesOffest] = useState(0);
  const [repliesList, setRepliesList] = useState([]);
  const [repliesListCount, setRepliesListCount] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleShowReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const toggleShowReplyInput = () => {
    setShowReplyInput((prev) => !prev);
  };

  const toggleLike = () => {
    PostsService.togglePostLike(id)
      .then(() => {
        setPostsList((prev) => {
          const postIndex = prev.findIndex((post) => post.id === postId);
          if (postIndex > -1) {
            const commentIndex = prev[postIndex].comment.findIndex((comment) => comment.id === id);
            let copy = [...prev];

            if (isLiked) {
              copy[postIndex].comment[commentIndex].communityPostLikes = [];
              copy[postIndex].comment[commentIndex].likes -= 1;
            } else {
              copy[postIndex].comment[commentIndex].communityPostLikes = [accountId];
              copy[postIndex].comment[commentIndex].likes += 1;
            }
            return [...copy];
          }
          return prev;
        });
      })
      .catch(axiosCatch);
  };

  const getReplies = () => {
    if (user) {
      setGetReplyLoading(true);
      PostsService.getPostComments(id, repliesOffest, 3, repliesList[0]?.createdAt)
        .then(({ data }) => {
          setRepliesList((prev) => [...prev, ...data.data.rows]);
          setRepliesOffest((prev) => prev + data.data.rows.length);
          setRepliesListCount(data.data.count);
          setGetReplyLoading(false);
        })
        .catch(axiosCatch);
    }
  };

  useEffect(() => {
    if (repliesCount > 0) {
      getReplies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (repliesOffest >= repliesListCount) {
      setIsEndOfList(true);
    } else {
      setIsEndOfList(false);
    }
  }, [repliesListCount, repliesOffest]);

  const deleteComment = () => {
    setDeleteCommentLoading(true);
    PostsService.deleteComment(id)
      .then(() =>
        setPostsList((prev) => {
          const postIndex = prev.findIndex((post) => post.id === postId);
          prev[postIndex].comment = prev[postIndex].comment.filter((comment) => comment.id !== id);
          prev[postIndex].comments -= 1;
          return [...prev];
        }),
      )
      .catch(axiosCatch);
  };

  const onFinish = (values) => {
    setAddReplyLoading(true);
    form.setFieldValue("reply", "");
    PostsService.addPostComment(id, values.reply)
      .then(({ data }) => {
        delete data.data.files;
        delete data.data.deletedAt;

        setRepliesList((prev) => [
          {
            ...data.data,
            account: {
              fullName: user.fullName,
              profileImage: user.profileImage,
            },
          },
          ...prev,
        ]);

        setPostsList((prev) => {
          const postIndex = prev.findIndex((post) => post.id === postId);
          const commentIndex = prev[postIndex].comment.findIndex((comment) => comment.id === id);
          let copy = [...prev];
          copy[postIndex].comment[commentIndex].comments += 1;
          return [...copy];
        });
        setAddReplyLoading(false);
      })
      .catch(axiosCatch);

    setShowReplies(true);
  };

  const own = user?.accountId === accountId;
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Typography.Text type="danger" className="fz-12 fw-500 w-100">
              Delete
            </Typography.Text>
          ),
          key: "1",
          onClick: deleteComment,
        },
      ]}
    />
  );

  return (
    <section>
      <Form form={form} name={`comments-${id}`} onFinish={onFinish} className="mb-1">
        <Row
          align="top"
          gutter={[0, 0]}
          wrap={false}
          className="comment-main"
          style={{
            opacity: deleteCommentLoading ? 0.5 : 1,
            margin: "1rem",
            columnGap: "16px",
          }}>
          <Col>
            <Avatar
              size={32}
              src={comment.profilePi}
              className="center-items"
              {...(comment.profilePi ? {} : { ...stringAvatar(user?.fullName) })}
            />
          </Col>
          <Col flex={1}>
            <Row className="comment-info">
              <Col xs={24}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Typography.Text className="fw-600 fz-14 underline" ellipsis>
                      {comment.userName}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Row align="middle" gutter={[4, 0]}>
                      <Col>
                        {isLiked ? (
                          <Row
                            align="middle"
                            onClick={toggleLike}
                            className="clickable center-items">
                            <LikeSVG width={16} color="#E81224" />
                          </Row>
                        ) : (
                          <Typography.Text
                            onClick={toggleLike}
                            className="comments-actions center-items">
                            <LoveSVG width={16} />
                          </Typography.Text>
                        )}
                      </Col>
                      <Col>
                        <Row align="middle">
                          {own ? (
                            <Dropdown dropdownRender={() => menu} trigger={["click"]}>
                              <MoreSVG className="clickable" />
                            </Dropdown>
                          ) : null}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={23}>
                <Typography.Text className="comment-comment">{comment.comment}</Typography.Text>
              </Col>
            </Row>
            <Row align="middle" gutter={[16, 0]} className="comment-interactions">
              <Col>
                <Typography.Text className="fz-12" style={{ color: "#8E8E93" }}>
                  {dayjs(comment.date).fromNow()}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text onClick={toggleShowReplyInput} className="comments-actions fz-12">
                  Reply
                </Typography.Text>
              </Col>
              {repliesCount > 0 && (
                <Col>
                  <Typography.Text
                    className="comments-actions"
                    style={{ pointerEvents: user ? "auto" : "none" }}
                    onClick={() => {
                      if (user) {
                        toggleShowReplies();
                      }
                    }}>
                    {user ? (showReplies ? "Hide" : "Show") : ""} Replies ({repliesCount})
                  </Typography.Text>
                </Col>
              )}
            </Row>

            {user && showReplyInput && (
              <Row align="middle" gutter={[8, 0]} wrap={false} className="reply-input">
                <Col>
                  <Avatar
                    size={32}
                    src={user?.profileImage}
                    className="clickable"
                    {...stringAvatar(user?.fullName)}
                    onClick={() => navigate(`/profile/${user?.id}`)}
                  />
                </Col>
                <Col flex={1}>
                  <Form.Item name="reply" noStyle>
                    <Input
                      className="comment-input"
                      placeholder="Reply"
                      disabled={addReplyLoading}
                      autoFocus
                      suffix={
                        <Row style={{ columnGap: "14px" }}>
                          {addReplyLoading ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} />} />
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
                                      "reply",
                                      form.getFieldValue("reply")
                                        ? form.getFieldValue("reply") + emoji.native
                                        : emoji.native,
                                    );
                                  }}
                                  portal={false}
                                  onClickOutside={() => setOpen(false)}
                                />
                              )}>
                              <div
                                className="clickable center-items"
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
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}

            {showReplies &&
              repliesCount > 0 &&
              repliesList.map((reply) => {
                return (
                  <CommentReply
                    key={reply.id}
                    reply={reply}
                    postId={postId}
                    setRepliesList={setRepliesList}
                    setPostsList={setPostsList}
                    accountId={accountId}
                  />
                );
              })}
            <Row justify="start">
              {!isEndOfList && showReplies && !getReplyLoading && (
                <Button
                  type="text"
                  onClick={getReplies}
                  style={{ minWidth: "100px" }}
                  className="fw-500 fz-14">
                  Show more replies
                </Button>
              )}
              {getReplyLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} />} />}
            </Row>
          </Col>
        </Row>
      </Form>
    </section>
  );
}
