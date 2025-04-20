import { Col, DatePicker, Divider, Form, Input, message, Modal, Row, Select, Tabs } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { ArrowDownSVG } from "assets/jsx-svg";
import LocationInput from "components/common/LocationInput";
import NationalityInput from "components/common/NationalityInput";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import TravelersInput from "components/common/TravelaresInput";
import dayjs from "dayjs";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect } from "react";
import useManualBookingBookExperience from "services/travel/booking/ManualBooking/Experience/Mutations/useManualBookingBookExperience";
import useManualBookingListExperiences from "services/travel/booking/ManualBooking/Experience/Queries/useManualBookingListExperiences";
import useManualBookingListAgents from "services/travel/booking/ManualBooking/Queries/useManualBookingListAgents";
import useManualBookingListSuppliers from "services/travel/booking/ManualBooking/Queries/useManualBookingListSuppliers";
import isValidJson from "utils/isValidJson";

const AddExperienceManualBooking = ({ isOpen, close }) => {
  const [form] = useForm();
  const supplierId = useWatch("supplierId", form);
  const agentId = useWatch("agentId", form);
  useEffect(() => {
    form.setFieldValue("supplierId", undefined);
  }, [agentId]);
  const categories = useWatch("categories", form);
  const debouncedCategories = useDebounce(categories, 500);
  const agentsList = useManualBookingListAgents();
  const suppliersList = useManualBookingListSuppliers({ agentId }, { enabled: !!agentId });
  const experienceList = useManualBookingListExperiences({ supplierId }, { enabled: !!supplierId });

  const bookExperience = useManualBookingBookExperience({
    onSuccess: () => {
      message.success("Booking added successfully");
      close();
    },
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });

  const handelFinish = (values) => {
    const temp = {
      ...values,
      productId: isValidJson(values?.productId) ? JSON.parse(values?.productId)?.id : undefined,
      name: isValidJson(values?.productId) ? JSON.parse(values?.productId)?.title : undefined,
      isMeeting: false,
      categories: {
        adults: values?.categories?.adults,
        children: values?.categories?.childsAges?.join("-"),
      },
      pickupLocationLat: values?.pickupLocation?.lat,
      pickupLocationLng: values?.pickupLocation?.lng,
      pickupLocationAddress: values?.pickupLocation?.location,
      dmcMarginAmount: Number(values?.sale) - Number(values?.cost),
      holderPhoneNumber: values?.holderPhoneNumber,
      date: values?.date ? dayjs(values?.date).format("YYYY-MM-DD") : undefined,
      paxes: values?.paxes?.map((pax, paxIndex) => {
        return {
          ...pax,
          dateOfBirth: dayjs(pax?.dateOfBirth)?.format("YYYY-MM-DD"),
          passportExpiry: dayjs(pax?.passportExpiry)?.format("YYYY-MM-DD"),
          type: paxIndex < Number(debouncedCategories?.adults) ? "Adult" : "Child",
        };
      }),
      pickupLocation: undefined,
    };

    bookExperience.mutate(temp);
  };

  return (
    <Modal
      title={"Add Experience Manual Booking"}
      open={isOpen}
      onOk={form.submit}
      okButtonProps={{ loading: bookExperience?.isPending }}
      onCancel={close}
      okText={"Add"}
      width={"800px"}
      centered>
      <Form
        onFinish={handelFinish}
        form={form}
        layout="vertical"
        style={{
          maxHeight: "calc(100dvh - 150px)",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 8px 0 6px",
        }}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item name="agentId" label="Agent" rules={[{ required: true }]}>
              <Select
                placeholder="Select Agent"
                suffixIcon={<ArrowDownSVG />}
                options={agentsList?.data?.map((el) => ({ label: el?.fullName, value: el?.id }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="supplierId" label="Supplier" rules={[{ required: true }]}>
              <Select
                placeholder="Select Supplier"
                suffixIcon={<ArrowDownSVG />}
                disabled={suppliersList?.data?.length === 0 || !agentId}
                options={suppliersList?.data?.map((el) => ({ label: el?.fullName, value: el?.id }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="productId" label="Experiance" rules={[{ required: true }]}>
              <Select
                placeholder="Select Supplier"
                suffixIcon={<ArrowDownSVG />}
                options={experienceList?.data?.map((el) => ({
                  label: el?.title,
                  value: JSON.stringify(el),
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="pickupLocationTitle"
              label="Pickup Location Name"
              rules={[{ required: true }]}>
              <Input placeholder="location name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="pickupLocation" label="Pickup location" rules={[{ required: true }]}>
              <LocationInput placeholder="location" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cost"
              label="Cost"
              rules={[
                { required: true },
                {
                  validator: (_, value) => {
                    if (Number(value) < 0) {
                      return Promise.reject("Cost must be positive value");
                    }
                    return Promise.resolve();
                  },
                },
              ]}>
              <Input type="number" placeholder="cost" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sale"
              label="Sale"
              rules={[
                { required: true },
                {
                  validator: (_, value) => {
                    if (value && Number(value) < 0) {
                      return Promise.reject("Sale must be positive value");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input type="number" placeholder="sale" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="date" label="Booking date" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={24}>
            <Form.Item name="categories" label="Travelares" rules={[{ required: true }]}>
              <TravelersInput form={form} placeholder="travelares" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="holderFirstName"
              label="Holder First Name"
              rules={[{ required: true }]}>
              <Input placeholder="first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="holderLastName" label="Holder Last Name" rules={[{ required: true }]}>
              <Input placeholder="last name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="holderEmail"
              label="Holder Email"
              rules={[{ required: true }, { type: "email", message: "Entar valid email" }]}>
              <Input type="email" placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="holderPhoneNumber" label="Holder Mobile" rules={[{ required: true }]}>
              <PhoneNumberInput />
            </Form.Item>
          </Col>
          <Divider />
          <>
            {debouncedCategories &&
              debouncedCategories?.adults &&
              debouncedCategories?.adults > 0 &&
              [
                ...new Array(
                  Number(debouncedCategories?.adults) + Number(debouncedCategories?.childs || 0),
                ),
              ].map((_, paxIndex) => (
                <Row gutter={[8, 8]} align="middle" key={paxIndex}>
                  <Col span={24}>
                    {paxIndex + 1} -{" "}
                    {paxIndex < Number(debouncedCategories?.adults) ? "(Adult)" : "(Child)"}
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name={["paxes", paxIndex, "title"]}
                      label="Salutation"
                      initialValue={"Mr"}
                      rules={[{ required: true }]}>
                      <Select>
                        <Select.Option value="Mr">Mr.</Select.Option>
                        <Select.Option value="Ms">Ms.</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name={["paxes", paxIndex, "firstName"]}
                      label="First Name"
                      rules={[{ required: true }]}>
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name={["paxes", paxIndex, "lastName"]}
                      label="Last Name"
                      rules={[{ required: true }]}>
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name={["paxes", paxIndex, "nationality"]}
                      label="Nationality"
                      initialValue={"AE"}
                      rules={[{ required: true }]}>
                      <NationalityInput placeholder="Nationality" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name={["paxes", paxIndex, "passportID"]}
                      label="Passport ID"
                      rules={[{ required: true }]}>
                      <Input placeholder="Passport ID" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name={["paxes", paxIndex, "passportExpiry"]}
                      label="Passport Expiry"
                      rules={[{ required: true }]}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name={["paxes", paxIndex, "dateOfBirth"]}
                      label="DOB"
                      rules={[{ required: true }]}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
          </>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddExperienceManualBooking;

/*
{
    "title": "Mr",
    "firstName": "abd",
    "lastName": "Qadoura",
    "nationality": "Palestinian",
    "passportID": "151515",
    "passportExpiry": "2025-01-01",
    "dateOfBirth": "2025-01-01"
}

 {
            "email": "john.doe@example.com",
            "phoneNumber": "+123456789",
            "gender": "Male",
            "language": "English",
            "address": "456 Sunset Boulevard, Los Angeles, CA, USA",
            "organization": "Doe Enterprises",
            "personalIDNumber": "123456789",
        }
*/
