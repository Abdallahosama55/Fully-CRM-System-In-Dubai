import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { useForm } from "antd/es/form/Form";

// style
import "./styles.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getSearchParamsAsURIComponent } from "utils/uri-params";
import TurboLoadingPage from "components/common/TurboLoadingPage";
import { MessagesSVG } from "assets/jsx-svg";
import LatestOffers from "./components/LatestOffers";
import SalesAnalytics from "./components/SalesAnalytics";
import PaymentInformation from "./components/PaymentInformation";
import RecentQuotation from "./components/RecentQuotation";
import HomeSection from "./components/HomeSection";
import AnimatedNumber from "components/common/AnimatedNumber";
const AskGenieTab = ({ setTabContent, participants }) => {
  const [form] = useForm();

  useEffect(() => {
    setTabContent(
      <div>
        <LatestOffers />
        <Row gutter={[16, 16]}>
          <Col lg={14} md={24} xs={24}>
            <SalesAnalytics />
          </Col>
          <Col lg={5} md={12} xs={24}>
            <PaymentInformation />
          </Col>
          <Col lg={5} md={12} xs={24}>
            <RecentQuotation />
          </Col>
          <Col md={6} xs={12}>
            <HomeSection>
              <AnimatedSectionWithLabel
                value={40200}
                prefix="$"
                isFormated={true}
                label={"Total Income"}
              />
            </HomeSection>
          </Col>
          <Col md={6} xs={12}>
            <HomeSection>
              <AnimatedSectionWithLabel value={17000} label={"Total bookings"} />
            </HomeSection>
          </Col>
          <Col md={6} xs={12}>
            <HomeSection>
              <AnimatedSectionWithLabel value={12200} label={"Total Deals"} />
            </HomeSection>
          </Col>
          <Col md={6} xs={12}>
            <HomeSection>
              <AnimatedSectionWithLabel value={322} label={"Canceling Deals"} />
            </HomeSection>
          </Col>
          <Col md={8} xs={24}>
            <HomeSection>
              <p
                className="sm_text_medium"
                style={{ color: "var(--font-primary)", marginBottom: "8px" }}>
                Unpaid orders
              </p>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <AnimatedSectionWithLabel
                    value={1734}
                    label={"Total of unpaid orders"}
                    isFormated={true}
                    prefix="$"
                  />
                </Col>
                <Col span={12}>
                  <AnimatedSectionWithLabel
                    value={2345}
                    label={"Overdue debt"}
                    isFormated={true}
                    prefix="$"
                  />
                </Col>
              </Row>
              <Divider style={{ margin: "16px 0" }} />
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <AnimatedSectionWithLabel
                    value={3623}
                    label={"Total of unpaid non-refundable orders"}
                    isFormated={true}
                    prefix="$"
                  />
                </Col>
                <Col span={12}>
                  <AnimatedSectionWithLabel
                    value={2453}
                    label={"Total of unpaid refundable orders"}
                    isFormated={true}
                    prefix="$"
                  />
                </Col>
              </Row>
            </HomeSection>
          </Col>
          <Col md={8} xs={24}>
            <HomeSection>
              <p
                className="sm_text_medium"
                style={{ color: "var(--font-primary)", marginBottom: "8px" }}>
                Contract limits
              </p>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <AnimatedSectionWithLabel
                    value={78021}
                    label={"Limit for new non-refundable orders"}
                    isFormated={true}
                    prefix="$"
                  />
                </Col>
                <Col span={12}>
                  <AnimatedSectionWithLabel
                    value={45021}
                    label={"Overpayment"}
                    isFormated={true}
                    prefix="$"
                  />
                </Col>
              </Row>
              <Divider style={{ margin: "16px 0" }} />
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <AnimatedSectionWithLabel
                    value={122021}
                    label={"Deposit"}
                    isFormated={true}
                    prefix="$"
                  />
                </Col>
                <Col span={12}>
                  <AnimatedSectionWithLabel
                    value={150021}
                    label={"Credit limit"}
                    isFormated={true}
                    prefix="$"
                  />
                </Col>
              </Row>
            </HomeSection>
          </Col>
          <Col md={4} xs={12}>
            <HomeSection>
              <p
                className="sm_text_medium"
                style={{ color: "var(--font-primary)", marginBottom: "8px" }}>
                Free cancellation
              </p>
              <AnimatedSectionWithLabel value={346} label={"End in 24 hours"} />
              <Divider style={{ margin: "16px 0" }} />
              <AnimatedSectionWithLabel value={475} label={"End in 4 working days"} />
            </HomeSection>
          </Col>
          <Col md={4} xs={12}>
            <HomeSection>
              <p
                className="sm_text_medium"
                style={{ color: "var(--font-primary)", marginBottom: "8px" }}>
                Automatic cancellation
              </p>
              <AnimatedSectionWithLabel value={356} label={"End in 24 hours"} />
              <Divider style={{ margin: "16px 0" }} />
              <AnimatedSectionWithLabel value={735} label={"End in 4 working days"} />
            </HomeSection>
          </Col>
        </Row>
      </div>,
    );
  }, []);

  const handelFinish = () => {};

  return (
    <Form form={form} layout="vertical" onFinish={handelFinish}>
      <p className="lg_text_regular" style={{ color: "var(--font-secondary)" }}>
        What is your customer needs?
      </p>
      <Flex>
        <Form.Item name="ask_genie" noStyle>
          <textarea defaultChecked className="ask_genie_text_area" rows={"1"} />
        </Form.Item>
        <Button icon={<MessagesSVG />} type="primary" size="small">
          Ask Genie
        </Button>
      </Flex>
      <Divider />
      <Flex gap={8} wrap={true}>
        <button
          className="ask_genie_suggestion_button"
          onClick={() => {
            form.setFieldsValue({ ask_genie: "Show me latest hotel offers" });
          }}>
          Show me latest hotel offers
        </button>
        <button
          className="ask_genie_suggestion_button"
          onClick={() => {
            form.setFieldsValue({ ask_genie: "Create a new trip to Rome" });
          }}>
          Create a new trip to Rome
        </button>
        <button
          className="ask_genie_suggestion_button"
          onClick={() => {
            form.setFieldsValue({ ask_genie: "Find Family hotel in Dubai" });
          }}>
          Find Family hotel in Dubai
        </button>
        <button
          className="ask_genie_suggestion_button"
          onClick={() => {
            form.setFieldsValue({ ask_genie: "Build 7 days island hopping" });
          }}>
          Build 7 days island hopping
        </button>
      </Flex>
    </Form>
  );
};

const AnimatedSectionWithLabel = ({ value, prefix = "", isFormated = false, label }) => {
  return (
    <>
      <AnimatedNumber
        value={value}
        isFormated={isFormated}
        prefix={prefix}
        className="sm_display_semibold fw-600"
        style={{ color: "var(--font-primary)", marginBottom: "8px" }}
      />
      <p className="xs_text_regular" style={{ color: "var(--font-secondary)" }}>
        {label}
      </p>
    </>
  );
};
export default AskGenieTab;
