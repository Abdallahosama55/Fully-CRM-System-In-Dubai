import { Button, Form, Input, Space, Typography } from "antd";
import { useWatch } from "antd/es/form/Form";
import Box from "components/Box";
import SelectLookups from "components/SelectLookups";
import { useNotification } from "context/notificationContext";
import { useCallback } from "react";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import useAddAirport from "services/travel/Settings/Mutations/useAddAirport";
import useEditAirport from "services/travel/Settings/Mutations/useEditAirport";
const AddAirports = ({ close, defaultValues = {} }) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = useNotification();

  const countryId = useWatch("countryId", form);
  const statesId = useWatch("stateId", form);
  const { editAirport, isPending: isEditPending } = useEditAirport({
    onSuccess: () => {
      form.resetFields();
      openNotificationWithIcon("success", "edited successfully");
      close();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRPORTS] });
    },
  });
  const { addAirport, isPending: isAddPending } = useAddAirport({
    onSuccess: () => {
      form.resetFields();
      openNotificationWithIcon("success", "Added successfully");
      close();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRPORTS] });
    },
  });
  const handleAddAirport = useCallback(
    async (data) => {
      if (defaultValues?.id) await editAirport({ id: defaultValues.id, ...data });
      else await addAirport({ ...data });
    },
    [defaultValues],
  );
  return (
    <>
      <Typography.Title level={5}>{defaultValues?.id ? "Edit" : "Add"} Airport</Typography.Title>
      <Space
        size={[24, 24]}
        className="w-100 "
        style={{
          justifyContent: "space-between",
          height: "calc(100vh - 100px)",
          marginTop: "24px",
        }}
        direction="vertical">
        <Form
          initialValues={{
            ...defaultValues,
          }}
          onFinish={handleAddAirport}
          form={form}
          layout="vertical">
          <Form.Item required rules={[{ required: true }]} name="name" label="Name">
            <Input placeholder="Enter Airports name" />
          </Form.Item>
          <Form.Item required rules={[{ required: true }]} name="code" label="Code">
            <Input placeholder="Enter Airports code" />
          </Form.Item>
          <Form.Item required rules={[{ required: true }]} name="countryId" label="Country">
            <SelectLookups
              onChange={(value) => {
                form?.setFieldValue("stateId", undefined);
                form?.setFieldValue("cityId", undefined);
              }}
              type="countries"
              placeholder={"Select Country"}
            />
          </Form.Item>
          <Form.Item name="stateId" label="State">
            <SelectLookups
              disabled={!countryId}
              type="states"
              onChange={(value) => {
                form?.setFieldValue(["cityId"], undefined);
              }}
              id={countryId}
              placeholder={"Select states"}
            />
          </Form.Item>
          <Form.Item name="cityId" label="City">
            <SelectLookups
              disabled={!statesId}
              type="cites"
              id={statesId}
              placeholder={"Select City"}
            />
          </Form.Item>
        </Form>
        <Box sx={{ width: "100%", paddingInline: "24px" }}>
          <Button
            loading={isAddPending || isEditPending}
            onClick={() => form.submit()}
            className="w-100"
            type="primary">
            Save
          </Button>
        </Box>
      </Space>
    </>
  );
};

export default AddAirports;
