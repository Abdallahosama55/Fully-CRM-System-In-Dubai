import { Button, Form, Input, Space, Typography } from "antd";
import Box from "components/Box";
import CountryInput from "components/common/CountryInput";
import SelectLookups from "components/SelectLookups";
import { useNotification } from "context/notificationContext";
import { useCallback } from "react";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import useAddAirlineCompany from "services/travel/Settings/Mutations/useAddAirlineCompany";
import useEditAirlineCompany from "services/travel/Settings/Mutations/useEditAirlineCompany";
const AddAirlineCompany = ({ close, defaultValues = {} }) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = useNotification();
  const { editAirlineCompany, isPending: isEditPending } = useEditAirlineCompany({
    onSuccess: () => {
      form.resetFields();
      openNotificationWithIcon("success", "edited successfully");
      close();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRLINE_COMPANIES] });
    },
  });
  const { addAirlineCompany, isPending } = useAddAirlineCompany({
    onSuccess: () => {
      form.resetFields();
      openNotificationWithIcon("success", "Added successfully");
      close();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRLINE_COMPANIES] });
    },
  });
  const handleSubmit = useCallback(
    async (data) => {
      if (defaultValues?.id) {
        await editAirlineCompany({ id: defaultValues?.id, ...data });
      } else await addAirlineCompany(data);
    },
    [defaultValues],
  );
  return (
    <>
      <Typography.Title level={5}>{defaultValues.id ? "Edit" : "Add"} Airline Company</Typography.Title>
      <Space
        size={[24, 24]}
        className="w-100"
        style={{
          justifyContent: "space-between",
          height: "calc(100vh - 100px)",
          marginTop: "12px",
        }}
        direction="vertical">
        <Form
          initialValues={{
            name: "",
            companyId: null,
            ...defaultValues,
          }}
          onFinish={handleSubmit}
          form={form}
          layout="vertical">
          <Form.Item required rules={[{ required: true }]} name="name" label="Name">
            <Input placeholder="Enter Airports name" />
          </Form.Item>

          <Form.Item required rules={[{ required: true }]} name="countryCode" label="Country">
            <CountryInput />
          </Form.Item>
        </Form>
        <Box sx={{ width: "100%", paddingInline: "24px" }}>
          <Button
            loading={isPending || isEditPending}
            onClick={() => {
              form.submit();
            }}
            className="w-100"
            type="primary">
            Save
          </Button>
        </Box>
      </Space>{" "}
    </>
  );
};

export default AddAirlineCompany;
