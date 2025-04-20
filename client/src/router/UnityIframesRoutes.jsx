import { Flex, Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const ClientCheckoutOrder = lazy(() => import("views/iframes/ClientCheckoutOrder"));
const UnityIframesRoutes = () => {
  return (
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
        <Route path="/unity-cart-checkout-order" element={<ClientCheckoutOrder />} />
      </Routes>
    </Suspense>
  );
};

export default UnityIframesRoutes;
