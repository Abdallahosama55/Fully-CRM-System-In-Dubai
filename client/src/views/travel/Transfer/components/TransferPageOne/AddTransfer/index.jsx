import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputNumber,
  message,
  Row,
  Select,
  Typography,
  Input,
  Empty,
  Space,
  Spin,
} from "antd";
import {
  useAddAirportHotelTransfer,
  useAirportsAccommodationList,
  useEditAirportHotelTransfer,
  useGetListVehicle,
  useGetOneOfAirportHotelTransfer,
} from "services/travel/dashboard";
import { useDebounce } from "hooks/useDebounce";

const AddTransfer = ({ DrawerAPI, id, isEdite, SearchAirportHotelTransfer }) => {
  const [form] = Form.useForm();
  const [pickupPointName, setPickupPointName] = useState("");
  const [dropOffPointName, setDropOffPointName] = useState("");

  const pickupPoint = Form.useWatch("pickupPoint", form);
  const dropOffPoint = Form.useWatch("dropOffPoint", form);

  const debouncePickupPoint = useDebounce(pickupPointName, 1000);
  const debounceDropOffPoint = useDebounce(dropOffPointName, 1000);

  const airportsAccommodationListPickupPoint = useAirportsAccommodationList(
    {
      page: 1,
      size: 5000,
      type: pickupPoint !== "ALL" ? pickupPoint : undefined,
      name: debouncePickupPoint,
    },
    {
      enabled: !!pickupPoint,
    },
  );
  const airportsAccommodationListDropOffPoint = useAirportsAccommodationList(
    {
      page: 1,
      size: 5000,
      type: dropOffPoint !== "ALL" ? dropOffPoint : undefined,
      name: debounceDropOffPoint,
    },
    {
      enabled: !!dropOffPoint,
    },
  );

  const vehicleList = useGetListVehicle();
  const getOneVehicle = useGetOneOfAirportHotelTransfer(id, { enabled: !!id });

  const isFetching = airportsAccommodationListPickupPoint.isSuccess && getOneVehicle.isSuccess;

  const add = useAddAirportHotelTransfer({
    onSuccess: () => {
      DrawerAPI.close();
      message.success("Vehicle Added successfully");
      DrawerAPI.handleSetDestroyOnClose(true);
      DrawerAPI.close();
    },
    onError: (error) => {
      console.log(error);
      message.error("SomeThing went wrong");
    },
  });
  const edite = useEditAirportHotelTransfer({
    onSuccess: () => {
      DrawerAPI.handleSetDestroyOnClose(true);
      DrawerAPI.close();
      message.success("Vehicle updated successfully");
    },
    onError: (error) => {
      console.log(error);
      message.error("SomeThing went wrong");
    },
  });

  const onFinish = (value) => {
    if (isEdite) {
      const data = {
        ...value,
        id: id,
        dropOffLocation: value.dropOffLocation && JSON.parse(value.dropOffLocation).id,
        pickupLocation: value.pickupLocation && JSON.parse(value.pickupLocation).id,
        pickupPoint: value.pickupLocation && JSON.parse(value.pickupLocation).type,
        dropOffPoint: value.dropOffLocation && JSON.parse(value.dropOffLocation).type,
      };

      edite.mutate(data);
      SearchAirportHotelTransfer.mutate(SearchAirportHotelTransfer.variables);
    } else {
      const data = {
        ...value,
        pickupLocations: value.pickupLocations.map((item) => ({
          pickupPoint: JSON.parse(item).type,
          pickupLocationId: JSON.parse(item).id,
        })),
        dropOffLocations: value.dropOffLocations.map((item) => ({
          dropOffPoint: JSON.parse(item).type,
          dropOffLocationId: JSON.parse(item).id,
        })),
      };

      add.mutate(data);
    }
  };

  useEffect(() => {
    if (isFetching) {
      const { data } = getOneVehicle;

      delete data.pickupPoint;
      delete data.dropOffPoint;

      const value = {
        ...data,

        pickupLocation:
          airportsAccommodationListPickupPoint?.data?.rows &&
          JSON.stringify(
            airportsAccommodationListPickupPoint?.data?.rows.find(
              (item) => item.id === data.pickupLocation,
            ),
          ),
        dropOffLocation:
          (airportsAccommodationListDropOffPoint?.data?.rows &&
            JSON.stringify(
              airportsAccommodationListDropOffPoint?.data?.rows.find(
                (item) => item.id === data.dropOffLocation,
              ),
            )) ||
          (airportsAccommodationListPickupPoint?.data?.rows &&
            JSON.stringify(
              airportsAccommodationListPickupPoint?.data?.rows.find(
                (item) => item.id === data.dropOffLocation,
              ),
            )),
      };

      form.setFieldsValue(value);
    } else {
      form.setFieldsValue({
        pickupPoint: getOneVehicle?.data?.pickupPoint === "AIRPORT" ? "AIRPORT" : "ACCOMODATION",
        dropOffPoint: getOneVehicle?.data?.dropOffPoint === "AIRPORT" ? "AIRPORT" : "ACCOMODATION",
      });
    }
  }, [form, isEdite, isFetching]);

  useEffect(() => {
    if (!isEdite) {
      form.setFieldsValue({
        pickupPoint: "ALL",
        dropOffPoint: "ALL",
        price: undefined,
        meetingPoint: undefined,
      });
    }
  }, [form, isEdite]);

  const hanleClose = () => {
    DrawerAPI.handleSetDestroyOnClose(true);
    DrawerAPI.close();
  };

  return (
    <>
      <Typography.Title level={3}> {isEdite ? "Edite" : "Add"} Transfer</Typography.Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              label="pickup Point"
              name="pickupPoint">
              <Select
                allowClear
                placeholder="Please select"
                options={[
                  { label: "All", value: "ALL" },
                  { label: "Airport", value: "AIRPORT" },
                  { label: "Accomodation", value: "ACCOMODATION" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              label="pickup Locations"
              name={isEdite ? "pickupLocation" : "pickupLocations"}>
              <Select
                allowClear
                mode={!isEdite && "multiple"}
                showSearch
                loading={airportsAccommodationListPickupPoint.isPending}
                notFoundContent={
                  airportsAccommodationListDropOffPoint.isPending ? (
                    <Space style={{ display: "flex", justifyContent: "center" }}>
                      <Spin size="small" />
                    </Space>
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )
                }
                onSearch={(value) => {
                  setPickupPointName(value);
                }}
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                options={airportsAccommodationListPickupPoint?.data?.rows?.map((item) => ({
                  label: item.name,
                  value: JSON.stringify(item),
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              label="dropOff Point"
              name="dropOffPoint">
              <Select
                allowClear
                placeholder="Please select"
                options={[
                  { label: "All", value: "ALL" },
                  { label: "Airport", value: "AIRPORT" },
                  { label: "Accomodation", value: "ACCOMODATION" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              label="dropOff Locations"
              name={isEdite ? "dropOffLocation" : "dropOffLocations"}>
              <Select
                mode={!isEdite && "multiple"}
                allowClear
                showSearch
                loading={airportsAccommodationListPickupPoint.isPending}
                notFoundContent={
                  airportsAccommodationListPickupPoint.isPending ? (
                    <Space style={{ display: "flex", justifyContent: "center" }}>
                      <Spin size="small" />
                    </Space>
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )
                }
                onSearch={(value) => {
                  setDropOffPointName(value);
                }}
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                options={airportsAccommodationListDropOffPoint?.data?.rows?.map((item) => ({
                  label: item.name,
                  value: JSON.stringify(item),
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
          label="vehicle"
          name={isEdite ? "vehicleId" : "vehicleIds"}>
          <Select
            mode={!isEdite && "multiple"}
            allowClear
            disabled={vehicleList.isPending}
            showSearch
            placeholder="Please select"
            options={vehicleList?.data?.rows?.map((item) => ({
              label: item.vehicleBrand.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
          label="price"
          name="price">
          <InputNumber prefix={"$"} className="w-100" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
          label="meeting Point"
          name="meetingPoint">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Row gutter={16} justify={"end"}>
            <Col>
              <Button type="primary" htmlType="submit" loading={add.isPending || edite.isPending}>
                Save
              </Button>
            </Col>
            <Col>
              <Button onClick={hanleClose}>Cancle</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddTransfer;
