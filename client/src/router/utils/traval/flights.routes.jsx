import LoadingPage from "components/common/LoadingPage";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const ChartersOverview = lazy(() => import("views/travel/Charters/Overview"));
const BookFlight = lazy(() => import("views/travel/Charters/BookFlight"));

export const flightsRoutes = [
  {
    path: ROUTER_URLS.TRAVEL.FLIGHTS.INDEX,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: ROUTER_URLS.TRAVEL.FLIGHTS.CHARTERS,
        element: <ChartersOverview />,
      },
      {
        path: ROUTER_URLS.TRAVEL.FLIGHTS.BOOK,
        element: <BookFlight />,
      },
    ],
  },
];
