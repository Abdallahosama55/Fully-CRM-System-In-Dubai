import { Tabs, Typography } from "antd";

import AdminContet from "./AdminContent";
import ModerateContent from "./ModerateContent";
import SpeakersContent from "./SpeakersContent";

import "./styles.css";

export default function LivePageContent({
  iframeRef,
  dragedMedia,
  setDragedMedia,
  dragedParticipant,
  frameFullScreen,
  setFrameFullScreen,
  liveData,
  setLiveData,
  userRole,
  setActiveContentTab,
  eventMetadata,
  setEventMetadata,
  handRaisedUsers,
}) {
  return (
    <Tabs
      className="live-page-media-tabs"
      size="small"
      onChange={(key) => setActiveContentTab(key)}
      items={[
        {
          label: <Typography.Text className="fz-12">Admins</Typography.Text>,
          key: "admins",
          children: (
            <AdminContet
              iframeRef={iframeRef}
              dragedMedia={dragedMedia}
              setDragedMedia={setDragedMedia}
              dragedParticipant={dragedParticipant}
              frameFullScreen={frameFullScreen}
              setFrameFullScreen={setFrameFullScreen}
              liveData={liveData}
              setLiveData={setLiveData}
            />
          ),
        },
        {
          label: <Typography.Text className="fz-12">Moderate</Typography.Text>,
          key: "moderate",
          children: (
            <ModerateContent
              liveData={liveData}
              eventMetadata={eventMetadata}
              setEventMetadata={setEventMetadata}
              handRaisedUsers={handRaisedUsers}
              iframeRef={iframeRef}
            />
          ),
        },
        {
          label: <Typography.Text className="fz-12">Speaker</Typography.Text>,
          key: "speaker",
          children: <SpeakersContent />,
        },
      ].filter((item) => {
        if (userRole === "speaker" && item.key !== "admins") {
          return true;
        } else if (userRole === "admin") {
          return true;
        } else {
          return false;
        }
      })}
    />
  );
}
