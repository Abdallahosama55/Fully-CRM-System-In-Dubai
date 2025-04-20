import LoadingPage from "components/common/LoadingPage";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { lazy, Suspense } from "react";
const Quotations = lazy(() => import("views/travel/Quotations"));
const ViewQuotation = lazy(() => import("views/travel/Quotations/ViewQuotation"));

export const quotationsRoutes = [
  {
    path: ROUTER_URLS.TRAVEL.QUOTATION.INDEX,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Quotations />
      </Suspense>
    ),
  },
  {
    path: ROUTER_URLS.TRAVEL.QUOTATION.VIEW,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <ViewQuotation />
      </Suspense>
    ),
  },
];
