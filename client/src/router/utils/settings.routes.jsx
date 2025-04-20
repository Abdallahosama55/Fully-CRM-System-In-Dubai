import TabsMenu from "components/TabsMenu";
import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
const EmailSetting = lazy(() => import("views/EmailSetting/index"));
const CompanyInfoSetting = lazy(() => import("views/CompanyInfoSetting/index"));
const Pages = lazy(() => import("views/Pages"));
const DynamicPage = lazy(() => import("views/Pages/DynamicPage"));

const Settings = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "GeneralInfo",
      label: "General Info",
      onClick: () => {
        navigate("/settings/company-info");
      },
    },
    {
      key: "Email",
      label: "Email",
      onClick: () => {
        navigate("/settings/email");
      },
    },
  ];

  return (
    <>
      <TabsMenu tabs={items} />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export const settingsRoutes = [
  {
    path: "settings",
    element: <Settings />,
    children: [
      {
        path: "company-info",
        element: <CompanyInfoSetting />,
      },
      {
        path: "email",
        element: <EmailSetting />,
      },
      {
        index: true,
        element: <Navigate to={"company-info"}></Navigate>,
      },
    ],
  },
  {
    path: "pages",
    element: <Suspense fallback={<LoadingPage />}>
      <Pages />
    </Suspense>,
  },
  {
    path: "pages/:id",
    element: <Suspense fallback={<LoadingPage />}>
      <DynamicPage />
    </Suspense>,
  }
];
