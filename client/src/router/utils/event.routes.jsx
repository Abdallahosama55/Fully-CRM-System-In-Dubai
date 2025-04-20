import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";

const Studio = lazy(() => import("views/Studio"));
const EditEvent = lazy(() => import("views/EditEvent"));

export const eventRoutes = [
  {
    path: "event",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Studio />
      </Suspense>
    ),
  },
  {
    path: "event/edit/:id",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <EditEvent />
      </Suspense>
    ),
  },
];
