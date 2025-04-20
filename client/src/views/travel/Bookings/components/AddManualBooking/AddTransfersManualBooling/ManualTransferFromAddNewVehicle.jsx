import { AntDesignOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import { ArrowDownSVG, PluseSVG } from "assets/jsx-svg";
import AirportsAccommodationInput from "components/common/AirportsAccommodationInput";
import TextEditor from "components/common/TextEditor";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import useGetVehicleBrandModels from "services/travel/transfer/Queries/useGetVehicleBrandModels";
import useGetVehicleBrands from "services/travel/transfer/Queries/useGetVehicleBrands";
import useGetVehicleType from "services/travel/transfer/Queries/useGetVehicleType";
import TransferModal from "views/travel/BookTransfer/components/Modal";

const ManualTransferFromAddNewVehicle = ({ form }) => {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [searchModal, setSearchModal] = useState("");

  const debounceSearchModel = useDebounce(searchModal, 300);

  const agentId = useWatch("agentId", form);
  const type = useWatch("type", form);
  const barand = useWatch(["vehicle", "vehicleBrandId"], form);

  const depounceName = useDebounce(searchCustomerName);
  const { data: customers } = useGetCustomers(
    { page: 1, limit: 10, body: { fullName: depounceName } },
    {
      select: (data) => {
        return data?.data?.data?.data;
      },
    },
  );

  // queries
  const vehicleTypes = useGetVehicleType();
  const vehicleBrands = useGetVehicleBrands();
  const vehicleBrandModels = useGetVehicleBrandModels(
    {
      brandId: barand,
      model: debounceSearchModel,
    },
    { enabled: !!barand },
  );

  useEffect(() => {
    form.setFieldValue("supplierId", undefined);
  }, [form, agentId]);

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

        <Col span={type === "TWO_WAY" ? 12 : 24}>
          <Form.Item
            name="departureDateTime"
            label="Departure Date & Time"
            rules={[{ required: true }]}>
            <DatePicker showTime className="w-100" />
          </Form.Item>
        </Col>
        {type === "TWO_WAY" && (
          <Col span={12}>
            <Form.Item
              name="returnDateTime"
              label="Return Date & Time"
              rules={[{ required: true }]}>
              <DatePicker showTime className="w-100" />
            </Form.Item>
          </Col>
        )}
        <Col span={24} style={{ marginBottom: "25px" }}>
          <Typography.Title level={4}> New vehicle details</Typography.Title>
          <Divider />
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                label="Vehicle Brand"
                name={["vehicle", "vehicleBrandId"]}
                rules={[{ required: true }]}>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase()?.includes(input?.toLowerCase())
                  }
                  placeholder={"Select vehicle brand"}
                  options={vehicleBrands?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  suffixIcon={<ArrowDownSVG />}
                  disabled={vehicleBrands.isLoading}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Vehicle type"
                name={["vehicle", "vehicleTypeId"]}
                rules={[{ required: true }]}>
                <Select
                  placeholder={"Select vehicle type"}
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase()?.includes(input?.toLowerCase())
                  }
                  options={vehicleTypes.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  suffixIcon={<ArrowDownSVG />}
                  disabled={vehicleTypes.isLoading}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Vehicle Model"
                name={["vehicle", "vehicleModelId"]}
                rules={[{ required: true }]}>
                <Select
                  showSearch
                  onSearch={setSearchModal}
                  placeholder={"Select vehicle Model"}
                  options={vehicleBrandModels?.data?.pages
                    ?.flat()
                    ?.map((item) => ({ label: item.model, value: item.id }))}
                  suffixIcon={<ArrowDownSVG />}
                  filterOption={false}
                  notFoundContent={null}
                  onPopupScroll={(e) => {
                    const { scrollTop, scrollHeight, clientHeight } = e.target;
                    if (
                      scrollHeight - scrollTop <= clientHeight &&
                      !vehicleBrandModels.isLoading &&
                      !vehicleBrandModels.isFetching
                    ) {
                      vehicleBrandModels?.fetchNextPage();
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Vehicle License Plate"
                name={["vehicle", "licensePlate"]}
                rules={[{ required: true }]}>
                <Input placeholder="License plate" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Max passengers"
                name={["vehicle", "maxPax"]}
                rules={[{ required: true }]}>
                <InputNumber className="w-100" placeholder="Max passengers" />
              </Form.Item>
            </Col>
          </Row>
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

export default ManualTransferFromAddNewVehicle;
