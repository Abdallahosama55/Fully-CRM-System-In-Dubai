import { useContext, useEffect, useState } from "react";
import { Typography, Col, Row, Button, Image, Form } from "antd";

import MeetingCallParticipants from "../MeetingCallParticipants";
import MeetChat from "../MeetChat";
import ShareTools from "../ShareTools";
import MetaExperience from "../MetaExperience";
import Holomeet from "../Holomeet";
import FilesSharing from "../FilesSharing";
import SharedFiles from "../SharedFiles";
import YoutubeLink from "../YoutubeLink";
import Counter from "../Counter";
import ProductionTools from "../ProductionTools";
import LiveStream from "../LiveStream";
import CounterForUser from "../Counter/CounterForUser";

import { FullscreenSVG, GroupsSVG, LeftArrowOutlinedSVG } from "assets/jsx-svg";
import AvatarMain from "assets/images/AvatarMain.png";

import CounterSharedData from "../Counter/CounterSharedData";
import Desks from "../Desks";
import EmbedLink from "../EmbedLink";
import SelectParticipants from "../SelectParticipants";
import userContext from "context/userContext";
import WaitingRoom from "../WaitingRoom";
import Cart from "../Cart";
import SuccessPage from "../Cart/SuccessPage";
import FailedPage from "../Cart/FailedPage";
import MyCart from "../MyCart";
import InventorySection from "../InventorySection";
import ProductSection from "../ProductSection";
import Box from "components/Box";
import AgentMeetChat from "../AgentMeetChat";
import UserInventory from "../UserInventory";

