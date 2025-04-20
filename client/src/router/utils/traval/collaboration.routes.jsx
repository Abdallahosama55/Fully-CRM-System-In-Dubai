import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const CallsAndMeetingsQuery = lazy(() => import("views/Collaboration/CallsAndMeetingsQuery"));
export const collaborationRoutes = [
  {
    path: "collaboration",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "meeting-query",
        element: <CallsAndMeetingsQuery />,
      },
    ],
  },
];
