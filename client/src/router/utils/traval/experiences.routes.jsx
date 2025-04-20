import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Experiences = lazy(() => import("views/travel/Experiances"));
const AddExperiance = lazy(() => import("views/travel/Experiances/AddExperiance"));
const ViewExperiance = lazy(() => import("views/travel/Experiances/ViewExperiance"));
const BookExperience = lazy(() => import("views/travel/Experiances/BookExperience"));

export const experienceRoutes = [
  {
    path: "experiences",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Experiences />,
      },
      {
        path: "add",
        element: <AddExperiance />,
      },
      {
        path: "book/:id",
        element: <BookExperience />,
      },
      {
        path: "edit/:id",
        element: <AddExperiance />,
      },
    ],
  },
  {
    path: "/experiences/:bookingKey",
    element: (<Suspense fallback={<LoadingPage />}>
      <ViewExperiance />
    </Suspense>)
  }
];
