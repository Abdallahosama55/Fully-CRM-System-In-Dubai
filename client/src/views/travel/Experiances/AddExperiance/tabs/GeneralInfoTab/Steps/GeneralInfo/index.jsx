import { useEffect, useState } from "react";
import { Col, Form, Input, message, Row, Select, Skeleton, Typography } from "antd";
import LocationInput from "components/common/LocationInput";
import { useWatch } from "antd/es/form/Form";

import useGetExperianceGeneralInfo from "services/travel/experiance/ExperianceTab/Querys/useGetExperianceGeneralInfo";
import useGetCategories from "services/travel/experiance/ExperianceTab/Querys/useGetCategories";
import useGetThemes from "services/travel/experiance/ExperianceTab/Querys/useGetThemes";
import useCreateExperiance from "services/travel/experiance/ExperianceTab/Mutations/useCreateExperiance";
// images
import RocketPNG from "assets/images/RocketPNG.png";
import isQuillEmpty from "utils/isQuillEmpty";

// style
import "./styles.css";
import SvgImage from "components/common/SvgImage";
import TextEditor from "components/common/TextEditor";
const GeneralInfo = ({ id, next, setId }) => {
  const [form] = Form.useForm();
  const durationMinutes = useWatch("durationMinutes", form);
  const durationHours = useWatch("durationHours", form);
  const durationDays = useWatch("durationDays", form);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  // Querys
  const themesQuery = useGetThemes();
  const categoriesQuery = useGetCategories();

  const generalInfoQuery = useGetExperianceGeneralInfo(id, {
    onError: (error) => message.error(error.message),
    enabled: Boolean(id),
  });

  // Mutations
  const createExperianceMutation = useCreateExperiance({
    onSuccess: (data) => {
      generalInfoQuery.refetch();
      setId(data?.id ? data?.id : id);
      next();
    },
    onError: (error) => message.error(error.message),
  });

  // For Time input logic
  useEffect(() => {
    if (durationMinutes >= 60) {
      form.setFieldValue("durationHours", Number(form.getFieldValue("durationHours")) + 1);
      form.setFieldValue("durationMinutes", Number(form.getFieldValue("durationMinutes")) - 60);
    }
  }, [durationMinutes]);

  useEffect(() => {
    if (durationHours >= 24) {
      form.setFieldValue("durationDays", Number(form.getFieldValue("durationDays")) + 1);
      form.setFieldValue("durationHours", Number(form.getFieldValue("durationHours")) - 24);
    }
  }, [durationHours]);

  useEffect(() => {
    if (generalInfoQuery.data) {
      form.setFieldsValue({
        ...generalInfoQuery.data,
        location: {
          location: generalInfoQuery.data.location,
          lat: generalInfoQuery.data.lat,
          lng: generalInfoQuery.data.lng,
        },
      });
    }
  }, [form, generalInfoQuery.data]);

  useEffect(() => {
    if (generalInfoQuery.isError) {
      message.error(generalInfoQuery.error.message);
    }
  }, [generalInfoQuery.error, generalInfoQuery.isError]);

  if (generalInfoQuery.isLoading) {
    return <Skeleton active />;
  }
  return (
    <div className="general_info_experaince">
      <Form
        id="form_inside_tab"
        form={form}
        onFinish={(values) => {
          if (!createExperianceMutation.isPending) {
            createExperianceMutation.mutate({
              generalInfo: {
                ...values,
                ...values.location,
              },
              id,
            });
          }
        }}
        layout="vertical">
        <img src={RocketPNG} alt="rocket" />
        <Typography.Title level={3} className="fz-18 title">
          Start Your Experience
        </Typography.Title>
        <Typography.Paragraph className="fz-14 sub_title">
          This is the first step of the process. Fill in the required information in the fields
          below to create your Experience.
        </Typography.Paragraph>
        <Row gutter={[12, 0]}>
          <Col md={12} xs={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Enter experience name" }]}>
              <Input placeholder="Write here" />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true },
                {
                  validator: async (_, value) => {
                    if (!value) {
                      return Promise.reject("Please enter valid location");
                    }

                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger={[]}>
              <LocationInput draggableMarker />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="categories"
              label="Categories"
              rules={[{ required: true, message: "Please select categories" }]}>
              <Select
                disabled={categoriesQuery?.isLoading}
                placeholder="What type of experience this is"
                mode="multiple"
                optionRender={(item) => (
                  <div className="select_item_with_icon">
                    {item?.data?.icon ? <SvgImage svgContent={item?.data?.icon} /> : ""}{" "}
                    {item.label}
                  </div>
                )}
                options={categoriesQuery?.data?.map((el) => {
                  return {
                    label: el?.name,
                    value: el?.id,
                    icon: el?.image ? el?.image : undefined,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="themes"
              label="Themes"
              rules={[{ required: true, message: "Please select themes" }]}>
              <Select
                placeholder="Select the themes that apply for this experience..."
                mode="multiple"
                disabled={themesQuery?.isLoading}
                optionRender={(item) => (
                  <div className="select_item_with_icon">
                    {item?.data?.icon ? <SvgImage svgContent={item?.data?.icon} /> : ""}{" "}
                    {item.label}
                  </div>
                )}
                options={themesQuery?.data?.map((el) => {
                  return {
                    label: el?.name,
                    value: el?.id,
                    icon: el?.image ? el?.image : undefined,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              initialValue={0}
              name="durationDays"
              label="Days"
              rules={[
                { required: true, message: "Enter experience duration days" },
                {
                  validator: (_, value) => {
                    if (value && value < 0) {
                      return Promise.reject("days can't be less than 0");
                    }
                    return Promise.resolve();
                  },
                },
              ]}>
              <Input min={0} type={"number"} placeholder="days" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              initialValue={0}
              name="durationHours"
              label="Hours"
              rules={[
                { required: true, message: "Enter experience duration hours" },
                {
                  validator: (_, value) => {
                    if (value && (value < 0 || value > 24)) {
                      return Promise.reject("Hours must be between 0 and 24");
                    }
                    return Promise.resolve();
                  },
                },
              ]}>
              <Input min={0} type={"number"} placeholder="hours" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              initialValue={0}
              name="durationMinutes"
              label="Minutes"
              rules={[
                { required: true, message: "Enter experience duration minutes" },
                {
                  validator: (_, value) => {
                    if (value && (value < 0 || value > 60)) {
                      return Promise.reject("Minutes must be between 0 and 59");
                    }

                    if (
                      Number(value) === 0 &&
                      Number(durationHours) === 0 &&
                      Number(durationDays) === 0
                    ) {
                      return Promise.reject("Experience duration must be at least one minute");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input min={0} type={"number"} placeholder="minutes" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="shortDescription"
              label="Short description"
              rules={[{ required: true, message: "Enter short description" }]}>
              <Input placeholder="Write here" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || isQuillEmpty(value)) {
                      setIsDescriptionError(true);
                      return Promise.reject("Enter description");
                    } else {
                      setIsDescriptionError(false);
                      return Promise.resolve();
                    }
                  },
                },
              ]}>
              <TextEditor
                style={{
                  borderColor: isDescriptionError ? "red" : "#EFEFF1",
                }}
                placeholder="Write here"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default GeneralInfo;
