import FormContent from "./Form";
import { Divider, Space, Typography } from "antd";
import { AirPlanColoredSVG } from "assets/jsx-svg";

const AddCharterDrawer = ({ close }) => {
  return (
    <section className="add-charter-drawer">
      <Space>
        <AirPlanColoredSVG />
        <Typography className={"title fz-16 fw-500"}>Add New Charter</Typography>
      </Space>
      <Divider className="divider" />
      <Typography.Title level={5} style={{ color: "#313343" }}>
        Flight Details
      </Typography.Title>
      <Typography.Paragraph style={{ color: "#697281" }}>
        Enter the basic information about the charter flight.{" "}
      </Typography.Paragraph>
      <FormContent close={close} />
    </section>
  );
};
export default AddCharterDrawer;
