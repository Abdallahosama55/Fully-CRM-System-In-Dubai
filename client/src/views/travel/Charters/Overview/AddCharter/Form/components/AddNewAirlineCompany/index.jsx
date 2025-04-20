import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { PluseSVG } from "assets/jsx-svg";
import CountryInput from "components/common/CountryInput";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import useAddAirlineCompany from "services/travel/Settings/Mutations/useAddAirlineCompany";

const AddNewAirlineCompany = ({ onAdd }) => {
  const [isAddNewCompanyModalOpen, setIsAddNewCompanyModalOpen] = useState(false);
  const [form] = useForm();
  const { addAirlineCompany, isPending } = useAddAirlineCompany({
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRLINE_COMPANIES] });
      form.resetFields();
      onAdd(res?.data?.data?.id)
      setIsAddNewCompanyModalOpen(false);
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  });

  const handleSubmit = (values) => {
    addAirlineCompany(values);
  };

  return (
    <>
      <Modal
        title="Add new airline company"
        open={isAddNewCompanyModalOpen}
        onCancel={() => setIsAddNewCompanyModalOpen(false)}
        okText="Add"
        okButtonProps={{ loading: isPending }}
        onOk={form.submit}
        cancelText="Cancel">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item required rules={[{ required: true }]} name="name" label="Name">
            <Input placeholder="Enter company name" />
          </Form.Item>
          <Form.Item required rules={[{ required: true }]} name="countryCode" label="Country">
            <CountryInput />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
        <Button
          type="link"
          icon={<PluseSVG color="#1890ff" />}
          onClick={() => setIsAddNewCompanyModalOpen(true)}>
          New airline company
        </Button>
      </div>
    </>
  );
};

export default AddNewAirlineCompany;
