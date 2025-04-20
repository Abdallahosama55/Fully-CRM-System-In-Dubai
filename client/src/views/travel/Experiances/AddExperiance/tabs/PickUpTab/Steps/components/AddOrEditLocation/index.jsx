import { useEffect, useMemo } from "react";
import { Col, Flex, Form, Input, Row, Select, Skeleton, message } from "antd";
import Button from "components/common/Button";
import LocationInput from "components/common/LocationInput";
import useAddLocation from "services/travel/experiance/PickUpTab/Mutations/useAddLocation";
import useUpdateLocation from "services/travel/experiance/PickUpTab/Mutations/useUpdateLocation";
import useGetLocationById from "services/travel/experiance/PickUpTab/Querys/useGetLocationById";
import useGetExperianceGeneralInfo from "services/travel/experiance/ExperianceTab/Querys/useGetExperianceGeneralInfo";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";

const AddOrEditLocation = ({ editId, back, productId, isDropOfLocation }) => {
  const [form] = Form.useForm();

  const getLocationByIdQuery = useGetLocationById(
    { id: editId, isDropOf: isDropOfLocation },
    {
      enabled: !!editId,
    },
  );

  useEffect(() => {
    const data = getLocationByIdQuery.data;
    if (getLocationByIdQuery.isSuccess && data) {
      form.setFieldsValue({
        ...data,
        address: {
          location: data?.address,
          lat: data?.lat,
          lng: data?.lng,
        },
      });
    }
  }, [form, getLocationByIdQuery.data, getLocationByIdQuery.isSuccess]);

  useEffect(() => {
    if (getLocationByIdQuery.isError) {
      message.error(getLocationByIdQuery.error.message);
    }
  }, [getLocationByIdQuery.error, getLocationByIdQuery.isError]);

  const generalInfoQuery = useGetExperianceGeneralInfo(productId, {
    enabled: !queryClient.getQueryData([QUERY_KEY.EXPERIANCE_GENERAL_INFO_BY_ID, productId])?.data
      ?.location?.location,
  });

  const defulatLocation = useMemo(() => {
    if (queryClient?.getQueryData([QUERY_KEY.EXPERIANCE_GENERAL_INFO_BY_ID, productId])) {
      return {
        location: queryClient.getQueryData([QUERY_KEY.EXPERIANCE_GENERAL_INFO_BY_ID, productId])
          ?.location,
        lat: queryClient.getQueryData([QUERY_KEY.EXPERIANCE_GENERAL_INFO_BY_ID, productId])?.lat,
        lng: queryClient.getQueryData([QUERY_KEY.EXPERIANCE_GENERAL_INFO_BY_ID, productId])?.lng,
      };
    }
    return {
      location: generalInfoQuery?.data?.location,
      lat: generalInfoQuery?.data?.lat,
      lng: generalInfoQuery?.data?.lng,
    };
  }, [generalInfoQuery]);

  useEffect(() => {
    if (
      defulatLocation?.location &&
      defulatLocation?.lat &&
      defulatLocation?.lng &&
      !form.getFieldValue("address")
    ) {
      form.setFieldValue("address", defulatLocation);
      form.setFieldValue("title", `${defulatLocation?.location} Pick-Up Service`);
    }
  }, [defulatLocation]);

  const { updateLocation, isPending: isUpdateLocationPending } = useUpdateLocation({
    onSuccess: () => {
      back();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { addLocation, isPending: isAddLocationPending } = useAddLocation(productId, {
    onSuccess: () => {
      back();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handelFinish = (values) => {
    if (editId) {
      updateLocation({
        data: {
          ...values,
          id: editId,
          lat: values.address.lat,
          lng: values.address.lng,
          address: values.address.location,
        },
        isDropOf: isDropOfLocation,
      });
    } else {
      addLocation({
        data: {
          ...values,
          lat: values.address.lat,
          lng: values.address.lng,
          address: values.address.location,
        },
        isDropOf: isDropOfLocation,
      });
    }
  };

  if (getLocationByIdQuery.isLoading) {
    return <Skeleton size="large" />;
  }

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handelFinish} id="form_inside_tab">
        <Row gutter={[12, 12]}>
          <Col lg={12} md={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Add location title" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Select location type" }]}>
              <Select
                options={[
                  { value: "Airpot", label: "Airport" },
                  { value: "Port", label: "Port" },
                  { value: "Station", label: "Station" },
                  { value: "Hotel", label: "Hotel" },
                  { value: "Accommodation", label: "Accommodation" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={24} md={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Add location address" }]}>
              <LocationInput withMapView draggableMarker />
            </Form.Item>
          </Col>
        </Row>
        <Flex align="center" gap={12} justify="start">
          <Button
            type="default"
            htmlType="button"
            onClick={() => {
              form?.resetFields();
              back();
            }}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type={"primary"}
            loading={isAddLocationPending || isUpdateLocationPending}>
            {editId ? "Edit" : "Add"} Location
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default AddOrEditLocation;
