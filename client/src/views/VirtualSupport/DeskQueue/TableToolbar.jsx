import { Divider, Flex, Typography } from "antd";
import AddSchedule from "./AddSchedule";
import { Fragment } from "react";

const TableToolbar = ({ length }) => {
  return (
    <Fragment>
      <div style={{ padding: "16px 32px 16px 32px" }}>
        <Flex justify="space-between" align="center">
          <Typography.Text className={"fz-14 fw-500"}>Desk Queue ({length})</Typography.Text>
          <AddSchedule />
        </Flex>
      </div>
      <Divider
        style={{
          margin: "0",
        }}
      />
    </Fragment>
  );
};

export default TableToolbar;
