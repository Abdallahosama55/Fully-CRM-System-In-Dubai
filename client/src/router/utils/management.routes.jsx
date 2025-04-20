import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
const Employees = lazy(() => import("views/Management/hr-management/Employees/Employees"));
const ViewEmployee = lazy(() => import("views/Management/hr-management/ViewEmployee/ViewEmployee"));
export const managementRoutes = [
  {
    path: "",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "view-employee/:employeeId",
        element: <ViewEmployee />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} replace={true} />,
      },
    ],
  },
];
