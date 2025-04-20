import { Flex, Typography } from "antd";

const Toolbar = ({ title }) => {
  return (
    <Flex align="center" justify="space-between">
      <Typography.Text
        className="fw-500"
        style={{
          lineHeight: "21px",
        }}>
        {title}
      </Typography.Text>
    </Flex>
  );
};

export default Toolbar;
