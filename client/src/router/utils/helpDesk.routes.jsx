import LoadingPage from "components/common/LoadingPage";
import { Fragment, Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import HelpDeskLayout from "layout/HelpDeskLayout";
import { fetchDeskById } from "services/Desk/Querys/useGetDeskById";
const LiveChat = lazy(() => import("views/Desks/LiveChat"));
const TicketingDesk = lazy(() => import("views/Desks/TicketingDesk"));
const DeskActivities = lazy(() => import("views/Desks/DeskActivities"));
const DeskInformation = lazy(() => import("views/Desks/DeskInformation"));
const TicketView = lazy(() => import("views/HelpDesk/TicketView"));
const AddTicket = lazy(() => import("views/Desks/TicketingDesk/AddTicket"));
const CreateDisk = lazy(() => import("views/Desks/CreateDesk"));
const MeetingDesk = lazy(() => import("views/Desks/CreateDesk/MeetingDesk"));
const Employees = lazy(() => import("views/Desks/Employees"));
const DeskFiles = lazy(() => import("views/Desks/DeskFiles"));
const Metaverses = lazy(() => import("views/Desks/Metaverses"));
const AIConfigrations = lazy(() => import("views/Desks/AI-Configrations"));

const loaderDeskInfo = async ({ params }) => {
  const rest = await fetchDeskById(params.id);
  return rest;
};
export const helpDeskRoutes = [
  {
    path: "/desks",
    element: (
      <Fragment>
        {/* <MainNavigation domainName="desks" /> */}
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </Fragment>
    ),

    children: [
      { index: true, element: <MeetingDesk type={"MEETING_DESK"} /> },
      {
        path: "create-desk",
        element: <CreateDisk type={"MEETING_DESK"} currentStep={1} collapsed={false} />,
      },

      {
        path: ":id",
        loader: loaderDeskInfo,
        element: (
          <HelpDeskLayout>
            <Suspense fallback={<LoadingPage />}>
              <Outlet />
            </Suspense>
          </HelpDeskLayout>
        ),
        children: [
          {
            index: true,
            element: <DeskInformation collapsed={false} />,
          },
          {
            path: "files",
            element: <DeskFiles />,
          },
          {
            path: "metaverses",
            element: <Metaverses />,
          },
          {
            path: "edit-information",
            element: <CreateDisk currentStep={1} collapsed={false} />,
          },
          {
            path: "employees",
            element: <Employees />,
          },
        ],
      },

      {
        path: "live-chat",
        element: <LiveChat />,
      },
      {
        path: "ticketing-desk",
        element: <TicketingDesk />,
      },
      {
        path: "customer-service",
        element: <MeetingDesk type={"CUSTOMER_SERVICE_DESK"} />,
      },
      {
        path: "customer-service/create-desk",
        element: <CreateDisk type={"CUSTOMER_SERVICE_DESK"} currentStep={1} collapsed={false} />,
      },

      {
        link: "desk-info/:id",
        element: <DeskInformation />,
      },
      {
        path: "ticket-view/:id",
        element: <TicketView isHelpDesk={true} />,
      },
      {
        path: "ticketing-desk/add-ticket",
        element: <AddTicket />,
      },
      {
        path: ":id/ai-configrations",
        element: (
          <Suspense fallback={<LoadingPage></LoadingPage>}>
            <AIConfigrations />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <Navigate to={"."} replace={true} />,
      },
    ],
  },
];
