import { Modal } from "antd";
import Header from "./Header";
import { Suspense } from "react";
import LoadingPage from "components/common/LoadingPage";

import "./styles.css";

const WebWidgetLayoutModal = ({ onCancel, children }) => {
  return (
    <Modal
      title=""
      centered
      className="web-widget-layout-modal"
      closable={false}
      open={true}
      onCancel={onCancel}
      footer={null}
      wrapProps={{
        style: {
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        },
      }}
      style={{
        maxWidth: "100%",
        margin: 0,
      }}
      width="100VW">
      <Header />
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </Modal>
  );
};

export default WebWidgetLayoutModal;
