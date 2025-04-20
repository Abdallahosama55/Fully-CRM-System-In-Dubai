import { useContext } from "react";
import { Image, Typography } from "antd";
import { useParams } from "react-router-dom";
import { ref, update } from "firebase/database";

import WaitingSVG from "assets/svgs/WaitSVG.svg";
import userContext from "../../../context/userContext";
import { CallEndSVG } from "../../../assets/jsx-svg";

import "./styles.css";

export default function WaitingView({ db }) {
  const { user } = useContext(userContext);
  const { liveId } = useParams();

  const endCall = () => {
    const meetSettingsRef = ref(db, `vverse/live-admin/${liveId}/waitingList`);

    let updates = {};

    updates[`/${user.id}`] = {};

    update(meetSettingsRef, updates);
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", flexDirection: "column" }}
      className="center-items">
      <Image src={WaitingSVG} alt="waiting image" preview={false} />
      <Typography.Title level={4} style={{ marginBlock: "58px 20px" }}>
        PLEASE WAIT
      </Typography.Title>

      <Typography.Text className="fw-500 fz-16">
        Please Wait Until The Host Admit Your Request
      </Typography.Text>

      <div className="call-end-btn clickable" onClick={() => endCall()}>
        <CallEndSVG />
      </div>
    </div>
  );
}
