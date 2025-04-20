import React from "react";
import Header from "./Header";
import { Flex, Typography } from "antd";
import Avatar from "antd/es/avatar/avatar";
import Card from "./Card";
import FormContent from "./Form";
import Box from "components/Box";
const AddFlightBooking = ({ data , DrawerAPI }) => {
  return (
    <div>
      <Header />
      <Card>
        <Flex align="center" gap={8}>
          <Avatar />
          <Typography.Text className="fw-500" style={{ color: "#313343" }}>
            {data.outboundFlight.airlineCompany.name}
          </Typography.Text>
        </Flex>
      </Card>
      <Box sx={{ marginTop: "16px" }}>
        <FormContent data={data} DrawerAPI={DrawerAPI}/>
      </Box>
    </div>
  );
};
export default AddFlightBooking;
