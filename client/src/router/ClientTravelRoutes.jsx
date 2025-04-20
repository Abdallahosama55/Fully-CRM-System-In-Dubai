import LoadingPage from "components/common/LoadingPage";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const ClientOnlineBooking = lazy(() =>
  import("views/client_views/travel/ClientOnlineBooking/Serach"),
);
const ViewHotelClient = lazy(() => import("views/client_views/travel/ViewHotelClient"));
const BookRoomClient = lazy(() => import("views/client_views/travel/BookRoomClient"));
const ViewExperianceClient = lazy(() => import("views/client_views/travel/ViewExperianceClient"));
const BookExperienceClient = lazy(() => import("views/client_views/travel/BookExperienceClient"));
const BookTransferClient = lazy(() => import("views/client_views/travel/BookTransferClient"));
const VoucherClient = lazy(() => import("views/client_views/travel/VoucherClient"));
const ViewQuotation = lazy(() => import("views/travel/Quotations/ViewQuotation"));
const ClientTravelRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path={CLIENT_ROUTER_URLS.BOOKING.ONLINE_BOOKING} element={<ClientOnlineBooking />} />
        <Route path={CLIENT_ROUTER_URLS.BOOKING.VIEW_HOTEL + ":id"} element={<ViewHotelClient />} />
        <Route path={CLIENT_ROUTER_URLS.BOOKING.BOOK_ROOM + ":id"} element={<BookRoomClient />} />

        <Route
          path={CLIENT_ROUTER_URLS.BOOKING.VIEW_EXPERIANCE + ":bookingKey"}
          element={<ViewExperianceClient />}
        />
        <Route
          path={CLIENT_ROUTER_URLS.BOOKING.BOOK_EXPERIANCE + ":id"}
          element={<BookExperienceClient />}
        />

        <Route
          path={CLIENT_ROUTER_URLS.BOOKING.BOOK_TRANSFER + ":id"}
          element={<BookTransferClient />}
        />
        <Route path={CLIENT_ROUTER_URLS.VOUCHER} element={<VoucherClient />} />
        <Route path={CLIENT_ROUTER_URLS.VIEW_QUOTATION} element={<ViewQuotation />} />
      </Routes>
    </Suspense>
  );
};

export default ClientTravelRoutes;
