import MainNavigation from "components/MainNavigation";
import LoadingPage from "components/common/LoadingPage";
import { Fragment, Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import HelpDeskLayout from "layout/HelpDeskLayout";
import { fetchDeskById } from "services/Desk/Querys/useGetDeskById";
import PiplineLayout from "views/Piplines/PiplineLayout";
import PipelineTemplates from "views/Piplines/PipelineTemplates";
// import PriorityBoard from "views/Piplines/components/PriorityBoard";
const PriorityBoard = lazy(() => import("views/Piplines/components/PriorityBoard"));
// const TicketingDesk = lazy(() => import("views/Desks/TicketingDesk"));
// const DeskActivities = lazy(() => import("views/Desks/DeskActivities"));
// const DeskInformation = lazy(() => import("views/Desks/DeskInformation"));
// const TicketView = lazy(() => import("views/HelpDesk/TicketView"));
// const AddTicket = lazy(() => import("views/Desks/TicketingDesk/AddTicket"));
// const CreateDisk = lazy(() => import("views/Desks/CreateDesk"));
// const MeetingDesk = lazy(() => import("views/Desks/CreateDesk/MeetingDesk"));
// const Employeses = lazy(() => import("views/Desks/DeskInformation"));
// const DeskFiles = lazy(() => import("views/Desks/DeskFiles"));
// const Metaverses = lazy(() => import("views/Desks/Metaverses"));

const loaderDeskInfo = async ({ params }) => {
  const rest = await fetchDeskById(params.id);
  return rest;
};
export const piplineSettingsRoutes = [
  {
    path: "crm/pipline-settings",
    // loader: loaderDeskInfo,
    element: (
      <PiplineLayout>
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </PiplineLayout>
    ),
    children: [
      // {
      //   index: true,
      //   element: <DeskInformation collapsed={false} />,
      // },
      {
        path: "pipline-template",
        element: <PipelineTemplates />,
      },
      {
        path: "priorities",
        element: <PriorityBoard />,
      },
      // {
      //   path: "metaverses",
      //   element: <Metaverses />,
      // },
      // {
      //   path: "edit-information",
      //   element: <CreateDisk currentStep={1} collapsed={false} />,
      // },
      // {
      //   path: "employees",
      //   element: <CreateDisk currentStep={2} collapsed={false} />,
      // },
    ],
  },
];
