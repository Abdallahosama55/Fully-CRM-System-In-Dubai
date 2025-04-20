import { RouterProvider } from "react-router-dom";
import { router } from "./utils/index.router";
const getSubscriptionRoutes = () => {
  return router();
};
export default function VindoRouter() {

  // const routes = useMemo(() => {
  //   return getRouterData(subscriptionType, {
  //     collapsed,
  //     isHelpDesk,
  //   });
  // }, [collapsed, isHelpDesk, subscriptionType]);

  return <RouterProvider router={getSubscriptionRoutes()} />;
}
