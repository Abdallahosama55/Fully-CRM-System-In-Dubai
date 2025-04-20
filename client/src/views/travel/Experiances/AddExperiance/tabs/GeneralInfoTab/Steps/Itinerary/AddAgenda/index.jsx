import { useEffect, useMemo } from "react";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { BackArrow, PlusSVG, SaveSVG } from "assets/jsx-svg";
import LocationInput from "components/common/LocationInput";
import useUpdateAgendaItem from "services/travel/experiance/ExperianceAgenda/Mutations/useUpdateAgendaItem";
import useAddAgendaItem from "services/travel/experiance/ExperianceAgenda/Mutations/useAddAgendaItem";
import useGetAgendasById from "services/travel/experiance/ExperianceAgenda/Querys/useGetAgendasById";

// style
import "./styles.css";
import TextEditor from "components/common/TextEditor";
import useGetExperianceGeneralInfo from "services/travel/experiance/ExperianceTab/Querys/useGetExperianceGeneralInfo";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";

const AddAgeda = ({ productId, editId, back, endEdit }) => {
  const [form] = useForm();
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

  const getAgendasQuery = useGetAgendasById(editId, {
    enabled: !!editId,
  });

  useEffect(() => {
    const data = getAgendasQuery.data;
    if (data) {
      form.setFieldsValue({
        ...data,
        flags: data?.flags ? data.flags : [],
        address: {
          location: data.address,
          lat: data.lat,
          lng: data.lng,
        },
      });
    }
  }, [getAgendasQuery.data, form]);

  useEffect(() => {
    if (getAgendasQuery.isError) {
      message.error(getAgendasQuery.error.message);
    }
  }, [getAgendasQuery.error, getAgendasQuery.isError]);

  // for edit request
  const { updateAgendaItem, isPending: isUpdateAgendaItemPending } = useUpdateAgendaItem({
    onSuccess: () => {
      form.resetFields();
      back();
      endEdit();
    },
    onError: (error) => message.error(error.message),
  });

  // for add request
  const { addAgendaItem, isPending: isAddAgendaItemPending } = useAddAgendaItem({
    onSuccess: () => {
      form.resetFields();
      back();
      endEdit();
    },
    onError: (error) => message.error(error.message),
  });

  const handelFinish = () => {
    if (isAddAgendaItemPending || isUpdateAgendaItemPending) {
      return;
    }
    form.validateFields().then((values) => {
      if (editId) {
        console.log("values", {
          editId,
          agenda: {
            ...values,
            lat: values?.address?.lat,
            lng: values?.address?.lng,
            address: values?.address?.location,
          },
        });
        updateAgendaItem({
          editId,
          agenda: {
            ...values,
            lat: values?.address?.lat,
            lng: values?.address?.lng,
            address: values?.address?.location,
            excerpt: values?.excerpt ? values.excerpt : undefined,
          },
        });
      } else {
        addAgendaItem({
          id: productId,
          agenda: {
            ...values,
            lat: values?.address?.lat,
            lng: values?.address?.lng,
            address: values?.address?.location,
            excerpt: values?.excerpt ? values.excerpt : undefined,
          },
        });
      }
    });
  };

  return (
    <Form form={form} layout="vertical">
      <Row gutter={[12, 12]}>
        <Col md={24} xs={24}>
          <Form.Item
            label={"Title"}
            name="title"
            rules={[{ required: true, message: "Please Enter Title" }]}>
            <Input placeholder="Add Title" />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={"Address"} name="address" initialValue={defulatLocation}>
            <LocationInput withMapView draggableMarker />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={"Description"} name="description">
            <TextEditor placeholder={"Description"} minHeight={170} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            name={"excerpt"}
            label={
              <span className="gc" defaultValue={""}>
                Excerpt (Optional)
              </span>
            }>
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item name={"flags"} label={<span className="gc">Flags (Optional)</span>}>
            <Select mode="tags" open={false} />
          </Form.Item>
        </Col>
      </Row>
      <div className="space-between" style={{ marginTop: "1rem" }}>
        <Button
          icon={<BackArrow color="#000" />}
          onClick={() => {
            back();
            form.resetFields();
          }}>
          Back
        </Button>
        <Button
          type="primary"
          icon={editId ? <SaveSVG color={"currentColor"} /> : <PlusSVG color={"currentColor"} />}
          onClick={handelFinish}
          loading={isAddAgendaItemPending || isUpdateAgendaItemPending}>
          {editId ? "Edit Item" : "Create Item"}
        </Button>
      </div>
    </Form>
  );
};

export default AddAgeda;
