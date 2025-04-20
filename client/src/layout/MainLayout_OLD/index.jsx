import ScrollToTop from "components/ScrollToTop";

import RightDrawer from "components/RightDrawer";
import { useSidebar } from "./SidebarProvider";
import useRightSlide from "context/rightSlideContext";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { Layout } from "antd";
import Navbar from "components/Navbar";
import { Content } from "antd/es/layout/layout";
import RightSide from "components/RightSide";


const MainLayout_OLD = ({ children, isFull }) => {
  return (
    <>
      <ScrollToTop />
      <RightDrawer />
      <ContentLayout>{children}</ContentLayout>
    </>
  );
};

const ContentLayout = ({ children, isFull }) => {
  const { isOpen } = useSidebar();
  const { state } = useRightSlide();
  const location = useLocation();
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    // Check if the component is rendered inside an iframe
    setIsInIframe(window.self !== window.top);
  }, []);

  const isOnlineBookingPage = useMemo(() => {
    return (
      ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING === location.pathname ||
      ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING_METTING === location.pathname ||
      (location.pathname.includes(ROUTER_URLS.TRAVEL.ACCOMMODATION.VIEW) &&
        !location.pathname.includes("edit") &&
        !location.pathname.includes("add")) ||
      ROUTER_URLS.TRAVEL.ACCOMMODATION.BOOK === location.pathname ||
      (location.pathname.includes(ROUTER_URLS.TRAVEL.EXPERIANCES.VIEW) &&
        !location.pathname.includes("edit") &&
        !location.pathname.includes("add")) ||
      ROUTER_URLS.TRAVEL.EXPERIANCES.BOOK === location.pathname ||
      location.pathname.includes(ROUTER_URLS.TRAVEL.TRANSFERS.BOOK)
    );
  }, [location]);

  if (isInIframe) {
    return (
      <div style={{ marginInlineEnd: 0 }} className="main-layout">
        {children}
      </div>
    );
  }

  return (
    <Layout
      style={{
        marginInlineStart: isOpen ? (isOnlineBookingPage ? "0px" : "85px") : "290px",
        marginInlineEnd: !state && (isOnlineBookingPage ? "0px" : "10px"),
      }}
      className="main-layout">
      <Navbar />
      <Content
        style={{
          minHeight: "calc(100vh - 85px)",
        }}
        className="body-layout">
        <div style={{ marginInlineEnd: !state ? "10px" : "73px", height: "100%" }}>{children}</div>
        <RightSide isFull={isFull} />
      </Content>
    </Layout>
  );
};
export default MainLayout_OLD;
