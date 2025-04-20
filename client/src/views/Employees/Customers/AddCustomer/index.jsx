import React, { useState } from "react";
import {
  Breadcrumb,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Image,
  Select,
  message,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import Dragger from "antd/es/upload/Dragger";

import { CloseSVG, ImageRegularSVG } from "assets/jsx-svg";

import "./styles.css";
import CustomerService from "services/Customers/customer.service";
import { getBase64 } from "utils/getBase64";
import AddCancelButtons from "components/common/AddCancelButtons";
import PhoneNumberInputObjectValue from "components/common/PhoneNumberInputObjectValue";

const AddCustomer = () => {
  const [form] = Form.useForm();
  const [previewPic, setPreviewPic] = useState("");
  const [loading, setLoading] = useState(false);
  const type = Form.useWatch("type", form);

  const onFinish = async (values) => {
    setLoading(true);
    const getName = (type) => {
      if (type === "COMPANY") {
        return `${values.firstName}`;
      }
      return `${values.firstName} ${values.fatherName} ${values.grandfatherName} ${values.familyName}`;
    };
    const deskData = new FormData();

    values.email && deskData.append("email", values.email);
    values.type && deskData.append("fullName", getName(values.type));
    values.contactName && deskData.append("contactName", values.contactName);
    values.JobTitle && deskData.append("jobTitle", values.JobTitle);
    values.phoneNumber && deskData.append("telephone", values.phoneNumber);
    values.phone && deskData.append("mobile", values.phone.mobile);
    values.phone && deskData.append("prefix", values.phone.prefix);
    values.age && deskData.append("age", values.age);
    values.activityType && deskData.append("activityType", values.activityType);
    values.customerCategory && deskData.append("customerCategory", values.customerCategory);
    values.type && deskData.append("type", values.type);
    values.state && deskData.append("state", values.state);
    values.country && deskData.append("country", values.country);
    values.country && deskData.append("city", values.city);
    values.street && deskData.append("street", values.street);
    values.zipCode && deskData.append("zipCode", values.zipCode);
    values.deskPic && deskData.append("image", values.deskPic.fileList[0].originFileObj);

    try {
      await CustomerService.add(deskData);
      notification.success({ message: "Customer Created Successfully" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      notification.error({ message: error.response.data.message });
      setLoading(false);
    }

    console.log("Success:", deskData);
  };
  const onReset = () => {
    form.resetFields();
  };
  const props = {
    name: "file",
    multiple: false,
    action: false,
    maxCount: 1,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      const { status } = info.file;
      setPreviewPic(await getBase64(info.fileList[0].originFileObj));
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      <Breadcrumb
        className="breadcrumb-add-customer"
        items={[
          {
            title: "Management",
          },
          {
            title: (
              <Link to="/employee/management-customers" className="black">
                Customers
              </Link>
            ),
          },
          {
            title: <div className="blue">Add Customer</div>,
          },
        ]}
      />
      <section className="body-content add-customer">
        <div className="fz-16 fw-500">Basic Information</div>
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item name="type" initialValue="PERSON">
            <Radio.Group size="large" className="w-100 " name="type" defaultValue="PERSON">
              <Row>
                <Col>
                  <Radio className="fz-16" value="PERSON">
                    Person
                  </Radio>
                </Col>
                <Col offset={3}>
                  <Radio className="fz-16" value="COMPANY">
                    Company
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
          <Row justify={"space-between"} className="names h-100" align="bottom" gutter={[10, 10]}>
            <Col className="h-100 " sm={24} md={8}>
              <Form.Item name={"deskPic"} className="h-100">
                <Dragger
                  className=" h-100"
                  height={type === "PERSON" ? "128px" : "152px"}
                  showUploadList={false}
                  {...props}>
                  {previewPic && (
                    <>
                      <div className="basic-info-upload-img">
                        <Image preview={false} src={previewPic} style={{ maxHeight: "100%" }} />
                      </div>
                      <div
                        className="basic-info-upload-img-close"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewPic("");
                          form.setFieldValue("deskPic", undefined);
                        }}>
                        <CloseSVG />
                      </div>
                    </>
                  )}
                  <ImageRegularSVG />

                  <div className="fz-14 fw-500">Upload File </div>
                  <div className="fz-12 gray-color ">or drag and drop</div>
                </Dragger>
              </Form.Item>
            </Col>
            {type === "PERSON" && (
              <Col sm={24} md={16}>
                <Row gutter={[10, 10]} align={"bottom"}>
                  <Col sm={24} md={12}>
                    <Form.Item
                      name={"firstName"}
                      label={<div>Full Name</div>}
                      rules={[{ required: true, message: "first Name is required" }]}>
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <>
                    <Col sm={24} md={12}>
                      <Form.Item
                        name={"fatherName"}
                        rules={[
                          {
                            required: true,
                            message: "father Name is required",
                          },
                        ]}>
                        <Input placeholder="Father Name" />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={12}>
                      <Form.Item
                        name={"grandfatherName"}
                        rules={[
                          {
                            required: true,
                            message: "Grandfather Name is required",
                          },
                        ]}>
                        <Input placeholder="Grandfather Name" />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={12}>
                      <Form.Item
                        name={"familyName"}
                        rules={[
                          {
                            required: true,
                            message: "Family Name is required",
                          },
                        ]}>
                        <Input placeholder="Family Name" />
                      </Form.Item>
                    </Col>
                  </>
                </Row>
              </Col>
            )}
            {type === "COMPANY" && (
              <Col sm={24} md={16}>
                <Row gutter={[10, 10]} align={"bottom"}>
                  <Col xs={24}>
                    <Form.Item
                      name={"firstName"}
                      label={<div>Name</div>}
                      rules={[{ required: true, message: "first Name is required" }]}>
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Row gutter={[16, 24]}>
                      <Col sm={24} md={12}>
                        <Form.Item
                          name={"activityType"}
                          label={<div>Activity Type</div>}
                          rules={[
                            {
                              required: true,
                              message: "Activity Type is required",
                            },
                          ]}>
                          <Select
                            placeholder="Type"
                            allowClear
                            options={[
                              { label: "Type1", value: "Type1" },
                              { label: "Type2", value: "Type2" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col sm={24} md={12}>
                        <Form.Item name={"customerCategory"} label={<div>Contact Category</div>}>
                          <Select
                            placeholder="Type"
                            allowClear
                            options={[
                              { label: "Category1", value: "Category1" },
                              { label: "Category2", value: "Category2" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>

          <div>
            <div className="fz-16 fw-500 title">Address</div>
            <Row gutter={[10, 10]}>
              <Col sm={24} md={8}>
                <Form.Item name={"state"} label={<div>State</div>}>
                  <Select
                    placeholder="Type"
                    allowClear
                    options={[
                      { label: "Type1", value: "Type1" },
                      { label: "Type2", value: "Type2" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name={"country"} label={<div>Country</div>}>
                  <Select
                    placeholder="Type"
                    allowClear
                    options={[
                      { label: "Type1", value: "Type1" },
                      { label: "Type2", value: "Type2" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name={"city"} label={<div>City</div>}>
                  <Select
                    placeholder="Type"
                    allowClear
                    options={[
                      { label: "Type1", value: "Type1" },
                      { label: "Type2", value: "Type2" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name={"street"} label={<div>Street</div>}>
                  <Input placeholder="Write Here" />
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name={"zipCode"} label={<div>Zip Code</div>}>
                  <Input placeholder="000000" />
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item rules={[{ type: "email" }]} name={"email"} label={<div>Email</div>}>
                  <Input placeholder="example@mail.com" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <p className="fz-16 fw-500 section_title">Contact information</p>
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <div className="input_group">
                <p className="fz-14 input_label">Contact Name</p>
                <Form.Item name={"contactName"}>
                  <Input placeholder="Contact name" />
                </Form.Item>
              </div>
            </Col>
            <Col sm={24} md={12}>
              <div className="input_group">
                <p className="fz-14 input_label">Job title</p>
                <Form.Item name={"JobTitle"} initialValue="lucy">
                  <Select
                    style={{ width: "100%" }}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                    ]}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item className="input_label" label="Phone Number" name={"phoneNumber"}>
                <Input placeholder="Phone number" />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item className="input_label" name="phone" label="Mobile Number">
                <PhoneNumberInputObjectValue />
              </Form.Item>
            </Col>
          </Row>
          <p className="fz-16 fw-500 section_title">Added Fields</p>
          <Row gutter={12}>
            <Col sm={24} md={24}>
              <div className="input_group">
                <p className="fz-14 input_label">Age</p>
                <Form.Item name={"age"}>
                  <Input allowClear placeholder="Age" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row justify={"end"} className="buttons" gutter={[16, 0]}>
            <AddCancelButtons addLoading={loading} cancel={onReset} add={() => form.submit()} />
          </Row>
        </Form>
      </section>
    </>
  );
};

export default AddCustomer;
