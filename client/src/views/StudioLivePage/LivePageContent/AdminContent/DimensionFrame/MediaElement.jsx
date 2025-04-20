import { Col, Popconfirm, Row, Tooltip, Typography } from "antd";
import {
  FullScreenImageSVG,
  LinkSVG,
  NoSoundSVG,
  PauseButtonSVG,
  PlayButtonSVG,
  RightSlideSVG,
  SoundSVG,
} from "assets/jsx-svg";
import videoImg from "assets/images/video.jpg";
import { DeleteOutlined, FolderOutlined, LoadingOutlined } from "@ant-design/icons";
import useUpdateFrameFolder from "services/DiemnsionsFrames/Mutations/useUpdateFrameFolder";
import { useQueryClient } from "@tanstack/react-query";
import { deleteNodeById } from "../../untils";
import { useMemo } from "react";
import useUpdateFrameFolderStructure from "services/DiemnsionsFolders/Mutations/useUpdateFrameFolderStructure";
import { axiosCatch } from "utils/axiosUtils";

export default function MediaElement({
  screen,
  onDropFun,
  dragedMedia,
  setFramesToshow,
  iframeRef,
  dragedParticipant,
  activeTab,
  setFrameFullScreen,
  isTreeNode = false,
  showFolders,
  setAddFrameToFolderModalOpen,
  liveData,
  setLiveData,
  listDiemnsionFramesQuery,
}) {
  const queryClient = useQueryClient();
  const slideControl = (addedSlide) => {
    if (addedSlide < 0 && screen.currentSlide === 1) {
      return;
    } else if (addedSlide > 0 && screen.images.length === screen.currentSlide) {
      return;
    } else {
      setFramesToshow((prev) => {
        const screenIndex = prev.findIndex((frame) => frame.id === screen.id);
        if (screenIndex > -1) {
          prev[screenIndex].currentSlide = prev[screenIndex].currentSlide + addedSlide;

          iframeRef?.contentWindow?.unityInstance?.SendMessage(
            "BG_Scripts/JsBridge",
            "SetFrameTexture",
            JSON.stringify({
              name: screen.name,
              texture: prev[screenIndex].images[prev[screenIndex].currentSlide - 1] + "?a=1",
            }),
          );

          return [...prev];
        }
      });
    }
  };

  const setFrameAction = (action) => {
    iframeRef?.contentWindow?.unityInstance?.SendMessage(
      "BG_Scripts/JsBridge",
      "SetFrameAction",
      JSON.stringify({
        name: screen.name,
        action,
      }),
    );
  };

  const setAudioFrameAction = (action) => {
    console.log(
      "BG_Scripts/JsBridge",
      "SetAudioSourceAction",
      JSON.stringify({
        name: screen.name,
        action,
      }),
    );
    iframeRef?.contentWindow?.unityInstance?.SendMessage(
      "BG_Scripts/JsBridge",
      "SetAudioSourceAction",
      JSON.stringify({
        name: screen.name,
        action,
      }),
    );
  };

  const frameFolder = useMemo(() => {
    return liveData?.data?.frameFolder ? JSON.parse(liveData?.data?.frameFolder) : [];
  }, [liveData]);

  const { mutate: updateFrameFolderStructure } = useUpdateFrameFolderStructure({
    onSuccess: (_, variables) => {
      setLiveData((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            frameFolder: variables.frameFolder,
          },
        };
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const { mutate: updateFrameFolder, isPending } = useUpdateFrameFolder({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(listDiemnsionFramesQuery.queryKey, (prev) => {
        const prevData = prev.data.data;

        const frameToChangeIndex = prevData.findIndex((frame) => frame.id === +variables.frameId);
        if (frameToChangeIndex > -1) {
          prevData[frameToChangeIndex].folderId = variables.folderId;

          const filteredFrameFolder = deleteNodeById(frameFolder, variables.frameId);
          updateFrameFolderStructure({
            eventId: liveData?.data?.id,
            frameFolder: JSON.stringify(filteredFrameFolder),
          });
          return { ...prev };
        }
      });
    },
  });

  return (
    <Col
      key={screen.id}
      {...(isTreeNode
        ? {}
        : {
            xs: 24,
            lg: 12,
            xl: 8,
            xxl: showFolders ? 6 : 4,
          })}
      className="dimension-frame-frame-holder"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropFun(e, screen.id, screen.name)}>
      <div
        className="dimension-frame-frame-holder-add-to-folder-icon"
        onClick={() => {
          setAddFrameToFolderModalOpen(screen.id);
        }}>
        <FolderOutlined />
      </div>
      {screen.folderId && (
        <Tooltip title="Delete frame from his folder?">
          <Popconfirm
            title="Delete frame from his folder?"
            okText="Delete"
            onConfirm={() => {
              if (!isPending) {
                updateFrameFolder({
                  frameId: screen.id,
                  folderId: null,
                });
              }
            }}
            okButtonProps={{
              loading: isPending,
            }}>
            <div className="dimension-frame-frame-holder-delete-from-folder-icon">
              {isPending ? <LoadingOutlined /> : <DeleteOutlined />}
            </div>
          </Popconfirm>
        </Tooltip>
      )}
      {screen.texture?.includes("livekit://") ? (
        <div className="dimension-frame-frame center-items" style={{ background: "#333" }}>
          <Row justify="center" gutter={[0, 12]}>
            <Col xs={24} className="center-items wc">
              User Shared Data
            </Col>
            <Col xs={24} className="center-items">
              <LinkSVG color="#fff" />
            </Col>
          </Row>
        </div>
      ) : (
        <div
          className="dimension-frame-frame"
          style={{
            background: `url(${
              !isTextureVideo(
                screen.images ? screen.images[screen.currentSlide - 1] : screen.texture,
              )
                ? screen.images
                  ? screen.images[screen.currentSlide - 1]
                  : screen.type === "audio"
                  ? screen.image || videoImg
                  : screen.texture || videoImg
                : screen.image || videoImg
            })`,
            height: isTreeNode ? "60px" : "",
          }}
        />
      )}

      <Row justify={isTreeNode ? "start" : "center"}>
        <Tooltip title={screen.name}>
          <Typography.Text
            className="fz-12"
            ellipsis
            style={{ maxWidth: isTreeNode ? "180px" : "" }}>
            {screen.name}
          </Typography.Text>
        </Tooltip>
      </Row>

      {!dragedMedia && !dragedParticipant && (
        <>
          {(screen.type === "powerpoint" || screen.type === "pdf") && screen.images && (
            <>
              <div
                className="toggle-full-screen"
                onClick={() => setFrameFullScreen((prev) => (prev ? false : screen.id))}>
                <FullScreenImageSVG style={{ width: "14px", height: "14px" }} />
              </div>
              <div className="slider-counter">
                {screen.currentSlide}/{screen.images.length}
              </div>

              <div className="slider-arrows-holder">
                <Row justify="space-between" align="middle">
                  <Col>
                    <div className="clickable right-slide-SVG" onClick={() => slideControl(-1)}>
                      <RightSlideSVG
                        style={{ rotate: "180deg", width: "25px" }}
                        color="#fff"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="clickable right-slide-SVG" onClick={() => slideControl(1)}>
                      <RightSlideSVG color="#fff" width={22} height={22} />
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}

          {(screen.type === "video" || screen.type === "audio" || activeTab === "audio") && (
            <>
              <div
                className="video-frame-audio"
                onClick={() => {
                  setFramesToshow((prev) => {
                    const screenIndex = prev.findIndex((frame) => frame.id === screen.id);
                    if (screenIndex > -1) {
                      if (prev[screenIndex].mute) {
                        if (prev[screenIndex].type === "audio") {
                          setAudioFrameAction("unmute");
                        } else {
                          setFrameAction("unmute");
                        }
                      } else {
                        if (prev[screenIndex].type === "audio") {
                          setAudioFrameAction("mute");
                        } else {
                          setFrameAction("mute");
                        }
                      }
                      prev[screenIndex].mute = !prev[screenIndex].mute;
                      return [...prev];
                    }
                  });
                }}>
                {screen.mute ? (
                  <NoSoundSVG color="#fff" style={{ width: "14px", height: "10px" }} />
                ) : (
                  <SoundSVG color="#fff" style={{ width: "14px", height: "10px" }} />
                )}
              </div>
              <div
                className="video-frame-play"
                onClick={() => {
                  setFramesToshow((prev) => {
                    const screenIndex = prev.findIndex((frame) => frame.id === screen.id);
                    if (screenIndex > -1) {
                      if (prev[screenIndex].playing) {
                        if (prev[screenIndex].type === "audio") {
                          setAudioFrameAction("pause");
                        } else {
                          setFrameAction("pause");
                        }
                      } else {
                        if (prev[screenIndex].type === "audio") {
                          setAudioFrameAction("play");
                        } else {
                          setFrameAction("play");
                        }
                      }
                      prev[screenIndex].playing = !prev[screenIndex].playing;

                      return [...prev];
                    }
                  });
                }}>
                {screen.playing ? (
                  <PauseButtonSVG fill="#fff" style={{ width: "14px", height: "10px" }} />
                ) : (
                  <PlayButtonSVG fill="#fff" style={{ width: "14px", height: "10px" }} />
                )}
              </div>
            </>
          )}
        </>
      )}
    </Col>
  );
}

const isTextureVideo = (texture) => {
  if (!texture) return false;
  const arrayOfTexture = texture.split(".");
  if (
    arrayOfTexture.length &&
    ["mp4", "mov", "wmv", "webM", "avi", "flv", "mkv", "mts"].includes(
      arrayOfTexture[arrayOfTexture.length - 1],
    )
  ) {
    return true;
  } else {
    return false;
  }
};
