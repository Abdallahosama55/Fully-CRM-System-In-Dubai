import MainNavigation from "components/MainNavigation";
import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Outlet, Navigate } from "react-router-dom";

const JobTitles = lazy(() => import("views/NewSettings/JobTitles/JobTitles"));
const Departments = lazy(() => import("views/NewSettings/Departements/Departements"));
const Countries = lazy(() => import("views/NewSettings/Countries/Countries"));
const ServiceTypes = lazy(() => import("views/NewSettings/ServiceTypes/ServiceTypes"));
const States = lazy(() => import("views/NewSettings/States/States"));
const Cities = lazy(() => import("views/NewSettings/Cities/Cities"));
const Areas = lazy(() => import("views/NewSettings/Areas"));
const Labels = lazy(() => import("views/NewSettings/Labels/Labels"));
const Payment = lazy(() => import("views/Settings/payment"));
const CustomerCategories = lazy(() => import("views/NewSettings/CustomerCategories"));
const Currency = lazy(() => import("views/NewSettings/Currency"));
const Airports = lazy(() => import("views/NewSettings/Airports"));
const AirlineCompany = lazy(() => import("views/NewSettings/AirlineCompany"));
const Banks = lazy(() => import("views/NewSettings/Banks"));

export const dataManagementRoutes = [
  {
    path: "data-management",
    element: (
      <>
        <MainNavigation domainName={"data-management"}></MainNavigation>
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </>
    ),
    children: [
      {
        index: true,
        path: "job-titles",
        element: <JobTitles />,
      },
      {
        path: "departments",
        element: <Departments />,
      },
      {
        path: "locations",
        element: <Outlet></Outlet>,
        children: [
          {
            path: "countries",
            element: <Countries />,
          },
          {
            path: "states",
            element: <States />,
          },
          {
            path: "cities",
            element: <Cities />,
          },
          {
            path: "areas",
            element: <Areas />,
          },
        ],
      },

      {
        path: "service-types",
        element: <ServiceTypes />,
      },

      {
        path: "labels",
        element: <Labels />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "customer-categories",
        element: <CustomerCategories />,
      },
      {
        path: "customer-categories",
        element: <CustomerCategories />,
      },
      {
        path: "currency",
        element: <Currency />,
      }, {
        path: "banks",
        element: <Banks />,
      },
      {
        path: "flights",
        element: <Outlet />,
        children: [
          {
            path: "airports",
            element: <Airports />,
          },
          {
            path: "airline-companies",
            element: <AirlineCompany />,
          },
        ],
      },

      {
        path: "*",
        element: <Navigate to={"/"} replace={true} />,
      },
    ],
  },
];
