import { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Row, Spin, notification, Typography, message } from "antd";
import { useLocalParticipant, useParticipants } from "@livekit/components-react";

import { FileSVG, ScreenSVG, SearchSVG, ShareDimenstionSVG, WhiteBoardSVG } from "assets/jsx-svg";
import { increment, ref, update } from "firebase/database";

import "./styles.css";
import { toggleShareScreen } from "../DeviceControl";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";
import isValidJson from "utils/isValidJson";
import { RemoteParticipant } from "livekit-client";
import { useParams } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";

export default function ShareTools({
  meetingSettings,
  changeSettings,
  setActiveBtn,
  shareWhiteboard,
  sharingScreen,
  unPublishScreen,
  SystemMessage,
  sharingDim,
  sharingFile,
  deskType,
  meetingMetadata,
  isHost,
  db
}) {
  const localParticipant = useLocalParticipant();
  const [activeTool, setActiveTool] = useState();
  const [activeToolLoading, setActiveToolLoading] = useState(false);
  const { user } = useUserContext();
  const participants = useParticipants();
  const participantData = participants?.filter((p) => p instanceof RemoteParticipant)
    .filter((participant) => participant?.identity?.includes("web"))
    .map(el => isValidJson(el?.metadata) ? { ...JSON.parse(el.metadata), ...el } : el.metadata);

  const { meetingId } = useParams();

  const isBookingShareEnabled = useMemo(() => user?.officerType === OFFICER_TYPES?.DMC || user?.officerType === OFFICER_TYPES?.AGENT, [user])
  let tools = [
    {
      id: 1,
      defaultLabel: localParticipant.isScreenShareEnabled ? "Stop Share Screen" : "Share Screen",
      icon: ScreenSVG,
    },
    {
      id: 2,
      defaultLabel: "Metaverse Experience",
      icon: ShareDimenstionSVG,
    },
    {
      id: 3,
      defaultLabel:
        meetingSettings.sharingWhiteboard === "null" ? "Share Whiteboard" : "Stop Whiteboard",
      icon: WhiteBoardSVG,
    },
    // {
    //   id: 4,
    //   defaultLabel: "World Map",
    //   icon: WorldMapSVG,
    // },
    {
      id: 5,
      defaultLabel: "Files",
      icon: FileSVG,
    },
    (isBookingShareEnabled && {
      id: 66,
      defaultLabel: "Booking",
      icon: SearchSVG,
    }),
    // {
    //   id: 6,
    //   defaultLabel: "LiveStream",
    //   icon: LiveSVG,
    // },
  ];

  const travelAddToCart = useCallback((customerId) => {
    // Reference to the travel cart for a specific user and meeting
    const travelCartRef = ref(
      db,
      `Company/${user.companyId}/meeting/${meetingId}/settings/travelCart`
    );

    let updates = {};

    // Increment the cart count for the specified customer
    updates[`/${customerId}`] = increment(1);

    // Update the travelCart in the database
    update(travelCartRef, updates)
      .then(() => {
        console.log("Travel cart updated successfully!", { companyId: user?.companyId, customerId, meetingId });
      })
      .catch((error) => {
        console.error("Error updating travel cart:", error);
      });

  }, [db, user, meetingId])

  useEffect(() => {
    if (typeof travelAddToCart === "function" && isBookingShareEnabled) {
      window.travelAddToCart = travelAddToCart;
    }
  }, [isBookingShareEnabled, travelAddToCart])

  if (deskType) {
    tools.splice(1, 1);
  }

  return (
    <section className="share-tools">
      <Typography.Text className="fz-18 fw-500">Sharing Tools</Typography.Text>

      <Row gutter={[8, 8]} style={{ marginTop: "24px" }}>
        {tools.filter(el => Boolean(el)).map((tool) => (
          <Col xs={8} key={tool.id}>
            <Spin spinning={activeTool === tool.id && activeToolLoading}>
              <div
                className={`share-tools-card ${activeTool === tool.id && "active"}`}
                onClick={() => {
                  if (tool.id === 1) {
                    toggleShareScreen({
                      isHost,
                      loading: activeToolLoading,
                      setLoading: setActiveToolLoading,
                      localParticipant: localParticipant.localParticipant,
                      meetingMetadata,
                    });
                  }
                  // for booking share screen
                  if (tool.id === 66) {
                    window.open(
                      ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING_METTING + `?participants=${JSON.stringify(participantData)}`,
                      '_blank',
                      `width=${window.screen.width},height=${window.screen.height},top=0,left=0`
                    );


                    // // Proceed with screen sharing if needed
                    toggleShareScreen({
                      isHost,
                      loading: activeToolLoading,
                      setLoading: setActiveToolLoading,
                      localParticipant: localParticipant.localParticipant,
                      meetingMetadata,
                    });


                    // Show a message to guide the user
                    message.info("The booking page is opened in a new window. A share dialog will be triggered.");
                  }

                  if (tool.id === 3) {
                    if (meetingSettings.sharingWhiteboard !== "null") {
                      changeSettings("sharingWhiteboard", "null");
                      setActiveTool(null);
                      return;
                    }
                    setActiveTool(tool.id);

                    if (sharingDim) {
                      SystemMessage.stopDim();
                    } else if (sharingScreen) {
                      unPublishScreen();
                    } else if (sharingFile) {
                      SystemMessage.stopFilePreview();
                    }

                    notification.info({
                      message: "Initializing whiteboard",
                    });
                    setActiveToolLoading(true);
                    shareWhiteboard().then(() => setActiveToolLoading(false));
                  } else if (tool.id === 2) {
                    setActiveBtn("metaExperience");
                    setActiveTool(tool.id);
                  } else if (tool.id === 5) {
                    setActiveBtn("files");
                    setActiveTool(tool.id);
                  } else if (tool.id === 6) {
                    setActiveBtn("liveStream");
                    setActiveTool(tool.id);
                  } else {
                    setActiveTool(tool.id);
                  }
                }}>
                <Row gutter={[0, 12]} justify="center">
                  <Col xs={24}>
                    <Row justify="center">
                      <tool.icon
                        style={{ width: "24px", height: "24px" }}
                        color={activeTool === tool.id ? "#3A5EE3" : "#000"}
                      />
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Row justify="center" style={{ textAlign: "center" }}>
                      <Typography.Text>{tool.defaultLabel}</Typography.Text>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Spin>
          </Col>
        ))}
      </Row>
    </section>
  );
}
