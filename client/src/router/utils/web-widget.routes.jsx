import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const ScheduleCall = lazy(() => import("views/WebWidget/ScheduleCall"));
const Ticket = lazy(() => import("views/WebWidget/Ticket"));
const WebWidgetLayoutModal = lazy(() => import("layout/WebWidgetLayout"));
const WebWidget = lazy(() => import("views/WebWidget"));

export const webWidgetRoutes = [
  {
    path: "/web-widget",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: <WebWidget />,
      },
      {
        path: "schedule-call",
        element: <ScheduleCall />,
      },
      {
        path: "ticket",
        element: (
          <WebWidget>
            <WebWidgetLayoutModal>
              <Ticket />
            </WebWidgetLayoutModal>
          </WebWidget>
        ),
      },
    ],
  },
];
