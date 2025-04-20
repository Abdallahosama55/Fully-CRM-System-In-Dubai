import React, { useEffect, useRef, useState } from "react";
import Section from "../../components/Section";
import { Col, DatePicker, Form, Input, message, Rate, Row, Select, Skeleton, Tag } from "antd";
import { ArrowDownSVG, ContactsSVG, GeneralInfoSVG, SeoChartSVG, TimeSVG } from "assets/jsx-svg";
import PhoneNumberInput from "components/common/PhoneNumberInput";
// API CALLS
import useGetAccommodationGeneralInfo from "services/travel/accommodations/GeneralInfo/Queries/useGetAccommodationGeneralInfo";
import useAddAccommodationGeneralInfo from "services/travel/accommodations/GeneralInfo/Mutations/useAddAccommodationGeneralInfo";
import useEditAccommodationGeneralInfo from "services/travel/accommodations/GeneralInfo/Mutations/useEditAccommodationGeneralInfo";
// style
import "./styles.css";
import MultiLungEditor from "./MultiLungEditor";
import useGetAccommodationTypesList from "services/travel/accommodations/common/Queries/useGetAccommodationTypesList";
import { useForm, useWatch } from "antd/es/form/Form";
import LocationInput from "components/common/LocationInput";
import dayjs from "dayjs";
import CityInput from "components/common/CityInput";
import AddressInput from "components/common/AddressInput";
import CurrencyInput from "components/common/CurrencyInput";
import AreaInput from "components/common/AreaInput";
import { useUserContext } from "context/userContext";
import useGetSupplierData from "services/Common/Queries/useGetSupplierData";

