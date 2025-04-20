import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import ModalUploadFile from "./ModalUploadFile";

const SectionToolbar = ({ title, isSharedForSignature }) => {
  return (
    <Flex align="center" justify="space-between">
      <Typography.Text
        style={{
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "21px",
        }}>
        {" "}
        {title}
      </Typography.Text>
      <ModalUploadFile
        isSharedForSignature={isSharedForSignature}
        trigger={
          <Button
            style={{
              borderColor: "#3a5ee3",
              color: "#3a5ee3",
            }}
            size="small"
            icon={<PlusCircleOutlined></PlusCircleOutlined>}>
            Upload
          </Button>
        }
      />
    </Flex>
  );
};
export default SectionToolbar;
