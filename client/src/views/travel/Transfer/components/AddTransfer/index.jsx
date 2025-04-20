import React, { useEffect } from "react";
import { Button, Col, Form, InputNumber, message, Row, Select, Typography, Flex, Spin } from "antd";
import {
  useAddAirportHotelTransfer,
  useEditAirportHotelTransfer,
  useGetOneOfAirportHotelTransfer,
} from "services/travel/dashboard";
import AirportsAccommodationInput from "components/common/AirportsAccommodationInput";
import TextEditor from "components/common/TextEditor";
import { ArrowDownSVG } from "assets/jsx-svg";
import useGetInfiniteVehicleList from "services/travel/transfer/Queries/useGetInfiniteVehicleList";
import { useWatch } from "antd/es/form/Form";

const AddTransfer = ({ DrawerAPI, id, isEdite, onUpdate, SearchAirportHotelTransfer }) => {
  const [form] = Form.useForm();
  const transferMode = useWatch("transferMode", form);
  const infiniteVehicleList = useGetInfiniteVehicleList();
  const getOne = useGetOneOfAirportHotelTransfer(id, { enabled: !!id });
  useEffect(() => {
    if (isEdite && getOne.isSuccess) {
      const { data } = getOne;
      const value = {
        ...data,
        dropOffLocation: {
          ...data.dropOffLocation,
          type: data.dropOffPoint,
        },
        pickupLocation: {
          ...data.pickupLocation,
          type: data.pickupPoint,
        },
      };

      form.setFieldsValue(value);
    }
  }, [getOne?.isSuccess, getOne?.data, isEdite]);

  const add = useAddAirportHotelTransfer({
    onSuccess: () => {
      onUpdate();
      message.success("Transfer Added successfully");
      DrawerAPI.close();
    },
    onError: (error) => {
      console.log(error);
      message.error("Something went wrong");
    },
  });

  const edite = useEditAirportHotelTransfer({
    onSuccess: () => {
      SearchAirportHotelTransfer.mutate(SearchAirportHotelTransfer.variables);
      message.success("Transfer updated successfully");
      DrawerAPI.close();
    },
    onError: (error) => {
      console.log(error);
      message.error("Something went wrong");
    },
  });

  const onFinish = (value) => {
    if (isEdite) {
      const data = {
        ...value,
        id: id,
        dropOffLocation: value.dropOffLocation && value.dropOffLocation.id,
        pickupLocation: value.pickupLocation && value.pickupLocation.id,
        pickupPoint: value.pickupLocation && value.pickupLocation.type,
        dropOffPoint: value.dropOffLocation && value.dropOffLocation.type,
        price: 50, //we will delete this key
      };

      edite.mutate(data);
    } else {
      const data = {
        ...value,
        dropOffLocations:
          Array.isArray(value.dropOffLocations) &&
          value.dropOffLocations.map((item) => ({
            dropOffPoint: item?.type,
            dropOffLocationId: item?.id,
          })),
        pickupLocations:
          Array.isArray(value.pickupLocations) &&
          value.pickupLocations.map((item) => ({
            pickupPoint: item?.type,
            pickupLocationId: item?.id,
          })),

        price: 50, //we will delete this key
      };

      add.mutate(data);
    }
  };

  useEffect(() => {
    if (!isEdite) {
      form.setFieldsValue({
        pickupPoint: "ALL",
        dropOffPoint: "ALL",
      });
    }
  }, [form, isEdite]);

  if (getOne?.isLoading || getOne?.isFetching) {
    return (
      <Flex style={{ height: "100%", width: "100%" }} align="center" justify="center">
        <Spin />
      </Flex>
    );
  }

  return (
    <>
      <Typography.Title level={3}> {isEdite ? "Edite" : "Add"} Transfer</Typography.Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              label="Pickup Locations"
              name={isEdite ? "pickupLocation" : "pickupLocations"}>
              <AirportsAccommodationInput allowClear mode={isEdite ? undefined : "multiple"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              label="DropOff Locations"
              name={isEdite ? "dropOffLocation" : "dropOffLocations"}>
              <AirportsAccommodationInput allowClear mode={isEdite ? undefined : "multiple"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              label="Vehicle"
              name={isEdite ? "vehicleId" : "vehicleIds"}>
              <Select
                mode={!isEdite && "multiple"}
                showSearch
                filterOption={(value, option) =>
                  option.label.toLowerCase().indexOf(value.toLowerCase()) >= 0
                }
                allowClear
                disabled={infiniteVehicleList.isLoading}
                placeholder="Select vehicle"
                suffixIcon={<ArrowDownSVG />}
                options={infiniteVehicleList?.data?.pages
                  ?.map((el) => el?.rows)
                  ?.flat()
                  ?.map((item) => ({
                    label: `${item?.vehicleBrand?.name} - ${item?.vehicleModel?.name}`,
                    value: item.id,
                  }))}
                onPopupScroll={(e) => {
                  const { scrollTop, scrollHeight, clientHeight } = e.target;
                  if (
                    scrollHeight - scrollTop <= clientHeight &&
                    infiniteVehicleList.hasNextPage &&
                    !infiniteVehicleList.isLoading &&
                    !infiniteVehicleList.isFetching
                  ) {
                    infiniteVehicleList?.fetchNextPage();
                  }
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              label="Transfer Mode"
              name="transferMode">
              <Select
                placeholder="Select Transfer Mode"
                options={[
                  { label: "All", value: "ALL" },
                  { label: "group", value: "GROUP" },
                  { label: "private", value: "PRIVATE" },
                ]}
              />
            </Form.Item>
          </Col>
          {/* price space */}
          {(transferMode === "ALL" || transferMode === "GROUP") && (
            <Col span={transferMode === "ALL" ? 12 : 24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Price can't be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
                label="Price for group mode"
                name={["transferPrice", "GROUP"]}>
                <InputNumber prefix={"$"} className="w-100" />
              </Form.Item>
            </Col>
          )}
          {(transferMode === "ALL" || transferMode === "PRIVATE") && (
            <Col span={transferMode === "ALL" ? 12 : 24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Price can't be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
                label="Price for private mode"
                name={["transferPrice", "PRIVATE"]}>
                <InputNumber prefix={"$"} className="w-100" />
              </Form.Item>
            </Col>
          )}

          {/* price space */}
          <Col span={24}>
            <Form.Item validateTrigger={["onBlur"]} label="Meeting Point" name="meetingPoint">
              <TextEditor minHeight={"220px"} />
            </Form.Item>
          </Col>
        </Row>

        <Flex align="end" justify="end" gap={6}>
          <Button type="primary" htmlType="submit" loading={add.isPending || edite.isPending}>
            Save
          </Button>
          <Button onClick={DrawerAPI.close}>Cancle</Button>
        </Flex>
      </Form>
    </>
  );
};

export default AddTransfer;
