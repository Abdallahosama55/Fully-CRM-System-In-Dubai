import { Button, Col, DatePicker, Empty, Form, Input, message, Row, TimePicker } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { DateSVG, SearchSVG, TimeSVG } from "assets/jsx-svg";
import LoadingPage from "components/common/LoadingPage";
import LocationInput from "components/common/LocationInput";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import TransferCard from "./components/TransferCard";
import Filters from "./components/Filters";
import useGetTransferSearchResults from "services/travel/booking/transfer/Queries/useGetTransferSearchResults";
import { ONLINE_BOOKING_TABS_KEYS } from "..";
import useGetTransferSearchResultsClient from "services/travel/client_side/booking/transfer/Queries/useGetTransferSearchResultsClient";
import EVENTS_MESSAGE_TYPES from "constants/EVENTS_MESSAGE_TYPES";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";
const TransfersTab = ({ setTabContent, isInIframe, dataFromBookingWidget }) => {
  const [form] = useForm();
  const [results, setResults] = useState([]);
  const [filterdResults, setFilterdResults] = useState([]);
  const from = useWatch("from", form);
  const to = useWatch("to", form);
  const date = useWatch("date", form);
  const time = useWatch("time", form);
  const pax = useWatch("pax", form);
  // RECIVE THE DATA FROM THE BOOKING WIDGATE
  useEffect(() => {
    console.log(dataFromBookingWidget, "dataFromBookingWidget");
    if (
      dataFromBookingWidget &&
      !isInIframe &&
      dataFromBookingWidget.activeTab === ONLINE_BOOKING_TABS_KEYS?.TRANSFER &&
      (!results || results.length === 0)
    ) {
      form.setFieldsValue({
        ...dataFromBookingWidget,
        date: dataFromBookingWidget?.date ? dayjs(dataFromBookingWidget?.date) : dayjs(),
        time: dataFromBookingWidget?.time ? dayjs(dataFromBookingWidget?.time, "HH:mm") : dayjs(),
      });
    }
  }, [dataFromBookingWidget, isInIframe]);

  const mapCenter = useMemo(
    () => ((from && from?.lat, from?.lng) ? [from?.lat, from?.lng] : [51.505, -0.09]),
    [from],
  );
  const mapDirections = useMemo(
    () =>
      from && from?.lat && from?.lng && to && to?.lat && to?.lng
        ? {
            source: {
              lat: from?.lat,
              lng: from?.lng,
            },
            destination: {
              lat: to?.lat,
              lng: to?.lng,
            },
          }
        : undefined,
    [from, to],
  );

  const transferSearchResults = useGetTransferSearchResultsClient(
    {
      from,
      to,
      pax,
      date: dayjs(date).format("YYYY-MM-DD"),
      time: dayjs(time).format("HH:mm"),
    },
    { enabled: false },
  );

  useEffect(() => {
    if (transferSearchResults.data) {
      setResults(transferSearchResults.data);
      setFilterdResults(transferSearchResults.data);
    }

    if (transferSearchResults?.data && transferSearchResults?.data.length === 0) {
      message.warning("No available transfers for your search");
    }
  }, [transferSearchResults.data, transferSearchResults.isSuccess]);

  useEffect(() => {
    if (isInIframe) {
      return;
    }

    if (transferSearchResults.isLoading || transferSearchResults.isFetching) {
      setTabContent(<LoadingPage />);
    } else if (results.length === 0) {
      setTabContent(
        <div className="mt-1 mb-1 center-items" style={{ minHeight: "450px" }}>
          <Empty
            image={empty_booking_screen}
            description={
              <p style={{ textAlign: "center" }}>
                Please fill the fields above to see result here.
              </p>
            }
          />
        </div>,
      );
    } else if (results.length > 0) {
      setTabContent(
        <Row gutter={[24, 16]}>
          <Col lg={6} sm={24}>
            <Filters
              setFilterdResults={setFilterdResults}
              results={results}
              center={mapCenter}
              directions={mapDirections}
            />
          </Col>
          <Col lg={18} sm={24}>
            <Row gutter={[12, 12]}>
              {results.length > 0 && filterdResults?.length !== 0 ? (
                filterdResults?.map((el) => (
                  <TransferCard
                    key={el.id}
                    transfer={el}
                    searchInfo={{
                      from,
                      to,
                      date,
                      time,
                      pax,
                    }}
                  />
                ))
              ) : (
                <Empty
                  className="w-100"
                  style={{
                    padding: "5rem 0",
                    borderRadius: "8px",
                    border: "1px solid var(--gray-300)",
                  }}
                  image={empty_booking_screen}
                  description={<p style={{ color: "#314155" }}>No vehicles match your filters</p>}
                />
              )}
              {}
            </Row>
          </Col>
        </Row>,
      );
    }
  }, [transferSearchResults?.isLoading, results, filterdResults, from, to, isInIframe]);

  const handelSearch = (values) => {
    if (isInIframe) {
      window.parent.postMessage(
        {
          type: EVENTS_MESSAGE_TYPES.CHANGE_PAGE_EVENT,
          url: CLIENT_ROUTER_URLS.BOOKING.ONLINE_BOOKING,
          data: {
            ...values,
            date: dayjs(date).format("YYYY-MM-DD"),
            time: dayjs(time).format("HH:mm"),
            activeTab: ONLINE_BOOKING_TABS_KEYS.TRANSFER,
          },
        },
        "*",
      );
      return;
    }
    transferSearchResults.refetch();
  };

  return (
    <Form form={form} onFinish={handelSearch}>
      <Row gutter={[10, 10]}>
        <Col lg={22}>
          <Row gutter={[10, 10]}>
            <Col xs={24} lg={6}>
              <Form.Item
                name={"from"}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Enter from location");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <LocationInput prefix={<SearchSVG />} placeholder={"From"} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={6}>
              <Form.Item
                name={"to"}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Enter from location");
                      }

                      if (value && value?.country && value?.country !== from?.country) {
                        return Promise.reject("Must be in same country");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <LocationInput prefix={<SearchSVG />} placeholder={"To"} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={6}>
              <Form.Item
                name="date"
                required
                initialValue={dayjs()}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Add transfer date");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <DatePicker
                  disabledDate={(current) => {
                    if (current && dayjs(current).isBefore(dayjs())) {
                      return true;
                    }
                    return false;
                  }}
                  className="w-100"
                  suffixIcon={<DateSVG />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={3}>
              <Form.Item
                name="time"
                required
                initialValue={dayjs()}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Add transfer time");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <TimePicker format={"hh:mm a"} className="w-100" suffixIcon={<TimeSVG />} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={3}>
              <Form.Item
                name="pax"
                required
                initialValue={1}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Enter paxes");
                      }

                      if (value < 1) {
                        return Promise.reject("At least 1");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input type="number" min={1} placeholder="Pax" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col lg={2}>
          <div className="d-flex" style={{ justifyContent: "flex-end" }}>
            <Button
              icon={<SearchSVG color="#fff" />}
              type="primary"
              style={{ padding: "10px 8px" }}
              htmlType="submit">
              Search
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default TransfersTab;
