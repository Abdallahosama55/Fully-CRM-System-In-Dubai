import { Button, Col, Row } from "antd";
import "./styles.css";

function AddCancelButtons({
  cancel,
  add,
  className,
  addName = "Add",
  CancelName = "Cancel",
  onClick,
  htmlType,
  addLoading,
  style = {},
}) {
  return (
    <Row
      className={`add-cancel-buttons ${className}`}
      // justify={"end"}
      // gutter={[16, 0]}
      style={{ marginTop: 15, ...style }}>
      <Col>
        <Button type="ghost" onClick={(e) => cancel(e)} className="cancel">
          {CancelName}
        </Button>
      </Col>
      <Col>
        <Button
          htmlType={htmlType}
          type="default"
          onClick={() => add()}
          className="add"
          loading={addLoading}>
          {addName}
        </Button>
      </Col>
    </Row>
  );
}

export default AddCancelButtons;
