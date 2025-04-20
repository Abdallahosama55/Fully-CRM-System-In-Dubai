import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const EmployeeInformation = lazy(() => import("views/Employees/EmployeeInformation"));
const AddEditEmployee = lazy(() => import("views/Employees/EditEmployee"));

export const profileRoutes = [
  {
    path: "profile",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <EmployeeInformation />,
      },
      {
        path: "edit",
        element: <AddEditEmployee />,
      },
    ],
  },
];
