import { Col, Divider, Row } from "antd";
import Box from "components/Box";

const CustomerSectionHeader = ({ SvgIcon, title }) => {
  return (
    <Col style={{ marginTop: 20, padding: 0 }} span={24}>
      <div style={{ display: "flex", columnGap: 5, alignItems: "center" }}>
        <SvgIcon /> <div>{title}</div>
      </div>
      <Divider dashed style={{ marginTop: 5 }}></Divider>
    </Col>
  );
};
export default CustomerSectionHeader;
