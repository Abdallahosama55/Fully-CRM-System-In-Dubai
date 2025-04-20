import LoadingPage from "components/common/LoadingPage";
import HelpDeskLayout from "layout/HelpDeskLayout";
import { Fragment, Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
const EmployeeInformation = lazy(() => import("views/Employees/EmployeeInformation"));
const AddEditEmployee = lazy(() => import("views/Employees/EditEmployee"));
const DeskFiles = lazy(() => import("views/Desks/DeskFiles"));
const Metaverses = lazy(() => import("views/Desks/Metaverses"));
const DeskInformation = lazy(() => import("views/Desks/DeskInformation"));
const EditEmployeeDesk = lazy(() => import("views/Desks/EditEmployeeDesk"));
export const employeeRoutes = [
  {
    path: "employee",
    element: (
      <Fragment>
        {/* <MainNavigation domainName="employee" /> */}
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </Fragment>
    ),
    children: [
      {
        path: ":id",
        element: <EmployeeInformation></EmployeeInformation>,
      },
      {
        path: "add",
        element: <AddEditEmployee />,
      },
      {
        path: "edit/:id",
        element: <AddEditEmployee></AddEditEmployee>,
      },
      {
        path: "desk",
        element: (
          <HelpDeskLayout type="EMPLOYEE_DEFAULT_DESK">
            <Suspense fallback={<LoadingPage />}>
              <Outlet />
            </Suspense>
          </HelpDeskLayout>
        ),
        children: [
          {
            index: true,
            element: <DeskInformation type={"EMPLOYEE_DEFAULT_DESK"} collapsed={false} />,
          },
          {
            path: "edit-information",
            element: <EditEmployeeDesk />,
          },
          {
            path: "files",
            element: <DeskFiles />,
          },
          {
            path: "metaverses",
            element: <Metaverses />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to={"."} replace={true} />,
      },
    ],
  },
];
