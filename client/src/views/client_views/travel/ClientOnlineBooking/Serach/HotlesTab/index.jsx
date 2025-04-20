import { Button, Col, ConfigProvider, DatePicker, Empty, Form, message, Row } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { CalenderSVG3, LocationSVG2, SearchSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import { searchForClientHotels } from "services/travel/client_side/booking/Accommodation/Queries/useGetClientHotels";
// style
import "./styles.css"
import TravelersInput from "../../../../../../components/common/TravelaresInput";
import Filters from "./components/Filters";
import { useEffect, useState } from "react";
import HotelsResults from "./components/HotelsResults";
import AddressInput from "components/common/AddressInput";
import LoadingPage from "components/common/LoadingPage";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";
import EVENTS_MESSAGE_TYPES from "constants/EVENTS_MESSAGE_TYPES";
import { ONLINE_BOOKING_TABS_KEYS } from "..";

const HotlesTab = ({ setTabContent, isInIframe, dataFromBookingWidget }) => {
  const [form] = useForm();
  const arrival = useWatch("arrival", form);
  const [results, setResults] = useState([]);
  const [filterdResults, setFilterdResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // RECIVE THE DATA FROM THE BOOKING WIDGATE
  useEffect(() => {
    console.log(dataFromBookingWidget, "dataFromBookingWidget")
    if (dataFromBookingWidget && !isInIframe && dataFromBookingWidget.activeTab === ONLINE_BOOKING_TABS_KEYS?.HOTELS && (!results || results.length === 0)) {
      form.setFieldsValue({
        ...dataFromBookingWidget,
        arrival: dataFromBookingWidget?.arrival ? dayjs(dataFromBookingWidget?.arrival) : dayjs(),
        departure: dataFromBookingWidget?.departure ? dayjs(dataFromBookingWidget?.departure) : dayjs().add(1, 'day'),
      })

      handelFinish({
        ...dataFromBookingWidget,
        arrival: dataFromBookingWidget?.arrival ? dayjs(dataFromBookingWidget?.arrival) : dayjs(),
        departure: dataFromBookingWidget?.departure ? dayjs(dataFromBookingWidget?.departure) : dayjs().add(1, 'day'),
      })
    }
  }, [dataFromBookingWidget, isInIframe])

  useEffect(() => {
    if (isInIframe) {
      console.log(isInIframe, "HOTEL TAB IN IFRAME");
      return;
    }

    if (isLoading) {
      setTabContent(<LoadingPage />)
    } else if (results.length === 0) {
      setTabContent(<div className="mt-1 center-items" style={{ minHeight: "450px" }}>
        <Empty description={<p>We don't have available <br />properties for your search</p>} />
      </div>)
    } else {
      setTabContent(<Row className="mt-1" gutter={[16, 16]}>
        <Col lg={6} md={8} sm={24}>
          <Filters
            setFilterdResults={setFilterdResults}
            results={results}
          />
        </Col>
        <Col lg={18} md={16} sm={24}>
          <HotelsResults
            data={filterdResults}
            queryString={`?arrival=${dayjs(form.getFieldValue("arrival")).format("YYYY-MM-DD")}&departure=${dayjs(form.getFieldValue("departure")).format("YYYY-MM-DD")}&adults=${form.getFieldValue("travelers")?.adults}${form.getFieldValue("travelers")?.childsAges?.length > 0 ? "&children=" + form.getFieldValue("travelers")?.childsAges.join("-") : ""}`} />
        </Col>
      </Row>)
    }
  }, [isLoading, results, filterdResults, isInIframe])

  const handelFinish = (values) => {
    if (isInIframe) {
      console.log("HOTEL TAB IN IFRAME")
      window.parent.postMessage({
        type: EVENTS_MESSAGE_TYPES.CHANGE_PAGE_EVENT,
        url: CLIENT_ROUTER_URLS.BOOKING.ONLINE_BOOKING,
        data: {
          ...values,
          arrival: dayjs(values?.arrival)?.format("YYYY-MM-DD"),
          departure: dayjs(values?.departure)?.format("YYYY-MM-DD"),
          activeTab: ONLINE_BOOKING_TABS_KEYS.HOTELS,
        }
      }, '*');
      return;
    }

    setIsLoading(true);
    searchForClientHotels({
      arrival: dayjs(values.arrival).format("YYYY-MM-DD"),
      departure: dayjs(values.departure).format("YYYY-MM-DD"),
      night: Math.abs(dayjs(values.arrival).diff(dayjs(values.departure), "day")) + 1,
      location: values.location,
      adults: values.travelers?.adults,
      children:
        values.travelers?.childsAges?.length > 0 ? values.travelers?.childsAges.join("-") : undefined,
    }).then((res) => {
      if (res.length === 0) {
        message.warning("No available rooms with this requirements")
      }
      setResults(res);
      setFilterdResults(res);
    })
      .catch(() => {
        message.warning("No available rooms with this requirements")
        setResults([])
        setFilterdResults([])
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <ConfigProvider theme={{
      "components": {
        "DatePicker": {
          "cellHeight": 20,
          "cellWidth": 30,
          "textHeight": 40
        }
      }
    }}>
      <Form form={form} layout="vertical" onFinish={handelFinish}>
        <div className="serach_block">
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={22}>
              <Row gutter={[12, 12]}>
                <Col xs={24} lg={6} md={12}>
                  <Form.Item
                    name={"location"}
                    rules={[{
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject("Enter a location")
                        }

                        return Promise.resolve();
                      }
                    }]}
                    validateStatus={form.getFieldError('location').length ? 'error' : ''}
                  >
                    <AddressInput
                      className="w-100"
                      placeholder="Enter Location"
                      prefix={<LocationSVG2 />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={6} md={12}>
                  <Form.Item
                    name="arrival"
                    initialValue={dayjs()}
                    rules={[{ required: true, message: "Select check in" }]}>
                    <DatePicker
                      className="w-100"
                      placeholder="Check in"
                      suffixIcon={<CalenderSVG3 />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={6} md={12}>
                  <Form.Item
                    name="departure"
                    initialValue={dayjs().add(1, 'day')}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject("Select check out")
                          }

                          if (dayjs(value).isBefore(dayjs(arrival), "day")) {
                            return Promise.reject("Can't be before check in")
                          }

                          return Promise.resolve();
                        }
                      }]}
                  >
                    <DatePicker
                      className="w-100"
                      placeholder="Check out"
                      disabledDate={(date) => {
                        return dayjs(date).isBefore(dayjs(arrival), "day")
                      }}
                      suffixIcon={<CalenderSVG3 />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={6} md={12}>
                  <Form.Item
                    name="travelers"
                    required
                    initialValue={{ adults: 1 }}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject("Add travelers data");
                          }

                          if (value?.adults <= 0) {
                            return Promise.reject("Number of adults can't be 0");
                          }

                          if (value?.childs) {
                            if (value?.childs !== value.childsAges.length) {
                              console.log(value);
                              return Promise.reject("Enter all childs ages");
                            } else if (value.childsAges.find((age) => age > 17 || age < 0)) {
                              return Promise.reject("Childs ages must be between 0 and 17");
                            }
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <TravelersInput form={form} placeholder={"Guests"} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={2}>
              <Button
                type="primary"
                icon={<SearchSVG color={"#ffffff"} />}
                htmlType="submit"
                className="w-100 search_btn">
                Search
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </ConfigProvider>
  );
};
export default HotlesTab;
