import { useEffect, useState } from "react";
import { Col, Form, Input, message, Radio, Row, Skeleton, Typography } from "antd";
import { useWatch } from "antd/es/form/Form";

import Section from "../../components/Section";
// API CALLS
import useListFacilities from "services/travel/accommodations/FacilitiesAndServices/Queries/useListFacilities";
import useAddFacilitie from "services/travel/accommodations/FacilitiesAndServices/Mutations/useAddFacilitie";
import useGetFacilitieById from "services/travel/accommodations/FacilitiesAndServices/Queries/useGetFacilitieById";
// ICONS
import { ClockSVG3, CloseSVG2, FacilitiesAndServicesSVG, QAndASVG } from "assets/jsx-svg";
// style
import "./styles.css";

const FacilitiesAndServices = ({ id, next }) => {
  const [form] = Form.useForm();
  const [selectedServices, setSelectedServices] = useState([]);
  // Watch
  const isBreakfastOffered = useWatch("isBreakfastOffered", form);
  const isBreakfastIncludedWithPrice = useWatch("isBreakfastIncludedWithPrice", form);
  const isParkingIncluded = useWatch("isParkingIncluded", form);
  const isMedicalInsuranceNeede = useWatch("isMedicalInsuranceNeede", form);

  const listFacilitiesQuery = useListFacilities();

  const getFacilitieByIdQuery = useGetFacilitieById(id, {
    enabled: !!id,
  });

  useEffect(() => {
    if (getFacilitieByIdQuery.isSuccess && getFacilitieByIdQuery.data) {
      console.log("getFacilitieByIdQuery.data :>> ", getFacilitieByIdQuery.data);
      if (getFacilitieByIdQuery.data.facilitiesData) {
        setSelectedServices(
          getFacilitieByIdQuery.data.facilitiesData.map((faciliti) => faciliti.facilityId),
        );
      }

      form.setFieldsValue({
        ...getFacilitieByIdQuery.data,
        isMedicalInsuranceNeede: getFacilitieByIdQuery.data?.isMedicalInsuranceNeede || false,
        isParkingIncluded: getFacilitieByIdQuery.data?.isParkingIncluded || false,
        isBreakfastOffered: getFacilitieByIdQuery.data?.isBreakfastOffered || false,
      });
    }
  }, [form, getFacilitieByIdQuery.data, getFacilitieByIdQuery.isSuccess]);

  useEffect(() => {
    if (listFacilitiesQuery.isError) {
      message.error(listFacilitiesQuery.error?.message);
    }
  }, [listFacilitiesQuery.error, listFacilitiesQuery.isError]);

  const addFacilitieMutation = useAddFacilitie(id, {
    onSuccess: () => {
      next();
    },
    onError: (error) => message.error(error.message),
  });

  const handelFinish = (values) => {
    if (!addFacilitieMutation.isPending) {
      addFacilitieMutation.mutate({
        facilities: selectedServices,
        ...values,
      });
    }
  };

  if (listFacilitiesQuery.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="general_info">
      <Form Form form={form} layout="vertical" id="form_inside_tab" onFinish={handelFinish}>
        <Section title="Facilities and Services" icon={<FacilitiesAndServicesSVG />}>
          <Row gutter={[0, 24]}>
            <Col xs={24}>
              <Typography.Text className="fz-14 fw-800">
                These are the facilities and services that guests look for the most! Tell them which
                you have.
              </Typography.Text>
            </Col>

            <Col xs={24}>
              <Row align="middle" gutter={[16, 16]}>
                {listFacilitiesQuery.data.map((service) => (
                  <Col key={service.id}>
                    <div
                      className="facilities_and_services_tags"
                      style={{
                        backgroundColor: selectedServices.includes(service.id) ? "#3A5EE3" : "#fff",
                        borderColor: selectedServices.includes(service.id) ? "#3A5EE3" : "#e5e5ea",
                        color: selectedServices.includes(service.id) ? "#fff" : "",
                        cursor: selectedServices.includes(service.id) ? "auto" : "",
                      }}
                      onClick={() => {
                        if (!selectedServices.includes(service.id)) {
                          setSelectedServices((prev) => [...prev, service.id]);
                        }
                      }}>
                      <Row align="middle" gutter={[8, 0]} wrap={false}>
                        <Col>
                          <div className="facilities_and_services_tags_icon">
                            <ClockSVG3 />
                          </div>
                        </Col>
                        <Col>{service.name}</Col>
                        {selectedServices.includes(service.id) ? (
                          <Col>
                            <Row
                              align="middle"
                              className="clickable"
                              onClick={() =>
                                setSelectedServices((prev) =>
                                  prev.filter((serviceId) => serviceId !== service.id),
                                )
                              }>
                              <CloseSVG2 />
                            </Row>
                          </Col>
                        ) : null}
                      </Row>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Section>
        <Section title={"Additional Questions"} icon={<QAndASVG />}>
          <Row gutter={[0, 16]}>
            <Col xs={24}>
              <div className="facilities_and_services_additional_questions">
                <Row gutter={[0, 24]}>
                  <Col xs={24}>
                    <Row gutter={[8, 8]} justify="space-between">
                      <Col>
                        <Typography.Text>
                          Is breakfast offered at the accommodation?
                        </Typography.Text>
                      </Col>
                      <Col>
                        <Form.Item
                          noStyle
                          name="isBreakfastOffered"
                          rules={[{ required: true, message: "You Should Select" }]}>
                          <Radio.Group className="fw-600">
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  {isBreakfastOffered && (
                    <Col xs={24}>
                      <Row gutter={[8, 8]} justify="space-between">
                        <Col>
                          <Typography.Text>Is breakfast included with the price?</Typography.Text>
                        </Col>
                        <Col>
                          <Form.Item
                            noStyle
                            name="isBreakfastIncludedWithPrice"
                            rules={[{ required: true, message: "You Should Select" }]}>
                            <Radio.Group className="fw-600">
                              <Radio value={true}>Yes</Radio>
                              <Radio value={false}>No</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  )}

                  {isBreakfastOffered && !isBreakfastIncludedWithPrice && (
                    <Col xs={24}>
                      <Row gutter={[8, 8]} justify="space-between">
                        <Col>
                          <Typography.Text>Breakfast rate</Typography.Text>
                        </Col>
                        <Col>
                          <Form.Item
                            noStyle
                            name="breakfastRate"
                            rules={[
                              { required: true, message: "You Should enter the price" },
                              {
                                validator: (_, value) => {
                                  if (value < 0) {
                                    return Promise.reject("Price should be greater than 0");
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}>
                            <Input type="number" min={0} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
            <Col xs={24}>
              <div className="facilities_and_services_additional_questions">
                <Row gutter={[8, 8]} justify="space-between">
                  <Col>
                    <Typography.Text>Is parking included?</Typography.Text>
                  </Col>
                  <Col>
                    <Form.Item
                      noStyle
                      name="isParkingIncluded"
                      rules={[{ required: true, message: "You Should Select" }]}>
                      <Radio.Group className="fw-600">
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                {isParkingIncluded && (
                  <div className="mt-1">
                    <Row gutter={[8, 8]} justify="space-between">
                      <Col>
                        <Typography.Text>Is parking for free?</Typography.Text>
                      </Col>
                      <Col>
                        <Form.Item
                          noStyle
                          name="isParkingFree"
                          rules={[{ required: true, message: "You Should Select" }]}>
                          <Radio.Group className="fw-600">
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={24}>
              <div className="facilities_and_services_additional_questions">
                <Row gutter={[8, 8]} justify="space-between">
                  <Col>
                    <Typography.Text>Is medical insurance neede?</Typography.Text>
                  </Col>
                  <Col>
                    <Form.Item
                      noStyle
                      name="isMedicalInsuranceNeede"
                      initialValue={false}
                      rules={[{ required: true, message: "You Should Select" }]}>
                      <Radio.Group className="fw-600">
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                {isMedicalInsuranceNeede && (
                  <div className="mt-1">
                    <Form.Item
                      name="medicalInsuranceNote"
                      rules={[{ required: true, message: "enter medical insurance notes" }]}>
                      <Input.TextArea
                        rows={5}
                        placeholder="Medical insurance note"
                        className="w-100"
                      />
                    </Form.Item>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Section>
      </Form>
    </div>
  );
};

export default FacilitiesAndServices;
