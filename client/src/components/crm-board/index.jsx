import { Col, Row } from "antd";

import PersonalCard from "./personal-card";
import Content from "./Content";
import useGetCustomerInfo from "services/Customers/Querys/useGetCustomerInfo";

// styles
import "./styles.css";
const CRMBoard = ({ customerId }) => {
  const { data: CustomerData } = useGetCustomerInfo(customerId, {
    refetchOnMount: false,
    select: (data) => {
      return data?.data?.data;
    },
  });
  return (
    <Row style={{ height: "100%" }} gutter={16}>
      <Col className="columns" span={5}>
        <PersonalCard CustomerData={CustomerData} isShowingEdit={false} isShowingIcons={false} />
      </Col>
      <Col span={19}>
        <Content />
      </Col>
    </Row>
  );
};
export default CRMBoard;
