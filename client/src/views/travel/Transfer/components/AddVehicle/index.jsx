import React, { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
// components
import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import UploadInput from "components/common/UploadInput";
import TextEditor from "components/common/TextEditor";
import LocationInput from "components/common/LocationInput";
// assets
import default_car_image from "assets/images/default_car_image.jpg";
import { ArrowDownSVG } from "assets/jsx-svg";
// services
import { API_BASE } from "services/config";
import useGetVehicleType from "services/travel/transfer/Queries/useGetVehicleType";
import useGetVehicleBrands from "services/travel/transfer/Queries/useGetVehicleBrands";
import useGetVehicleBrandModels from "services/travel/transfer/Queries/useGetVehicleBrandModels";
import useAddVehicle from "services/travel/transfer/Mutations/useAddVehicle";
import useEditVehicle from "services/travel/transfer/Mutations/useEditVehicle";
import useGetVehicleById from "services/travel/transfer/Queries/useGetVehicleById";
import { queryClient } from "services/queryClient";
import { useDebounce } from "hooks/useDebounce";

const AddVehicle = ({ id, onEnd, DrawerAPI }) => {
  const [searchModal, setSearchModal] = useState("");
  const debounceSearchModel = useDebounce(searchModal, 300);
  const parentContainerRef = useRef(null); // Ref for the parent container

  useEffect(() => {
    DrawerAPI?.setRootClassName("gray_bg_drawer");
  }, []);

  const [form] = useForm();
  const image = useWatch("image", form);
  const brand = useWatch("vehicleBrandId", form);

  // queries
  const vehicleTypes = useGetVehicleType();
  const vehicleBrands = useGetVehicleBrands();
  const vehicleBrandModels = useGetVehicleBrandModels(
    {
      brandId: brand,
      model: debounceSearchModel,
    },
    { enabled: !!brand },
  );

  const vehicleById = useGetVehicleById(id, { enabled: !!id });

  useEffect(() => {
    if (vehicleById?.data) {
      form.setFieldsValue({
        ...vehicleById.data,
        image: {
          link: vehicleById?.data?.image,
          id: vehicleById?.data?.image,
          name: vehicleById?.data?.image,
        },
        address: {
          location: vehicleById?.data?.location || vehicleById?.data?.country,
          lat: vehicleById?.data?.lat,
          lng: vehicleById?.data?.lng,
          country: vehicleById?.data?.country,
        },
      });

      queryClient.setQueryData(vehicleBrandModels.key, (oldData) => {
        return [
          vehicleById?.data?.vehicleModel || [
            { id: vehicleById?.data?.vehicleModelId, model: vehicleById?.data?.vehicleModelId },
          ],
          ...(oldData && oldData.length > 0 ? [...oldData] : []),
        ];
      });
    }
  }, [vehicleById?.data]);

  // mutations
  const addVehicleMutation = useAddVehicle({
    onSuccess: () => {
      DrawerAPI.close();
      message.success("Vehicle added successfully");
      onEnd();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const editVehicleMutation = useEditVehicle(id, {
    onSuccess: () => {
      DrawerAPI.close();
      message.success("Vehicle updated successfully");
      onEnd();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handelFinish = (values) => {
    const temp = {
      ...values,
      ...values?.address,
      image: values?.image?.link,
      address: undefined,
    };

    if (id) {
      editVehicleMutation.mutate(temp);
    } else {
      addVehicleMutation.mutate(temp);
    }
  };

  return (
    <div className="gray_bg_drawer_body" ref={parentContainerRef}>
      <Form
        layout="vertical"
        onFinish={handelFinish}
        form={form}
        onFinishFailed={({ errorFields }) => {
          if (errorFields.length > 0) {
            const errorField = errorFields[0];
            const fieldNode = document.querySelector(`[name="${errorField.name[0]}"]`);
            if (fieldNode && parentContainerRef.current) {
              parentContainerRef.current.scrollTo({
                top: fieldNode.offsetTop - 20, // Adjust the offset as needed
                behavior: "smooth",
              });
            }
          }
        }}>
        <Typography.Title
          level={4}
          className="lg_text_semibold"
          style={{ color: "var(--vbooking-b700)" }}>
          {id ? "Edit" : "Add New"} Vehicle
        </Typography.Title>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name={"image"} rules={[{ required: true, message: "upload car image" }]}>
              <UploadInput
                action={API_BASE + `common/upload-file`}
                name="image"
                withImagePreview={false}
                formatsText={"png, jpg, jpeg"}
                uploadText={"Vehicle image"}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Image
              width={"100px"}
              height={"100px"}
              style={{ borderRadius: "12px", objectFit: "cover" }}
              src={image?.link || default_car_image}
              alt={"car_image"}
            />
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={0}
              name={"initialPrice"}
              label="Initial price"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Initial price is required");
                    }

                    if (value < 0) {
                      return Promise.reject("The minimum value is 0");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input prefix="$" placeholder={"Initial price"} type="number" min={0} step="0.01" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={0}
              name={"distanePricePerKilo"}
              label="Price per kilo"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Price is required");
                    }

                    if (value < 0) {
                      return Promise.reject("The minimum value is 0");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input prefix="$" placeholder={"price per kilo"} type="number" min={0} step="0.01" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={0}
              name={"maxPax"}
              label="Max passengers"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Max passengers is required");
                    }

                    if (value < 0) {
                      return Promise.reject("passengers minimum value is 0");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input placeholder={"max passengers"} type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={0}
              name={"maxBags"}
              label="Max Bags"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Max bags is required");
                    }

                    if (value < 0) {
                      return Promise.reject("bags minimum value is 0");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input placeholder={"max bags"} type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"vehicleTypeId"}
              label="Vehicle type"
              rules={[{ required: true, message: "Select vehicle type" }]}>
              <Select
                placeholder={"Select vehicle type"}
                filterOption={(input, option) =>
                  option?.label?.toLowerCase()?.includes(input?.toLowerCase())
                }
                options={vehicleTypes.data?.map((item) => ({ label: item.name, value: item.id }))}
                suffixIcon={<ArrowDownSVG />}
                disabled={vehicleTypes.isLoading}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"vehicleBrandId"}
              label="Vehicle Brand"
              rules={[{ required: true, message: "Select vehicle brand" }]}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  option?.label?.toLowerCase()?.includes(input?.toLowerCase())
                }
                placeholder={"Select vehicle type"}
                options={vehicleBrands?.data?.map((item) => ({ label: item.name, value: item.id }))}
                suffixIcon={<ArrowDownSVG />}
                disabled={vehicleBrands.isLoading}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"vehicleModelId"}
              label="Vehicle Model"
              rules={[{ required: true, message: "Select vehicle model" }]}>
              <Select
                showSearch
                onSearch={setSearchModal}
                placeholder={"Select vehicle type"}
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
          <Col span={12}>
            <Form.Item
              name={"address"}
              label="Vehicle address"
              rules={[{ required: true, message: "Enter vehicle address" }]}>
              <LocationInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"licensePlate"}
              label="Vehicle License Plate"
              rules={[{ required: true, message: "Enter license Plate" }]}>
              <Input placeholder="License plate" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"classification"}
              label="Vehicle classification"
              rules={[{ required: true, message: "Select Vehicle classification" }]}>
              <Select
                options={[
                  { label: "Rental", value: "RENTAL" },
                  { label: "Transfer", value: "TRANSFER" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={"description"}
              label={"Description"}
              validateTrigger={"submit"}
              rules={[{ required: true, message: "Enter vehicle description" }]}>
              <TextEditor minHeight={"180px"} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ padding: "16px 0 0 0", borderTop: "1px solid #f0f0f0" }}>
        <Row align={"middle"} justify={"end"}>
          <Col>
            <Space>
              <Button>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={form.submit}
                loading={addVehicleMutation.isPending || editVehicleMutation.isPending}>
                Save
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddVehicle;
