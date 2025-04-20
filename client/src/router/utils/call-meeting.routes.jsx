import { Layout } from "antd";
import RightDrawer from "components/RightDrawer";
import RightSide from "components/RightSide";
import ScrollToTop from "components/ScrollToTop";
import LoadingPage from "components/common/LoadingPage";
import { ConnectionProvider } from "hooks/useConnection";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { ReconnectionStatusProvider } from "views/VirtualSupport/Context/ReconnectionContext";

const VirtualSupportView = lazy(() => import("views/VirtualSupport"));
const EventPage = lazy(() => import("views/EventPage"));
const DeskView = lazy(() => import("views/VirtualSupport/DeskView"));
const { Content } = Layout;
export const callMeetingRoutes = [
  {
    path: "/booked-meeting",
    element: (
      <Layout>
        <ScrollToTop />
        <RightDrawer />
          <Layout style={{ marginInlineEnd: "60px" }} className="main-layout">
            <Content
              style={{
                minHeight: "calc(100vh - 85px)",
              }}
              className="body-layout">
              <Suspense fallback={<LoadingPage />}>
                <Outlet />
              </Suspense>
              <RightSide isFull={true} />
            </Content>
          </Layout>
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <DeskView />,
      },
      {
        path: ":meetingId",
        element: (
          <ReconnectionStatusProvider>
            <ConnectionProvider>
              <VirtualSupportView />
            </ConnectionProvider>
          </ReconnectionStatusProvider>
        ),
      },
    ],
  },
  {
    path: "/event/live",
    element: (
      <Layout>
        <ScrollToTop />
        <RightDrawer />
          <Layout style={{ marginInlineEnd: "60px" }} className="main-layout">
            <Content
              style={{
                minHeight: "calc(100vh - 85px)",
              }}
              className="body-layout">
              <Suspense fallback={<LoadingPage />}>
                <Outlet />
              </Suspense>
            </Content>
          </Layout>
          <RightSide isFull={true} />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <DeskView />,
      },
      {
        path: ":eventId",
        element: <EventPage />,
      },
    ],
  },
];
