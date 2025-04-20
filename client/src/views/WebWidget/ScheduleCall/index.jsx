import { Button } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PopupWidgetScheduleCall from "./PopupWidgetScheduleCall";
import ScheduleCallComponent from "./ScheduleCall";
import "./styles.css";
import { FLOATING_WIDGET_STYLES } from "constants/WEB_WIDGET_STYLES";

export default function ScheduleCall() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const embeddingType = queryParams.get("embeddingType");
  const linkAndBtnColor = queryParams.get("linkColor") || "#272944";
  const popUpText = queryParams.get("popUpText") || "Schedule Call";

  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpened(true);
    if (window.parent) {
      window.parent.postMessage("openCallScheduleWidget", "*");
    }
  };

  const handleCloseModal = () => {
    if (window.parent) {
      const stylesAfterClosing = embeddingType === "PopupWidget" ? FLOATING_WIDGET_STYLES : "";
      window.parent.postMessage("closeCallScheduleWidget=" + stylesAfterClosing, "*");
    }

    if (embeddingType === "PopupWidget") {
      setTimeout(() => {
        setIsModalOpened(false);
      }, 200);
    } else {
      setIsModalOpened(false);
    }
  };

  if (embeddingType === "PopupText") {
    return (
      <PopupWidgetScheduleCall isModalOpened={isModalOpened} onCloseModal={handleCloseModal}>
        <span id="schedule_call_text" className="clickable" onClick={handleOpenModal}>
          {popUpText}
        </span>
      </PopupWidgetScheduleCall>
    );
  } else if (embeddingType === "PopupWidget") {
    return (
      <PopupWidgetScheduleCall isModalOpened={isModalOpened} onCloseModal={handleCloseModal}>
        {isModalOpened ? (
          <span></span>
        ) : (
          <Button
            id="schedule_call_text"
            type="primary"
            style={{ background: linkAndBtnColor }}
            onClick={handleOpenModal}>
            {popUpText}
          </Button>
        )}
      </PopupWidgetScheduleCall>
    );
  }

  return <ScheduleCallComponent />;
}
