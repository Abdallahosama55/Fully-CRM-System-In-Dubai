import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@livekit/components-react";
import { useParams } from "react-router-dom";
import { Col, Flex, Image, notification, Row } from "antd";
import { ref, onValue, update } from "firebase/database";
import { apps, createFastboard } from "@netless/fastboard";

import userContext from "context/userContext";
import MeetAsaider from "./MeetAsaider";
import MeetLeftSide from "./MeetLeftSide";
import AllMeetingScreens from "./AllMeetingScreens";
import BottomParticipants from "./BottomParticipants";
import MobileDrawer from "./MobileDrawer";
import SystemNotifiactions from "./SystemNotifiactions";
import HandelEvents from "./HandelEvents";
import AgoraService from "services/agora.service";
import Meeting from "views/Meeting";
import QueueTable from "./DeskQueue/Table";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import MetaverseBottomScreen from "./MetavarseBottomScreen";
import { calculateTotalPrice, extractSystemCommand } from "./utils";
import { axiosCatch } from "utils/axiosUtils";
import CustomerCartService from "services/customerCart.service";
import { CloseSVG, FullscreenSVG, MobileBurgerSVG } from "assets/jsx-svg";
import AgentMeeting from "./AgentMeeting";

import "./styles.css";
import Logo from "components/common/Logo";
import isValidJson from "utils/isValidJson";

