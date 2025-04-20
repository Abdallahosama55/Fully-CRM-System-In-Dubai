import { Outlet, createBrowserRouter } from "react-router-dom";
import { helpDeskRoutes } from "./helpDesk.routes";
import { employeeRoutes } from "./employee.routes";

import { dataManagementRoutes } from "./data-management.routes";
import { managementRoutes } from "./management.routes";
import { metaverseRoutes } from "./metaverse.routes";
import { projectsRoutes } from "./projects.routes";
import { collaborationRoutes } from "./collaboration.routes";
import { Suspense, lazy } from "react";
import LoadingPage from "components/common/LoadingPage";
import { inventoryRoutes } from "./inventory.routes";
import { eventRoutes } from "./event.routes";
import { dashboardRoutes } from "./dashboard.routes";
import ContentLayout from "layout/ContentLayout";
import { calendarRoutes } from "./calender.routes";
import { integrationsRoutes } from "./integrations.routes";
import { crmRoutes } from "./crm.routes";
import WidgetTest from "views/WidgetTest";
import { bootstrapLoader } from "router/loaders/bootstrap.loader";
import { engagementsRoutes } from "./engagements.routes";
import { settingsRoutes } from "./settings.routes";
import { piplineSettingsRoutes } from "./piplineSettings.routes";
import { callMeetingRoutes } from "./call-meeting.routes";
import { webWidgetRoutes } from "./web-widget.routes";
import { ConnectionProvider } from "hooks/useConnection";
import { profileRoutes } from "./profile.routes";
import { travelRoutes } from "./traval/index.routes";
import { financeRoutes } from "./finance.routes";
import { communityRoutes } from "./community.routes";
import ROUTER_URLS from "constants/ROUTER_URLS";
import MainLayout from "layout/MainLayout";
import ComingSoonPage from "components/common/ComingSoonPage";

const WebWidgetLayoutModal = lazy(() => import("layout/WebWidgetLayout"));
const ScheduleCall = lazy(() => import("views/WebWidget/ScheduleCall"));
const Ticket = lazy(() => import("views/WebWidget/Ticket"));
const WebWidget = lazy(() => import("views/WebWidget"));
const SliderPreview = lazy(() => import("views/SliderPreview"));

const Icons = lazy(() => import("views/Icons"));
const MetaverseGameView = lazy(() => import("views/MetaverseGame"));
const LiveStudio = lazy(() => import("views/StudioLivePage"));
const MetaverseWordpress = lazy(() => import("views/MetaverseWordpress"));
const VirtualSupportView = lazy(() => import("views/VirtualSupport"));
const NewCompanyQuestions = lazy(() => import("views/NewCompanyQuestions"));
const WebBuilder = lazy(() => import("views/Pages/WebBuilder"));

export const router = () => {
  return createBrowserRouter([
    {
      path: "/",
      loader: bootstrapLoader,
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [
        ...travelRoutes,
        ...financeRoutes,
        ...calendarRoutes,
        ...dashboardRoutes,
        ...collaborationRoutes,
        ...projectsRoutes,
        ...metaverseRoutes,
        ...managementRoutes,
        ...dataManagementRoutes,
        ...employeeRoutes,
        ...helpDeskRoutes,
        ...inventoryRoutes,
        ...eventRoutes,
        ...integrationsRoutes,
        ...settingsRoutes,
        ...crmRoutes,
        ...engagementsRoutes,
        ...piplineSettingsRoutes,
        ...profileRoutes,
        ...communityRoutes,
        {
          path: "/new-company-questions",
          element: <NewCompanyQuestions />,
        },
        {
          path: "/coming-soon",
          element: <ComingSoonPage />,
        },
      ],
    },
    ...webWidgetRoutes,
    ...callMeetingRoutes,
    {
      path: ROUTER_URLS.PAGES.ADD,
      element: <WebBuilder />,
    },
    {
      path: ROUTER_URLS.PAGES.EDIT + ":id",
      element: <WebBuilder />,
    },
    {
      path: "/metaverse/:dimId",
      element: (
        <ContentLayout>
          <MetaverseGameView />
        </ContentLayout>
      ),
    },
    {
      path: "/slider/:id/:dimId?",
      element: (
        <ContentLayout>
          <SliderPreview />
        </ContentLayout>
      ),
    },
    {
      path: "/web-widget",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: <WebWidget />,
        },
        {
          path: "schedule-call",
          element: <ScheduleCall />,
        },
        {
          path: "ticket",
          element: (
            <WebWidget>
              <WebWidgetLayoutModal>
                <Ticket />
              </WebWidgetLayoutModal>
            </WebWidget>
          ),
        },
      ],
    },
    {
      path: "/metaverse-wordpress/:dimId",
      element: (
        <ContentLayout>
          <MetaverseWordpress />
        </ContentLayout>
      ),
    },

    {
      path: "/direct-call/:meetingId",
      element: (
        <Suspense fallback={<LoadingPage></LoadingPage>}>
          <ConnectionProvider>
            <VirtualSupportView />
          </ConnectionProvider>
        </Suspense>
      ),
    },
    {
      path: "icons",
      element: (
        <Suspense fallback={<LoadingPage></LoadingPage>}>
          <Icons></Icons>
        </Suspense>
      ),
    },
    {
      path: "/live-admin/:liveId",
      element: (
        <Suspense fallback={<LoadingPage></LoadingPage>}>
          <LiveStudio />
        </Suspense>
      ),
    },
    {
      path: "/desks/widget-test",
      element: (
        <Suspense fallback={<LoadingPage></LoadingPage>}>
          <WidgetTest />
        </Suspense>
      ),
    },
  ]);
};
