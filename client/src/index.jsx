import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { App as AppComponent } from "antd";

import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import "./styles/common.css";
import "./styles/root.css";
import "./styles/layout.css";
import "./styles/override.css";
import "./styles/typography.css";
// import "highlight.js/styles/github.css";
import { queryClient } from "services/queryClient";
import ErrorBoundary from "components/common/ErrorBoundary";

//run just when prod

//react query

const root = ReactDOM.createRoot(document.getElementById("root"));

const render = () => {
  root.render(
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2D5FEB",
          colorPrimaryText: "#000",
          fontFamily: "'Poppins', sans-serif",
          borderRadius: 8,
          colorBorder: "#D1D1D6",
          controlOutlineWidth: 1,
          controlHeight: 44,
          colorBgLayout: "#fff",
          controlOutline: "transparent",
        },
        components: {
          Typography: {
            sizeMarginHeadingVerticalStart: 0,
            sizeMarginHeadingVerticalEnd: 0,
          },
          Checkbox: {
            borderRadiusSM: 4,
            colorBgContainer: "transparent",
            colorPrimaryBorderHover: "#eee",
          },
          Menu: {
            colorActiveBarBorderSize: 0,
            itemColor: "#8E8E93",
            itemSelectedColor: "#272942",
            itemSelectedBg: "#fff",
            borderRadius: 14,
          },
          Select: {
            fontSize: 12,
          },
          Table: {
            colorBgContainer: "transparent",
          },

          Input: {
            colorBgBase: "#fff",
            fontSize: 12,
          },
          Tooltip: {
            controlHeight: 36,
          },
          Statistic: {
            fontSizeHeading3: 12,
          },
        },
      }}>
      <ErrorBoundary>
        <AppComponent>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AppComponent>
      </ErrorBoundary>
    </ConfigProvider>,
  );
};

render();

// Add import.meta.hot.accept for handling HMR
