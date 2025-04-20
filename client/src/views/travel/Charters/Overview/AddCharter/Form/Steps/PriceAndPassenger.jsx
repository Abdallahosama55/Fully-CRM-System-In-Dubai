import { Col, Row } from "antd";
import PriceAndCostBox from "../../../components/PriceAndCostBox";
import { useWatch } from "antd/es/form/Form";
const PriceAndPassenger = ({ form }) => {
  const adult = useWatch("adult", form);
  const child = useWatch("child", form);
  const infant = useWatch("infant", form);

  return (
    <Row gutter={24} style={{ marginTop: "16px" }}>
      <Col span={8}>
        <PriceAndCostBox title="Adult" name="adult" data={adult} />
      </Col>
      <Col span={8}>
        <PriceAndCostBox title={"Child"} name="child" data={child} />
      </Col>
      <Col span={8}>
        <PriceAndCostBox title={"infant"} name="infant" data={infant} />
      </Col>
    </Row>
  );
};

export default PriceAndPassenger;
