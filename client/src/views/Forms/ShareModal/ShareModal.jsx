import { Button, Modal } from "antd";
import "./styles.css";
import TabsMenu from "components/TabsMenu";
import { useState } from "react";
import ShareALink from "./components/ShareALink";
import AddToWebsite from "./components/AddToWebsite";
import { ProviderPageSettingsProvider } from "./ProviderPageSettings";

const ShareModal = ({ isOpen, deskId, setIsOpen }) => {
  const [currentTab, setCurrentTab] = useState("shareALink");

  const handleContinue = () => {};

  const tabs = [
    {
      key: "shareALink",
      label: "Share a link",
    },
    {
      key: "addToWebsite",
      label: "Add to website",
    },
  ];

  return (
    <Modal
      width={700}
      centered={true}
      open={isOpen}
      mask={true}
      onOk={handleContinue}
      onCancel={() => setIsOpen(false)}
      title={"Share"}
      className="share-modal "
      footer={() => null}>
      <TabsMenu tabs={tabs} onTabChanged={(tab) => setCurrentTab(tab)} />
      {currentTab === "shareALink" && (
        <div style={{ marginTop: 16 }}>
          <ShareALink deskId={deskId} />
        </div>
      )}
      {currentTab === "addToWebsite" && (
        <div style={{ marginTop: 16 }}>
          <ProviderPageSettingsProvider>
            <AddToWebsite deskId={deskId} />
          </ProviderPageSettingsProvider>
        </div>
      )}
    </Modal>
  );
};
export default ShareModal;
