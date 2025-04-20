import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import { BrowseFoldersSVG, CloudUpSVG } from "assets/jsx-svg";
import { useEffect, useState } from "react";
import VverseMediaService from "services/VverseMedia/vverse-media.service";
import { axiosCatch } from "utils/axiosUtils";
import ParticipantsList from "./components/ParticipantsList";
import FilterMedia from "./components/FilterMedia";
import MediaAddModal from "./components/MediaAddModal";
import MediaListItem from "./components/MediaListItem";
import BrowseFolders from "./components/BrowseFolders";
import FoldersBreadcrumb from "components/FoldersBreadcrumb";
import "./styles.css";

export default function ProductionTools({
  activeBtn,
  setDragedMedia,
  iframeRef,
  deskIframeRef,
  meetingMetadata,
  setDragedParticipant,
}) {
  const [typeFilter, setMediaFilter] = useState();
  const [selectedFolderPath, setSelectedFolderPath] = useState([]);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);
  // TODO: we should ask user to specify which cam he want to use
  const [firstCamId, setFirstCamId] = useState();
  const [firstMicId, setFirstMicId] = useState();

  const handleFilterMedia = (media) => {
    setMediaFilter(media);
  };

  const handleMediaDragged = (media) => {
    setDragedMedia(media);
  };

  const handleOpenMediaAddModal = () => {
    setIsAddMediaModalOpen(true);
  };

  const handleRefetchMedia = () => {
    handleBreadcrumbSelect();
  };

  const handleFolderSelected = ({ path }) => {
    setSelectedFolderPath(path);
  };

  const fetchMedia = async (typeFilter, folderId) => {
    try {
      setLoading(true);
      let res;
      let filesFilter = typeFilter;
      if (typeFilter === "document") {
        filesFilter = "pdf,powerpoint";
      }
      res = await VverseMediaService.getAll({ folderId, type: filesFilter });
      setMediaLibrary(res.data.data.rows);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBreadcrumbSelect = (folderId) => {
    if (folderId) {
      setSelectedFolderPath((oldSelectedFolderPath) => {
        const index = oldSelectedFolderPath.findIndex((folderPath) => folderPath.id == folderId);
        if (index > -1 && index != oldSelectedFolderPath.length - 1) {
          return oldSelectedFolderPath.slice(0, index + 1);
        }
        return oldSelectedFolderPath;
      });
    } else {
      setSelectedFolderPath([]);
    }
  };

  const getCallDetails = async () => {
    try {
      await navigator.mediaDevices
        .enumerateDevices()
        .then(async (devices) => {
          const audioInputDevices = [];
          const videoInputDevices = [];

          devices.forEach((device) => {
            if (device.kind === "audioinput") {
              audioInputDevices.push(device);
            } else if (device.kind === "videoinput") {
              videoInputDevices.push(device);
            }
          });
          setFirstMicId(audioInputDevices[0]?.deviceId);
          setFirstCamId(videoInputDevices[0]?.deviceId);
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  };

  useEffect(() => {
    if (iframeRef) {
      iframeRef.contentWindow?.unityInstance?.SendMessage("BG_Scripts/JsBridge", "GetFrames");
    } else if (deskIframeRef) {
      deskIframeRef.contentWindow?.unityInstance?.SendMessage("BG_Scripts/JsBridge", "GetFrames");
    }
  }, [activeBtn, iframeRef, deskIframeRef]);

  useEffect(() => {
    fetchMedia(typeFilter, selectedFolderPath[selectedFolderPath.length - 1]?.id);
  }, [setMediaLibrary, typeFilter, selectedFolderPath]);

  useEffect(() => {
    getCallDetails();
  }, []);

  return (
    <section className="production-tools">
      <Row gutter={[0, 24]}>
        <Row>
          <Typography.Text className="fz-16 fw-600">Production Tools</Typography.Text>
        </Row>
        <Col xs={24}>
          <ParticipantsList
            camId={firstCamId}
            micId={firstMicId}
            meetingMetadata={meetingMetadata}
            setDragedParticipant={setDragedParticipant}
          />
        </Col>
        <Col flex={1}>
          <Typography.Text
            onClick={handleOpenMediaAddModal}
            className="clickable"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "max-content",
            }}>
            <CloudUpSVG />
            Upload
          </Typography.Text>
          <MediaAddModal
            isOpen={isAddMediaModalOpen}
            setIsOpen={setIsAddMediaModalOpen}
            refetchMedia={handleRefetchMedia}
          />
        </Col>
        <Col>
          <BrowseFolders onFolderSelected={handleFolderSelected}>
            <Space className="clickable">
              <BrowseFoldersSVG
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              />
              Browse Folders
            </Space>
          </BrowseFolders>
        </Col>
        <Col xs={24}>
          <FoldersBreadcrumb
            folderPath={selectedFolderPath}
            onFetchFolderData={handleBreadcrumbSelect}
          />
        </Col>
        <Col xs={24}>
          <FilterMedia onFilter={handleFilterMedia} />
        </Col>
        <Row gutter={[16, 0]}>
          <Col xs={24} style={{ maxHeight: "calc(100vh - 470px)", overflowY: "auto" }}>
            <Row gutter={[12, 12]}>
              {loading ? (
                <Row
                  justify="center"
                  style={{
                    minHeight: 100,
                    minWidth: 100,
                    justifyItems: "center",
                    overflow: "hidden",
                    width: 400,
                  }}>
                  <LoadingOutlined />
                </Row>
              ) : (
                mediaLibrary?.map((media) => (
                  <MediaListItem key={media.id} media={media} setDragedMedia={handleMediaDragged} />
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Row>
    </section>
  );
}
