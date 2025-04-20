import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import VindoRouter from "router";
import axios from "axios";
import NotAuthRouter from "router/NoAuthRouter";
import UserContext from "context/userContext";
import AuthService from "services/auth.service";
import DragContext from "context/dragContext";
import LoadingPage from "components/common/LoadingPage";
import DrawerProvider from "context/drawerContext";
import NotificationContextProvider from "context/notificationContext";
import { DndProvider } from "react-dnd";
location;
import { HTML5Backend } from "react-dnd-html5-backend";
import { setDefaultTimeZone } from "utils/time";
import PageTitleContextProvider from "context/PageTitleContextProvider";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { ConfigProvider } from "antd";
import LazyGoogleMapsApiProvider from "./HOC/LazyGoogleMapsApiProvider";
import ExternalIframeRouter from "router/ExternalIframeRouter";
import { EXTERNAL_IFRAME_BASE_URL } from "constants/IFRAME_ROUTER_URLS";
const AntdTheme = "styles/antd.theme.json";
dayjs.extend(relativeTime);

function App() {
  const isExternalIframe = useMemo(
    () => window.location.pathname.includes(EXTERNAL_IFRAME_BASE_URL),
    [],
  );

  const [user, setUser] = useState(null);
  const [dragData, setDragData] = useState({
    dragging: false,
    dropText: "",
    employeeId: null,
  });
  const [loading, setLoading] = useState(true);
  const isCustomer = localStorage.getItem("isCustomer");

  useEffect(() => {
    (async () => {
      try {
        if (!isExternalIframe) {
          if (isCustomer === "true") {
            const {
              data: { data: user },
            } = await AuthService.getCustomerAuth();
            localStorage.setItem(
              "time-zone",
              user.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
            );
            setDefaultTimeZone(user.timeZone);
            setUser(user);

            axios.defaults.headers.authorization = localStorage.getItem("vindo-token");
          } else {
            const {
              data: { data: user },
            } = await AuthService.getAuth();
            localStorage.setItem("vindo-token", user.vindoWebDashboardAccessToken);
            localStorage.setItem(
              "time-zone",
              user.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
            );

            if (!user?.languageCode) {
              user.languageCode = "en";
            }

            setUser(user);
            localStorage.setItem("user-id", user.id);
            if (user.showMainInfo) {
              //   navigate("/new-company-questions");
            }
            axios.defaults.headers.authorization = user.vindoWebDashboardAccessToken;
          }
        }
      } catch (ignored) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [isCustomer]);

  const handleSetUser = useCallback((data) => {
    localStorage.setItem(
      "time-zone",
      data?.timeZone ?? Intl.DateTimeFormat()?.resolvedOptions()?.timeZone ?? "UTC",
    );
    setUser(data);
  }, []);
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      <DragContext.Provider value={{ dragData, setDragData }}>
        <ConfigProvider theme={AntdTheme}>
          <LazyGoogleMapsApiProvider>
            <DrawerProvider>
              <PageTitleContextProvider>
                <NotificationContextProvider>
                  <Suspense fallback={<LoadingPage />}>
                    <DndProvider backend={HTML5Backend}>
                      {(() => {
                        if (isExternalIframe) {
                          return <ExternalIframeRouter />;
                        } else if (user && !user.isGuest && isCustomer !== "true") {
                          return <VindoRouter />;
                        } else {
                          return <NotAuthRouter />;
                        }
                      })()}
                    </DndProvider>
                  </Suspense>
                </NotificationContextProvider>
              </PageTitleContextProvider>
            </DrawerProvider>
          </LazyGoogleMapsApiProvider>
        </ConfigProvider>
      </DragContext.Provider>
    </UserContext.Provider>
  );
}

/// show error overlay on error in development mode only
if (import.meta.env.DEV) {
  window.onerror = (event, source, lineno, colno, err) => {
    // must be within function call because that's when the element is defined for sure.
    const ErrorOverlay = customElements.get("vite-error-overlay");
    // don't open outside vite environment
    if (!ErrorOverlay) {
      return;
    }
    const overlay = new ErrorOverlay(err);
    document.body.appendChild(overlay);
  };
}

export default App;
