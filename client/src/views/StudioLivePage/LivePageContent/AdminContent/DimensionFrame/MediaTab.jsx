import { Col, Row } from "antd";
import MediaElement from "./MediaElement";
import FramesFolders from "./FramesFolders";

export default function MediaTab({
  framesToShow,
  onDropFun,
  dragedMedia,
  setFramesToshow,
  iframeRef,
  dragedParticipant,
  activeTab,
  setFrameFullScreen,
  tabType,
  frameUpdateLoading,
  updateStatus,
  showFolders,
  activeFrameType,
  liveData,
  setLiveData,
  listDiemnsionFramesQuery,
}) {
  return (
    <Row gutter={[16, 0]} wrap={false}>
      {showFolders ? (
        <Col xs={8}>
          <FramesFolders
            activeFrameType={activeFrameType}
            type={activeTab.toUpperCase()}
            liveData={liveData}
            setLiveData={setLiveData}
            framesToShow={framesToShow}
            activeTab={activeTab}
            listDiemnsionFramesQuery={listDiemnsionFramesQuery}
            tabType={"All"}
            onDropFun={onDropFun}
            dragedMedia={dragedMedia}
            setFramesToshow={setFramesToshow}
            iframeRef={iframeRef}
            dragedParticipant={dragedParticipant}
            setFrameFullScreen={setFrameFullScreen}
            frameUpdateLoading={frameUpdateLoading}
            updateStatus={updateStatus}
          />
        </Col>
      ) : null}

      <Col xs={showFolders ? 16 : 24}>
        <div className="media-tab-content">
          <Row gutter={[8, 8]}>
            {framesToShow[activeTab]
              .filter((frame) => {
                if (tabType === "Favourite") {
                  return frame.isFav;
                }
                if (tabType === "All") {
                  return frame.isFav || frame.isFav === false;
                } else {
                  return frame.isFav === null;
                }
              })
              ?.map((frame) => {
                return (
                  <MediaElement
                    key={frame.name}
                    screen={frame}
                    onDropFun={onDropFun}
                    dragedMedia={dragedMedia}
                    visible={tabType === "All"}
                    setFramesToshow={setFramesToshow}
                    iframeRef={iframeRef}
                    dragedParticipant={dragedParticipant}
                    activeTab={activeTab}
                    setFrameFullScreen={setFrameFullScreen}
                    tabType={tabType}
                    frameUpdateLoading={frameUpdateLoading}
                    updateStatus={updateStatus}
                  />
                );
              })}
          </Row>
        </div>
      </Col>
    </Row>
  );
}
