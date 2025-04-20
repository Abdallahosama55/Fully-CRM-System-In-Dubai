import { AntDesignOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import { PluseSVG } from "assets/jsx-svg";
import AirportsAccommodationInput from "components/common/AirportsAccommodationInput";
import TextEditor from "components/common/TextEditor";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import { useSearchEngine } from "services/travel/dashboard";
import TransferModal from "views/travel/BookTransfer/components/Modal";

const ManualTransferFrom = ({ form }) => {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [searchCustomerName, setSearchCustomerName] = useState("");

  const agentId = useWatch("agentId", form);
  const type = useWatch("type", form);
  const from = useWatch("from", form);
  const to = useWatch("to", form);
  const noOfPassengers = useWatch("noOfPassengers", form);

  const depounceName = useDebounce(searchCustomerName);
  const { data: customers } = useGetCustomers(
    { page: 1, limit: 10, body: { fullName: depounceName } },
    {
      select: (data) => {
        return data?.data?.data?.data;
      },
    },
  );

  useEffect(() => {
    form.setFieldValue("supplierId", undefined);
  }, [form, agentId]);

  const searchEngine = useSearchEngine({
    onError: (error) => {
      console.log(error, "error");
      message?.error("Something went wrong");
    },
  });

  useEffect(() => {
    if (from && noOfPassengers && to && type) {
      const data = {
        pickupPoint: from?.type,
        dropOffPoint: to?.type,
        pickupLocation: from?.id,
        dropOffLocation: to?.id,
        pax: noOfPassengers,
        type: type,
      };
      searchEngine.mutate(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, noOfPassengers, to, type]);

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <Form.Item name="from" label="From" rules={[{ required: true }]}>
            <AirportsAccommodationInput />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="to" label="To" rules={[{ required: true }]}>
            <AirportsAccommodationInput />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="noOfPassengers" label="No of Passengers" rules={[{ required: true }]}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>

        <Col span={type === "TWO_WAY" ? 8 : 16}>
          <Form.Item
            name="departureDateTime"
            label="Departure Date & Time"
            rules={[{ required: true }]}>
            <DatePicker showTime className="w-100" />
          </Form.Item>
        </Col>

        {type === "TWO_WAY" && (
          <Col span={8}>
            <Form.Item
              name="returnDateTime"
              label="Return Date & Time"
              rules={[{ required: true }]}>
              <DatePicker showTime className="w-100" />
            </Form.Item>
          </Col>
        )}
        <Col span={8}>
          <Form.Item name="transferId" label="Transfer" rules={[{ required: true }]}>
            <Select
              className="w-100"
              disabled={!searchEngine?.data?.rows}
              options={searchEngine?.data?.rows.map((vehicle) => ({
                value: vehicle.id,
                label: (
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    {!vehicle?.vehicleImage ? (
                      <Avatar size={32} icon={<AntDesignOutlined />} />
                    ) : (
                      <Avatar size={32} src={vehicle?.vehicleImage} />
                    )}
                    <div>
                      {vehicle.vehicleBrand} {vehicle.vehicleModel} {vehicle.vehicleYear}
                    </div>
                  </div>
                ),
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={10}>
          <TransferModal
            isAddClientModalOpen={isAddClientModalOpen}
            setIsAddClientModalOpen={setIsAddClientModalOpen}
            form={form}
          />
          <Form.Item name="holderName" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name="holderEmail" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Client name is required" }]}
            name="clientAccountId"
            label="holder Account">
            <Select
              showSearch
              filterOption={false}
              notFoundContent={null}
              onSearch={(value) => setSearchCustomerName(value)}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  {/* Add New Client Button in Dropdown */}
                  <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
                    <Button
                      type="link"
                      onClick={() => setIsAddClientModalOpen(true)}
                      icon={<PluseSVG color="#1890ff" />}>
                      Add New Client
                    </Button>
                  </div>
                </>
              )}
              placeholder="Select Client"
              options={customers?.map((el) => ({
                label: (
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    {!el?.profileImage ? (
                      <Avatar size={32} icon={<AntDesignOutlined />} />
                    ) : (
                      <Avatar size={32} src={el?.profileImage} />
                    )}
                    <div> {el.fullName}</div>
                  </div>
                ),
                value: el?.accountId,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="bookingDate" label="booking Date" rules={[{ required: true }]}>
            <DatePicker showTime className="w-100" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="meetingDetails" label="Meeting Details">
            <TextEditor minHeight={"120px"} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ManualTransferFrom;
