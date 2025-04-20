import { notification } from "antd";
import userContext from "context/userContext";
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import MetaverseView from "./MetaverseView";
import { useNotification } from "context/notificationContext";
import AuthService from "services/auth.service";
import CommonService from "services/common.service";
import { axiosCatch } from "utils/axiosUtils";
import SuccessIcon from "views/EventPage/JoinMeetingNewUi/SuccessIcon";
import MetaverseLoginView from "./MetaverseLoginView";
import OldGuestForm from "./OldGuestForm";
import joinBg from "assets/images/startMeetBgV2.jpg";

const MetaversePage = forwardRef((props, ref) => {
  const { user, setUser } = useContext(userContext);
  const [interacted, setInteracted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [eventData, setEventData] = useState();
  const metaverseViewRef = useRef();
  const { openNotificationWithIcon } = useNotification();
  const source = searchParams.get("source");
  const eventBtnStatus =
    eventData?.actionStatus?.id === 11
      ? "Join"
      : eventData?.actionStatus?.id === 7
      ? "Enroll"
      : "Finished";

  useImperativeHandle(ref, () => ({
    getIframeRef() {
      return metaverseViewRef.current.getIframeRef();
    },
    _setUser(_user) {
      return setUser(_user);
    },
  }));

  useEffect(() => {
    const token = searchParams.get("token");
    if (token && token !== "null") {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );

      setUser({ ...JSON.parse(jsonPayload), isGuest: true });
    }
  }, [searchParams, setUser]);

  useEffect(() => {
    const fetchData = async () => {
      const eventId = searchParams.get("eventId");

      if (eventId) {
        try {
          const { data } = await CommonService.getEventInfo(eventId);
          setEventData(data);
        } catch (err) {
          axiosCatch(err);
        }
      }
    };

    fetchData(); // Call the async function
  }, [searchParams]);

  const onEventHandle = useCallback(async () => {
    try {
      const eventId = searchParams.get("eventId");
      await CommonService.enrollEvent(eventId, { eventSource: source });
      if (eventBtnStatus === "Enroll") {
        openNotificationWithIcon("success", "Enroll sucessfully");
      }
    } catch (error) {
      setUser(null);
      setInteracted(false);
      if (eventBtnStatus === "Enroll" && error.response.status === 409) {
        openNotificationWithIcon("success", "You have already Enrolled");
      } else {
        console.log(error);
        openNotificationWithIcon("error", error?.response?.data?.message);
      }
    }
  }, [eventBtnStatus, openNotificationWithIcon, searchParams, setUser, source]);

  const onLogin = async (values) => {
    setLoading(true);
    try {
      const {
        data: { data: user, customerPortalAccessToken },
      } = await CommonService.login(values);

      localStorage.setItem("vindo-token", customerPortalAccessToken);
      localStorage.setItem("isCustomer", true);
      setUser(user);
      axios.defaults.headers.authorization = customerPortalAccessToken;
      window.location.reload();
    } catch (error) {
      openNotificationWithIcon("error", error?.response?.data?.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  const onSignAsGuestFinish = useCallback(
    async (values) => {
      if (values.name) {
        setLoading(true);
        try {
          const {
            data: { data: user },
          } = await AuthService.loginAsGuest({
            username: values.name,
          });
          localStorage.setItem("vverse-token", user.customerPortalAccessToken);
          setInteracted(true);

          setUser({ ...user, isGuest: true });
          axios.defaults.headers.authorization = user.customerPortalAccessToken;
          if (eventId?.id) {
            await onEventHandle();
          }
        } catch (err) {
          setUser(null);
          if (err.response.status === 409) {
            notification.info({
              message: "User already exist, login to enter the dimension",
            });
            setInteracted(false);
          }
        } finally {
          setLoading(false);
        }
      }
    },
    [eventId?.id, onEventHandle, setUser],
  );

  const onVerify = async (otp, token) => {
    const data = { code: otp || "", token };

    setLoading(true);
    try {
      const {
        data: { data: user, customerPortalAccessToken, statusCode },
      } = await CommonService.signOTPValidity(data);

      if (statusCode === 422) {
        openNotificationWithIcon("error", "Invalid code");
        return;
      }
      openNotificationWithIcon("success", "Signed up successfully");

      localStorage.setItem("vindo-token", customerPortalAccessToken);
      localStorage.setItem("isCustomer", true);
      setUser(user);
      axios.defaults.headers.authorization = customerPortalAccessToken;
      window.location.reload();
    } catch (error) {
      axiosCatch(error);
      openNotificationWithIcon("error", error?.response?.data?.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  if (!interacted && !user) {
    return (
      <main
        className="join-meet"
        style={{
          background: `url(${eventData?.customerDimension?.image || joinBg})`,
        }}>
        <div className="meet-blur">
          <div className="join-meet-main">
            {eventId ? (
              <OldGuestForm
                eventData={eventData}
                loading={loading}
                eventBtnStatus={eventBtnStatus}
                onSignAsGuestFinish={onSignAsGuestFinish}
              />
            ) : (
              <MetaverseLoginView
                isLoading={loading}
                onLoginAsGuest={onSignAsGuestFinish}
                onLogin={onLogin}
                onVerify={onVerify}
              />
            )}
          </div>
        </div>
      </main>
    );
  } else if (user) {
    if (eventId && eventBtnStatus === "Enroll") {
      return (
        <div>
          <SuccessIcon msg="Enroll sucessfully" />
        </div>
      );
    } else {
      return <MetaverseView ref={metaverseViewRef} autoFullHeight={props.autoFullHeight} />;
    }
  }
});
MetaversePage.displayName = "MetaversePage";
export default MetaversePage;
