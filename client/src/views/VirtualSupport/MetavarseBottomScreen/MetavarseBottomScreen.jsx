import { CaretDownOutlined, CaretUpOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row, Typography, message } from "antd";
import { FavouriteSVG, ImagesSVG, SoundWavesSVG } from "assets/jsx-svg";
import { useEffect, useMemo, useState } from "react";
import useMetaverseFrames from "services/meetings/useMetaverseFrames";
import { isImage, isVideoFile } from "utils/filesUtils";
import BrowseFrames from "./BrowseFrames";
import FrameListItem from "./FrameListItem";
import "./styles.css";
import { useMetavarseBottomScreenContext } from "./context/metavarseBottomScreenContext";

const MetaverseBottomScreen = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const {
    allFrames,
    currentSelectedFolder,
    selectedMediaType,
    isShowingOnlyFavFrames,
    dimensionId,
    dimensionFrames,
    iframeRef,
    dragedMedia,
    dragedParticipant,
    setDimensionFrames,
    setAudioFrames,
    audioFrames,
    setAllFrames,
    setAllFrameFolders,
    setFramesState,
    setSelectedMediaType,
    setIsShowingOnlyFavFrames,
  } = useMetavarseBottomScreenContext();

  const { upsertFrames, isPendingUpsert } = useMetaverseFrames();

  const filteredFrames = useMemo(() => {
    if (isShowingOnlyFavFrames) {
      return allFrames.filter((frame) => frame.isFav && frame.type === selectedMediaType);
    }
    const folderFrames = allFrames.filter((frame) => frame.folderId == currentSelectedFolder?.id);
    return folderFrames.filter((frame) => frame.type === selectedMediaType);
  }, [allFrames, selectedMediaType, currentSelectedFolder, isShowingOnlyFavFrames]);

  const onDrop = async (e, frameName) => {
    e.preventDefault();

    if (dragedMedia && dragedMedia.type !== "audio" && selectedMediaType === "AUDIO") {
      message.info("Audio Frames Accept Audio Only!");
      return;
    }

    if (dragedMedia && dragedMedia.type === "audio" && selectedMediaType === "MEDIA") {
      message.info("Media Frames Does Not Accept Audio!");
      return;
    }

    const newFrame = {
      name: frameName,
    };

    if (dragedMedia) {
      if (selectedMediaType === "AUDIO") {
        newFrame.url = dragedMedia.file;
      } else {
        newFrame.texture = ["mp4", "mov", "wmv", "webM", "avi", "flv", "mkv", "mts"].includes(
          dragedMedia.file.split(".").pop(),
        )
          ? dragedMedia.file
          : dragedMedia.file + "?a=1";
      }

      setFramesState((prevFramesState) => {
        const frameState = { ...(prevFramesState[frameName] ?? {}) };
        frameState.type = dragedMedia.type;
        frameState.images = dragedMedia.images;
        frameState.image = dragedMedia.image;
        frameState.currentSlide = 1;
        frameState.texture = dragedMedia.file;

        if (dragedMedia.type !== "powerpoint" && dragedMedia.type !== "pdf") {
          frameState.images = null;
          frameState.currentSlide = 1;
        }

        if (dragedMedia.type === "video" || dragedMedia.type === "audio") {
          frameState.playing = true;
          frameState.mute = false;
        }

        return { ...prevFramesState, [frameName]: frameState };
      });
    }

    if (dragedMedia && dragedMedia.images) {
      newFrame.texture = dragedMedia.images[0] + "?a=1";
    }

    if (dragedParticipant && dragedParticipant.trackId) {
      newFrame.texture = "livekit://" + dragedParticipant.trackId;
    }

    if (iframeRef) {
      if (dragedMedia && selectedMediaType === "AUDIO") {
        iframeRef?.contentWindow?.unityInstance?.SendMessage(
          "BG_Scripts/JsBridge",
          "SetAudioSourceUrl",
          JSON.stringify(newFrame),
        );

        setTimeout(() => {
          refreshAudioSources();
        }, 500);
      } else {
        iframeRef?.contentWindow?.unityInstance?.SendMessage(
          "BG_Scripts/JsBridge",
          "SetFrameTexture",
          JSON.stringify(newFrame),
        );

        setTimeout(() => {
          refreshDimensionFrames();
        }, 500);
      }
    }
  };

  const refreshAudioSources = () => {
    setAudioFrames([]);
    iframeRef?.contentWindow?.unityInstance?.SendMessage("BG_Scripts/JsBridge", "GetAudioSources");
  };

  const refreshDimensionFrames = () => {
    setDimensionFrames([]);
    iframeRef.contentWindow?.unityInstance?.SendMessage("BG_Scripts/JsBridge", "GetFrames");
  };

  const handleShowOnlyFav = () => {
    setIsShowingOnlyFavFrames((old) => !old);
  };

  const upsertDimentionFrames = (dimensionFrames, audioFrames, dimensionId) => {
    const framesList =
      dimensionFrames?.map(({ name, texture, image }) => ({
        name,
        type: "MEDIA",
        source: texture,
        image,
      })) ?? [];

    audioFrames?.forEach(({ name, url, image }) => {
      framesList.push({ name, source: url, type: "AUDIO", image });
    });
    if ((framesList || []).length > 0)
      upsertFrames({
        dimensionId,
        framesList,
      }).then((result) => {
        setAllFrameFolders(result?.data?.data?.folders ?? []);
        setAllFrames(result?.data?.data?.frames ?? []);
      });
  };

  const handleRefetchAllFrames = () => {
    upsertDimentionFrames(dimensionFrames, audioFrames, dimensionId);
  };

  useEffect(() => {
    try {
      if (iframeRef) {
        refreshDimensionFrames();
        refreshAudioSources();
      }
    } catch (e) {
      console.log(e);
    }
  }, [iframeRef]);

  useEffect(() => {
    console.log(dimensionFrames, dimensionId);
    if (dimensionFrames && dimensionId !== "")
      upsertDimentionFrames(dimensionFrames, audioFrames, dimensionId);
  }, [dimensionFrames, audioFrames, dimensionId]);

  useEffect(() => {
    setFramesState((prevFramesState) => {
      const newFramesState = { ...(prevFramesState ?? {}) };
      allFrames.forEach((frame) => {
        if (frame.type === "AUDIO") {
          const dimAudioFrame = audioFrames?.find(({ name }) => name === frame?.name);
          if (dimAudioFrame?.name) {
            const frameState = { ...(newFramesState[dimAudioFrame.name] ?? {}) };
            frameState.type = "audio";
            frameState.images = null;
            frameState.playing = dimAudioFrame.playing ?? frameState.playing;
            frameState.mute = dimAudioFrame.mute ?? frameState.mute;
            frameState.image = frameState.image;
            frameState.currentSlide = 1;
            frameState.texture = frameState.texture || dimAudioFrame.url;

            newFramesState[frame?.name] = frameState;
          }
        } else {
          const dimMediaFrame = dimensionFrames?.find(({ name }) => name === frame?.name);
          if (dimMediaFrame?.name) {
            const frameState = { ...(newFramesState[dimMediaFrame.name] ?? {}) };
            frameState.texture = dimMediaFrame.texture || frameState.texture || frame?.source;
            const isVideo = isVideoFile(frameState.texture);
            const isImageFile = isImage(frameState.texture);
            if (dimMediaFrame.texture && dimMediaFrame.texture.startsWith("livekit://")) {
              frameState.type = "share";
            } else {
              frameState.type =
                frameState.type ?? (isVideo ? "video" : isImageFile ? "image" : "doc");
            }
            const shouldHaveImages =
              frameState.type === "pdf" ||
              frameState.type === "powerpoint" ||
              frameState.type === "doc";
            frameState.images = shouldHaveImages ? frameState.images : null;
            frameState.image = shouldHaveImages ? frameState.image : dimMediaFrame.texture;
            frameState.currentSlide = frameState.currentSlide ?? 1;

            newFramesState[frame?.name] = frameState;
          }
        }
      });

      return newFramesState;
    });
  }, [allFrames, dimensionFrames, audioFrames]);

  return (
    <section className="metavars-bottom-screen">
      <div className="top-section">
        <Flex justify="space-between" align="center">
          <Typography.Text className="fz-16 fw-600">Screens</Typography.Text>
          <div className="collapse-button" onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </div>
        </Flex>
      </div>

      <div aria-collapse={isExpanded} className="collapse-content">
        <Flex vertical gap={24}>
          <div>
            <Row gutter={[16]}>
              <Col>
                <Button
                  className="media-button"
                  type={selectedMediaType == "MEDIA" ? "primary" : "default"}
                  onClick={() => setSelectedMediaType("MEDIA")}>
                  <ImagesSVG color={selectedMediaType == "MEDIA" ? "white" : undefined} /> Media
                </Button>
              </Col>
              <Col>
                <Button
                  className="media-button"
                  type={selectedMediaType != "MEDIA" ? "primary" : "default"}
                  onClick={() => setSelectedMediaType("AUDIO")}>
                  <SoundWavesSVG color={selectedMediaType != "MEDIA" ? "white" : undefined} /> Audio
                </Button>
              </Col>
              <Col flex={1} style={{ display: "flex", alignItems: "center", paddingTop: 10 }}>
                <BrowseFrames
                  toggleShowFav={handleShowOnlyFav}
                  refetchAllFrames={handleRefetchAllFrames}
                />
              </Col>
            </Row>
          </div>
          {isPendingUpsert ? (
            <div
              key="loading"
              style={{ height: 150 }}
              className="d-flex justify-center align-center">
              <LoadingOutlined style={{ fontSize: 40 }} />
            </div>
          ) : (
            <div className="d-flex align-center justify-between">
              <div key="frames" className="frames-container">
                {filteredFrames?.map((frame) => (
                  <FrameListItem key={frame.name} frame={frame} onDrop={onDrop} />
                ))}
              </div>
              <div
                key="fav"
                className="favorite-frames-button"
                style={{ background: isShowingOnlyFavFrames ? "#0318d6" : "#BDC0D2" }}
                onClick={handleShowOnlyFav}>
                <span className="favorite-frames-text">
                  <FavouriteSVG color="#FC4F4F" style={{ marginRight: 8 }} /> Favourite
                </span>
              </div>
            </div>
          )}
        </Flex>
      </div>
    </section>
  );
};
export default MetaverseBottomScreen;
