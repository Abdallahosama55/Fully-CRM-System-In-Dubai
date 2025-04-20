import LoadingPage from "components/common/LoadingPage";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { lazy, Suspense } from "react";
const Branding = lazy(() => import("views/travel/Branding"));

export const brandingRoutes = [
    {
        path: ROUTER_URLS.TRAVEL.BRANDING.INDEX,
        element: <Suspense fallback={<LoadingPage />}>
            <Branding />
        </Suspense>,
    }
];