export default function MeetAsaider({
  forMobile = false,
  db,
  meetingSettings,
  changeSettings,
  isHost,
  activeBtn,
  setActiveBtn,
  dimensionFrames,
  liveStreamCameras,
  setIsMinMeetingScreen,
  iframeRef,
  selectedDeskId,
  setSelectedDeskId,
  deskIframeRef,
  deskType,
  setHideSide,
  setShowCounterBtn,
  prevCounterData,
  setIframeRef,
  isMetaverseMeet,
  metaverseParticipants,
  meetingMetadata,
  setOpenMobileMenu,
  shareWhiteboard,
  fastboard,
  setDragedMedia,
  setDragedParticipant,
  micId,
  isAgentMeeting,
  checkoutPrice,
  setCheckoutPrice,
  agentRoomMessages,
}) {
  const { user } = useContext(userContext);
  const [productSelected, setProductSelected] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCam, setSelectedCam] = useState(null);
  const [fadeColor, setFadeColor] = useState("#000000");
  const [isFadeEnabled, setIsFadeEnabled] = useState(false);
  const [liveStarted, setLiveStarted] = useState(false);
  const [counterActiveBtn, setCounterActiveBtn] = useState(1);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [sameCounterCliked, setSameCounterCliked] = useState(0);
  const [counterForm] = Form.useForm();
  const [cardItems, setCardItems] = useState([]);

  useEffect(() => {
    if (meetingSettings.hostFiles && meetingSettings.hostFiles !== JSON.stringify(sharedFiles)) {
      const files = JSON.parse(meetingSettings.hostFiles);
      if (Array.isArray(files)) {
        setSharedFiles(files);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingSettings]);

  const onSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value.trim());
  };

  const handleDragedMedia = (media) => {
    setDragedMedia(media);
  };

  const handleDragedParticipant = (participant) => {
    setDragedParticipant(participant);
  };

  return (
    <aside style={{ height: "calc(100% - 22px)" }} className="w-100">
      {activeBtn === "queue" && (
        <Box
          onClick={() => {
            setHideSide(true);
            setIsMinMeetingScreen(true);
          }}
          sx={{ cursor: "pointer", width: "20px", float: "right", paddingInline: "16px" }}>
          <FullscreenSVG color="black" />
        </Box>
      )}
      {!forMobile && (
        <Row justify="space-between" align="middle" className="mb-1">
          <Col></Col>
          <Col>
            <div className="hide-sider clickable" onClick={() => setHideSide(true)}>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Row align="middle">
                    <LeftArrowOutlinedSVG stroke={"#8E8E93"}></LeftArrowOutlinedSVG>

                    {/* <EyeInvisibleFilled style={{ color: "#8E8E93" }} /> */}
                  </Row>
                </Col>
                <Col>
                  <Typography.Text className="fw-500 gc">Hide Panel</Typography.Text>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      )}

      {activeBtn === "metaExperience" && (
        <MetaExperience setOpenMobileMenu={setOpenMobileMenu} setActiveBtn={setActiveBtn} />
      )}

      {activeBtn === "youtubeLink" && (
        <YoutubeLink setActiveBtn={setActiveBtn} fastboard={fastboard} />
      )}

      {activeBtn === "embedLink" && <EmbedLink setActiveBtn={setActiveBtn} />}

      {activeBtn === "counter" && (
        <Counter
          changeSettings={changeSettings}
          setActiveBtn={setActiveBtn}
          counterForm={counterForm}
          counterActiveBtn={counterActiveBtn}
          setCounterActiveBtn={setCounterActiveBtn}
          iframeRef={iframeRef}
          deskIframeRef={deskIframeRef}
          prevCounterData={prevCounterData}
          sameCounterCliked={sameCounterCliked}
          setSameCounterCliked={setSameCounterCliked}
          metaverseParticipants={metaverseParticipants}
        />
      )}

      {activeBtn === "userCounter" && (
        <CounterForUser
          meetingSettings={meetingSettings}
          changeSettings={changeSettings}
          setActiveBtn={setActiveBtn}
          setShowCounterBtn={setShowCounterBtn}
          isHost={isHost}
        />
      )}

      {activeBtn === "counterUserSharedData" && (
        <CounterSharedData
          meetingSettings={meetingSettings}
          changeSettings={changeSettings}
          setActiveBtn={setActiveBtn}
        />
      )}

      {activeBtn === "counterParticipants" && (
        <SelectParticipants
          changeSettings={changeSettings}
          setActiveBtn={setActiveBtn}
          counterForm={counterForm}
          counterActiveBtn={counterActiveBtn}
        />
      )}

      {activeBtn === "deskParticipants" && (
        <SelectParticipants
          changeSettings={changeSettings}
          setActiveBtn={setActiveBtn}
          counterForm={counterForm}
          counterActiveBtn={counterActiveBtn}
          selectedDeskId={selectedDeskId}
          type="desk"
        />
      )}

      {activeBtn === "productionTools" && (
        <ProductionTools
          changeSettings={changeSettings}
          setDragedMedia={handleDragedMedia}
          activeBtn={activeBtn}
          meetingMetadata={meetingMetadata}
          dimensionFrames={dimensionFrames}
          iframeRef={iframeRef}
          deskIframeRef={deskIframeRef}
          setDragedParticipant={handleDragedParticipant}
        />
      )}

      {activeBtn === "liveStream" && (
        <LiveStream
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          selectedCam={selectedCam}
          setSelectedCam={setSelectedCam}
          liveStarted={liveStarted}
          setLiveStarted={setLiveStarted}
          liveStreamCameras={liveStreamCameras}
          fadeColor={fadeColor}
          setFadeColor={setFadeColor}
          isFadeEnabled={isFadeEnabled}
          setIsFadeEnabled={setIsFadeEnabled}
          iframeRef={iframeRef}
          deskIframeRef={deskIframeRef}
        />
      )}

      {activeBtn === "tools" && (
        <ShareTools
          db={db}
          meetingSettings={meetingSettings}
          changeSettings={changeSettings}
          setActiveBtn={setActiveBtn}
          isHost={isHost}
          deskType={deskType}
          meetingMetadata={meetingMetadata}
          shareWhiteboard={shareWhiteboard}
        />
      )}
      {/* {activeBtn === "queue" && <DeskQueue></DeskQueue>} */}
      {activeBtn === "participant" && (
        <MeetingCallParticipants
          meetingSettings={meetingSettings}
          changeSettings={changeSettings}
          isHost={isHost}
          onSearch={onSearch}
          setActiveBtn={setActiveBtn}
          meetingMetadata={meetingMetadata}
          selectedCam={selectedCam}
          selectedMic={micId}
          metaverseParticipants={metaverseParticipants}
          setOpenMobileMenu={setOpenMobileMenu}
        />
      )}

      {activeBtn === "waitingRoom" && (
        <WaitingRoom
          meetingSettings={meetingSettings}
          changeSettings={changeSettings}
          setActiveBtn={setActiveBtn}
        />
      )}

      {activeBtn === "chat" ? (
        isAgentMeeting ? (
          <AgentMeetChat
            meetingMetadata={meetingMetadata}
            isHost={isHost}
            agentRoomMessages={agentRoomMessages}
          />
        ) : (
          <MeetChat meetingMetadata={meetingMetadata} isHost={isHost} />
        )
      ) : null}

      {activeBtn === "desks" && (
        <Desks setActiveBtn={setActiveBtn} setSelectedDeskId={setSelectedDeskId} />
      )}

      {activeBtn === "inventory" && (
        <InventorySection setProductSelected={setProductSelected} setActiveBtn={setActiveBtn} />
      )}

      {activeBtn === "userInventory" && <UserInventory setActiveBtn={setActiveBtn} />}

      {activeBtn === "myCart" && (
        <MyCart
          setCardItems={setCardItems}
          setActiveBtn={setActiveBtn}
          setCheckoutPrice={setCheckoutPrice}
          meetingSettings={meetingSettings}
        />
      )}

      {activeBtn === "productSection" && (
        <ProductSection
          db={db}
          setProductSelected={setProductSelected}
          productSelected={productSelected}
          setActiveBtn={setActiveBtn}
          changeSettings={changeSettings}
        />
      )}

      {activeBtn === "cart" && (
        <Cart
          setCardItems={setCardItems}
          cardItems={cardItems}
          checkoutPrice={checkoutPrice}
          setActiveBtn={setActiveBtn}
          meetingSettings={meetingSettings}
          isHost={isHost}
          isAgentMeeting={isAgentMeeting}
        />
      )}

      {activeBtn === "holomeet" && <Holomeet />}

      {activeBtn === "files" && (
        <FilesSharing
          changeSettings={changeSettings}
          setActiveBtn={setActiveBtn}
          meetingSettings={meetingSettings}
        />
      )}

      {activeBtn === "paymentSucess" && (
        <SuccessPage setActiveBtn={setActiveBtn} setShowCounterBtn={setShowCounterBtn} />
      )}

      {activeBtn === "paymentFailed" && <FailedPage setActiveBtn={setActiveBtn} />}

      {activeBtn === "sharedFiles" && (
        <SharedFiles
          meetingSettings={meetingSettings}
          meetingMetadata={meetingMetadata}
          setActiveBtn={setActiveBtn}
        />
      )}

      {activeBtn === "sharingDim" && meetingSettings.sharingDim.sharing && !isMetaverseMeet && (
        <>
          <Row style={{ marginTop: "24px" }}>
            <Typography.Text className="fz-18 fw-400">
              You Can Join Metaverse Experience With Other Participants.
            </Typography.Text>
          </Row>
          <Row justify="center" gutter={[0, 16]} style={{ marginTop: "160px" }}>
            <Col xs={24}>
              <Row justify="center">
                <Image src={AvatarMain} preview={false} alt="Main avatar" />
              </Row>
            </Col>
            <Col className="join-dim-btn" xs={24}>
              <Row justify="center">
                <Button
                  onClick={() => {
                    if (
                      meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "")
                    ) {
                      setIframeRef(null);
                      const filterdData = meetingSettings.sharingDim.usersJoinedDim
                        .split(",")
                        .filter((id) => id !== user.id + "");
                      changeSettings("sharingDim/usersJoinedDim", filterdData.join(","));
                    } else {
                      changeSettings(
                        "sharingDim/usersJoinedDim",
                        `${meetingSettings.sharingDim.usersJoinedDim},${user.id}`,
                      );
                    }
                  }}
                  type="primary"
                  style={{ borderRadius: "14px" }}>
                  <Row gutter={[6, 0]} wrap={false} align="middle">
                    <Col>
                      <Row align="middle">
                        <GroupsSVG />
                      </Row>
                    </Col>
                    <Col>
                      {meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "")
                        ? "Leave Dimension"
                        : "Join Dimension"}
                    </Col>
                  </Row>
                </Button>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </aside>
  );
}
