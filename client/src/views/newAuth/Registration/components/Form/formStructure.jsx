import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import TIME_ZONES from "constants/TIME_ZONES";
import useMutationOfficerRegistration from "services/unauth/useMutationOfficerRegistration";
import { useNotification } from "context/notificationContext";
import { useNavigate } from "react-router-dom";
import LanguageInput from "components/common/LanguageInputNotAuth";
import CountryInput from "components/common/CountryInput";
import CityInput from "components/common/CityInputNotAuth";

import { ArrowDownSVG } from "assets/jsx-svg";
import { OFFICER_TYPE } from "constants/BUYER_GROUB";

const FormStructure = ({ type }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { openNotificationWithIcon } = useNotification();
  const MutationOfficerRegistration = useMutationOfficerRegistration({
    onSuccess: () => {
      openNotificationWithIcon("success", "Suppliers Added sucessfully");
      navigate(`/vbooking-login`);
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.response.data.errors[0] || "Something Wrong");
    },
  });
  const handelFinish = (value) => {
    const data = {
      ...value,
      city: value.city?.city,
      cityId: value.city?.cityId,
      companyPhone: value?.companyPhone,
      phone: value?.phone,
      whatsapp: value?.whatsapp,
    };

    MutationOfficerRegistration.mutate({
      ...data,
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handelFinish}>
      <div className="form-container">
        <div className="form-title">Basic Information</div>
        <Form.Item hidden name="type" initialValue={type} />
        <Row gutter={[16, 4]}>
          <Col xs={24} md={12}>
            <Form.Item
              name={"companyName"}
              label={`Official ${type.charAt(0) + type.substring(1).toLowerCase()} name`}
              rules={[{ required: true }]}>
              <Input placeholder={`${type.charAt(0) + type.substring(1).toLowerCase()} name`} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="taxNumber" label="Tax number">
              <InputNumber placeholder="Tax number" className="w-100" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="companyEmail"
              label={`Official ${type.charAt(0) + type.substring(1).toLowerCase()} email`}
              rules={[
                { required: true, message: "Enter valid email" },
                { type: "email", message: "Enter valid email" },
              ]}>
              <Input placeholder="name@email.com" className="w-100" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="companyPhone" label="Company phone" rules={[{ required: true }]}>
              <PhoneNumberInput />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
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
          <Col xs={24} md={12}>
            <Form.Item
              name="languageCode"
              label={<p className="sm_text_medium">Language</p>}
              initialValue={navigator.language ? navigator.language?.split("-")[0] : ""}
              rules={[{ required: true, message: "Select language" }]}>
              <LanguageInput placeholder="language" />
            </Form.Item>
          </Col>
          {type === OFFICER_TYPE.SUPPLIER && (
            <Col span={24}>
              <Form.Item
                label={<p className="sm_text_medium">supplier Of</p>}
                name={"supplierOf"}
                className="w-100">
                <Select
                  allowClear
                  showSearch
                  mode="multiple"
                  className="custom-select w-100"
                  placeholder="supplier of"
                  suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                  options={[
                    { label: "Hotels", value: "HOTELS" },
                    { label: "Flights", value: "FLIGHTS" },
                    { label: "Experiences", value: "EXPERIENCES" },
                    { label: "Transfers", value: "TRANSFERS" },
                    { label: "All", value: null },
                  ]}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
        <div className="form-title">General Manager Info</div>
        <Row gutter={[16, 4]}>
          <Col xs={8} md={4}>
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
          <Col xs={16} md={8}>
            <Form.Item
              name="fullName"
              label="Full name"
              rules={[{ required: true, message: "Enter full name" }]}>
              <Input placeholder="Full name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Enter valid email" },
                { type: "email", message: "Enter valid email" },
              ]}>
              <Input placeholder="name@email.com" className="w-100" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <PhoneNumberInput placeholder="972 0595555555" maxLength={15} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="whatsapp" label="WhatsApp">
              <PhoneNumberInput />
            </Form.Item>
          </Col>
        </Row>
        <div className="form-title">Address</div>
        <Row gutter={[16, 4]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="country"
              label={<p className="sm_text_medium">Country</p>}
              rules={[{ required: true, message: "Select country" }]}>
              <CountryInput placeholder={"Country"} suffixIcon={<></>} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="city"
              label={<p className="sm_text_medium">City</p>}
              rules={[{ required: true, message: "Select city" }]}>
              <CityInput />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={24}>
          <Button
            loading={MutationOfficerRegistration.isPending}
            htmlType="submit"
            className="register-button">
            Register
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormStructure;
