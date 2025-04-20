import "./styles.css";
import { Card, Divider, Spin, Typography } from "antd";
import Content from "./Content";
import { Suspense } from "react";
import Box from "components/Box";

const InsightSources = ({ customerId }) => {
  return (
    <Card>
      <Typography.Text className="fz-14 fw-500">Source</Typography.Text>
      <Divider style={{ marginTop: "8px" }} className="mb-1 "></Divider>
      <Suspense
        fallback={
          <Box sx={{ textAlign: "center" }}>
            <Spin spinning />
          </Box>
        }>
        <Content customerId={customerId} />
      </Suspense>
    </Card>
  );
};
export default InsightSources;
