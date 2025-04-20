import { Col, Flex, Row } from "antd";
import Toolbar from "./Toolbar";
import ListEmployees from "./ListEmployees";
import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";

import "./styles.css";

const Employees = () => {
  const { id } = useParams();
  const [isEditView, setIsEditView] = useState(false);
  const handleViewEdit = useCallback(() => {
    setIsEditView(true);
  }, []);
  return (
    <Flex vertical gap={24}>
      <Toolbar
        onEdit={handleViewEdit}
        isEditView={isEditView}
        title={"Employees Selected at this desk"}
      />
      <Row gutter={[0, 12]}>
        <Col xs={24}>
          <ListEmployees isEditView={isEditView} id={id} />
        </Col>
      </Row>
    </Flex>
  );
};

export default Employees;
