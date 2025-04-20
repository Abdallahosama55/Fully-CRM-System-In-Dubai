import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const Meeting = lazy(() => import("views/Meeting"));
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
        path: "meeting",
        element: <Meeting />,
      },
    ],
  },
];
