import { Modal } from "antd";
import ScheduleCallComponent from "./ScheduleCall";
import "./styles.css";

export default function PopupWidgetScheduleCall({ isModalOpened, onCloseModal, children }) {
  const handleCancel = () => {
    onCloseModal();
  };

  return (
    <>
      {children}
      <Modal
        title=""
        centered
        open={isModalOpened}
        closable={false}
        onCancel={handleCancel}
        footer={null}
        className="web-widget-schedual-call-popup-widget-schedule-call"
        width="100vw">
        <ScheduleCallComponent isInModal onCloseModal={handleCancel} />
      </Modal>
    </>
  );
}