export default function VirtualSupportContent({
  micId,
  camId,
  meetingData,
  db,
  isMetaverseMeet,
  isHost,
  initialMeetingMetadataContent,
  setPermissionBlockedModal,
}) {
  const { user } = useContext(userContext);
  const { chatMessages } = useChat();
  const [collapsed, setCollapsed] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeBtn, setActiveBtn] = useState(null);
  const [fastboard, setFastboard] = useState(null);
  const [fullScreen, setFullscreen] = useState(false);
  const [isDefean, setIsDefean] = useState(false);
  const [meetingMetadata, setMeetingMetadata] = useState(initialMeetingMetadataContent);

  const [hideSide, setHideSide] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [dimensionFrames, setDimensionFrames] = useState(null);
  const [audioFrames, setAudioFrames] = useState([]);
  const [liveStreamCameras, setLiveStreamCameras] = useState(null);
  const [iframeRef, setIframeRef] = useState(null);
  const [dragedMedia, setDragedMedia] = useState(null);
  const [dragedParticipant, setDragedParticipant] = useState(null);
  const [selectedDeskId, setSelectedDeskId] = useState(null);
  const [showCounterBtn, setShowCounterBtn] = useState(false);
  const [counterSharedData, setCounterSharedData] = useState({});
  const [meetingSettings, setMeetingSettings] = useState({
    meetHost: user.id,
    addedToCart: {},
    travelCart: {},
    sharingDim: {
      dimId: "",
      sharing: false,
      usersJoinedDim: "",
    },
    sharingWhiteboard: "null",
    previewFile: "null",
    counter: {
      users: "null",
      dataAskedFor: "null",
    },
    fullScreenForUser: false,
    permissions: {
      mic: {
        allowAll: true,
        customUsers: {},
      },
      chat: "All",
      cam: "All",
      screen: "None",
      whiteBoard: "All",
      canDownload: "All",
    },
    allowedUsers: "",
  });
  const [meetHost, setMeetHost] = useState(null);
  const [metaverseParticipants, setMetaverseParticipants] = useState([]);
  const prevCartItems = useRef(null);
  const prevCounterData = useRef(null);
  const { meetingId } = useParams();
  const [isMinMeetingScreen, setIsMinMeetingScreen] = useState(false);
  const userRef = useRef(user);
  const meetingRef = useRef(meetingData);
  const [positionMeeting, setPositionMeeting] = useState("right");
  const meetingSideRef = useRef(null);
  const [lastHandeledCommand, setLastHandeledCommand] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [productsListLoading, setProductsListLoading] = useState(false);
  const [checkoutPrice, setCheckoutPrice] = useState(0);
  const [agentRoomMessages, setAgentRoomMessages] = useState([]);

  const isHostRef = useRef(isHost);

  const toggleFullScreen = useCallback(() => {
    if (window.innerWidth < 1200) {
      return;
    }
    setHideSide(!fullScreen);
    setCollapsed(!fullScreen);
  }, [fullScreen]);

  const changeSettings = useCallback(
    (setting, data) => {
      const meetSettingsRef = ref(db, `Company/${user.companyId}/meeting/${meetingId}/settings`);

      let updates = {};

      updates[`/${setting}`] = data;

      if (setting) update(meetSettingsRef, updates);
    },
    [db, meetingId, user.companyId],
  );

  useEffect(() => {
    if (isMetaverseMeet && isHost && meetHost) {
      changeSettings("sharingDim", {
        dimId: meetingData.customerDimensionId,
        sharing: true,
        usersJoinedDim: `${meetingSettings.sharingDim.usersJoinedDim},${user.id}`,
      });
      setFullscreen(true);
    } else if (isMetaverseMeet && !isHost && meetHost) {
      if (meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "")) {
        return;
      } else {
        changeSettings(
          "sharingDim/usersJoinedDim",
          `${meetingSettings.sharingDim.usersJoinedDim},${user.id}`,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMetaverseMeet, meetingData, user, meetHost]);

  useEffect(() => {
    const meetSettingsRef = ref(db, `Company/${user.companyId}/meeting/${meetingId}/settings`);

    onValue(meetSettingsRef, (data) => {
      const value = data.val();

      if (value && value.meetHost) {
        setMeetingSettings(value);
        setMeetHost(value.meetHost);
      } else {
        setMeetingSettings({
          meetHost: "null",
          addedToCart: {},
          travelCart: {},
          sharingDim: {
            dimId: "",
            sharing: false,
            usersJoinedDim: "",
          },
          sharingWhiteboard: "null",
          previewFile: "null",
          counter: {
            users: "null",
            dataAskedFor: "null",
          },
          fullScreenForUser: false,
          permissions: {
            mic: {
              allowAll: true,
              customUsers: {},
            },
            chat: "All",
            cam: "All",
            screen: "None",
            whiteBoard: "All",
            canDownload: "All",
          },
          allowedUsers: "",
        });
        setMeetHost("null");
      }
    });
  }, [db, meetingId, user]);

  const joinWhiteboardRoom = useCallback(
    async (whiteboardRoomId) => {
      console.log(fastboard);
      if (fastboard === null && meetingMetadata) {
        try {
          const {
            data: { whiteboardRoomToken },
          } = await AgoraService.genWhiteboardRoomToken(whiteboardRoomId);

          const fastboard = await createFastboard({
            sdkConfig: {
              appIdentifier: import.meta.env.VITE_AGORA_WHITEBOARD_APP_ID,
              region: "in-mum",
            },
            joinRoom: {
              uid: `${userRef.current.id}`,
              uuid: whiteboardRoomId,
              roomToken: whiteboardRoomToken,
              userPayload: {
                nickName: userRef.current.fullName,
              },
            },
            managerConfig: {
              cursor: true,
            },
          });

          apps.push(
            {
              icon: "https://api.iconify.design/logos:youtube-icon.svg?color=currentColor",
              kind: "Plyr",
              label: "YouTube",
              onClick() {
                setHideSide(false);
                setActiveBtn("youtubeLink");
              },
            },
            {
              icon: "https://png.pngtree.com/png-vector/20190514/ourmid/pngtree-emb--file-format-icon-design-png-image_1040671.jpg",
              kind: "EmbeddedPage",
              label: "Embed",
              onClick() {
                setHideSide(false);
                setActiveBtn("embedLink");
              },
            },
          );

          if (!isHost && !meetingMetadata?.permissions?.whiteBoard && fastboard) {
            await fastboard.room.setWritable(false);
          }
          setFastboard(fastboard);
          return true;
        } catch (error) {
          console.log(`Error joining whiteboard: ${error.message}`);
          console.log(error);
          return false;
        }
      }
    },
    [fastboard, meetingMetadata, isHost],
  );

  const shareWhiteboard = useCallback(async () => {
    try {
      const {
        data: { whiteboardRoomId },
      } = await AgoraService.createWhiteboardRoom();

      const fastboard = await joinWhiteboardRoom(whiteboardRoomId);

      console.log(fastboard);
      if (fastboard) {
        changeSettings("sharingWhiteboard", JSON.stringify(whiteboardRoomId));
      }
    } catch (error) {
      console.log(`Error sharing whiteboard: ${error.message}`);
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinWhiteboardRoom]);

  useEffect(() => {
    if (meetingSettings.sharingDim.sharing && !isHost && !isMetaverseMeet) {
      setHideSide(false);
      setActiveBtn("sharingDim");
    }
    // to open cart
    if (
      meetingSettings.addedToCart &&
      Object.keys(meetingSettings.addedToCart)?.length !== 0 &&
      prevCartItems.current &&
      meetingSettings.addedToCart[user.id] !== prevCartItems.current &&
      !isHost &&
      meetingSettings.counter.dataAskedFor === prevCounterData.current.dataAskedFor
    ) {
      if (Object.keys(meetingSettings.addedToCart).includes(user.id + "")) {
        notification.info({ message: "Host Added Items to your Cart" });
        setHideSide(false);

        setActiveBtn("myCart");
      }
    }
    // to open travel cart
    if (
      meetingSettings.travelCart &&
      Object.keys(meetingSettings.travelCart)?.length !== 0 &&
      prevCartItems.current &&
      meetingSettings.travelCart[user.id] !== prevCartItems.current &&
      !isHost &&
      meetingSettings.counter.dataAskedFor === prevCounterData.current.dataAskedFor
    ) {
      if (Object.keys(meetingSettings.travelCart).includes(user.id + "")) {
        notification.info({ message: "Host Added Items to your Travel Cart" });
        setHideSide(false);
        setActiveBtn("myCart");
      }
    }
    // for counter
    if (
      prevCounterData.current &&
      meetingSettings.counter.dataAskedFor &&
      meetingSettings.counter.dataAskedFor !== prevCounterData.current.dataAskedFor
    ) {
      if (meetingSettings.counter.users === "All" && !isHost) {
        setActiveBtn("userCounter");
        setShowCounterBtn(true);
        setHideSide(false);
        notification.info({
          message: isValidJson(meetingSettings.counter.dataAskedFor) && JSON.parse(meetingSettings.counter.dataAskedFor)?.type === 5 ? "Host asked you to fill the counter data" : "Host asked you to checkout your cart",
        });
      } else if (meetingSettings.counter.users !== "All" && !isHost) {
        const users = meetingSettings.counter.users.split(",");
        if (users.includes(user.id + "")) {
          setActiveBtn("userCounter");
          setShowCounterBtn(true);
          setHideSide(false);
          notification.info({
            message: isValidJson(meetingSettings.counter.dataAskedFor) && JSON.parse(meetingSettings.counter.dataAskedFor)?.type === 5 ? "Host asked you to fill the counter data" : "Host asked you to checkout your cart",
          });
        }
      }
    }
    if (meetingSettings.fullScreenForUser && !isHost) {
      toggleFullScreen();
    }
    if (meetingSettings.sharingWhiteboard !== "null") {
      joinWhiteboardRoom(JSON.parse(meetingSettings.sharingWhiteboard));
    }
    if (meetingSettings.sharingWhiteboard === "null" && !!fastboard) {
      setFastboard((prev) => {
        if (prev) {
          try {
            prev.destroy();
          } catch (error) {
            console.log("Error destroying fastboard", error.message);
          }
        }

        return null;
      });
    }

    prevCounterData.current = meetingSettings.counter;
    if (meetingSettings.addedToCart && Object.keys(meetingSettings.addedToCart)?.length !== 0) {
      prevCartItems.current = meetingSettings.addedToCart[user.id];
    }
  }, [
    fastboard,
    isHost,
    isMetaverseMeet,
    joinWhiteboardRoom,
    meetingSettings,
    toggleFullScreen,
    // unPublishCamera,
    user.id,
  ]);

  useEffect(() => {
    if (meetingData?.employee?.account?.companyId === user?.companyId && !user.isGuest) {
      const meetSettingsRef = ref(db, `Company/${user.companyId}/meeting/${meetingId}/settings`);

      onValue(
        meetSettingsRef,
        (data) => {
          const value = data.val();
          if (value && value.meetHost) {
            if (value.meetHost === user.id) {
              changeSettings("counter", {
                dataAskedFor: "null",
                users: "null",
              });
            }
          } else {
            const meetSettings = {
              meetHost: user.id,
              sharingDim: {
                dimId: "",
                sharing: false,
                usersJoinedDim: "",
              },
              sharingWhiteboard: "null",
              previewFile: "null",
              counter: {
                users: "null",
                dataAskedFor: "null",
              },
              fullScreenForUser: false,
              permissions: {
                mic: {
                  allowAll: true,
                  customUsers: {},
                },
                chat: "All",
                cam: "All",
                screen: "None",
                whiteBoard: "All",
                canDownload: "All",
              },
              numberOfUsersJoined: 0,
              sharingDimId: "null",
            };

            update(meetSettingsRef, meetSettings);
          }
        },
        {
          onlyOnce: true,
        },
      );
    }
  }, [changeSettings, db, meetingData?.employee?.account?.companyId, meetingId, user]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    isHostRef.current = isHost;
  }, [isHost]);

  useEffect(() => {
    meetingRef.current = meetingData;
  }, [meetingData]);

  useEffect(() => {
    let counterUsersData = meetingSettings.counterUsersData
      ? JSON.parse(meetingSettings.counterUsersData)
      : {};

    if (!counterUsersData) {
      counterUsersData = {};
    }

    if (counterSharedData.user) {
      if (counterUsersData.hasOwnProperty(counterSharedData.user?.id)) {
        const userId = counterSharedData.user.id;
        counterUsersData[userId].userData = counterSharedData.user;

        if (counterSharedData.type === 1) {
          counterUsersData[userId].fullName = {
            user: counterSharedData.data,
            hisGuests: counterUsersData[userId].fullName.hisGuests || null,
          };
        } else if (counterSharedData.type === 2) {
          counterUsersData[userId].signature = {
            name: counterSharedData.data,
            url: counterSharedData.data,
          };
        } else if (counterSharedData.type === 3) {
          counterUsersData[userId].files = [
            ...counterUsersData[userId].files,
            {
              id: counterSharedData.data,
              name: counterSharedData.data,
              url: counterSharedData.data,
              userName: counterSharedData.user.fullName,
              type: counterSharedData.data,
            },
          ];
        } else if (counterSharedData.type === 4) {
          counterUsersData[userId].customField = [
            ...counterUsersData[userId].customField,

            {
              hisGuests: null,
              user: {
                name: counterSharedData.customField,
                value: counterSharedData.data,
              },
            },
          ];
        }
      } else {
        counterUsersData[counterSharedData.user.id] = {
          userData: counterSharedData.user,
          fullName:
            counterSharedData.type === 1
              ? {
                user: counterSharedData.data,
                hisGuests: null,
              }
              : { hisGuests: null },
          signature:
            counterSharedData.type === 2
              ? {
                name: counterSharedData.data,
                url: counterSharedData.data,
              }
              : [],
          files:
            counterSharedData.type === 3
              ? [
                {
                  id: counterSharedData.data,
                  name: counterSharedData.data,
                  url: counterSharedData.data,
                  userName: counterSharedData.user.fullName,
                  type: counterSharedData.data,
                },
              ]
              : [],
          customField:
            counterSharedData.type === 4
              ? [
                {
                  user: {
                    name: counterSharedData.customField,
                    value: counterSharedData.data,
                  },
                  hisGuests: null,
                },
              ]
              : [],
        };
      }
      changeSettings("counterUsersData", JSON.stringify(counterUsersData));
    }
  }, [changeSettings, counterSharedData, meetingSettings.counterUsersData]);

  const handleOpenParticipant = () => {
    setHideSide(false);
  };

  const handleDragedMedia = (media) => {
    setDragedMedia(media);
  };

  const handleDragedParticipant = (media) => {
    setDragedParticipant(media);
  };

  const addToCart = useCallback(
    async ({ quantity, productId, productVariantId }) => {
      try {
        await CustomerCartService.add({ quantity, productId, productVariantId });
        setHideSide(false);

        setActiveBtn("myCart");
      } catch (error) {
        axiosCatch(error);
      }
    },
    [setActiveBtn],
  );

  const deleteFromCartById = useCallback(async (productVariantId) => {
    try {
      await CustomerCartService.deleteById(productVariantId);
    } catch (error) {
      axiosCatch(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setProductsListLoading(true);
        const res = await CustomerCartService.getCompnayProducts({ companyId: user.companyId });
        setProductsList(res.rows);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setProductsListLoading(false);
      }
    })();
  }, [user.companyId]);

  useEffect(() => {
    (async () => {
      if (chatMessages.length) {
        const lastMessage = chatMessages[chatMessages.length - 1];
        const systemCommand = extractSystemCommand(lastMessage.message);

        if (lastHandeledCommand !== lastMessage.timestamp && systemCommand) {
          setLastHandeledCommand(lastMessage.timestamp);
          if (systemCommand.functionType === "addToCart" && !productsListLoading) {
            const currentProduct = productsList.find((product) => product.id === +systemCommand.id);
            if (currentProduct) {
              addToCart({
                quantity: 1,
                productId: +systemCommand.id,
                productVariantId: currentProduct.productVariants[0]?.id,
              });
            }
          }

          if (systemCommand.functionType === "deleteFromCart" && !productsListLoading) {
            const currentProduct = productsList.find((product) => product.id === +systemCommand.id);
            if (currentProduct) {
              deleteFromCartById(currentProduct.productVariants[0]?.id);
            }
          }

          if (systemCommand.functionType === "confirmOrder") {
            console.log("confirmOrder systemCommand", systemCommand);
            try {
              const cart = await CustomerCartService.list();
              const cartData = cart.data.data.rows;
              const totalPrice = calculateTotalPrice(cartData);
              setCheckoutPrice(totalPrice);
              setHideSide(false);
              setActiveBtn("cart");
            } catch (err) {
              axiosCatch(err);
            }
          }
        }
      }
    })();
  }, [
    addToCart,
    chatMessages,
    deleteFromCartById,
    lastHandeledCommand,
    productsList,
    productsListLoading,
  ]);

  const agentMeeting = useMemo(() => {
    return (
      <AgentMeeting
        isDefean={isDefean}
        setIsDefean={setIsDefean}
        chatMessages={chatMessages}
        setAgentRoomMessages={setAgentRoomMessages}
      />
    );
  }, [chatMessages, isDefean]);

  const meetAsaider = useMemo(
    (forMobile = false) => {
      return (
        <MeetAsaider
          setIsMinMeetingScreen={setIsMinMeetingScreen}
          db={db}
          meetingSettings={meetingSettings}
          changeSettings={changeSettings}
          isHost={isHost}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          setDragedMedia={handleDragedMedia}
          setDragedParticipant={handleDragedParticipant}
          dimensionFrames={dimensionFrames}
          liveStreamCameras={liveStreamCameras}
          iframeRef={iframeRef}
          selectedDeskId={selectedDeskId}
          setSelectedDeskId={setSelectedDeskId}
          setHideSide={setHideSide}
          forMobile={forMobile}
          setShowCounterBtn={setShowCounterBtn}
          prevCounterData={prevCounterData}
          setIframeRef={setIframeRef}
          isMetaverseMeet={isMetaverseMeet}
          metaverseParticipants={metaverseParticipants}
          meetingMetadata={meetingMetadata}
          setOpenMobileMenu={setOpenMobileMenu}
          shareWhiteboard={shareWhiteboard}
          fastboard={fastboard}
          micId={micId}
          isAgentMeeting={meetingData?.desk?.aiAgent}
          checkoutPrice={checkoutPrice}
          setCheckoutPrice={setCheckoutPrice}
          agentRoomMessages={agentRoomMessages}
        />
      );
    },
    [
      activeBtn,
      agentRoomMessages,
      changeSettings,
      checkoutPrice,
      db,
      dimensionFrames,
      fastboard,
      iframeRef,
      isHost,
      isMetaverseMeet,
      liveStreamCameras,
      meetingData?.desk?.aiAgent,
      meetingMetadata,
      meetingSettings,
      metaverseParticipants,
      micId,
      selectedDeskId,
      shareWhiteboard,
    ],
  );

  const allMeetingScreens = useMemo(
    () => (
      <AllMeetingScreens
        changeSettings={changeSettings}
        meetingSettings={meetingSettings}
        isHost={isHost}
        setDimensionFrames={setDimensionFrames}
        setAudioFrames={setAudioFrames}
        setLiveStreamCameras={setLiveStreamCameras}
        iframeRef={iframeRef}
        setIframeRef={setIframeRef}
        toggleFullScreen={toggleFullScreen}
        fastboard={fastboard}
        fullScreen={fullScreen}
        setFullscreen={setFullscreen}
        isMetaverseMeet={isMetaverseMeet}
        setCounterSharedData={setCounterSharedData}
        setMetaverseParticipants={setMetaverseParticipants}
        deskId={meetingData?.dimensionDeskId || ""}
        activePanel={activeBtn}
        isVirtual={
          meetingData?.customerDimensionId ? meetingData.customerDimension.isHolomeet : false
        }
      />
    ),
    [
      activeBtn,
      changeSettings,
      fastboard,
      fullScreen,
      iframeRef,
      isHost,
      isMetaverseMeet,
      meetingData?.customerDimension?.isHolomeet,
      meetingData?.customerDimensionId,
      meetingData?.dimensionDeskId,
      meetingSettings,
      toggleFullScreen,
    ],
  );

  const bottomParticipants = useMemo(
    () => (
      <BottomParticipants
        handleOpenParticipant={handleOpenParticipant}
        meetingMetadata={meetingMetadata}
        setMeetingMetadata={setMeetingMetadata}
        setActiveBtn={setActiveBtn}
        activeBtn={activeBtn}
        meetingSideRef={meetingSideRef}
        hideSide={hideSide}
        collapsed={collapsed}
        isHost={isHost}
        setOpenMobileMenu={setOpenMobileMenu}
        setIsDefean={setIsDefean}
        isDefean={isDefean}
        setPermissionBlockedModal={setPermissionBlockedModal}
        camId={camId}
        micId={micId}
        isMetaverseMeet={isMetaverseMeet}
      />
    ),
    [
      activeBtn,
      camId,
      collapsed,
      hideSide,
      isDefean,
      isHost,
      isMetaverseMeet,
      meetingMetadata,
      micId,
      setPermissionBlockedModal,
    ],
  );

  const livekitRoomContent = useMemo(() => {
    return (
      <>
        <HandelEvents
          isHost={isHost}
          setMeetingMetadata={setMeetingMetadata}
          isDefean={isDefean}
          fastboard={fastboard}
        />

        <main className="virtual-support">
          <SystemNotifiactions
            meetingSettings={meetingSettings}
            setHideSide={setHideSide}
            setActiveBtn={setActiveBtn}
            isHost={isHost}
            setOpenMobileMenu={setOpenMobileMenu}
          />
          <Row justify="space-between" align="middle" className="virtual-support-mobile-nav">
            <Col>
              <MobileBurgerSVG
                className="clickable"
                onClick={() => setDrawerOpen((prev) => !prev)}
              />
            </Col>
            <Col>
              <Logo height={30} />
            </Col>

            {activeBtn && (
              <Col>
                <CloseSVG
                  className="clickable"
                  onClick={() => {
                    setActiveBtn(null);
                    setOpenMobileMenu((prev) => !prev);
                  }}
                />
              </Col>
            )}
          </Row>
          <Row className="w-100" wrap={false}>
            <Col>
              <MeetLeftSide
                isMinMeetingScreen={isMinMeetingScreen}
                setIsMinMeetingScreen={setIsMinMeetingScreen}
                showCounterBtn={showCounterBtn}
                changeSettings={changeSettings}
                meetingSettings={meetingSettings}
                isHost={isHost}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                activeBtn={activeBtn}
                setActiveBtn={setActiveBtn}
                setHideSide={setHideSide}
                isMetaverseMeet={isMetaverseMeet}
              />
            </Col>
            <Col flex={1}>
              <Row className="h-100" wrap={false}>
                {!hideSide && (
                  <Col>
                    <Row className="meet-asaider">{meetAsaider}</Row>
                  </Col>
                )}
                <Col flex={1}>
                  {isMinMeetingScreen && activeBtn === "meeting" && <Meeting />}
                  {isMinMeetingScreen && activeBtn === "queue" && <QueueTable />}

                  <div
                    style={{
                      background: isMinMeetingScreen === "meeting" && "unset",
                      right: positionMeeting === "right" && 80,
                      left: positionMeeting === "left" && 80,
                    }}
                    className={`meeting-screens-holder ${isMinMeetingScreen ? "meeting-screens-minimize" : ""
                      }`}>
                    <Flex gap={4}>
                      {isMinMeetingScreen && (
                        <div
                          onClick={() =>
                            setPositionMeeting((prev) => (prev === "right" ? "left" : "right"))
                          }>
                          {positionMeeting === "right" ? (
                            <ArrowLeftOutlined />
                          ) : (
                            <ArrowRightOutlined />
                          )}
                        </div>
                      )}
                      {isMinMeetingScreen && activeBtn !== "meeting" && (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIsMinMeetingScreen(false);
                            setHideSide(false);
                          }}>
                          <FullscreenSVG />
                        </div>
                      )}
                    </Flex>
                    {meetingData?.desk?.aiAgent ? (
                      agentMeeting
                    ) : (
                      <Row
                        className="h-100"
                        justify="space-between"
                        gutter={[0, 8]}
                        style={{ flexDirection: "column" }}
                        ref={meetingSideRef}>
                        <Col flex={1}>{allMeetingScreens}</Col>
                        <Col>{bottomParticipants}</Col>
                        {activeBtn === "productionTools" && (
                          <Col>
                            <MetaverseBottomScreen
                              dimensionId={meetingSettings?.sharingDim?.dimId}
                              dimensionFrames={dimensionFrames}
                              iframeRef={iframeRef}
                              dragedMedia={dragedMedia}
                              dragedParticipant={dragedParticipant}
                              audioFrames={audioFrames}
                              setAudioFrames={setAudioFrames}
                              setDimensionFrames={setDimensionFrames}
                            />
                          </Col>
                        )}
                      </Row>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <MobileDrawer
            showCounterBtn={showCounterBtn}
            meetingSettings={meetingSettings}
            changeSettings={changeSettings}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            isHost={isHost}
            collapsed={false}
            setCollapsed={setCollapsed}
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
            setHideSide={setHideSide}
            setOpenMobileMenu={setOpenMobileMenu}
            isMetaverseMeet={isMetaverseMeet}
          />
          {activeBtn && openMobileMenu && (
            <section className="mobile-menu"><MeetAsaider
              setIsMinMeetingScreen={setIsMinMeetingScreen}
              db={db}
              meetingSettings={meetingSettings}
              changeSettings={changeSettings}
              isHost={isHost}
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setDragedMedia={handleDragedMedia}
              setDragedParticipant={handleDragedParticipant}
              dimensionFrames={dimensionFrames}
              liveStreamCameras={liveStreamCameras}
              iframeRef={iframeRef}
              selectedDeskId={selectedDeskId}
              setSelectedDeskId={setSelectedDeskId}
              setHideSide={setHideSide}
              forMobile={true}
              setShowCounterBtn={setShowCounterBtn}
              prevCounterData={prevCounterData}
              setIframeRef={setIframeRef}
              isMetaverseMeet={isMetaverseMeet}
              metaverseParticipants={metaverseParticipants}
              meetingMetadata={meetingMetadata}
              setOpenMobileMenu={setOpenMobileMenu}
              shareWhiteboard={shareWhiteboard}
              fastboard={fastboard}
              micId={micId}
              isAgentMeeting={meetingData?.desk?.aiAgent}
              checkoutPrice={checkoutPrice}
              setCheckoutPrice={setCheckoutPrice}
              agentRoomMessages={agentRoomMessages}
            /></section>
          )}
        </main>
      </>
    );
  }, [
    activeBtn,
    agentMeeting,
    allMeetingScreens,
    audioFrames,
    bottomParticipants,
    changeSettings,
    collapsed,
    dimensionFrames,
    dragedMedia,
    dragedParticipant,
    drawerOpen,
    fastboard,
    hideSide,
    iframeRef,
    isDefean,
    isHost,
    isMetaverseMeet,
    isMinMeetingScreen,
    meetAsaider,
    meetingData?.desk?.aiAgent,
    meetingSettings,
    openMobileMenu,
    positionMeeting,
    showCounterBtn,
  ]);

  return livekitRoomContent;
}
