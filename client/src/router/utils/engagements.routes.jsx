import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
const DesksWidget = lazy(() => import("views/Desks/DeskWidget"));
const SliderView = lazy(() => import("views/Slider"));
const SliderPreview = lazy(() => import("views/SliderPreview"));
const SliderEdit = lazy(() => import("views/Slider/EditSlider"));

export const engagementsRoutes = [
  {
    path: "/engagements",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "collaboration-widget",
        element: <DesksWidget />,
      },
      {
        path: "slider-widget",
        element: <SliderView />,
      },
      {
        path: "slider-widget/edit/:id",
        element: <SliderEdit />,
      },
      {
        path: "slider-widget/:id/:dimId?",
        element: <SliderPreview />,
      },

      {
        path: "*",
        element: <Navigate to={"/"} replace={true} />,
      },
    ],
  },
];
