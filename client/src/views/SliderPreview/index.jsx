import { Avatar, Button, Col, Dropdown, Flex, Popover, Row, Tooltip, Typography } from "antd";
import { lazy, useContext, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import useGetSliderById from "services/Slider/Querys/useGetSliderById";
import "./style.css";
import UpCommingEventsModal from "./Components/UpCommingEventsModal";
import useGetUpCommingEvents from "services/Slider/Querys/useGetUpCommingEvents";
import { ArrowDownSVG, BurgerMenuSVG } from "assets/jsx-svg";
import userContext from "context/userContext";
import Box from "components/Box";
import axios from "axios";
import ProfileInfo from "./Components/ProfileInfo";
import { stringAvatar } from "utils/string";
import YouTubeVideoPlayer from "./Components/YouTubeVideoPlayer";
const MetaversePage = lazy(() => import("views/MetaverseGame"));

const transformElements = (elements) => {
  const itemsMap = new Map();
  const itemsMock = [];

  elements.forEach((element) => {
    if (!itemsMap.has(element.id)) {
      itemsMap.set(element.id, { ...element, children: [] });
    }

    if (element.parentId !== null) {
      if (!itemsMap.has(element.parentId)) {
        itemsMap.set(element.parentId, { children: [] });
      }
      itemsMap.get(element.parentId).children.push(itemsMap.get(element.id));
    }
  });

  itemsMap.forEach((value) => {
    if (!value.parentId) {
      itemsMock.push(value);
    }
  });

  return itemsMock;
};
const removeEmptyChildren = (data) => {
  return data.map((item) => {
    const newItem = { ...item };
    if (newItem.children && newItem.children.length === 0) {
      delete newItem.children;
    } else if (newItem.children && newItem.children.length > 0) {
      newItem.children = removeEmptyChildren(newItem.children);
    }
    return newItem;
  });
};
const SliderPreview = () => {
  const { id: sliderId, dimId: dimId } = useParams();
  const metaversePageRef = useRef();
  const videoRef = useRef(null);
  const ytPlayer = useRef(null);

  const { user } = useContext(userContext);
  const { data: sliderData } = useGetSliderById(sliderId, {
    select: (data) => data?.data?.data,
  });
  const { state } = useLocation();
  const navigate = useNavigate();

  const elements = sliderData?.sliderItems?.map((item) => ({
    id: item.id,
    key: item.id,
    label: <span>{item.title}</span>,
    hoverImage: item.hoverImage,
    parentId: item.parentId,
    description: item.description,
    itemProperites: item.itemProperties,
    onClickItem: () => onClickJoinMetavers(item),
  }));

  const currentUrl = window.location.href;
  const isPreviewMode = () => {
    return currentUrl.includes("slider-widget");
  };

  const onClickJoinMetavers = (selectedItem) => {
    let destUrl = `/slider/${sliderId}`;
    if (isPreviewMode()) {
      destUrl = `/engagements/slider-widget/${sliderId}`;
    }
    if (selectedItem?.customerDimension?.name && selectedItem?.customerDimension?.name === dimId) {
      if (selectedItem.dimensionDropPoint) {
        const iframeRef = metaversePageRef.current.getIframeRef();
        iframeRef.contentWindow.unityInstance.SendMessage(
          "JsBridge",
          "MoveToPlace",
          selectedItem.dimensionDropPoint,
        );
      }
    } else {
      navigate(destUrl);
      setTimeout(() => {
        selectedItem.customerDimension && !selectedItem.customerDimension?.isMetaverseExternalLink
          ? navigate(
              `${destUrl}/${selectedItem.customerDimension?.name}${
                selectedItem.dimensionDropPoint
                  ? "?droppoint=" + selectedItem.dimensionDropPoint
                  : ""
              }`,
            )
          : window.location.assign(`//${selectedItem.customerDimension.metaverseExternalLink}`);
      }, 200);
    }
  };

  const [isUpCommingEventsOpen, setIsUpCommingEventsOpen] = useState(false);
  const { data: upCommingEvents, isLoading: IsLoadingEvents } = useGetUpCommingEvents({
    select: (data) => data?.data?.data,
    enabled: isUpCommingEventsOpen,
  });
  const upCommingBtnProperties = JSON.parse(sliderData?.slider?.upCommingBtnProperties ?? "{}");
  const mediaSetting = JSON.parse(sliderData?.slider?.mediaSetting ?? "{}");
  const usingCommingBtnProperties = false;
  const handleLogout = () => {
    localStorage.removeItem("vindo-token");
    localStorage.removeItem("DMC_TOKEN");
    metaversePageRef.current._setUser(null);
    axios.defaults.headers.authorization = null;
  };

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  function getYouTubeVideoId(youtubeUrl) {
    // Regular expressions to match YouTube video ID from URL
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /^.*(youtu\.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/,
    ];

    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // If no match found, return null or throw an error, based on your preference
    return null; // or throw new Error('Invalid YouTube URL');
  }

  function isYouTubeURL(url) {
    // Regular expression to match YouTube URLs
    const youtubeRegExp =
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)/;
    return youtubeRegExp.test(url);
  }

  const generateExternalUrl = (url) => {
    if (!url) {
      return "";
    }

    const splittedUrl = url.split("?");
    let resultedUrl = splittedUrl[0];

    if (isYouTubeURL(url)) {
      const videoId = getYouTubeVideoId(url);
      resultedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    let urlParamsMap = {};

    // add default params even if not youtube
    const paramsMap = {
      mute: mediaSetting.muteAudio ? 1 : 0,
      autoplay: mediaSetting.autoPlay ? 1 : 0,
      loop: 1,
      controls: 0,
      showinfo: 0,
      autohide: 1,
      rel: 0,
      disablekb: 1,
    };

    if (splittedUrl[1]) {
      const params = splittedUrl[1].split("&");
      urlParamsMap = params.reduce((acc, curr) => {
        const keyVal = curr?.split("=");
        return { ...acc, [keyVal?.[0]]: keyVal?.[1] };
      }, {});
    }

    const paramsString = Object.entries({ ...urlParamsMap, ...paramsMap })
      .map(([key, val]) => `${key}=${val}`)
      ?.join("&");

    return `${resultedUrl}?${paramsString}`;
  };

  const handleStopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (ytPlayer.current) {
      ytPlayer.current.pauseVideo();
    }
  };

  return (
    <div>
      {isPreviewMode() ? (
        <Flex
          align="center"
          style={{ marginBottom: "32px", marginTop: "8px" }}
          justify="space-between">
          <Flex gap={16} align="center">
              <Box
                onClick={() => navigate(-1)}
                sx={{
                  cursor: "pointer",
                  border: "1px solid #EBEBED",
                  paddingInline: 4,
                  borderRadius: 6,
                }}>
                <ArrowLeftOutlined
                  style={{
                    fontSize: "12px",
                    color: "#272942",
                  }}
                />
              </Box>
            <Typography.Text style={{ fontWeight: 600, fontSize: "16px" }}>
              {sliderData?.slider?.name}
            </Typography.Text>
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
      <div
        id="slider-preview"
        style={{
          position: "relative",
          width: !isPreviewMode() && "100vw",
          border: isPreviewMode() && "1px solid gray",
          borderRadius: isPreviewMode() && "8px",
          height: "100vh",
          backgroundImage:
            sliderData.slider.mediaType === "IMAGE"
              ? `url(${sliderData?.slider?.media})`
              : undefined,
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
        }}>
        {sliderData.slider.mediaType === "VIDEO" ? (
          mediaSetting.isExternalVideoLink ? (
            <>
              {/* span is a layer above the video to dismiss hover effect on it */}
              {mediaSetting.autoPlay && mediaSetting.muteAudio && (
                <span
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 2,
                  }}
                />
              )}

              <YouTubeVideoPlayer
                ytPlayer={ytPlayer}
                muted={mediaSetting.muteAudio}
                autoPlay={mediaSetting.autoPlay}
                loop
                videoUrl={generateExternalUrl(sliderData.slider.media)}
              />
              {/* <iframe
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={generateExternalUrl(sliderData.slider.media)}
                title="video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              /> */}
            </>
          ) : (
            <video
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 2,
              }}
              ref={videoRef}
              controls={false}
              muted={mediaSetting.muteAudio}
              autoPlay={mediaSetting.autoPlay}
              loop>
              <source src={sliderData.slider.media} type="video/mp4" />
              <source src={sliderData.slider.media} type="video/mp4" />
              <source src={sliderData.slider.media} type="video/webm" />
              <source src={sliderData.slider.media} type="video/ogg" />
              <source src={sliderData.slider.media} type="video/x-msvideo" />
              <source src={sliderData.slider.media} type="video/x-flv" />
              <source src={sliderData.slider.media} type="video/x-ms-wmv" />
              <source src={sliderData.slider.media} type="video/quicktime" />
              <source src={sliderData.slider.media} type="video/x-matroska" />
            </video>
          )
        ) : (
          <></>
        )}
        {!dimId && (
          <UpCommingEventsModal
            loading={IsLoadingEvents}
            sliderId={sliderId}
            dataList={upCommingEvents}
            handleCancel={() => setIsUpCommingEventsOpen(false)}
            isModalOpen={isUpCommingEventsOpen}
          />
        )}

        {state?.loginUser && (
          <div onClick={() => navigate("/slider")} className="close-metaverse">
            <div className="center-items widget-main-icon clickable">
              <CloseOutlined style={{ color: "white" }} />
            </div>
          </div>
        )}
        <Row
          align={"middle"}
          style={{
            justifyContent: "space-between",
            padding: "14px 28px",
            width: "100%",
            alignItems: "center",
            position: dimId && !user ? "absolute" : "inherit",
            background: dimId ? "rgba(0, 0, 0, 0.21)" : "",
            backdropFilter: dimId ? "blur(15px)" : "",
            zIndex: 7,
          }}>
          <Row align={"middle"} gutter={[5, 0]}>
            <div id="burger-menu" style={{ position: "relative" }}>
              <Button
                onClick={toggleCollapsed}
                size="small"
                style={{
                  fontSize: "13px",
                  // color: "white",
                  // backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 5,
                }}>
                {/* Burger */}
                <BurgerMenuSVG />
              </Button>
              {collapsed && (
                <Menu
                  onClick={(e) => {
                    onClickJoinMetavers(
                      sliderData?.sliderItems.filter((item) => item.id == e.key)[0],
                    );
                    setCollapsed(false);
                  }}
                  mode="inline"
                  style={{
                    width: 256,
                    position: "absolute",
                    top: 40,
                  }}
                  items={removeEmptyChildren(transformElements(elements))}></Menu>
              )}
            </div>
            <div id="menu-items">
              {removeEmptyChildren(transformElements(elements)).map((ele, index) => {
                return (
                  <Col key={index}>
                    {!ele.children ? (
                      ele.hoverImage ? (
                        <Tooltip
                          placement="top"
                          title={
                            <div>
                              <img
                                src={ele.hoverImage}
                                alt={"hover Image"}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          }>
                          <Button
                            size="small"
                            onClick={ele.onClickItem}
                            style={{
                              fontSize: "13px",
                              color: ele.itemProperites?.FGColor,
                              backgroundColor: ele.itemProperites.BGColor,
                            }}>
                            {ele.label}
                          </Button>
                        </Tooltip>
                      ) : (
                        <Button
                          size="small"
                          onClick={ele.onClickItem}
                          style={{
                            fontSize: "13px",
                            color: ele.itemProperites?.FGColor,
                            backgroundColor: ele.itemProperites.BGColor,
                          }}>
                          {ele.label}
                        </Button>
                      )
                    ) : (
                      <Dropdown
                        getPopupContainer={() => document.getElementById("slider-preview")}
                        rootClassName="slider-dropdown"
                        placement="bottomCenter"
                        menu={{
                          items: ele.children,
                          getPopupContainer: () => document.getElementById("slider-preview"),
                          onClick: (e) =>
                            onClickJoinMetavers(
                              sliderData?.sliderItems.filter((item) => item.id == e.key)[0],
                            ),
                        }}>
                        <Button
                          size="small"
                          style={{
                            fontSize: "13px",
                            color: ele.itemProperites?.FGColor,
                            backgroundColor: ele.itemProperites.BGColor,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            columnGap: 5,
                          }}>
                          {ele.label}
                          <ArrowDownSVG color={ele.itemProperites?.FGColor} />
                        </Button>
                      </Dropdown>
                    )}
                  </Col>
                );
              })}
            </div>
          </Row>
          {(sliderData?.slider?.showUpcommingBtn || user) && (
            <Row align={"middle"} justify="end">
              {user && (
                <Row
                  style={{
                    alignItems: "center",
                    borderRadius: "20px",
                    marginInlineEnd: "20px",
                  }}>
                  <Popover
                    overlayClassName="profile-popover"
                    overlayInnerStyle={{
                      minWidth: "200px",
                      padding: "14px 0 6px 0px",
                    }}
                    content={
                      <ProfileInfo
                        handleLogout={handleLogout}
                        fullName={user.fullName}
                        image={user.profileImage}
                      />
                    }
                    trigger={["click"]}>
                    {!user.profileImage ? (
                      <Box style={{ cursor: "pointer" }}>
                        <Avatar size={40} {...stringAvatar(user?.fullName ?? "")} />
                      </Box>
                    ) : (
                      <Avatar style={{ cursor: "pointer" }} size={40} src={user.profileImage} />
                    )}
                  </Popover>
                </Row>
              )}

              {sliderData?.slider?.showUpcommingBtn && (
                <Button
                  size="small"
                  style={
                    usingCommingBtnProperties
                      ? {
                          fontSize: "13px",
                          color: upCommingBtnProperties?.FGColor,
                          backgroundColor: upCommingBtnProperties?.BGColor,
                        }
                      : {
                          background: `linear-gradient(
                        90deg,
                        #b8cbb8 0%,
                        #b8cbb8 0%,
                        #b465da 0%,
                        #cf6cc9 33%,
                        #ee609c 66%,
                        #ee609c 100%
                      )`,
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#ffffff",
                        }
                  }
                  onClick={() => setIsUpCommingEventsOpen(true)}>
                  {upCommingBtnProperties?.name || "Upcoming Events"}
                </Button>
              )}
            </Row>
          )}
        </Row>
        {dimId && (
          <div onClick={handleStopVideo()} style={{ flexGrow: 1, zIndex: 6 }}>
            <MetaversePage ref={metaversePageRef} autoFullHeight={true} />
          </div>
        )}
      </div>
    </div>
  );
};
export default SliderPreview;
