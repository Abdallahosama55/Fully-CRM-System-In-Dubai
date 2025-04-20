
import { Divider, Space, Typography } from "antd";
import { AirPlanColoredSVG } from "assets/jsx-svg";

const AddNewFormsDrawer = ({ close }) => {
  return (
    <section className="add-charter-drawer">
      <Space>
        <AirPlanColoredSVG />
        <Typography className={"title fz-16 fw-500"}>Add New Forms</Typography>
      </Space>
      <Divider className="divider" />
      <Typography.Title level={5} style={{ color: "#313343" }}>
        forms Details
      </Typography.Title>
      <Typography.Paragraph style={{ color: "#697281" }}>
        Enter the basic information about the forms.{" "}
      </Typography.Paragraph>
      
    </section>
  );
};
export default AddNewFormsDrawer;
