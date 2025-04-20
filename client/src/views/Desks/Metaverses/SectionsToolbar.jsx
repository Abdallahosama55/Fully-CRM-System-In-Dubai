import { Button, Flex, Typography } from "antd";
import { EditSVG } from "assets/jsx-svg";

const SectionToolbar = ({ title, onEdit, isEdit, onSubmit, isSubmitting }) => {
  return (
    <Flex align="center" justify="space-between">
      <Typography.Text
        className="fw-500"
        style={{
          lineHeight: "21px",
        }}>
        {" "}
        {title}
      </Typography.Text>
      <Flex gap={8}>
        <Button
          onClick={onEdit}
          size="small"
          style={{
            borderColor: "#3a5ee3",
            color: "#3a5ee3",
          }}
          icon={!isEdit && <EditSVG color="#3a5ee3" width={12} height={11}></EditSVG>}>
          {isEdit ? "Cancel" : "Edit"}
        </Button>
        {isEdit && (
          <Button
            loading={isSubmitting}
            onClick={onSubmit}
            className="wc"
            size="small"
            style={{ background: "#272942" }}
            color="#282A43">
            Save changes
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default SectionToolbar;
