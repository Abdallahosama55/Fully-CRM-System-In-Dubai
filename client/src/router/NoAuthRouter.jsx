import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter, Outlet } from "react-router-dom";
import { Col, Flex, Layout, Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ScheduleCall from "views/WebWidget/ScheduleCall";
import WebWidgetLayoutModal from "layout/WebWidgetLayout";
import LoadingPage from "components/common/LoadingPage";
import { ConnectionProvider } from "hooks/useConnection";
import Logo from "components/common/Logo";
import ClientRoutes from "./ClientRoutes";
import ClientTravelRoutes from "./ClientTravelRoutes";
import UnityIframesRoutes from "./UnityIframesRoutes";
import LayoutNotAuth from "views/newAuth/components/Layout";

const SliderPreview = lazy(() => import("views/SliderPreview"));
const AddAgencies = lazy(() => import("views/AddAgencies"));
const AddSupplies = lazy(() => import("views/AddSuppliers"));
const Registration = lazy(() => import("views/newAuth/Registration"));
const Login = lazy(() => import("views/newAuth/Login"));
const Forgot = lazy(() => import("views/newAuth/Forgot"));

const LoginView = lazy(() => import("views/Auth"));
const UserTicket = lazy(() => import("views/UserTicket"));
const VirtualSupportView = lazy(() => import("views/VirtualSupport"));
const MetaverseGameView = lazy(() => import("views/MetaverseGame"));
const MetaverseWordpressView = lazy(() => import("views/MetaverseWordpress"));
const WebWidget = lazy(() => import("views/WebWidget"));
const Ticket = lazy(() => import("views/WebWidget/Ticket"));
const EventPage = lazy(() => import("views/EventPage"));
const HomePage = lazy(() => import("views/client_views/HomePage"));

export default function NotAuthRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense
          fallback={
            <div
              style={{ width: "100vw", height: "100vh", background: "#fff" }}
              className="center-items">
              <Row gutter={[0, 30]}>
                <Col xs={24}>
                  <Row justify={"center"}>
                    <Logo />
                  </Row>
                </Col>
                <Col xs={24}>
                  <Row justify={"center"}>
                    <LoadingOutlined />
                  </Row>
                </Col>
              </Row>
            </div>
          }>
          <Routes>
            <Route
              index
              element={
                <Suspense fallback={<LoadingPage />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route path="/login" element={<LoginView />} />
            <Route path="/join-company" element={<LoginView active="join-company" />}></Route>
            <Route path="/login-employee" element={<LoginView active={"1"} />} />
            <Route path="/live-admin/:liveId" element={<LoginView active={"1"} />}></Route>
            <Route path="/event/live/:eventId" element={<EventPage />} />
            <Route path="/complete-signup" element={<LoginView active="newPassword" />} />
            <Route path="/slider/:id/:dimId?" element={<SliderPreview />} />
            <Route path="/ticket/:id" element={<UserTicket />} />
            <Route path="/add-new-agent" element={<AddAgencies />} />
            <Route path="/add-new-supplier" element={<AddSupplies />} />

            <Route
              path="/registration"
              element={
                <LayoutNotAuth>
                  <Registration />
                </LayoutNotAuth>
              }
            />

            <Route
              path="/vbooking-login"
              element={
                <LayoutNotAuth>
                  <Login />
                </LayoutNotAuth>
              }
            />
            <Route
              path="/new-forgot"
              element={
                <LayoutNotAuth>
                  <Forgot />
                </LayoutNotAuth>
              }
            />

            <Route
              path="/booked-meeting/:meetingId"
              element={
                <ConnectionProvider>
                  <VirtualSupportView />
                </ConnectionProvider>
              }
            />
            <Route
              path="/direct-call/:meetingId"
              element={
                <ConnectionProvider>
                  <VirtualSupportView />
                </ConnectionProvider>
              }
            />
            <Route path="/metaverse/:dimId" element={<MetaverseGameView />} />
            <Route path="/metaverse-wordpress/:dimId" element={<MetaverseWordpressView />} />
            <Route
              path="/web-widget"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Outlet />
                </Suspense>
              }>
              <Route path="" element={<WebWidget />} />
              <Route path="schedule-call" element={<ScheduleCall />} />
              <Route
                path="ticket"
                element={
                  <WebWidget>
                    <WebWidgetLayoutModal>
                      <Ticket />
                    </WebWidgetLayoutModal>
                  </WebWidget>
                }
              />
              <Route path="*" element={<Navigate to="." />} />
            </Route>
          </Routes>
          <ClientTravelRoutes />
          <UnityIframesRoutes />
          {/* <ClientRoutes /> */}
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