const GeneralInfo = ({ id, next, setId, autoCompleateData }) => {
  const [form] = useForm();
  const city = useWatch("city", form);
  const isInatialDataSet = useRef(false);
  const { user } = useUserContext();
  const supplierData = useGetSupplierData();
  // QUERYS
  const accommodationGeneralInfoQuery = useGetAccommodationGeneralInfo(id, {
    enabled: Boolean(id),
  });
  const accommodationTypesQuery = useGetAccommodationTypesList({});
  useEffect(() => {
    if (
      accommodationTypesQuery?.data &&
      Array.isArray(accommodationTypesQuery?.data) &&
      accommodationTypesQuery?.data?.length > 0
    ) {
      form.setFieldValue("accommodationTypeId", accommodationTypesQuery?.data[0]?.id);
    }
  }, [accommodationTypesQuery?.data]);
  // MUTATIONS
  const addAccommodationGeneralInfoMutation = useAddAccommodationGeneralInfo({
    onSuccess: (res) => {
      setId(res.id);
      next();
    },
    onError: (error) => message.error(error.message),
  });

  useEffect(() => {
    if (accommodationGeneralInfoQuery.isSuccess) {
      const temp = accommodationGeneralInfoQuery?.data;
      form.setFieldsValue({
        ...temp,
        city: {
          id: temp?.cityId,
          city: temp?.city,
          country: temp?.country,
        },
        area: {
          id: temp?.areaId,
          name: temp?.area,
        },
        location: {
          location: temp?.location,
          lat: temp?.lat,
          lng: temp?.lng,
        },
        description: JSON.parse(temp.description),
        phoneNumber: temp?.phoneNumber,
        checkInTime: temp?.checkInTime ? dayjs(temp.checkInTime, "HH:mm:ss") : undefined,
        checkOutTime: temp?.checkOutTime ? dayjs(temp.checkOutTime, "HH:mm:ss") : undefined,
      });
    }
  }, [accommodationGeneralInfoQuery.data, accommodationGeneralInfoQuery.isSuccess]);

  useEffect(() => {
    if (autoCompleateData && (supplierData.isSuccess || supplierData.isError)) {
      form.setFieldsValue({
        location: {
          location: autoCompleateData?.city?.city,
          lat: autoCompleateData?.city?.lat,
          lng: autoCompleateData?.city?.lng,
        },
        ...autoCompleateData,
        email: supplierData?.data?.email,
        saleManagerEmail: supplierData?.data?.saleManagerEmail,
        address: supplierData?.data?.address || autoCompleateData?.address,
        phoneNumber: supplierData?.data?.phoneNumber,
        postalCode: supplierData?.data?.postalCode,
        checkInTime: autoCompleateData?.checkInTime
          ? dayjs(
              autoCompleateData?.checkInTime,
              dayjs(autoCompleateData.checkInTime, "HH:mm").isValid() ? "HH:mm" : "hh:mm A",
            )
          : dayjs("02:00", "HH:mm"),
        checkOutTime: autoCompleateData?.checkOutTime
          ? dayjs(
              autoCompleateData?.checkOutTime,
              dayjs(autoCompleateData.checkOutTime, "HH:mm").isValid() ? "HH:mm" : "hh:mm A",
            )
          : dayjs("22:00", "HH:mm"),
      });
    }
  }, [autoCompleateData, supplierData.data]);

  useEffect(() => {
    if (isInatialDataSet.current) {
      // HERE IS THE ERROR
      form.setFieldValue("location", {
        location: city?.city,
        lat: city?.lat,
        lng: city?.lng,
      });
    }

    if (city) {
      isInatialDataSet.current = true;
    }
  }, [city, isInatialDataSet]);
  console.log("isInatialDataSet", isInatialDataSet);
  const editAccommodationGeneralInfoMutation = useEditAccommodationGeneralInfo(id, {
    onSuccess: () => {
      next();
    },
    onError: (error) => message.error(error.message),
  });

  const handelFinish = (values) => {
    const data = {
      ...values,
      ...values.location,
      city: values?.city?.city,
      cityId: values?.city?.id,
      area: values?.area?.name,
      areaId: values?.area?.id,
      description: JSON.stringify(values.description),
      phoneNumber: values?.phoneNumber,
      checkInTime: dayjs(values.checkInTime).format("hh:mm a"),
      checkOutTime: dayjs(values.checkOutTime).format("hh:mm a"),
    };

    if (!id) {
      addAccommodationGeneralInfoMutation.mutate(data);
    } else {
      editAccommodationGeneralInfoMutation.mutate(data);
    }
  };

  if (accommodationGeneralInfoQuery.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="general_info">
      <Form
        form={form}
        layout="vertical"
        id="form_inside_tab"
        onFinish={handelFinish}
        onSubmitCapture={(e) => {
          console.log("onSubmitCapture", e);
        }}
        scrollToFirstError={{ behavior: "smooth" }}>
        <Section title="General" icon={<GeneralInfoSVG />}>
          <Row gutter={[16, 12]}>
            <Col md={8} xs={24}>
              <Form.Item
                name="city"
                label={<span className="fz-12">City</span>}
                rules={[{ required: true, message: "Select city" }]}>
                <CityInput placeholder="Search for city" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="area"
                label={<span className="fz-12">Area</span>}
                rules={[{ required: true, message: "Select city" }]}>
                <AreaInput suffixIcon={<ArrowDownSVG color={"#3F65E4"} />} city={city} />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="name"
                label={<span className="fz-12">Name</span>}
                rules={[{ required: true, message: "Enter accommodation name" }]}>
                <Input placeholder="Enter Name Here" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="accommodationTypeId"
                label={<span className="fz-12">Accommodation type</span>}
                rules={[{ required: true, message: "Select accommodation type" }]}>
                <Select
                  suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                  placeholder="Select Accommodation type"
                  disabled={accommodationTypesQuery.isLoading}
                  showSearch
                  options={accommodationTypesQuery.data?.map((el) => ({
                    label: el.name,
                    value: el.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="rate"
                label={<span className="fz-12">Rating</span>}
                initialValue={5}
                rules={[{ required: true, message: "Select rating" }]}>
                <Select
                  suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                  placeholder="Select Rating"
                  showSearch
                  options={[
                    {
                      label: (
                        <Rate
                          disabled
                          count={5}
                          value={5}
                          style={{ scale: "0.8", transform: "translateX(-10px)" }}
                        />
                      ),
                      value: 5,
                    },
                    {
                      label: (
                        <Rate
                          disabled
                          count={5}
                          value={4}
                          style={{ scale: "0.8", transform: "translateX(-10px)" }}
                        />
                      ),
                      value: 4,
                    },
                    {
                      label: (
                        <Rate
                          disabled
                          count={5}
                          value={3}
                          style={{ scale: "0.8", transform: "translateX(-10px)" }}
                        />
                      ),
                      value: 3,
                    },
                    {
                      label: (
                        <Rate
                          disabled
                          count={5}
                          value={2}
                          style={{ scale: "0.8", transform: "translateX(-10px)" }}
                        />
                      ),
                      value: 2,
                    },
                    {
                      label: (
                        <Rate
                          disabled
                          count={5}
                          value={1}
                          style={{ scale: "0.8", transform: "translateX(-10px)" }}
                        />
                      ),
                      value: 1,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="currencyCode"
                label={<span className="fz-12">Currency</span>}
                initialValue={"USD"}
                rules={[{ required: true, message: "Select currency" }]}>
                <CurrencyInput placeholder="Select currency" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="checkInTime"
                label={<span className="fz-12">Check In Time</span>}
                initialValue={dayjs("02:00", "HH:mm")}
                rules={[{ required: true, message: "Select check in time" }]}>
                <DatePicker.TimePicker format="h:mm a" className="w-100" suffixIcon={<TimeSVG />} />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="checkOutTime"
                label={<span className="fz-12">Check Out Time</span>}
                initialValue={dayjs("22:00", "HH:mm")}
                rules={[{ required: true, message: "Select check out time" }]}>
                <DatePicker.TimePicker format="h:mm a" className="w-100" suffixIcon={<TimeSVG />} />
              </Form.Item>
            </Col>
            <Col md={4} xs={24}>
              <Form.Item
                name="distanceToCityCenter"
                label={<span className="fz-12">Distance to city center</span>}
                initialValue={0}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (value < 0) {
                          return Promise.reject("distance can't be negative");
                        }
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input
                  className="blue_addon_after"
                  min={0}
                  placeholder="Enter distance to city center"
                  type="number"
                  addonAfter={"Km"}
                />
              </Form.Item>
            </Col>
            <Col md={4} xs={24}>
              <Form.Item
                name="distanceToAirport"
                initialValue={0}
                label={<span className="fz-12">Distance to airport</span>}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (value < 0) {
                          return Promise.reject("distance can't be negative");
                        }
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input
                  className="blue_addon_after"
                  min={0}
                  placeholder="Enter distance to airport"
                  type="number"
                  addonAfter={"Km"}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="location"
                label={<span className="fz-12">Address</span>}
                initialValue={{
                  location: "Dubai - United Arab Emirates",
                  lat: 25.2048493,
                  lng: 55.2707828,
                  country: "United Arab Emirates",
                  city: "Dubai",
                }}
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
                ]}>
                <LocationInput draggableMarker withMapView />
              </Form.Item>
            </Col>
            <Col span={24}>
              <p className="fz-12 mb-1">
                Description
                <span
                  style={{
                    color: "#ff4d4f",
                    fontFamily: "SimSun,sans-serif",
                    fontSize: "14px",
                  }}>
                  {" "}
                  *
                </span>
              </p>
              <MultiLungEditor />
            </Col>
          </Row>
        </Section>
        <Section title={"Contact Details"} icon={<ContactsSVG />}>
          <Row gutter={[16, 12]}>
            <Col md={8} xs={24}>
              <Form.Item
                name="address"
                label={<span className="fz-12">Address</span>}
                rules={[{ required: true, message: "Address is required" }]}>
                <AddressInput />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="postalCode"
                label={<span className="fz-12">Postal code/zip code</span>}>
                <Input placeholder="Enter postal code" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name={"phoneNumber"}
                label={<span className="fz-12">Phone number</span>}
                rules={[{ required: true, message: "Phone is required" }]}>
                <PhoneNumberInput placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="email"
                label={<span className="fz-12">Email</span>}
                initialValue={user?.email}
                rules={[
                  { type: "email", message: "Enter valid email" },
                  { required: true, message: "Enter valid email" },
                ]}>
                <Input type="email" placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                name="saleManagerEmail"
                initialValue={user?.email}
                label={<span className="fz-12">Sales Manager Email</span>}
                rules={[
                  { type: "email", message: "Enter valid email" },
                  { required: true, message: "Enter valid email" },
                ]}>
                <Input type="email" placeholder="Enter sales manager email" />
              </Form.Item>
            </Col>
          </Row>
        </Section>
        <Section title={"SEO enhancements"} icon={<SeoChartSVG />}>
          <Row gutter={[12, 0]}>
            <Col lg={12} xs={24}>
              <Form.Item name="metaTitle" label={<span className="fz-12">Meta title</span>}>
                <Input placeholder="meta title" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item name="metaKeywords" label={<span className="fz-12">Meta keywords</span>}>
                <Select
                  placeholder="meta keywords"
                  mode="tags"
                  suffixIcon={null}
                  tagRender={(el) => (
                    <Tag size="large" color="purple" {...el}>
                      {el?.label}
                    </Tag>
                  )}
                  // dropdownRender={() => null} // Prevents the dropdown from rendering
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="metaDescription"
                label={<span className="fz-12">Meta description</span>}>
                <Input.TextArea placeholder="meta description" rows={5} />
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </Form>
    </div>
  );
};

export default GeneralInfo;
