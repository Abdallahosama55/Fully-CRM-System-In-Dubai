import { Layout } from "antd";
import ScrollToTop from "components/ScrollToTop";
import LoadingPage from "components/common/LoadingPage";
import React, { Suspense } from "react";
const { Content } = Layout;
const ContentLayout = ({ children }) => {
  return (
    <Layout>
      <ScrollToTop />

      <Layout style={{ marginInlineStart: 0, marginInlineEnd: 0 }} className="main-layout">
        <Content
          className="body-layout"
          style={{
            paddingInlineStart: 0,

            minHeight: "calc(100vh - 85px)",
          }}>
          <Suspense fallback={<LoadingPage></LoadingPage>}>{children}</Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ContentLayout;
