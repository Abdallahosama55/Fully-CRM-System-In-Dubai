import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
const VerseProjects = lazy(() => import("views/Projects/VerseProjects"));
const VersesOfProject = lazy(() => import("views/Projects/VersesOfProject"));

export const projectsRoutes = [
  {
    path: "verses/projects",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <VerseProjects />,
      },
      {
        path: ":projectName/:projectId",
        element: <VersesOfProject />,
      },
      {
        path: "*",
        element: <Navigate to={"."} replace={true} />,
      },
    ],
  },
];
