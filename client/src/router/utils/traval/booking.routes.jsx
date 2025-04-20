import TurboLoadingPage from "components/common/TurboLoadingPage";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Bookings = lazy(() => import("views/travel/Bookings"));
const Booking = lazy(() => import("views/travel/Bookings/Booking"));

//online booking
const BookingsSearch = lazy(() => import("views/travel/OnlineBooking/Search"));
const ClientOnlineBooking = lazy(() =>
  import("views/client_views/travel/ClientOnlineBooking/Serach"),
);

export const bookingRoutes = [
  {
    path: ROUTER_URLS.TRAVEL.BOOKING.INDEX,
    element: (
      <Suspense fallback={<TurboLoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Bookings />,
      },
      {
        path: ":id",
        element: <Booking />,
      },
    ],
  },
  {
    path: ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING_METTING,
    element: (
      <Suspense fallback={<TurboLoadingPage />}>
        <BookingsSearch />
      </Suspense>
    ),
  },
  // in web builder widget route
  {
    path: CLIENT_ROUTER_URLS.BOOKING.ONLINE_BOOKING,
    element: (
      <Suspense fallback={<TurboLoadingPage />}>
        <ClientOnlineBooking />
      </Suspense>
    ),
  },
];
