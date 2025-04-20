import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Table,
  Typography,
} from "antd";
import { RateStarSVG, ShieldSVG, TimerSVG } from "assets/jsx-svg";
import ImagesGrid from "components/common/ImagesGrid";
import LoadingPage from "components/common/LoadingPage";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetExperianceSessions from "services/travel/booking/Experience/Queries/useGetExperianceSessions";
// style
import "./styles.css";
import { PASSENGER_PRICE_TYPE } from "constants/EXPERIENCE";
import Map from "components/common/Map";
import { useForm, useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import useGetExperiancePriceUpdates from "services/travel/booking/Experience/Queries/useGetExperiancePriceUpdates";
import ROUTER_URLS from "constants/ROUTER_URLS";
import Section from "../components/Section";
import useGetExperianceAgeLimit from "services/travel/booking/Experience/Queries/useGetExperianceAgeLimit";
import usePageTitle from "hooks/usePageTitle";
import Description from "components/common/Description";
import AddToQuotation from "components/AddToQuotation";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import { getSearchParamsFromURIComponent } from "utils/uri-params";
/*
{
    "adults": 1,
    "childs": 0,
    "infants": 0,
    "childsAges": [],
    "childsAgesString": "",
    "date": "2025-04-19",
    "location": "Cairo, Egypt",
    "isLocalBook": false,
    "participants": []
}
*/
const ViewExperiance = () => {
  const { bookingKey } = useParams();
  const { search } = useLocation();
  const searchParams = useMemo(() => getSearchParamsFromURIComponent(search), [search]);
  const navigate = useNavigate();

  // booking key
  const [_, productId] = bookingKey.split("|");
  const [activeRowKey, setActiveRowKey] = useState("1");

  const [form] = useForm();

  const childs = useWatch([activeRowKey, "childs"], form);
  const adults = useWatch([activeRowKey, "adults"], form);
  const date = useWatch([activeRowKey, "date"], form);
  const childsAges = useWatch([activeRowKey, "childsAges"], form);
  const sessionId = useWatch([activeRowKey, "sessionIds"], form);
  // API CALL
  const experianceSessionsQuery = useGetExperianceSessions(bookingKey, { enabled: !!bookingKey });
  const priceUpdatesQuery = useGetExperiancePriceUpdates(
    {
      productId: productId,
      adults: adults,
      children: childsAges?.join("-"),
      bookingKey,
    },
    { enabled: false },
  );

  const ageLimitQuery = useGetExperianceAgeLimit(productId);
  // set page title
  usePageTitle(
    experianceSessionsQuery?.data?.productData?.title
      ? experianceSessionsQuery?.data?.productData?.title
      : "",
  );

  useEffect(() => {
    // Filter the field names that are related to the activeRowKey
    const fieldsToValidate = Object.keys(form.getFieldsValue())?.[activeRowKey];

    // Validate the filtered fields
    form
      .validateFields(fieldsToValidate)
      .then((values) => {
        if (adults && date) {
          priceUpdatesQuery.refetch();
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo, "errorInfo");
      });
  }, [childsAges, adults]);

  const handelFinish = (values) => {
    navigate(ROUTER_URLS.TRAVEL.EXPERIANCES.BOOK + productId, {
      state: {
        bookingKey: priceUpdatesQuery?.data?.bookingKey,
        sessionId: values[activeRowKey]?.sessionIds,
        cancellationKey: experianceSessionsQuery?.data?.cancellationInfo?.key,
        productData: {
          ...experianceSessionsQuery?.data?.productData,
          images: experianceSessionsQuery?.data?.productImages,
        },
        categories: {
          adults: Number(values[activeRowKey]?.adults),
          childs: Number(values[activeRowKey]?.childs),
        },
      },
    });
  };

  if (experianceSessionsQuery.isLoading) {
    return <LoadingPage />;
  }

  console.log(searchParams?.date);
  return (
    <div className="view_experiance_page">
      <div className="page_content">
        <ImagesGrid
          images={experianceSessionsQuery?.data?.productImages?.map((el) => ({
            name: el?.alternateText,
            link: el?.url,
          }))}
        />
        <Flex align="center" gap={12} style={{ marginTop: "0.5rem" }}>
          <Typography.Title
            style={{ marginBottom: 0, textTransform: "capitalize" }}
            ellipsis
            level={2}
            className="fz-32 fw-700">
            {experianceSessionsQuery?.data?.productData?.title}
          </Typography.Title>
          {experianceSessionsQuery?.data?.productData?.rate && (
            <Flex align="center" gap={6}>
              <Flex align="center" gap={0}>
                {[...new Array(experianceSessionsQuery?.data?.productData?.rate)].map(
                  (el, index) => (
                    <RateStarSVG key={index} />
                  ),
                )}
              </Flex>
              <p>500 Reviews</p>
            </Flex>
          )}
        </Flex>
        <Flex align="center" justify="space-between" style={{ marginTop: "0.5rem" }}>
          <Flex align="center" gap={16} wrap={"wrap"}>
            <p className="info_with_icon color-primary">
              <ShieldSVG /> {experianceSessionsQuery?.data?.cancellationInfo?.type}
            </p>
            {experianceSessionsQuery?.data?.sessions?.length > 0 && (
              <p className="info_with_icon color-primary">
                <TimerSVG width={"22px"} height={"22px"} /> Flexible duration
              </p>
            )}
          </Flex>
          <p className="fz-20 fw-400 color-primary">
            From{" "}
            <span className="fw-600">
              ${priceUpdatesQuery?.data ? priceUpdatesQuery?.data?.finalPrice : "..."}
            </span>{" "}
            /{" "}
            {experianceSessionsQuery?.data?.priceType === PASSENGER_PRICE_TYPE.PER_PERSON
              ? "Person"
              : "Booking"}
          </p>
        </Flex>
        <Description
          description={experianceSessionsQuery?.data?.productData?.description}
          rows={5}
        />
        <Form form={form} layout="vertical" onFinish={handelFinish}>
          <Section title="Price & Offers" style={{ margin: "1rem 0" }} hasPaddingInBody={false}>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: "rgb(255,255,255)",
                    headerColor: "rgb(118,113,119)",
                    headerBorderRadius: 0,
                    rowSelectedBg: "rgb(232,238,255)",
                    rowSelectedHoverBg: "rgb(246,246,247)",
                    rowExpandedBg: "rgb(232,238,255)",
                  },
                },
              }}>
              <Table
                expandable={{
                  expandedRowRender: (record) => (
                    <Row
                      gutter={[12, 12]}
                      style={{ height: "fit-content", maxHeight: "250px", overflow: "auto" }}>
                      {[...new Array(Number(childs))].map((el, index) => {
                        return (
                          <Col md={6} xs={12} key={index}>
                            <Form.Item
                              name={[record.key, "childsAges", index]}
                              label={`Child ${index + 1} age`}
                              initialValue={searchParams?.childsAges?.[index]}
                              rules={[
                                {
                                  validator: (_, value) => {
                                    if (!value) {
                                      return Promise.reject("Enter child age");
                                    }

                                    if (value <= 0 || value > 17) {
                                      return Promise.reject("Enter valid child age");
                                    }

                                    if (!isNaN(ageLimitQuery.data) && value < ageLimitQuery.data) {
                                      return Promise.reject(
                                        `Child age must be grater than ${ageLimitQuery.data} years`,
                                      );
                                    }

                                    return Promise.resolve();
                                  },
                                },
                              ]}>
                              <Input
                                disabled={ageLimitQuery.isLoading}
                                type="number"
                                min={0}
                                max={17}
                              />
                            </Form.Item>
                          </Col>
                        );
                      })}
                    </Row>
                  ),
                  rowExpandable: (record) => record.key === activeRowKey && childs > 0,
                  expandIcon: () => <></>,
                  expandedRowKeys: [activeRowKey],
                }}
                rowSelection={{
                  type: "radio",
                  onChange: (selectedRowKeys) => {
                    setActiveRowKey(selectedRowKeys);
                  },
                  defaultSelectedRowKeys: [activeRowKey],
                }}
                dataSource={[
                  {
                    key: "1",
                    name: experianceSessionsQuery?.data?.productData?.title,
                    date: searchParams?.date,
                    adults: searchParams?.adults,
                    childs: searchParams?.childs,
                    price: priceUpdatesQuery?.data ? priceUpdatesQuery?.data?.finalPrice : "...",
                  },
                ]}
                columns={[
                  {
                    title: "Tour Option",
                    dataIndex: "name",
                  },
                  {
                    title: "Tour Date",
                    dataIndex: "date",
                    render: (date, rowData) => {
                      return (
                        <Form.Item
                          name={[rowData.key, "date"]}
                          initialValue={date ? dayjs(date) : null}
                          className="w-100">
                          <DatePicker className="w-100" />
                        </Form.Item>
                      );
                    },
                  },
                  {
                    title: "Adult",
                    dataIndex: "adults",
                    render: (adults, rowData) => {
                      return (
                        <Form.Item
                          name={[rowData.key, "adults"]}
                          initialValue={adults}
                          rules={[
                            {
                              validator: (_, value) => {
                                if (!value) {
                                  return Promise.reject("Enter adults");
                                }

                                if (value <= 0) {
                                  return Promise.reject("One adult required");
                                }

                                return Promise.resolve();
                              },
                            },
                          ]}>
                          <Input type={"number"} min={0} />
                        </Form.Item>
                      );
                    },
                  },
                  {
                    title: "Child",
                    dataIndex: "childs",
                    render: (childs, rowData) => {
                      return (
                        <Form.Item
                          name={[rowData.key, "childs"]}
                          initialValue={childs}
                          rules={[
                            {
                              validator: (_, value) => {
                                if (value && value < 0) {
                                  return Promise.reject("Can't be less than 0");
                                }

                                return Promise.resolve();
                              },
                            },
                          ]}>
                          <Input type={"number"} min={0} />
                        </Form.Item>
                      );
                    },
                  },
                  {
                    title: "Total Amount",
                    dataIndex: "price",
                    render: (price) => {
                      return <p className="fz-20 fw-500 bc">${price}</p>;
                    },
                  },
                ]}
                pagination={false}
              />
            </ConfigProvider>
          </Section>
          {experianceSessionsQuery?.data?.sessions?.length > 0 && (
            <Section title="Choose time options" className="mt-1 sessions_section">
              <Form.Item
                name={[activeRowKey, "sessionIds"]}
                rules={[{ required: true, message: "Select session" }]}
                initialValue={experianceSessionsQuery?.data?.sessions[0]?.id}>
                <Radio.Group>
                  {experianceSessionsQuery?.data?.sessions.map((session) => {
                    return (
                      <Radio key={session.id} value={session.id}>
                        {!session.fromDate &&
                        !session.toDate &&
                        !session.startTime &&
                        !session.endTime
                          ? `${dayjs().format("YYYY-MM-DD")} - ${dayjs().format("YYYY-MM-DD")}`
                          : session.fromDate &&
                            session.toDate &&
                            dayjs(session.fromDate).isSame(dayjs(session.toDate))
                          ? session.startTime && session.endTime
                            ? `${dayjs(session.startTime, "HH:mm:ss").format("hh:mm a")} - ${dayjs(
                                session.endTime,
                                "HH:mm:ss",
                              ).format("hh:mm a")}`
                            : `${dayjs(session.fromDate).format("YYYY-MM-DD")}`
                          : `${dayjs(session.fromDate).format("YYYY-MM-DD")} - ${dayjs(
                              session.toDate,
                            ).format("YYYY-MM-DD")}`}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            </Section>
          )}
          <p className="space-between" style={{ margin: "1rem 0" }}>
            <span className="fz-24 fw-700 gc">
              Total ${priceUpdatesQuery?.data ? priceUpdatesQuery?.data?.finalPrice : "..."}
            </span>
            <Flex align="center" gap={6}>
              <Button type="primary" htmlType="submit">
                Proceed
              </Button>
              <AddToQuotation
                item={{
                  id: productId,
                  type: QUOTATION_ITEM_TYPES.EXPERIENCE,
                  name: experianceSessionsQuery?.data?.productData?.title,
                  bookingKey: bookingKey + `|${sessionId}`,
                  arrivalDate:
                    date && dayjs(date)?.isValid() ? dayjs(date)?.format("YYYY-MM-DD") : "",
                  price: priceUpdatesQuery?.data?.finalPrice,
                  adults: adults ? Number(adults) : 1,
                  childs: childs ? Number(childs) : 1,
                }}
              />
            </Flex>
          </p>
        </Form>
        {experianceSessionsQuery?.data?.productData?.lat &&
          experianceSessionsQuery?.data?.productData?.lng && (
            <Section title="Location" hasPaddingInBody={false} className="mt-1">
              <Map
                zoom={13}
                height="250px"
                width="100%"
                fullscreenControl={true}
                zoomControl={true}
                trip={experianceSessionsQuery?.data?.agendas?.map((el, index) => ({
                  position: [Number(el.lat), Number(el.lng)], // Ensure positions are numbers
                  name: `${index + 1}) ${el.title}`,
                }))}
                center={[
                  Number(experianceSessionsQuery.data.productData.lat), // Convert lat to a number
                  Number(experianceSessionsQuery.data.productData.lng), // Convert lng to a number
                ]}
                markerLocation={
                  !experianceSessionsQuery?.data?.agendas ||
                  (Array.isArray(experianceSessionsQuery?.data?.agendas) &&
                    experianceSessionsQuery?.data?.agendas.length === 0)
                    ? [
                        Number(experianceSessionsQuery.data.productData.lat), // Convert lat to a number
                        Number(experianceSessionsQuery.data.productData.lng), // Convert lng to a number
                      ]
                    : []
                }
              />
            </Section>
          )}
      </div>
    </div>
  );
};

export default ViewExperiance;
