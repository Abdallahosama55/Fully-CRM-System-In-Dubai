import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
const Metaverse = lazy(() => import("views/Metaverse"));
const VerseFolders = lazy(() => import("views/Projects/VerseProjects"));
const VersesOfFolders = lazy(() => import("views/Projects/VersesOfProject"));
const MetaverseBackups = lazy(() => import("views/Metaverse/MetaverseBackups"));

export const metaverseRoutes = [
  {
    path: "metaverse",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Metaverse />,
      },
      {
        path: ":projectName/:projectId",
        element: <VersesOfFolders />,
      },
      {
        path: ":dimensionId/dimension-backups",
        element: <MetaverseBackups />,
      },
      {
        path: "*",
        element: <Navigate to={"."} replace={true} />,
      },
    ],
  },
];
