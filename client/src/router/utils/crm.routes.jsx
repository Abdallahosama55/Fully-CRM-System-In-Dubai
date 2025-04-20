import LoadingPage from "components/common/LoadingPage";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
const Pipelines = lazy(() => import("views/Piplines/PipelineTemplates"));
const Lead = lazy(() => import("views/Leads"));
const Customers = lazy(() => import("views/Customers/Overview"));
const ViewCustomer = lazy(() => import("views/Customers/ViewCustomer/ViewCustomer"));
const PiplinesViewPage = lazy(() => import("views/Piplines/PiplinesViewPage"));
const Agencies = lazy(() => import("views/Agencies"));
const Suppliers = lazy(() => import("views/Suppliers"));
const FormsCrm = lazy(() => import("views/Forms"));
const FormsInfo = lazy(() => import("views/Forms/Info"));

export const crmRoutes = [
  {
    path: "crm",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      
      {
        path: "contacts/:tapKey",
        element: <Customers />,
      },
      // TODO: remove route if not used
      {
        path: "customers/:id",
        element: <ViewCustomer />,
      },

      {
        path: "management-pipelines",
        element: <Pipelines />,
      },
      {
        path: "pipelines/:piplineId",
        element: <Lead />,
      },
      {
        path: "pipelines",
        element: <PiplinesViewPage />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} replace={true} />,
      },
    ],
  },
  {
    path: ROUTER_URLS.CRM.AGENCIES,
    element: <Suspense fallback={<LoadingPage />}>
      <Agencies />
    </Suspense>
  },
  {
    path: ROUTER_URLS.CRM.SUPPLIERS,
    element: <Suspense fallback={<LoadingPage />}>
      <Suppliers />
    </Suspense>
  },
  {
    path: ROUTER_URLS.CRM.FormsCrm,
    element: <Suspense fallback={<LoadingPage />}>
      <FormsCrm />
    </Suspense>
  },
  {
    path: ROUTER_URLS.CRM.FormsCrmInfo,
    element: <Suspense fallback={<LoadingPage />}>
      <FormsInfo />
    </Suspense>
  },
  
 
];
