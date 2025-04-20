import { ArrowRightOutlined, SwapOutlined } from "@ant-design/icons";
import { Col, Form, message, Modal, Radio, Row, Select, Tabs } from "antd";
import { useWatch } from "antd/es/form/Form";
import { ArrowDownSVG } from "assets/jsx-svg";
import React, { useEffect } from "react";
import useManualBookingListAgents from "services/travel/booking/ManualBooking/Queries/useManualBookingListAgents";
import useManualBookingListSuppliers from "services/travel/booking/ManualBooking/Queries/useManualBookingListSuppliers";
import ManualTransferFrom from "./ManualTransferFrom";
import ManualTransferFromAddNewVehicle from "./ManualTransferFromAddNewVehicle";
import useManualBookingBookTransfer from "services/travel/booking/ManualBooking/Accommodation/Mutations/useManualBookingBookTransfer";

const AddTransfersManualBooling = ({ isOpen, close, refetch }) => {
  const [form] = Form.useForm();

  const items = [
    {
      key: "1",
      label: "With New Vehicle",
      children: <ManualTransferFromAddNewVehicle form={form} />,
    },
    {
      key: "2",
      label: "Exist Vehicle",
      children: <ManualTransferFrom form={form} />,
    },
  ];

  const agentId = useWatch("agentId", form);

  const agentsList = useManualBookingListAgents();
  const suppliersList = useManualBookingListSuppliers({ agentId }, { enabled: !!agentId });

  const bookTransfer = useManualBookingBookTransfer({
    onSuccess: () => {
      message.success("Booking added successfully");
      refetch();
      close();
    },
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });

  useEffect(() => {
    form.setFieldValue("supplierId", undefined);
  }, [form, agentId]);

  const handelFinish = (values) => {
    if (values.transferId) {
      delete values.from;
      delete values.to;
    } else {
      values.pickupPoint = values.from.type;
      values.pickupLocation = values.from.id;
      values.dropOffPoint = values.to.type;
      values.dropOffLocation = values.to.id;

      delete values.from;
      delete values.to;
    }

    const data = {
      ...values,
      holderAccountId: values.holderEmail ? undefined : values.clientAccountId,
      bookingDate: values.bookingDate.format("YYYY-MM-DD HH:mm:ss.SSSZ"),
      departureDateTime: values.departureDateTime.format("YYYY-MM-DD HH:mm:ss.SSSZ"),
      returnDateTime: values.returnDateTime?.format("YYYY-MM-DD HH:mm:ss.SSSZ"),
    };
    bookTransfer.mutate(data);
  };

  return (
    <Modal
      title={"Add Transfer Manual Booking"}
      open={isOpen}
      onOk={form.submit}
      okButtonProps={{ loading: bookTransfer?.isPending }}
      onCancel={close}
      okText={"Add"}
      width={"800px"}
      centered>
      <Form
        onFinish={handelFinish}
        form={form}
        layout="vertical"
        style={{
          maxHeight: "calc(100dvh - 150px)",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 8px 0 6px",
        }}>
        <Form.Item name={"type"} initialValue={"ONE_WAY"}>
          <Radio.Group>
            <Radio value={"ONE_WAY"}>
              <ArrowRightOutlined /> One Way
            </Radio>
            <Radio value={"TWO_WAY"}>
              <SwapOutlined /> Round Trip
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item name={"agentId"} label="Agent" rules={[{ required: true }]}>
              <Select
                placeholder="Select Agent"
                suffixIcon={<ArrowDownSVG />}
                options={agentsList?.data?.map((el) => ({ label: el?.fullName, value: el?.id }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"supplierId"} label="Flight Supplier" rules={[{ required: true }]}>
              <Select
                placeholder="Select Supplier"
                suffixIcon={<ArrowDownSVG />}
                disabled={suppliersList?.data?.length === 0 || !agentId}
                options={suppliersList?.data?.map((el) => ({
                  label: el?.fullName,
                  value: el?.id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} />
      </Form>
    </Modal>
  );
};

export default AddTransfersManualBooling;
