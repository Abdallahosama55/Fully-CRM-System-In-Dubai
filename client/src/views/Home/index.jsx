import React, { lazy, Suspense } from "react";
import { useUserContext } from "context/userContext";
import LoadingPage from "components/common/LoadingPage";
import TurboLoadingPage from "components/common/TurboLoadingPage";
import usePageTitle from "hooks/usePageTitle";

const HomeView = lazy(() => import("./HomeView"));
const BookingsSearch = lazy(() => import("views/travel/OnlineBooking/Search"));

const HomePage = () => {
  const { user } = useUserContext();
  usePageTitle("Home");

  if (user?.officerType === "DMC" || user?.officerType === "AGENT") {
    return (
      <Suspense fallback={<TurboLoadingPage />}>
        <BookingsSearch />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <HomeView />
    </Suspense>
  );
};

export default HomePage;
