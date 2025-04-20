import { useEffect, useState } from "react";
import { Button, Col, Row, Tabs, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import MediaElement from "./MediaElement";
import FramesFolders from "./FramesFolders";
import { AudioSVG, GallerySVG } from "assets/jsx-svg";
import AddFrameToFolderModal from "./AddFrameToFolderModal";
import useListDiemnsionFrames from "services/DiemnsionsFrames/Querys/useListDiemnsionFrames";

const tabs = [
  { id: "media", label: "Media Frames", icon: GallerySVG },
  { id: "audio", label: "Audio Frames", icon: AudioSVG },
];

export default function DimensionFrame({
  onDropFun,
  dragedMedia,
  iframeRef,
  dragedParticipant,
  activeTab,
  setActiveTab,
  setFrameFullScreen,
  liveData,
  setLiveData,
  setFramesToshow,
  framesToShow,
}) {
  const [activeFrameType, setActiveFrameType] = useState("all");
  const [showFolders, setShowFolders] = useState(false);
  const [selectedTreeKey, setSelectedTreeKey] = useState("allFrame");
  const [addFrameToFolderModalOpen, setAddFrameToFolderModalOpen] = useState(false);
  const [addFrameModalOpen, setAddFrameModalOpen] = useState(false);

  const listDiemnsionFramesQuery = useListDiemnsionFrames(
    activeTab.toUpperCase(),
    liveData?.data?.customerDimension?.id,
    {
      select: (data) => data.data.data,
    },
  );

  useEffect(() => {
    if (listDiemnsionFramesQuery.isSuccess && listDiemnsionFramesQuery.data) {
      if (selectedTreeKey === "allFrame") {
        setFramesToshow(listDiemnsionFramesQuery.data);
      } else {
        setFramesToshow(
          listDiemnsionFramesQuery.data.filter((frame) => frame.folderId === +selectedTreeKey),
        );
      }
    }
  }, [
    activeFrameType,
    listDiemnsionFramesQuery.data,
    listDiemnsionFramesQuery.isSuccess,
    selectedTreeKey,
    setFramesToshow,
  ]);

  return (
    <Row gutter={[0, 8]}>
      <Col xs={24}>
        <Row gutter={[12, 12]}>
          <Col xs={24} lg={24}>
            <div className="dimension-frame">
              <Tabs
                destroyInactiveTabPane
                style={{
                  height: "fit-content",
                  width: "100%",
                }}
                defaultActiveKey="all"
                activeKey={activeFrameType}
                onChange={(e) => {
                  if (["framesType", "toggleFolders"].includes(e)) {
                    return;
                  }
                  setActiveFrameType(e);
                }}
                items={[
                  {
                    key: "toggleFolders",
                    label: (
                      <Typography.Text
                        className="fw-600 fz-12"
                        onClick={() => {
                          setShowFolders((prev) => !prev);
                        }}
                        style={{ color: showFolders ? "#1f94fe" : "#000" }}>
                        Folders
                      </Typography.Text>
                    ),
                  },
                  {
                    key: "framesType",
                    label: (
                      <Row
                        wrap={false}
                        align="middle"
                        justify="start"
                        gutter={[8, 0]}
                        style={{ overflowX: "auto" }}>
                        {tabs.map((tab) => (
                          <Col key={tab.id}>
                            <Button
                              onClick={() => {
                                setActiveTab(tab.id);
                                setActiveFrameType("all");
                              }}
                              type="text"
                              className={`dimension-files-tab ${
                                activeTab === tab.id ? "active" : ""
                              }`}>
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
                    ),
                  },
                ]}
                size="small"
              />

              <Row gutter={[8, 0]} wrap={false}>
                {showFolders ? (
                  <Col xs={8}>
                    <FramesFolders
                      liveData={liveData}
                      setLiveData={setLiveData}
                      activeTab={activeTab}
                      listDiemnsionFramesQuery={listDiemnsionFramesQuery}
                      selectedTreeKey={selectedTreeKey}
                      setSelectedTreeKey={setSelectedTreeKey}
                      addFrameToFolderModalOpen={addFrameToFolderModalOpen}
                      setAddFrameToFolderModalOpen={setAddFrameToFolderModalOpen}
                      addFrameModalOpen={addFrameModalOpen}
                      setAddFrameModalOpen={setAddFrameModalOpen}
                    />
                  </Col>
                ) : null}

                <AddFrameToFolderModal
                  addFrameToFolderModalOpen={addFrameToFolderModalOpen}
                  setAddFrameToFolderModalOpen={setAddFrameToFolderModalOpen}
                  setAddFrameModalOpen={setAddFrameModalOpen}
                  liveData={liveData}
                  setLiveData={setLiveData}
                  listDiemnsionFramesQuery={listDiemnsionFramesQuery}
                  activeTab={activeTab}
                />

                <Col xs={showFolders ? 16 : 24}>
                  {listDiemnsionFramesQuery.isPending ? (
                    <Row justify="center">
                      <LoadingOutlined />
                    </Row>
                  ) : (
                    <div className="media-tab-content">
                      <Row gutter={[8, 8]}>
                        {framesToShow?.map((frame) => {
                          return (
                            <MediaElement
                              key={frame.name}
                              screen={frame}
                              onDropFun={onDropFun}
                              dragedMedia={dragedMedia}
                              setFramesToshow={setFramesToshow}
                              iframeRef={iframeRef}
                              dragedParticipant={dragedParticipant}
                              activeTab={activeTab}
                              setFrameFullScreen={setFrameFullScreen}
                              showFolders={showFolders}
                              setAddFrameToFolderModalOpen={setAddFrameToFolderModalOpen}
                              liveData={liveData}
                              setLiveData={setLiveData}
                              listDiemnsionFramesQuery={listDiemnsionFramesQuery}
                            />
                          );
                        })}
                      </Row>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
