import { useEffect, useMemo } from "react";
import { Button, Col, Flex, Form, Input, Row, Skeleton, message } from "antd";
import useAddPickUpMeetingPoint from "services/travel/experiance/PickUpTab/Mutations/useAddPickUpMeetingPoint";
import useUpdatePickUpMeetingPoint from "services/travel/experiance/PickUpTab/Mutations/useUpdatePickUpMeetingPoint";
import useGetPickUpMeetingPointById from "services/travel/experiance/PickUpTab/Querys/useGetPickUpMeetingPointById";
import LocationInput from "components/common/LocationInput";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
import useGetExperianceGeneralInfo from "services/travel/experiance/ExperianceTab/Querys/useGetExperianceGeneralInfo";

const AddOrEditMeetingPoints = ({ editId, back, productId }) => {
  const [form] = Form.useForm();
  const getPickUpMeetingPointByIdQuery = useGetPickUpMeetingPointById(editId, {
    enabled: !!editId,
  });
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
      form.setFieldValue("title", `${defulatLocation?.location} Meeting Point`);
    }
  }, [defulatLocation]);

  useEffect(() => {
    const data = getPickUpMeetingPointByIdQuery.data;
    if (getPickUpMeetingPointByIdQuery.isSuccess && data) {
      form.setFieldsValue({
        ...data,
        address: {
          location: data?.address,
          lat: data?.lat,
          lng: data?.lng,
        },
      });
    }
  }, [form, getPickUpMeetingPointByIdQuery.data, getPickUpMeetingPointByIdQuery.isSuccess]);

  useEffect(() => {
    if (getPickUpMeetingPointByIdQuery.isError) {
      message.error(getPickUpMeetingPointByIdQuery.error.message);
    }
  }, [getPickUpMeetingPointByIdQuery.error, getPickUpMeetingPointByIdQuery.isError]);

  const { updatePickUpMeetingPoint, isPending: isUpdatePickUpMeetingPointPending } =
    useUpdatePickUpMeetingPoint({
      onSuccess: () => {
        back();
        form?.resetFields();
      },
      onError: (error) => {
        message.error(error.message);
      },
    });

  const { addPickUpMeetingPoint, isPending: isAddPickUpMeetingPointPending } =
    useAddPickUpMeetingPoint(productId, {
      onSuccess: () => {
        back();
        form?.resetFields();
      },
      onError: (error) => {
        message.error(error.message);
      },
    });

  const handelFinish = (values) => {
    if (editId) {
      updatePickUpMeetingPoint({
        ...values,
        id: editId,
        lat: values.address.lat,
        lng: values.address.lng,
        address: values.address.location,
      });
    } else {
      addPickUpMeetingPoint({
        ...values,
        id: productId,
        lat: values.address.lat,
        lng: values.address.lng,
        address: values.address.location,
      });
    }
  };

  if (getPickUpMeetingPointByIdQuery.isLoading) {
    return <Skeleton size="large" />;
  }

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handelFinish} id="form_inside_tab">
        <Row gutter={[12, 12]}>
          <Col lg={24} md={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Add metting point title" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col lg={24} md={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Add metting address" }]}>
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
            type="primary"
            loading={isAddPickUpMeetingPointPending || isUpdatePickUpMeetingPointPending}>
            {editId ? "Edit" : "Add"}
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default AddOrEditMeetingPoints;
