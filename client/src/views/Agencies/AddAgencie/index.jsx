import React, { useEffect, useRef } from "react";
// style
import "./styles.css";
import { Button, Col, Form, Input, message, Row, Select, Space, Spin, Upload } from "antd";
// images
import basicInfoImage from "assets/images/BasicInfo.jpg";
import officeBuildingImage from "assets/images/office-building.jpg";
import managerImage from "assets/images/manager.jpg";
import mapImage from "assets/images/map.jpg";
import { useForm, useWatch } from "antd/es/form/Form";
import { API_BASE } from "services/config";
import { DeleteSVG, ImagesSVG, PluseSVG } from "assets/jsx-svg";
import AddressInput from "components/common/AddressInput";
import CityInput from "components/common/CityInput";
import LanguageInput from "components/common/LanguageInput";
import CountryInput from "components/common/CountryInput";
import TIME_ZONES from "constants/TIME_ZONES";
// UTILS
import isValidJson from "utils/isValidJson";
// API CALLS
import useAddOffice from "services/agencies/Mutations/useAddOffice";
import useEditOffice from "services/agencies/Mutations/useEditOffice";
import useGetOfficeByID from "services/agencies/Queries/useGetOfficeByID";
import LoadingPage from "components/common/LoadingPage";
import useListBuyerGroub from "services/pricingModule/Queries/useListBuyerGroub";
import { OFFICER_TYPE } from "constants/BUYER_GROUB";

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

/*
{
"id": 6,
"officeId": "7737566",
"companyName": "Abrar",
"companyEmail": "abrarabusnaineh+travellocal+agent@gmail.com",
"companyPhone": null,
"taxNumber": null,
"type": "AGENT",
"title": "Mrs",
"fullName": "localComp",
"email": "abrarabusnaineh+travellocal+agent@gmail.com",
"country": null,
"state": null,
"city": null,
"phone": null,
"whatsapp": null,
"zipCode": null,
"address": null,
"timeZone": null,
"bankName": null,
"branch": null,
"SWIFT": null,
"bankAccountNo": null,
"IBAN": null,
"beneficiaryName": null,
"bankDetails": null,
"logo": "https://chickchack.s3.amazonaws.com/image/1727263813095pngtree-watermark-png-image_2424242.jpg",
"supplierOf": [],
"lastLogin": null,
"creditLineLimit": null,
"creditLineLimitValue": null,
"creditLineLimitRemainingValue": null,
"level": "LEAD",
"balance": 49817.93,
"domain": null,
"isActive": true,
"isRelatedToDMCOfficer": false,
"createdAt": "2024-12-09T12:10:19.925Z",
"updatedAt": "2024-12-24T08:36:48.445Z",
"companyId": 24,
"buyerGroupId": 1,
"languageCode": "en ",
"planId": null,
"buyerGroup": {
"id": 1,
"name": "My Office"
}
}
*/
const AddAgencie = ({ id, onEnd, DrawerAPI }) => {
  const [form] = useForm();
  const logo = useWatch("logo", form);
  const fileInputRef = useRef(null);
  const officeById = useGetOfficeByID(id, { enabled: !!id });
  // queries
  const buyerGroupsList = useListBuyerGroub();

  useEffect(() => {
    if (officeById.isSuccess) {
      console.log(officeById.data);
      form.setFieldsValue({
        ...officeById.data,
        logo: { file: { response: { uploadedFiles: { logo: officeById.data?.logo } } } },
      });
    }
  }, [officeById.data, officeById.isSuccess]);

  const addOfficeMutation = useAddOffice({
    onSuccess: () => {
      message.success("Agencie Added Successfully");
      onEnd();
      DrawerAPI.close();
    },
    onError: () => message.error("Somthing went wrong"),
  });

  const editOfficeMutation = useEditOffice({
    onSuccess: () => {
      message.success("Agencie updated Successfully");
      onEnd();
      DrawerAPI.close();
    },
    onError: () => message.error("Somthing went wrong"),
  });

  const handelFinish = (values) => {
    const temp = {
      ...values,
      logo: values?.logo?.file?.response?.uploadedFiles?.logo,
      city: values.city ? values?.city?.city : "",
      cityId: values.city ? values?.city?.id : "",
    };

    if (id) {
      editOfficeMutation.mutate({ id, ...temp });
    } else {
      addOfficeMutation.mutate(temp);
    }
  };

  if (officeById.isLoading || addOfficeMutation.isPending || editOfficeMutation.isPending) {
    return <LoadingPage />;
  }

  return (
    <div className="add_agencie">
      <Form
        form={form}
        layout="vertical"
        onFinish={handelFinish}
        scrollToFirstError={{ behavior: "smooth" }}>
        <div className="add_agencie_header space-between">
          <Form.Item hidden name="type" initialValue={OFFICER_TYPE.AGENT} />
          <p className="md_text_medium">{id ? "Edit" : "Add"} agencie Info</p>
          <Space>
            <Button
              size="small"
              style={{ padding: "4px 14px" }}
              className="sm_text_medium"
              onClick={() => DrawerAPI.close()}>
              Cancel
            </Button>
            <Button
              size="small"
              style={{ padding: "4px 14px" }}
              className="sm_text_medium"
              type="primary"
              htmlType="submit"
              loading={addOfficeMutation.isPending || editOfficeMutation.isPending}>
              Save
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
                {id && (
                  <Col lg={6}>
                    <Form.Item name="officeId" label={<p className="sm_text_medium">Office ID</p>}>
                      <Input placeholder="ID" disabled />
                    </Form.Item>
                  </Col>
                )}
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
            <Section icon={officeBuildingImage} title={"Office Setup"}>
              <Form.Item
                name="buyerGroupId"
                label={<p className="sm_text_medium">Buyer Group</p>}
                rules={[{ required: true, message: "Select buyer group" }]}>
                <Select
                  placeholder="buyer group"
                  options={buyerGroupsList?.data?.map((el) => ({ label: el?.name, value: el.id }))}
                />
              </Form.Item>
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
};

export default AddAgencie;
