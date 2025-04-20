import LoadingPage from "components/common/LoadingPage";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Pickup = lazy(() => import("views/travel/Pickup"));

export const picupRoutes = [
  {
    path: ROUTER_URLS.TRAVEL.PICKUP.INDEX,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Pickup />,
      },
    ],
  },
];
