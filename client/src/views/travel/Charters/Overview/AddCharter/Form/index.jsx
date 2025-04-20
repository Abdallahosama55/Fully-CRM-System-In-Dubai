import React from "react";
import FlightDetails from "./Steps/FlightDetails";
import FlightType from "./Steps/FlightType";
import PriceAndPassenger from "./Steps/PriceAndPassenger";
import { Button, Form } from "antd";
import Box from "components/Box";
import useGetAllAirlineCompanies from "services/travel/Settings/Queries/useGetAllAirlineCompanies";
import LoadingPage from "components/common/LoadingPage";
import ViewResult from "./Steps/ViewResult";
import useAddFlight from "services/travel/charters/Mutations/useAddFlight";
import { convertInputToOutput } from "./utils";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
const FormContent = ({ close }) => {
  const [form] = Form.useForm();
  const { addFlight, isPending: isAddPending } = useAddFlight({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FLIGHT_SOURCES] });
      close();
    },
  });
  const { isPending } = useGetAllAirlineCompanies(
    { size: 50 },
    {
      refetchOnMount: false,
    },
  );

  if (isPending) return <LoadingPage />;
  const handleSubmit = async (data) => {
    await addFlight({
      data: convertInputToOutput({
        ...data,
        coast: {
          adult: data?.adult?.map((item) => ({
            from: item?.from ? Number(item?.from) : undefined,
            to: item?.to ? Number(item?.to) : 0,
            value: item?.costValue ? Number(item?.costValue) : 0,
          })),
          child: data?.child?.map((item) => ({
            from: item?.from ? Number(item?.from) : undefined,
            to: item?.to ? Number(item?.to) : 0,
            value: item?.costValue ? Number(item?.costValue) : 0,
          })),
          infant: data?.infant?.map((item) => ({
            from: item?.from ? Number(item?.from) : undefined,
            to: item?.to ? Number(item?.to) : 0,
            value: item?.costValue ? Number(item?.costValue) : 0,
          })),
        },
        sellPrice: {
          adult: data?.adult?.map((item) => ({
            from: item?.from ? Number(item?.from) : undefined,
            to: item?.to ? Number(item?.to) : 0,
            value: item?.sellValue ? Number(item?.sellValue) : 0,
          })),
          child: data?.child?.map((item) => ({
            from: item?.from ? Number(item?.from) : undefined,
            to: item?.to ? Number(item?.to) : 0,
            value: item?.sellValue ? Number(item?.sellValue) : 0,
          })),
          infant: data?.infant?.map((item) => ({
            from: item?.from ? Number(item?.from) : undefined,
            to: item?.to ? Number(item?.to) : 0,
            value: item?.sellValue ? Number(item?.sellValue) : 0,
          })),
        },
      }).map((item) => item.outboundFlight),
    });
  };

  return (
    <Box
      sx={{
        paddingBottom: "24px",
      }}>
      <div>
        <Form
          onFinish={handleSubmit}
          initialValues={{
            type: "oneWay",
          }}
          onSubmitCapture={(error) => {
            console.log(error);
          }}
          form={form}
          layout="vertical">
          <FlightDetails form={form} />
          <FlightType form={form} />
          <PriceAndPassenger form={form} />
          <ViewResult form={form} />
        </Form>
      </div>
      <div
        style={{
          position: "sticky",
          paddingInline: "90px",
          bottom: 0,
          marginTop: "90px",
          zIndex: 11212,
        }}>
        <Button
          loading={isAddPending}
          onClick={() => form.submit()}
          type="primary"
          style={{ width: "100%" }}>
          Save
        </Button>
      </div>
    </Box>
  );
};
export default FormContent;
