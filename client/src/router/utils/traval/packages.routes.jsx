// Packages
import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Packages = lazy(() => import("views/travel/Packages"));
const AddPackage = lazy(() => import("views/travel/Packages/AddPackage"));
const ViewPackage = lazy(() => import("views/travel/Packages/ViewPackage"));
const BookPackage = lazy(() => import("views/travel/Packages/BookPackage"));

export const packagesRoutes = [
  {
    path: "packages",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Packages />,
      },
      {
        path: "add",
        element: <AddPackage />,
      },
      {
        path: "edit/:id",
        element: <AddPackage />,
      },
      {
        path: ":id",
        element: <ViewPackage />,
      },
      {
        path: "book/:id",
        element: <BookPackage />,
      },
    ],
  },
];
