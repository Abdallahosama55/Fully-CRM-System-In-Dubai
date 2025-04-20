import React, { useState } from "react";
// style
import "./styles.css";
import travel_package_default_image from "assets/images/travel_package_default_image.jpg";
import {
  Button,
  Carousel,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Image,
  InputNumber,
  message,
  Modal,
  Row,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import Description from "components/common/Description";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { DateSVG } from "assets/jsx-svg";
import CounterInput from "components/common/CounterInput";
import { PACKAGE_OFFERED_TYPES } from "constants/PACKAGE_TYPES";
import useCustomizeTrip from "services/travel/booking/Package/Mutations/useCustomizeTrip";
import ROUTER_URLS from "constants/ROUTER_URLS";

const areArraysEqual = (details, destinationNights) => {
  if (details.length !== destinationNights.length) {
    return false;
  }

  return details.every((detail) =>
    destinationNights.some(
      (dn) => dn.destination === detail.destination && dn.NumberOfNights === detail.night,
    ),
  );
};

const PackageCard = ({ data, searchInfo }) => {
  const navigate = useNavigate();
  const [isCustomiseOpen, setIsCustomiseOpen] = useState(false);
  const [form] = useForm();
  const child = Form.useWatch("child", form);
  const customizeTrip = useCustomizeTrip({
    onSuccess: (res, payload) => {
      navigate(ROUTER_URLS.TRAVEL.PACKAGES.VIEW.replace(":id", res), {
        state: {
          ...payload,
          id: res,
          searchDestination: searchInfo?.destination?.city || searchInfo?.destination?.location,
        },
      });
    },
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });
  const handelFinish = (values) => {
    const temp = {
      ...values,
      tripId: data?.id,
      date: values?.date ? dayjs(values?.date).format("YYYY-MM-DD") : undefined,
      childs: Array.isArray(values?.childs) ? values?.childs?.join("-") : undefined,
      details: values?.details
        ? values?.details
        : [
            {
              night: values?.nightsCount,
              destination: data?.destinations[0],
            },
          ],
    };

    if (
      temp?.adult === 1 &&
      temp?.child === 0 &&
      areArraysEqual(temp?.details, data?.destinationNights)
    ) {
      navigate(ROUTER_URLS.TRAVEL.PACKAGES.VIEW.replace(":id", data?.id), {
        state: {
          ...temp,
          id: data?.id,
          searchDestination: searchInfo?.destination?.city || searchInfo?.destination?.location,
        },
      });
      return;
    } else {
      customizeTrip.mutate(temp);
    }
  };
  return (
    <>
      {isCustomiseOpen && (
        <Modal
          width={"850px"}
          open={isCustomiseOpen}
          okText="Book"
          onOk={form.submit}
          onCancel={() => setIsCustomiseOpen(false)}>
          <Form form={form} layout="vertical" onFinish={handelFinish}>
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Form.Item
                  initialValue={data?.startDate ? dayjs(data?.startDate) : undefined}
                  label={"Tour Start Date"}
                  name={"date"}
                  rules={[{ required: true }]}>
                  <DatePicker
                    suffixIcon={<DateSVG />}
                    disabled={data?.type === PACKAGE_OFFERED_TYPES?.ONE_TIME}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              {data?.destinations?.length === 1 && (
                <Col span={8}>
                  <Form.Item
                    initialValue={data?.length ? data?.length : 1}
                    label={"Nights:"}
                    name={"nightsCount"}
                    rules={[{ required: true }]}>
                    <CounterInput min={1} fullWidth={true} />
                  </Form.Item>
                </Col>
              )}
              <Col span={data?.destinations?.length === 1 ? 4 : 8}>
                <Form.Item
                  initialValue={1}
                  name={"adult"}
                  label={"Adults"}
                  rules={[{ required: true }]}>
                  <CounterInput min={1} fullWidth={true} />
                </Form.Item>
              </Col>
              <Col span={data?.destinations?.length === 1 ? 4 : 8}>
                <Form.Item
                  initialValue={0}
                  name={"child"}
                  label={"Childs"}
                  rules={[{ required: true }]}>
                  <CounterInput min={0} fullWidth={true} />
                </Form.Item>
              </Col>
            </Row>
            {Number(child) > 0 &&
              [...new Array(Number(child))]?.map((_, index) => {
                return (
                  <Form.Item
                    key={index}
                    name={["childs", index]}
                    label={`Child ${index + 1} age`}
                    initialValue={6}
                    rules={[
                      { required: true },
                      {
                        validator: (_, value) => {
                          if (value && (Number(child) < 0 || Number(child) > 12)) {
                            return Promise.reject("Child age should be between 1 to 12");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <InputNumber className="w-100" min={1} max={12} placeholder="age" />
                  </Form.Item>
                );
              })}
            {data?.destinationNights?.length > 1 && <Divider />}
            {data?.destinationNights?.length > 1 && (
              <p className="sm_text_medium" style={{ color: "var(--font-primary)" }}>
                To add extra nights
              </p>
            )}
            {data?.destinationNights?.length > 1 && (
              <Row gutter={[12, 12]} style={{ margin: "0.75rem 0" }}>
                <Col span={4} style={{ padding: "0" }}>
                  <p className="sm_text_medium" style={{ color: "var(--font-secondary)" }}>
                    City
                  </p>
                </Col>
                <Col span={4}>
                  <p className="sm_text_medium" style={{ color: "var(--font-secondary)" }}>
                    Nights
                  </p>
                </Col>
              </Row>
            )}
            {data?.destinationNights?.length > 1 &&
              data?.destinationNights?.map((destination, index) => {
                return (
                  <Row key={index} gutter={12}>
                    <Col span={4}>
                      <Flex align="center">
                        <p
                          className="sm_text_medium"
                          style={{
                            color: "var(--font-secondary)",
                            textTransform: "capitalize",
                          }}>
                          {destination?.destination}
                        </p>
                      </Flex>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        name={["details", index, "night"]}
                        initialValue={destination?.NumberOfNights}>
                        <CounterInput min={destination?.NumberOfNights} />
                      </Form.Item>
                    </Col>
                    <Form.Item
                      hidden
                      name={["details", index, "destination"]}
                      initialValue={destination?.destination}
                    />
                  </Row>
                );
              })}
          </Form>
        </Modal>
      )}
      <div className="package_serach_card">
        <div>
          <Carousel dots={false} arrows infinite={false}>
            {data?.images?.map((el) => (
              <Image
                key={el?.id}
                src={el?.link || travel_package_default_image}
                width={"240px"}
                height={"180px"}
                className="package_serach_card_image"
                alt="package image"
                onError={(e) => {
                  e.target.src = travel_package_default_image;
                }}
              />
            ))}
          </Carousel>
        </div>
        <div>
          <Typography.Paragraph
            className="lg_text_bold"
            level={5}
            style={{ color: "var(--gray-700)", marginBottom: "0.5rem" }}>
            {data?.name}{" "}
            <Typography.Text
              className="md_text_regular fw-14"
              style={{ color: " var(--font-secondary)" }}>
              {data?.length} Nights
            </Typography.Text>
          </Typography.Paragraph>
          {Array.isArray(data?.destinations) && data?.destinations?.length > 0 && (
            <Typography.Paragraph
              className="xs_text_regular"
              style={{ color: "var(--gray-500)", marginBottom: "0rem" }}>
              Cities covered:{" "}
              <span style={{ textTransform: "capitalize" }}>
                {new Intl.ListFormat("en", {
                  style: "long",
                  type: "conjunction",
                }).format(data?.destinations)}
              </span>
            </Typography.Paragraph>
          )}
          {data?.startDate && data?.endDate && (
            <Typography.Paragraph
              className="xs_text_regular"
              style={{ color: "var(--gray-500)", marginBottom: "0rem" }}>
              {dayjs(data?.startDate)?.format("MMM DD, YYYY")} -{" "}
              {dayjs(data?.endDate)?.format("MMM DD, YYYY")}
              <span style={{ textTransform: "capitalize" }}>
                {new Intl.ListFormat("en", {
                  style: "long",
                  type: "conjunction",
                }).format(data?.destinations)}
              </span>
            </Typography.Paragraph>
          )}
          <Description description={data?.description} rows={3} />
        </div>
        <div className="book_section">
          <Typography.Paragraph
            className="fz-18 fw-700"
            style={{ color: "#313343", marginBottom: "0rem" }}>
            ${data?.price}
          </Typography.Paragraph>
          <Button type={"primary"} className="w-100" onClick={() => setIsCustomiseOpen(true)}>
            Customise & Book
          </Button>
        </div>
      </div>
    </>
  );
};

export default PackageCard;
