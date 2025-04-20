import { Flex, Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EXTERNAL_IFRAME_BASE_URL } from "../constants/IFRAME_ROUTER_URLS";
import ExternalIframeParent from "views/iframes/ExternalIframeParent";
// VIEWS

const VersesOfFolders = lazy(() => import("views/Projects/VersesOfProject"));
const MetaverseBackups = lazy(() => import("views/Metaverse/MetaverseBackups"));
const MetaverseGameView = lazy(() => import("views/MetaverseGame"));
const MetaverseWordpressView = lazy(() => import("views/MetaverseWordpress"));
const Products = lazy(() => import("views/Inventory/Products/ProductView/index"));
const SliderView = lazy(() => import("views/Slider"));
const SliderPreview = lazy(() => import("views/SliderPreview"));
const SliderEdit = lazy(() => import("views/Slider/EditSlider"));

const ExternalIframeRouter = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Suspense
            fallback={
              <Flex style={{ height: "100dvh" }} vertical align="center" justify="center">
                <Spin />
              </Flex>
            }></Suspense>
        }>
        <Routes>
          <Route path={EXTERNAL_IFRAME_BASE_URL} element={<ExternalIframeParent />}>
            <Route path={"metaverse"} element={<VersesOfFolders />} />
            <Route path={"metaverse/:projectName/:projectId"} element={<VersesOfFolders />} />
            <Route
              path={"metaverse/:dimensionId/dimension-backups"}
              element={<MetaverseBackups />}
            />
            <Route path={"metaverse/:dimId"} element={<MetaverseGameView />} />
            <Route path={"metaverse-wordpress/:dimId"} element={<MetaverseWordpressView />} />

            <Route path={"inventory/products"} element={<Products />} />

            <Route path={"engagements/slider-widget"} element={<SliderView />} />
            <Route path={"engagements/slider-widget/edit/:id"} element={<SliderEdit />} />
            <Route path={"engagements/slider-widget/:id/:dimId?"} element={<SliderPreview />} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default ExternalIframeRouter;
