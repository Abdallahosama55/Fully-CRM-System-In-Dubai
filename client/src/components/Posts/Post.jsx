import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Dropdown,
  Image,
  Menu,
  Modal,
  notification,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { ControlBar, PlayToggle, Player } from "video-react";

import {
  ArchiveSVG,
  CalenderBtnSVG,
  Comment2SVG,
  GroupsSVG,
  ImagesGallarySVG,
  LikeSVG,
  MoreSVG,
  ShareArObjectSVG,
  TimeSVG,
} from "assets/jsx-svg";

import defaultEvent from "assets/images/defaultEvent.jpeg";

import userContext from "context/userContext";
import PostsService from "services/posts.service";
import PostsComments from "./PostsComments";
import EditPost from "./EditPost";

import "./styles.css";
import { axiosCatch } from "utils/axiosUtils";
import { useRef } from "react";
import SocialEventService from "services/social-event.service";
import dayjs from "dayjs";
import { LoadingOutlined, SwapRightOutlined, UserOutlined } from "@ant-design/icons";
import TextUrl from "components/TextUrl";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video-react/dist/video-react.css";
import Slider from "react-slick";
import { stringAvatar } from "utils/string";

export default function Post({
  id,
  avatarPic,
  communityPostLikes = [],
  userName,
  date,
  postImages,
  postDescription,
  likes,
  commentsCount,
  profile,
  isLiked,
  accountId,
  isHidden,
  commentList,
  setPostsList,
  type,
  eventData,
  isEvent,
  eventId,
}) {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const inputRef = useRef();
  const [ellipsis, setEllipsis] = useState(true);
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [attendEventLoading, setAttendEventLoading] = useState(false);
  const [swiping, setSwiping] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    onSwipe: () => setSwiping(true),
    afterChange: () => setSwiping(false),
  };
  const own = user?.accountId === accountId;
  const regex = /https?:\/\/(www\.)?vverse\.co\/metaverse[^ ]*/g;

  function isImageOrVideo(url) {
    // Get the file extension from the URL
    var extension = url?.split(".").pop().toLowerCase();

    // List of image and video extensions
    var imageExtensions = ["jpg", "jpeg", "png", "gif"];
    var videoExtensions = ["mp4", "avi", "mov", "wmv"];

    // Check if the extension is in the image or video extensions list
    if (imageExtensions.includes(extension)) {
      return "image";
    } else if (videoExtensions.includes(extension)) {
      return "video";
    } else {
      return "unknown";
    }
  }

  const deletePost = () => {
    setDeleteLoading(true);
    PostsService.deletePost(id)
      .then(() => {
        setPostsList((prev) => prev.filter((post) => post.id !== id));
        notification.success({ message: "Post Deleted Successfuly ✔" });
        setDeleteLoading(false);
      })
      .catch((err) => {
        axiosCatch(err);
        setDeleteLoading(false);
      });
  };

  const toggleHidePost = () => {
    setDeleteLoading(true);
    if (isHidden) {
      PostsService.hideUnhidePost(id)
        .then(() => {
          setPostsList((prev) => {
            const postIndex = prev.findIndex((post) => post.id === id);
            let copy = [...prev];
            copy[postIndex].isPrivate = false;
            return [...copy];
          });
          notification.success({ message: "Post un-hidden Successfuly ✔" });
          setDeleteLoading(false);
        })
        .catch((err) => {
          axiosCatch(err);
          setDeleteLoading(false);
        });
    } else {
      PostsService.hideUnhidePost(id)
        .then(() => {
          setPostsList((prev) => {
            const postIndex = prev.findIndex((post) => post.id === id);
            let copy = [...prev];
            copy[postIndex].isPrivate = true;
            return [...copy];
          });
          notification.success({ message: "Post hidden Successfuly ✔" });
          setDeleteLoading(false);
        })
        .catch((err) => {
          axiosCatch(err);
          setDeleteLoading(false);
        });
    }
  };

  const toggleLike = () => {
    setPostsList((prev) => {
      const postIndex = prev.findIndex((post) => post.id === id);
      let copy = [...prev];
      if (isLiked) {
        copy[postIndex].communityPostLikes = copy[postIndex].communityPostLikes.filter(
          (likes) => likes.accountId !== user.accountId,
        );
        copy[postIndex].likes -= 1;
      } else {
        copy[postIndex].communityPostLikes = [
          ...copy[postIndex].communityPostLikes,
          {
            account: {
              profileImage: user.profileImage,
            },
            postId: id,
            accountId: user.accountId,
          },
        ];
        copy[postIndex].likes += 1;
      }
      return [...copy];
    });

    PostsService.togglePostLike(id)
      .then(() => {})
      .catch((err) => {
        setPostsList((prev) => prev);
        axiosCatch(err);
      });
  };

  const attendEvent = () => {
    setAttendEventLoading(true);
    SocialEventService.attendEvent(eventId)
      .then(() => {
        notification.success({
          message: "Event added to your calendar successfully ✔",
        });
      })
      .catch(axiosCatch)
      .finally(() => setAttendEventLoading(false));
  };

  const menu = (
    <Menu
      style={{ width: "80px", textAlign: "center" }}
      items={[
        own && {
          label: (
            <Typography.Text type="danger" className="sc fz-12 fw-500 w-100">
              Edit
            </Typography.Text>
          ),
          key: "4",
          onClick: () => {
            setIsModalOpen(true);
          },
        },
        own && {
          label: (
            <Typography.Text type="danger" className="sc fz-12 fw-500 w-100">
              {isHidden ? "unhide" : "hide"}
            </Typography.Text>
          ),
          key: "5",
          onClick: toggleHidePost,
        },
        own && {
          label: (
            <Typography.Text type="danger" className="fz-12 fw-500 w-100">
              Delete
            </Typography.Text>
          ),
          key: "6",
          onClick: deletePost,
        },
      ]}
    />
  );

  return (
    <>
      <div className="post-p br-14 g-box-shawod" style={{ opacity: deleteLoading ? 0.5 : 1 }}>
        <Row
          gutter={[0, 0]}
          align="middle"
          justify="space-between"
          className="post-header"
          style={{ columnGap: "19px" }}
          wrap={false}>
          <Col>
            <Avatar
              onClick={() => navigate(`/profile/${accountId}`)}
              size={42}
              src={avatarPic}
              {...(avatarPic ? {} : { ...stringAvatar(user?.fullName) })}
              className="center-items clickable"
            />
          </Col>

          <Col flex="1">
            <Row>
              <Col span={24}>
                <Row align="middle">
                  <Col>
                    <Typography.Text
                      className="fw-600 fz-12 underline"
                      style={{ textTransform: "capitalize" }}
                      ellipsis>
                      {userName} {own && !profile && "(me)"}{" "}
                      {isHidden && (
                        <span style={{ color: "#999", fontSize: "14px" }}>(hidden)</span>
                      )}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row align="middle" style={{ columnGap: "19px" }}>
                  <Col>
                    <Typography.Text
                      className="fz-10"
                      style={{ color: "#C7C7CC", letterSpacing: "0.3px" }}
                      ellipsis>
                      {dayjs(date).format("MMM DD.YYYY , hh:mm A")}
                    </Typography.Text>
                  </Col>
                  <Col>
                    {/* <Typography.Text
                      className="fz-10"
                      style={{ color: "#C7C7CC", letterSpacing: "0.3px" }}
                    >
                      Sponsored
                    </Typography.Text> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col className="post-header-interactions">
            <Row align="middle" justify="middle" style={{ columnGap: "16.43px" }}>
              <Col></Col>
              <Col>
                <Dropdown placement="bottom" dropdownRender={() => menu} trigger={["click"]}>
                  <div className="more-svg clickable center-items">
                    <MoreSVG color="#000000" />
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>

        {!isEvent && postDescription && (
          <Row className="post-pargraph-p description" gutter={[8, 0]} wrap={false} align="middle">
            <Col flex={1}>
              <Typography.Paragraph
                ellipsis={ellipsis ? { rows: 2 } : false}
                style={{
                  marginBottom: "0px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}>
                <TextUrl text={postDescription} />
              </Typography.Paragraph>
              {postDescription?.length > 288 && (
                <Typography.Text className="more-less" onClick={() => setEllipsis((prev) => !prev)}>
                  {ellipsis ? "more" : "less"}
                </Typography.Text>
              )}
            </Col>
          </Row>
        )}

        {isEvent && (
          <Row
            className="post-pargraph-p post-description"
            gutter={[8, 0]}
            wrap={false}
            align="middle">
            <Col flex={1}>
              <Typography.Paragraph
                ellipsis={ellipsis ? { rows: 2 } : false}
                className="mb-0"
                style={{
                  marginBottom: "0px",
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}>
                <TextUrl text={postDescription} />
              </Typography.Paragraph>
              {postDescription?.length > 288 && (
                <Typography.Text
                  className="more-less "
                  onClick={() => setEllipsis((prev) => !prev)}>
                  {ellipsis ? "more" : "less"}
                </Typography.Text>
              )}
            </Col>
          </Row>
        )}
        {postImages.length > 0 && (
          <Row
            justify="center"
            style={{
              position: "relative",
              marginTop: !postDescription && "1rem",
            }}>
            {postDescription?.match(regex) ? (
              <div>
                <Button
                  className="post-description-button"
                  type="primary"
                  onClick={() => window.open(postDescription?.match(regex), "_blank")}>
                  Join now
                </Button>
              </div>
            ) : null}
            <Col xs={24}>
              {postImages.length > 1 && (
                <div className="images-gallary-SVG">
                  <ImagesGallarySVG />
                </div>
              )}
              <Slider {...settings} arrows style={{ maxHeight: "492px" }}>
                {postImages.map((image) => (
                  <div key={image} style={{ maxHeight: "492px" }}>
                    {isImageOrVideo(image) === "image" ? (
                      <Image
                        src={type === "event" ? image || defaultEvent : image}
                        alt="image"
                        width={"100%"}
                        height="100%"
                        preview={!swiping}
                        style={{ objectFit: "cover", maxHeight: "492px" }}
                      />
                    ) : (
                      <div className="video-player">
                        <Player
                          fluid={false}
                          key={image + id}
                          autoPlay={false}
                          height={300}
                          src={image}>
                          <ControlBar
                          // autoHide={false}
                          // disableDefaultControls={true}
                          >
                            <PlayToggle />
                          </ControlBar>
                        </Player>
                      </div>
                    )}
                  </div>
                ))}
              </Slider>
            </Col>
            {isEvent && (
              <Row>
                <Col
                  className="archive-icon"
                  style={{
                    position: "absolute",
                    right: "0",
                    justifyContent: "center",
                  }}>
                  <ArchiveSVG />
                </Col>
                <Col className="event-date">
                  <Col>
                    <Typography.Text className="fz-24 fw-600">
                      {dayjs(eventData.fromDate).format("D")}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text className="fz-14 fw-500">
                      {dayjs(eventData.fromDate).format("MMM")}
                    </Typography.Text>
                  </Col>
                </Col>
                <Col className="event-avatars">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <Col>
                      <Avatar.Group
                        maxCount={3}
                        maxPopoverTrigger="click"
                        maxStyle={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                          cursor: "pointer",
                        }}>
                        <Avatar
                          style={{
                            backgroundColor: "#f56a00",
                          }}>
                          K
                        </Avatar>
                        <Tooltip title="Ant User" placement="top">
                          <Avatar
                            style={{
                              backgroundColor: "#87d068",
                            }}
                            icon={<UserOutlined />}
                          />
                        </Tooltip>

                        <Avatar
                          style={{
                            backgroundColor: "#fff",
                          }}>
                          <Typography.Text className="fw-600">+37</Typography.Text>
                        </Avatar>
                      </Avatar.Group>
                    </Col>
                    <Col>
                      <Typography.Text className="wc fz-16 fw-500" style={{ marginInline: "10px" }}>
                        40 Joined
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Row>
        )}

        {type === "event" && (
          <Row
            className="event-post-section m-0"
            gutter={[16, 16]}
            align="middle"
            justify="space-between"
            style={{ borderRadius: isEvent && "0" }}>
            <Col xs={24} lg={15}>
              <Row gutter={[0, 12]}>
                <Col xs={24}>
                  <Typography.Text
                    className="fz-18 fw-600"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/event/${id}`)}>
                    {eventData.title}
                  </Typography.Text>
                </Col>
                <Col xs={24}>
                  <Row justify="space-between" gutter={[2, 12]}>
                    {detailsEventIcons.map((item) => (
                      <Col key={item.label} lg={8}>
                        <Row gutter={[5, 0]} wrap={false} align="middle">
                          <Col>
                            <div className="event-icons">{item.icon}</div>
                          </Col>
                          <Col flex={1}>
                            <Row>
                              <Col xs={24}>
                                <Tooltip title={eventData.dimensionName}>
                                  <Typography.Text ellipsis className="fz-14 fw-600">
                                    {item.label === "Dimension"
                                      ? eventData.dimensionName
                                      : item.label === "Date"
                                      ? dayjs(eventData.fromDate).format("DD MMM")
                                      : dayjs(eventData.timeFrom).format("h:mm A")}
                                  </Typography.Text>
                                </Tooltip>
                              </Col>
                              <Col xs={24}>
                                <Typography.Text style={{ color: "#AEAEB2" }}>
                                  {item.label}
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={8}>
              <Row gutter={[10, 10]} justify="end">
                <Col span={12}>
                  <button
                    className="gradiant-border-btn center-items"
                    style={{
                      paddingInline: "20px",
                      height: "50px",
                      width: "100%",
                      pointerEvents: attendEventLoading && "none",
                    }}
                    onClick={() => {
                      attendEvent();
                    }}>
                    <Row gutter={[8, 0]} wrap={false} align="middle">
                      <Col>
                        <Row align="middle">
                          {attendEventLoading ? (
                            <LoadingOutlined />
                          ) : (
                            <CalenderBtnSVG gradient={true} />
                          )}
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text className="gradiant-text">Attend</Typography.Text>
                      </Col>
                    </Row>
                  </button>
                </Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    className="center-items"
                    style={{
                      paddingInline: "20px",
                      height: "100%",
                      width: "100%",
                    }}
                    onClick={() => {
                      window.open(eventData.roomLink, "_blank", "noreferrer");
                    }}>
                    <Row gutter={[8, 0]} wrap={false} align="middle">
                      <Col>
                        <Row align="middle">
                          <GroupsSVG />
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text className="wc">Join Event</Typography.Text>
                      </Col>
                    </Row>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {isEvent && eventData.tableOfContent[0]?.scheduleTime && (
          <div className="event-post-section">
            <Row>
              <Col span={24} style={{ marginBottom: "20px" }}>
                <Typography.Text className="fz-18 fw-500">Event Schedule</Typography.Text>
              </Col>
            </Row>
            {eventData?.tableOfContent.map((event) => {
              return (
                <Row
                  key={event.id}
                  gutter={[16, 16]}
                  justify={"space-between"}
                  align="top"
                  className="mb-16">
                  <Col xs={24} xl={6}>
                    <Row
                      align="middle"
                      gutter={[8, 0]}
                      wrap={false}
                      className="event-schedual-time">
                      <Col>
                        <Row align="middle">
                          <TimeSVG color="#000" style={{ width: "16px", height: "16px" }} />
                        </Row>
                      </Col>

                      <Col flex={1}>
                        <Row align="middle" justify="space-between">
                          <Col>
                            <Typography.Text className="fz-16 fw-400">
                              {dayjs(event.scheduleTime[0]).format("h:mm A")}
                            </Typography.Text>
                          </Col>
                          <Col>
                            <SwapRightOutlined style={{ fontSize: "18px" }} />
                          </Col>
                          <Col>
                            <Typography.Text className="fz-16 fw-400">
                              {dayjs(event.scheduleTime[1]).format("h:mm A")}
                            </Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} xl={18} className="event-schedual-desc">
                    <Typography.Paragraph className="gc">{event.activity}</Typography.Paragraph>
                  </Col>
                </Row>
              );
            })}
          </div>
        )}

        <Row
          gutter={[6, 0]}
          align="middle"
          justify={likes !== 0 ? "space-between" : "end"}
          style={{ margin: "1rem" }}>
          {likes !== 0 && (
            <Col>
              <Row gutter={[8, 0]} align="middle">
                <Col style={{ padding: "0" }}>
                  <Row align="middle" gutter={[16, 0]}>
                    <Col>
                      <Row align="middle">
                        <Avatar.Group
                          maxCount={3}
                          maxStyle={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                          }}>
                          {communityPostLikes?.slice(0, 3).map((like) => (
                            <Avatar
                              key={like.id}
                              size={28}
                              style={{
                                backgroundColor: "#87d068",
                                border: "3px solid #fff",
                              }}
                              src={like?.account?.profileImage}
                              icon={<UserOutlined />}
                            />
                          ))}
                        </Avatar.Group>
                      </Row>
                    </Col>

                    <Col>
                      <Row align="middle">
                        <LikeSVG color={"#E81224"} width={14} />
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text style={{ color: "#8E8E93" }} className="fz-12">
                    {isLiked && likes === 1
                      ? "You liked this"
                      : isLiked
                      ? `You & ${likes - 1} liked this`
                      : likes > 0
                      ? `${likes} Others liked this`
                      : null}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          )}
          <Col>
            <Row align="middle" style={{ columnGap: "16px" }}>
              <Col style={{ color: "#8E8E93" }} className="fz-12">
                {commentsCount} Comments
              </Col>
              <Col style={{ color: "#8E8E93" }} className="fz-12">
                0 shares
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <Divider className="post-divider" />
        </div>

        <Row justify={"center"} style={{ padding: "10px 0" }}>
          <Col xs={24} md={20} lg={24}>
            <Row align="middle" justify="space-around">
              <Col span={8}>
                <Row
                  wrap={false}
                  align="middle"
                  justify={"center"}
                  className="clickable fz-12"
                  onClick={() => {
                    toggleLike();
                  }}>
                  <LikeSVG width={16} color={isLiked ? "#E81224" : "#AEAEB2"} />
                  <Typography.Text
                    style={{
                      color: isLiked ? "#E81224" : "#AEAEB2",
                      marginInlineStart: "0.2rem",
                    }}
                    className="fz-12">
                    Like
                  </Typography.Text>
                </Row>
              </Col>
              <Col span={8}>
                <Row
                  wrap={false}
                  justify={"center"}
                  align="middle"
                  gutter={6}
                  className="clickable"
                  onClick={() => {
                    inputRef.current.focus();
                  }}>
                  <Col>
                    <Row align="middle">
                      <Comment2SVG opacity={1} />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text className="post-gray-text fz-12">Comment</Typography.Text>
                  </Col>
                </Row>
              </Col>
              {/* <Col span={8}>
                <Row
                  wrap={false}
                  justify={"center"}
                  align="middle"
                  gutter={6}
                  className="clickable"
                  onClick={() => {
                    setIsFriendModalOpen(true);
                  }}>
                  <Col>
                    <Row align="middle">
                      <Send2SVG />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text className="post-gray-text fz-12">Share</Typography.Text>
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </Col>
        </Row>
        <div
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
          className="mb-16 ">
          <Divider className="post-divider" />
        </div>

        <PostsComments
          postId={id}
          commentList={commentList}
          commentsCount={commentsCount}
          accountId={accountId}
          setPostsList={setPostsList}
          inputRef={inputRef}
        />

        <Divider className="post-last-divider" />
      </div>
      <Modal
        open={isEditModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose>
        <EditPost
          postImages={postImages}
          postDescription={postDescription}
          id={id}
          setPostsList={setPostsList}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

const detailsEventIcons = [
  {
    label: "Dimension",
    icon: <ShareArObjectSVG style={{ width: "24px", height: "24px" }} color="#3A5EE3" />,
  },
  {
    label: "Date",
    icon: <CalenderBtnSVG style={{ width: "24px", height: "24px" }} color="#3A5EE3" />,
  },
  {
    label: "Time",
    icon: <TimeSVG style={{ width: "24px", height: "24px" }} color="#3A5EE3" />,
  },
];
