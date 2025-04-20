import { useState } from "react";
import { Button, Col, Row, Tabs, Typography } from "antd";

import MediaAddModal from "views/StudioLivePage/MediaAddModal";
import AllMediaTab from "./AllMediaTab";
import FoldersTab from "./FoldersTab";
import AddMediaToFolderModal from "./AddMediaToFolderModal";

export default function DimensionFiles({ setDragedMedia, liveData, setLiveData }) {
  const [addMediaModalOpen, setAddMediaModalOpen] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState("all");
  const [showFolders, setShowFolders] = useState(false);
  const [openFolders, setOpenFolders] = useState(false);
  const [selectedFolderKey, setSelectedFolderKey] = useState("allFrame");
  const [addFolderModalOpen, setAddFolderModalOpen] = useState(false);
  const [addMediaToFolderModalOpen, setAddMediaToFolderModalOpen] = useState(false);
  const [mediaToShow, setMediaToShow] = useState([]);

  return (
    <div className="h-100">
      <Tabs
        destroyInactiveTabPane
        style={{
          height: "fit-content",
          width: "100%",
        }}
        defaultActiveKey="all"
        activeKey={activeMediaTab}
        onChange={(e) => {
          if (["folders", "uploadMedia"].includes(e)) {
            if (e === "uploadMedia") {
              setAddMediaModalOpen(true);
            }

            if (e === "folders") {
              setOpenFolders((prev) => !prev);
            }
            return;
          }
          setActiveMediaTab(e);
        }}
        items={[
          {
            key: "folders",
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
            key: "uploadMedia",
            label: (
              <Button size="small" type="primary" className="fz-12">
                Uplad Media
              </Button>
            ),
          },
        ]}
        size="small"
      />

      <AddMediaToFolderModal
        addMediaToFolderModalOpen={addMediaToFolderModalOpen}
        setAddMediaToFolderModalOpen={setAddMediaToFolderModalOpen}
        addFolderModalOpen={addFolderModalOpen}
        setAddFolderModalOpen={setAddFolderModalOpen}
        liveData={liveData}
        setLiveData={setLiveData}
      />

      <Row gutter={[8, 8]}>
        {openFolders ? (
          <Col xs={24} lg={8}>
            <FoldersTab
              liveData={liveData}
              setLiveData={setLiveData}
              selectedFolderKey={selectedFolderKey}
              setSelectedFolderKey={setSelectedFolderKey}
              addFolderModalOpen={addFolderModalOpen}
              setAddFolderModalOpen={setAddFolderModalOpen}
            />
          </Col>
        ) : null}
        <Col xs={24} lg={openFolders ? 16 : 24}>
          <AllMediaTab
            setAddMediaModalOpen={setAddMediaModalOpen}
            setDragedMedia={setDragedMedia}
            selectedFolderKey={selectedFolderKey}
            openFolders={openFolders}
            setAddMediaToFolderModalOpen={setAddMediaToFolderModalOpen}
            liveData={liveData}
            setLiveData={setLiveData}
            mediaToShow={mediaToShow}
            setMediaToShow={setMediaToShow}
          />
        </Col>
      </Row>

      <MediaAddModal
        setMedia={setMediaToShow}
        addMediaModalOpen={addMediaModalOpen}
        setAddMediaModalOpen={setAddMediaModalOpen}
      />
    </div>
  );
}
