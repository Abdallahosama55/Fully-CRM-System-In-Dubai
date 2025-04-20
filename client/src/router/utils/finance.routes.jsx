import LoadingPage from "components/common/LoadingPage";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";
import ROUTER_URLS from "constants/ROUTER_URLS";
import path from "path";
import { Suspense, lazy } from "react";

const Statements = lazy(() => import("views/Finance/Statements"));
const PricingModule = lazy(() => import("views/Finance/Accounting/PricingModule"));
const VoucherClient = lazy(() => import("views/client_views/travel/VoucherClient"));

export const financeRoutes = [
  {
    path: ROUTER_URLS.FINANCE.ACCOUNTING.PRICING_MODULE,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <PricingModule />
      </Suspense>
    ),
  },
  {
    path: ROUTER_URLS.FINANCE.STATEMENTS.INDEX,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Statements />
      </Suspense>
    ),
  },
  {
    path: CLIENT_ROUTER_URLS.VOUCHER,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <VoucherClient />
      </Suspense>
    ),
  },
];
