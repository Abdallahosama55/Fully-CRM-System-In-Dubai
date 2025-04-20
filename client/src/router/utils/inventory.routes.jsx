import MainNavigation from "components/MainNavigation";
import LoadingPage from "components/common/LoadingPage";
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
const ViewOrderMain = lazy(() => import("views/Orders/ViewOrders"));
const Orders = lazy(() => import("views/Orders/OrdersView"));
const ViewCategories = lazy(() => import("views/Inventory/Categoreis/ViewCategories"));
const Categoreis = lazy(() => import("views/Inventory/Categoreis"));
const Products = lazy(() => import("views/Inventory/Products/ProductView/index"));
const ViewBrands = lazy(() => import("views/Inventory/Brand/ViewBrands"));
const Brands = lazy(() => import("views/Inventory/Brand"));
const Warehouse = lazy(() => import("views/Inventory/Warehouse"));
const ViewWarehouses = lazy(() => import("views/Inventory/Warehouse/ViewWarehouses"));
export const inventoryRoutes = [
  {
    path: "inventory",
    element: (
      <>
        {/* <MainNavigation domainName="inventory" /> */}
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </>
    ),
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "order/:id",
        element: <ViewOrderMain />,
      },
      {
        path: "warehouse",
        element: <Warehouse />,
      },
      {
        path: "warehouse/warehouse-inf/:id",
        element: <ViewWarehouses />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "brands/brands-info/:id",
        element: <ViewBrands />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categoreis />,
      },
      {
        path: "categoreis/categoreis-info/:id",
        element: <ViewCategories />,
      },
      {
        path: "*",
        element: <Navigate to={"."} replace={true} />,
      },
    ],
  },
];
