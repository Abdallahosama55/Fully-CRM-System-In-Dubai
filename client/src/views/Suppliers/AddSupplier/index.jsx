import React, { useEffect, useRef } from "react";
// style
import "./styles.css";
import { Button, Col, Form, Input, message, Row, Select, Space, Spin, Upload } from "antd";
// images
import basicInfoImage from "assets/images/BasicInfo.jpg";
import officeBuildingImage from "assets/images/office-building.jpg";
import managerImage from "assets/images/manager.jpg";
import mapImage from "assets/images/map.jpg";
// import bankInfoImage from "assets/images/bank-account.jpg";
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
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
import LoadingPage from "components/common/LoadingPage";

const Section = ({ title, icon, children }) => {
  return (
    <div className="add_supplier_section">
      <div className="add_supplier_section_header">
        <img src={icon} alt={title} />
        <p className="xs_text_regular">{title}</p>
      </div>
      <div className="add_supplier_section_body">{children}</div>
    </div>
  );
};

const AddSupplier = ({ id, onEnd, DrawerAPI }) => {
  const [form] = useForm();
  const logo = useWatch("logo", form);
  const fileInputRef = useRef(null);
  const officeById = useGetOfficeByID(id, { enabled: !!id });
  useEffect(() => {
    if (officeById.isSuccess) {
      console.log(officeById.data);
      form.setFieldsValue({
        ...officeById.data,
        logo: { file: { response: { uploadedFiles: { logo: officeById.data?.logo } } } },
        firstName: officeById.data?.fullName?.split(" ")[0],
        lastName: officeById.data?.fullName?.split(" ").splice(1).join(" "),
      });
    }
  }, [officeById.data, officeById.isSuccess]);

  const addOfficeMutation = useAddOffice({
    onSuccess: () => {
      message.success("Supplier Added Successfully");
      onEnd();
      DrawerAPI.close();
    },
    onError: (error) => {
      console.log(error);
      // Extracting the error message from the error object
      const errorMessage = error.message || "Something went wrong";
      console.log(errorMessage); // Log the error message for debugging
      message.error(errorMessage); // Display the error message in the UI
    },
  });

  const editOfficeMutation = useEditOffice({
    onSuccess: () => {
      message.success("Supplier updated Successfully");
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
    <div className="add_supplier">
      <Form
        form={form}
        autocomplete="off"
        layout="vertical"
        onFinish={handelFinish}
        scrollToFirstError={{ behavior: "smooth" }}>
        <div className="add_supplier_header space-between">
          <Form.Item hidden name="type" initialValue={"SUPPLIER"} />
          <p className="md_text_medium">{id ? "Edit" : "Add"} supplier Info</p>
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
              disabled={addOfficeMutation.isLoading || editOfficeMutation.isLoading}>
              {addOfficeMutation.isLoading || editOfficeMutation.isLoading ? (
                <Spin size="small" />
              ) : (
                "Save"
              )}
            </Button>
          </Space>
        </div>
        <div className="add_supplier_body">
          <div className="add_supplier_body_content">
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
                  <p>Supplier Logo</p>
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
              <Row gutter={[16, 16]}>
                <Col lg={6}>
                  <Form.Item
                    name="companyName"
                    label={<p className="sm_text_medium">Official supplier Name</p>}
                    rules={[{ required: true, message: "Enter supplier name" }]}>
                    <Input placeholder="supplier name" />
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
                      { required: true, message: "Enter phone number" },
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
                name="supplierOf"
                label={<p className="sm_text_medium">Supplier of</p>}
                rules={[{ required: true, message: "Select what this supplier will supply" }]}>
                <Select
                  style={{ maxWidth: "75%" }}
                  mode="multiple"
                  placeholder="Hotels, Flights,Transfere etc..."
                  options={[
                    { label: "Hotels", value: "HOTELS" },
                    { label: "Flights", value: "FLIGHTS" },
                    { label: "Experiences", value: "EXPERIENCES" },
                    { label: "Transfers", value: "TRANSFERS" },
                    { label: "Package", value: "PACKAGES" },
                  ]}
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
              <Row gutter={[16, 16]}>
                <Col lg={8}>
                  <Form.Item
                    name="country"
                    label={<p className="sm_text_medium">Country</p>}
                    rules={[{ required: true, message: "Select country" }]}>
                    <CountryInput placeholder={"Country"} suffixIcon={<></>} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    name="city"
                    label={<p className="sm_text_medium">City</p>}
                    rules={[{ required: true, message: "Select city" }]}>
                    <CityInput />
                  </Form.Item>
                </Col>
                <Col lg={8}>
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

export default AddSupplier;
