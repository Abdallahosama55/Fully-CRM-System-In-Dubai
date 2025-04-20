import LoadingPage from "components/common/LoadingPage";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Transfer = lazy(() => import("views/travel/Transfer"));
const BookTransfer = lazy(() => import("views/travel/Transfer/BookTransfer"));
const BookingTransfer = lazy(() => import("views/travel/BookTransfer"));

export const transferRoutes = [
  {
    path: ROUTER_URLS.TRAVEL.TRANSFERS.INDEX,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Transfer />,
      },
    ],
  },
  {
    path: ROUTER_URLS.TRAVEL.TRANSFERS.BOOK + ":id",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <BookTransfer />
      </Suspense>
    ),
  },

  {
    path: ROUTER_URLS.TRAVEL.TRANSFERS.BOOKING,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <BookingTransfer />
      </Suspense>
    ),
  },
];
