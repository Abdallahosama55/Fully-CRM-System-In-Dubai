import { Button, Col, Form, Input, Row, Select, Space, Upload } from "antd";
import { DeleteSVG, ImagesSVG, PluseSVG } from "assets/jsx-svg";
import AddressInput from "components/common/AddressInput";
import CityInput from "components/common/CityInputNotAuth";
import CountryInput from "components/common/CountryInput";
import LanguageInput from "components/common/LanguageInputNotAuth";
import React, { useRef } from "react";
import mapImage from "assets/images/map.jpg";
import basicInfoImage from "assets/images/BasicInfo.jpg";
import { OFFICER_TYPE } from "constants/BUYER_GROUB";
import { API_BASE } from "services/config";
import TIME_ZONES from "constants/TIME_ZONES";
import managerImage from "assets/images/manager.jpg";
import useMutationOfficerRegistration from "services/unauth/useMutationOfficerRegistration";
import { useNotification } from "context/notificationContext";

import "./styles.css";

const Section = ({ title, icon, children }) => {
  return (
    <div className="add_agencie_section">
      <div className="add_agencie_section_header">
        <img src={icon} alt={title} />
        <p className="xs_text_regular">{title}</p>
      </div>
      <div className="add_agencie_section_body">{children}</div>
    </div>
  );
};
function AddAgencies() {
  const [form] = Form.useForm();
  const logo = Form.useWatch("logo", form);
  const fileInputRef = useRef(null);
  const { openNotificationWithIcon } = useNotification();
  const MutationOfficerRegistration = useMutationOfficerRegistration({
    onSuccess: () => {
      openNotificationWithIcon("success", "Suppliers Added sucessfully");
      // form.resetFields();
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.response.data.errors[0] || "Something Wrong");
    },
  });
  const handelFinish = (value) => {
    const data = {
      ...value,
      city: value.city.city,
      cityId: value.city.cityId,
      companyId: 22,
      logo: value?.logo?.file?.response?.uploadedFiles?.logo,
    };
    MutationOfficerRegistration.mutate({
      ...data,
    });
  };

  return (
    <div className="add_agencie">
      <Form
        form={form}
        layout="vertical"
        onFinish={handelFinish}
        scrollToFirstError={{ behavior: "smooth" }}>
        <div className="add_agencie_header space-between">
          <Form.Item hidden name="type" initialValue={OFFICER_TYPE.AGENT} />
          <p className="md_text_medium">Add agencie Info</p>
          <Space>
            <Button
              size="small"
              style={{ padding: "4px 14px" }}
              className="sm_text_medium"
              type="primary"
              htmlType="submit"
              loading={
                MutationOfficerRegistration.isPending || MutationOfficerRegistration.isPending
              }>
              Submit
            </Button>
          </Space>
        </div>
        <div className="add_agencie_body">
          <div className="add_agencie_body_content">
            <Section icon={basicInfoImage} title={"Basic Information"}>
              <Space>
                <Form.Item name={"logo"}>
                  <Upload
                    name="logo"
                    listType="picture-circle"
                    showUploadList={false}
                    action={API_BASE + `common/upload-file`}
                    disabled={logo?.file?.status === "uploading"}>
                    <div ref={fileInputRef} className="center-items">
                      {logo?.file?.response?.uploadedFiles?.logo ? (
                        <img
                          style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                          src={logo?.file?.response?.uploadedFiles?.logo}
                          alt=""
                        />
                      ) : (
                        <PluseSVG />
                      )}
                    </div>
                  </Upload>
                </Form.Item>
                <div>
                  <p>Agencie Logo</p>
                  <p style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                    <span
                      className="button_with_icon"
                      style={{ color: "#3A5EE3" }}
                      onClick={() => fileInputRef.current?.click()}>
                      <ImagesSVG color="#3A5EE3" /> Update
                    </span>
                    {logo?.file?.response?.uploadedFiles?.logo && (
                      <span
                        className="button_with_icon"
                        style={{ color: "#DB4F40" }}
                        onClick={() => form.setFieldValue("logo", undefined)}>
                        <DeleteSVG color={"#DB4F40"} /> Delete
                      </span>
                    )}
                  </p>
                </div>
              </Space>
              <Row gutter={[12, 12]}>
                <Col lg={6}>
                  <Form.Item
                    name="companyName"
                    label={<p className="sm_text_medium">Official agencie Name</p>}
                    rules={[{ required: true, message: "Enter agencie name" }]}>
                    <Input placeholder="agencie name" />
                  </Form.Item>
                </Col>

                <Col lg={6}>
                  <Form.Item name="taxNumber" label={<p className="sm_text_medium">Tax Number</p>}>
                    <Input placeholder="Tax number" />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    name="languageCode"
                    label={<p className="sm_text_medium">Language</p>}
                    initialValue={navigator.language ? navigator.language?.split("-")[0] : ""}
                    rules={[{ required: true, message: "Select language" }]}>
                    <LanguageInput placeholder="language" />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    name="timeZone"
                    label={<p className="sm_text_medium">Time Zone</p>}
                    initialValue={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                    <Select
                      showSearch
                      placeholder="Time zone"
                      options={TIME_ZONES.map((el) => ({ label: el, value: el }))}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    name="companyEmail"
                    label={<p className="sm_text_medium">Official Agency Email</p>}
                    rules={[
                      { required: true, message: "Enter valid email" },
                      { type: "email", message: "Enter valid email" },
                    ]}>
                    <Input placeholder="name@email.com" type="email" />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    name="companyPhone"
                    label={<p className="sm_text_medium">Company Phone</p>}
                    rules={[
                      { required: true, message: "Enter company phone" },
                      {
                        pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                        message: "Enter a valid phone number",
                      },
                    ]}>
                    <Input placeholder="phone" maxLength={15} />
                  </Form.Item>
                </Col>
              </Row>
            </Section>

            <Section icon={managerImage} title={"General Manager Information"}>
              <Row gutter={[12, 12]}>
                <Col lg={3}>
                  <Form.Item
                    name="title"
                    required
                    label={<p className="sm_text_medium">Title</p>}
                    initialValue={"Mr"}>
                    <Select
                      placeholder="title"
                      options={[
                        { label: "Mr", value: "Mr" },
                        { label: "Ms", value: "Ms" },
                        { label: "Mrs", value: "Mrs" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    name="fullName"
                    label={<p className="sm_text_medium">Full Name</p>}
                    rules={[{ required: true, message: "Enter full name" }]}>
                    <Input placeholder="full name" />
                  </Form.Item>
                </Col>
                <Col lg={5}>
                  <Form.Item
                    name="email"
                    label={<p className="sm_text_medium">Email</p>}
                    rules={[
                      { required: true, message: "Enter valid email" },
                      { type: "email", message: "Enter valid email" },
                    ]}>
                    <Input placeholder="name@email.com" type="email" />
                  </Form.Item>
                </Col>
                <Col lg={5}>
                  <Form.Item
                    name="phone"
                    label={<p className="sm_text_medium">Phone</p>}
                    rules={[
                      { required: true, message: "Enter phone number" },
                      {
                        pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                        message: "Enter a valid phone number",
                      },
                    ]}>
                    <Input placeholder="972 0595555555" maxLength={15} />
                  </Form.Item>
                </Col>
                <Col lg={5}>
                  <Form.Item
                    name="whatsapp"
                    label={<p className="sm_text_medium">WhatsApp</p>}
                    rules={[
                      {
                        pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                        message: "Enter a valid WhatsApp number",
                      },
                    ]}>
                    <Input placeholder="972 0595555555" maxLength={15} />
                  </Form.Item>
                </Col>
              </Row>
            </Section>
            <Section icon={mapImage} title={"Address"}>
              <Row gutter={[12, 12]}>
                <Col lg={6}>
                  <Form.Item
                    name="country"
                    label={<p className="sm_text_medium">Country</p>}
                    rules={[{ required: true, message: "Select country" }]}>
                    <CountryInput placeholder={"Country"} suffixIcon={<></>} />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    name="city"
                    label={<p className="sm_text_medium">City</p>}
                    rules={[{ required: true, message: "Select city" }]}>
                    <CityInput />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    name="zipCode"
                    label={<p className="sm_text_medium">Zip/Post Code</p>}
                    rules={[
                      {
                        pattern: /^[a-zA-Z0-9\s\-]{4,10}$/,
                        message: "Enter a valid zip code",
                      },
                    ]}>
                    <Input type="text" maxLength={10} placeholder="zip/post code" />
                  </Form.Item>
                </Col>
                <Col lg={24}>
                  <Form.Item name="address" label={<p className="sm_text_medium">Address</p>}>
                    <AddressInput placeholder="ada" />
                  </Form.Item>
                </Col>
              </Row>
            </Section>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddAgencies;
