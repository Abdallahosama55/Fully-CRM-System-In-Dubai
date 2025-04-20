import LoadingPage from "components/common/LoadingPage";
import TurboLoadingPage from "components/common/TurboLoadingPage";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Accommodations = lazy(() => import("views/travel/Accommodations"));
const AddAccommodation = lazy(() => import("views/travel/Accommodations/AddAccommodation"));
const ViewAccommodation = lazy(() => import("views/travel/Accommodations/ViewAccommodation"));
const BookRoom = lazy(() => import("views/travel/Accommodations/BookRoom"));

export const accommodationRoutes = [
  {
    path: "accommodations",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Accommodations />,
      },
      {
        path: "add",
        element: <AddAccommodation />,
      },
      {
        path: "edit/:id",
        element: <AddAccommodation />,
      },
      {
        path: ":id",
        element: (
          <Suspense fallback={<TurboLoadingPage />}>
            <ViewAccommodation />
          </Suspense>
        ),
      },
      {
        path: "book/:id",
        element: (
          <Suspense fallback={<TurboLoadingPage />}>
            <BookRoom />
          </Suspense>
        ),
      },
    ],
  },
];
