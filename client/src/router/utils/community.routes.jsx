import { Suspense, lazy } from "react";

import LoadingPage from "components/common/LoadingPage";

const Community = lazy(() => import("views/Community"));
const AddEditCommunity = lazy(() => import("views/Community/AddEditCommunity"));
const CommunityView = lazy(() => import("views/Community/CommunityView"));

export const communityRoutes = [
  {
    path: "community",

    element: (
      <Suspense fallback={<LoadingPage />}>
        <Community />
      </Suspense>
    ),
  },

  {
    path: "community/add",

    element: (
      <Suspense fallback={<LoadingPage />}>
        <AddEditCommunity />
      </Suspense>
    ),
  },

  {
    path: "community/edit/:communityId",

    element: (
      <Suspense fallback={<LoadingPage />}>
        <AddEditCommunity isEdit />
      </Suspense>
    ),
  },

  {
    path: "community/:communityId",

    element: (
      <Suspense fallback={<LoadingPage />}>
        <CommunityView />
      </Suspense>
    ),
  },
];
