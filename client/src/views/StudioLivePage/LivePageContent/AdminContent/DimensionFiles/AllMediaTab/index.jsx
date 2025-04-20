import { useEffect, useMemo, useState } from "react";
import { Button, Col, Flex, Image, Input, Popconfirm, Row, Tooltip, Typography } from "antd";
import { DeleteOutlined, FolderOutlined, LoadingOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import { axiosCatch } from "utils/axiosUtils";
import videoImg from "assets/images/video.jpg";
import {
  AudioSVG,
  DocsSVG,
  GallerySVG,
  GridSVG,
  RemoveParticipantSVG,
  TimeSVG,
  VideosSVG,
} from "assets/jsx-svg";
import VverseMediaService from "services/VverseMedia/vverse-media.service";
import useGetAllMedia from "services/VverseMedia/Querys/useGetAllMedia";
import useUpdateMedia from "services/VverseMedia/Mutations/useUpdateMedia";
import { deleteNodeById } from "views/StudioLivePage/LivePageContent/untils";
import useUpdateMediaFolderStructure from "services/VverseMedia/Mutations/useUpdateMediaFolderStructure";

const tabs = [
  { id: "all", label: "All", icon: GridSVG, children: "" },
  { id: "image", label: "Photos", icon: GallerySVG, children: "" },
  { id: "video", label: "Videos", icon: VideosSVG, children: "" },
  { id: "audio", label: "Audio", icon: AudioSVG, children: "" },
  { id: "doc", label: "Docs", icon: DocsSVG, children: "" },
];

export default function AllMediaTab({
  setDragedMedia,
  selectedFolderKey,
  openFolders,
  setAddMediaToFolderModalOpen,
  liveData,
  setLiveData,
  mediaToShow,
  setMediaToShow,
}) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleteFromFolderLoading, setDeleteFromFolderLoading] = useState(null);
  const [mediaSearch, setMediaSearch] = useState(mediaToShow);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllMediaQuery = useGetAllMedia({
    select: (res) => res.data.data,
  });

  const { mutateAsync: updateMediaFolderStructure } = useUpdateMediaFolderStructure({
    onSuccess: (_, variables) => {
      setLiveData((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          mediaFolder: variables.mediaFolder,
        },
      }));
      setAddMediaToFolderModalOpen(false);
    },
    onError: (err) => axiosCatch(err),
  });

  const mediaFolder = useMemo(() => {
    return liveData?.data?.mediaFolder ? JSON.parse(liveData?.data?.mediaFolder) : [];
  }, [liveData]);

  const updateMediaFolderMutation = useUpdateMedia({
    onSuccess: async (_, variables) => {
      const filteredMediaFolder = deleteNodeById(mediaFolder, variables.mediaId);
      await updateMediaFolderStructure({
        mediaFolder: JSON.stringify(filteredMediaFolder),
      });

      queryClient.setQueryData(getAllMediaQuery.queryKey, (prev) => {
        if (!prev?.data?.data?.rows) return prev;

        const prevData = [...prev.data.data.rows];
        const mediaToChangeIndex = prevData.findIndex((media) => media.id === +variables.mediaId);

        if (mediaToChangeIndex > -1) {
          prevData[mediaToChangeIndex] = {
            ...prevData[mediaToChangeIndex],
            folderId: variables.folderId,
          };
        }

        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              rows: prevData,
            },
          },
        };
      });
    },
    onMutate: (variables) => setDeleteFromFolderLoading(variables.mediaId),
    onSettled: () => setDeleteFromFolderLoading(null),
  });

  const confirmDeleteMediaFolder = (mediaId) => {
    updateMediaFolderMutation.mutate({ mediaId, folderId: null });
  };

  const confirmDelete = async (mediaId) => {
    try {
      setDeleteLoading(mediaId);
      await VverseMediaService.deleteMedia(mediaId);
      queryClient.setQueryData(getAllMediaQuery.queryKey, (prev) => {
        if (!prev || !prev.data || !prev.data.rows) {
          return prev;
        }

        const prevData = prev.data.rows;

        return {
          ...prev,
          data: {
            ...prev.data,
            rows: prevData.filter((media) => media.id !== mediaId),
          },
        };
      });
      setMediaToShow((prev) => prev.filter((media) => media.id !== mediaId));
    } catch (err) {
      axiosCatch(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    if (mediaToShow && searchQuery) {
      setMediaSearch(
        mediaToShow.filter((media) => media.name.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    } else {
      setMediaSearch(mediaToShow);
    }
  }, [mediaToShow, searchQuery]);

  const onMediaSearch = (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    if (getAllMediaQuery.isSuccess && getAllMediaQuery.data) {
      if (!selectedFolderKey || selectedFolderKey === "allFrame") {
        if (activeTab === "all") {
          setMediaToShow(getAllMediaQuery.data.rows);
        } else {
          setMediaToShow(
            getAllMediaQuery.data.rows.filter((media) => {
              if (media.type === activeTab) {
                return true;
              }
              if (activeTab === "doc" && ["pdf", "powerpoint"].includes(media.type)) {
                return true;
              }

              return false;
            }),
          );
        }
      } else {
        const filteredDataOnSelectedFolder = getAllMediaQuery.data.rows.filter(
          (media) => media.folderId === selectedFolderKey,
        );
        if (activeTab === "all") {
          setMediaToShow(filteredDataOnSelectedFolder);
        } else {
          setMediaToShow(
            filteredDataOnSelectedFolder.filter((media) => {
              if (media.type === activeTab) {
                return true;
              }
              if (activeTab === "doc" && ["pdf", "powerpoint"].includes(media.type)) {
                return true;
              }

              return false;
            }),
          );
        }
      }
    }
  }, [
    activeTab,
    getAllMediaQuery.data,
    getAllMediaQuery.isSuccess,
    selectedFolderKey,
    setMediaToShow,
  ]);

  return (
    <div className="h-100">
      <Row wrap={false} gutter={[8, 0]} style={{ overflowX: "auto", marginLeft: "8px" }}>
        {tabs.map((tab) => (
          <Col key={tab.id}>
            <Button
              onClick={() => setActiveTab(tab.id)}
              type="text"
              className={`dimension-files-tab ${activeTab === tab.id ? "active" : ""}`}>
              <Row wrap={false} gutter={[6, 0]} align="middle">
                <Col>
                  <Row align="middle">
                    <tab.icon width="14px" height="14px" />
                  </Row>
                </Col>
                <Col>{tab.label}</Col>
              </Row>
            </Button>
          </Col>
        ))}
      </Row>

      <div className="tabs-content" id="tabs-content">
        <Input
          placeholder="Search"
          className="w-100"
          onChange={onMediaSearch}
          value={searchQuery}
          style={{ height: "32px", borderRadius: "3rem", marginBlockEnd: "0.5rem" }}
        />

        <Row gutter={[24, 16]} wrap={true}>
          {mediaSearch?.map((item) => (
            <Col xs={24} md={12} lg={8} xl={openFolders ? 8 : 6} key={item.id}>
              <Row
                gutter={[8, 0]}
                wrap={false}
                style={{ cursor: "grab" }}
                draggable
                onDragStart={() => setDragedMedia(item)}
                onDragEnd={() => setDragedMedia(null)}>
                <Col>
                  <Image
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                    preview={false}
                    width={65}
                    height={54}
                    src={
                      item.type === "pdf" || item.type === "powerpoint"
                        ? item.image ||
                          "https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g=w240-h480-rw"
                        : item.type === "audio" || item.type === "video"
                        ? item.image || videoImg
                        : item.image || item.file
                    }
                  />
                </Col>
                <Col flex={1}>
                  <Row gutter={[0, 4]}>
                    <Col xs={24}>
                      <Tooltip title={item.name}>
                        <Typography.Text ellipsis className="fz-12 fw-500">
                          {item.name}
                        </Typography.Text>
                      </Tooltip>
                    </Col>
                    <Col xs={24}>
                      <Row gutter={[2, 0]} align="middle" wrap={false}>
                        <Col>
                          <Row align="middle">
                            <TimeSVG color="#8E8E93" width="10px" height="10px" />
                          </Row>
                        </Col>
                        <Col>
                          <Typography.Text
                            className="gc"
                            style={{ fontSize: "10px", lineHeight: "22px" }}
                            ellipsis>
                            {dayjs(item.createdAt).format("DD MMM YYYY, HH:mm")}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Flex vertical align="center" justify="space-between" className="h-100">
                    <Tooltip title="Add media to folder">
                      <FolderOutlined
                        className="clickable"
                        onClick={() => setAddMediaToFolderModalOpen(item.id)}
                      />
                    </Tooltip>

                    {item.folderId && (
                      <Tooltip title="Delete media from folder">
                        <Popconfirm
                          title="Delete media from folder"
                          description="Are you sure to delete this media from folder?"
                          onConfirm={() => confirmDeleteMediaFolder(item.id)}
                          okText="Delete"
                          cancelText="Cancel">
                          {deleteFromFolderLoading === item.id ? (
                            <LoadingOutlined />
                          ) : (
                            <RemoveParticipantSVG fill="#000" className="clickable" />
                          )}
                        </Popconfirm>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete media">
                      <Popconfirm
                        title="Delete Media"
                        description="Are you sure to delete this media?"
                        onConfirm={() => confirmDelete(item.id)}
                        okText="Delete"
                        cancelText="Cancel">
                        {deleteLoading === item.id ? (
                          <LoadingOutlined />
                        ) : (
                          <DeleteOutlined className="clickable" />
                        )}
                      </Popconfirm>
                    </Tooltip>
                  </Flex>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
