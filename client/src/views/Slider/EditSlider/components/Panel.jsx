import { useState } from "react";
import { Card, Flex } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const Panel = ({ initOpen = false, children, title, action, background, innerRef, ...rest }) => {
  const [isOpen, setOpen] = useState(initOpen);
  return (
    <Card
      ref={innerRef}
      title={title}
      style={{
        background: `${background ?? "#f6f6f7b2"}`,
      }}
      classNames={`slider-edit-slider-panel-comp-card ${isOpen ? "" : "hide-card-body"}`}
      extra={
        <Flex gap={8} align="center">
          {action && action}
          <div onClick={() => setOpen((prev) => !prev)}>
            {isOpen ? <UpOutlined /> : <DownOutlined />}
          </div>
        </Flex>
      }
      {...rest}>
      {isOpen && <div>{children}</div>}
    </Card>
  );
};
export default Panel;
