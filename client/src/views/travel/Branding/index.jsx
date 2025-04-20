import React, { useEffect } from "react";
import BrandingTheme from "./components/BrandingTheme";
// style
import "./styles.css";
import usePageTitle from "hooks/usePageTitle";
import InvoiceTemplate from "./components/InvoiceTemplate";
import { useForm, useWatch } from "antd/es/form/Form";
import { Button, Col, FloatButton, Form, message, Row, Spin, Typography } from "antd";
import VoucherConfigure from "./components/VoucherConfigure";
import VoucherPreview from "./components/VoucherPreview";
import { DownloadSVG2, PrintSVG } from "assets/jsx-svg";
import { useDebounce } from "hooks/useDebounce";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import useGetBranding from "services/travel/branding/Queries/useGetBranding";
import useAddBranding from "services/travel/branding/Mutations/useAddBranding";
import LoadingPage from "components/common/LoadingPage";

const isValidJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const Branding = () => {
  usePageTitle("Branding");
  const brandingQuery = useGetBranding();
  const [form] = useForm();

  useEffect(() => {
    if (brandingQuery.data) {
      console.log("brandingQuery.data :>> ", brandingQuery.data);

      try {
        // Check if brandingQuery.data properties exist and are of the expected types
        const { logo, waterMark } = brandingQuery.data;

        // Validate logo and waterMark
        const validLogo = isValidJson(logo) ? JSON.parse(logo) : undefined;
        const validWaterMark = isValidJson(waterMark) ? JSON.parse(waterMark) : undefined;

        form.setFieldsValue({
          ...brandingQuery.data,
          logo: validLogo,
          waterMark: validWaterMark,
        });
      } catch (error) {
        console.log("Error occurred while setting form fields :>> ", error);
      }
    }
  }, [brandingQuery?.data]);

  const props = useWatch([], form);
  const debounceProps = useDebounce(props, 300);

  const addBrandingMutation = useAddBranding({
    onSuccess: () => {
      message.success("Branding saved successfully");
    },
    onError: (error) => {
      console.log("error :>> ", error);
      message.error("Something went wrong");
    },
  });

  const handelSave = () => {
    if (addBrandingMutation.isPending) return;

    form.validateFields().then((values) => {
      addBrandingMutation.mutate({
        ...values,
        voucherPhone: values?.voucherPhone,
        logo: typeof values?.logo === "object" ? JSON.stringify(values?.logo) : undefined,
        waterMark: typeof values?.logo === "object" ? JSON.stringify(values?.waterMark) : undefined,
      });
    });
  };

  if (brandingQuery.isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <FloatButton
        shape="circle"
        type="primary"
        onClick={handelSave}
        style={{
          insetInlineEnd: 70,
          insetBlockEnd: 10,
        }}
        icon={
          addBrandingMutation.isPending ? (
            <Spin size="small" indicator={<LoadingOutlined style={{ color: "white" }} spin />} />
          ) : (
            <SaveOutlined />
          )
        }
      />

      <Form form={form} layout="vertical" scrollToFirstError={{ behavior: "smooth" }}>
        <BrandingTheme />
        <div className="branding_section mt-1 invoice_section_container">
          <div>
            <Typography.Title level={5} className="fz-18 fw-600" style={{ marginBottom: 0 }}>
              Invoice Preview
            </Typography.Title>
            <Typography.Paragraph className="fz-12 fw-400">
              Preview of how the invoice will look on each types.
            </Typography.Paragraph>
          </div>
          <div className="white_page">
            <InvoiceTemplate {...debounceProps} />
          </div>
        </div>
        <Row gutter={[12, 12]} className="mt-1">
          <Col md={12} xs={24}>
            <VoucherConfigure />
          </Col>
          <Col md={12} xs={24}>
            <VoucherPreview {...debounceProps} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Branding;
