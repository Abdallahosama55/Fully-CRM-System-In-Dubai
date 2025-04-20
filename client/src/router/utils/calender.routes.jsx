import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
const Calendar = lazy(() => import("components/Calendar"));

export const calendarRoutes = [
  {
    path: "calendar",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Calendar />
      </Suspense>
    ),
  },
];
