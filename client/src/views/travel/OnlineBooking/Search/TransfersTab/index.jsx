import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";

import { SearchSVG } from "assets/jsx-svg";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import { useSearchEngine } from "services/travel/dashboard";
import dayjs from "dayjs";
import AirportsAccommodationInput from "components/common/AirportsAccommodationInput";
import { ArrowRightOutlined, SwapOutlined } from "@ant-design/icons";
import Filters from "./components/Filters";
import TransferCard from "./components/TransferCard";
import TurboLoadingPage from "components/common/TurboLoadingPage";
const PAGE_SIZE = 10;
const TransfersTab = ({ setTabContent }) => {
  const [form] = useForm();
  const [total, setTotal] = useState(10);
  const search = Form.useWatch(["search"], form);
  const [results, setResults] = useState([]);
  const [filterdResults, setFilterdResults] = useState([]);
  const [page, setPapge] = useState(1);

  const searchEngine = useSearchEngine({
    onSuccess: (res) => {
      if (res.rows?.length > 0) {
        setResults(res?.rows);
        setFilterdResults(res?.rows);
        setTotal(res?.count);
      }
    },
    onError: (error) => {
      console.log(error, "error");
      message?.error("Something went wrong");
    },
  });

  const handelSearch = ({ search }) => {
    const data = {
      ...search,
      pickupPoint: search.from.type,
      dropOffPoint: search.to.type,
      pickupLocation: search.from.id,
      dropOffLocation: search.to.id,
      pax: search.pax,
      type: search.type,
      page,
      size: PAGE_SIZE,
    };

    searchEngine.mutate(data);
  };

  useEffect(() => {
    if (searchEngine.isPending) {
      setTabContent(<TurboLoadingPage height="calc(100dvh - 200px)"/>);
    } else if (results?.length === 0) {
      setTabContent(
        <div className="mt-1 mb-1 center-items" style={{ minHeight: "450px" }}>
          <Empty
            image={empty_booking_screen}
            description={<p>Please fill the fields above to see result here.</p>}
          />
        </div>,
      );
    } else if (results?.length > 0) {
      setTabContent(
        <Row gutter={[24, 16]}>
          <Col lg={6} sm={24}>
            <Filters setFilterdResults={setFilterdResults} results={results} />
          </Col>
          <Col lg={18} sm={24}>
            <Row gutter={[12, 12]}>
              {results.length > 0 && filterdResults?.length !== 0 ? (
                filterdResults?.map((el) => (
                  <TransferCard key={el.id} transfer={el} searchInfo={{ ...search }} />
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
  }, [searchEngine?.data?.rows?.length, searchEngine?.isPending, setTabContent]);

  {
    /* useEffect(() => {
    form.setFieldsValue({
      pax: 1,
      returning: dayjs(),
      departing: dayjs(),
    });
  }, [form]); */
  }

  {
    /* useEffect(() => {
    form.setFieldsValue({
      returning: DepartingWtshing?.add(1, "day"),
    });
  }, [DepartingWtshing, form]); */
  }

  {
    /* const disabledDate = (current) => {
    if (current && current < DepartingWtshing.startOf("day")) {
      return true;
    }
    return false;
  }; */
  }

  return (
    <Form form={form} layout="vertical" onFinish={handelSearch}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          {" "}
          <Form.Item name={["search", "type"]} initialValue={"TWO_WAY"}>
            <Radio.Group>
              <Radio value={"TWO_WAY"}>
                <SwapOutlined /> Round Trip
              </Radio>
              <Radio value={"ONE_WAY"}>
                <ArrowRightOutlined /> One Way
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col lg={22}>
          <Row gutter={[10, 10]}>
            <Col xs={24} lg={5}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                label="From"
                name={["search", "from"]}>
                <AirportsAccommodationInput />
              </Form.Item>
            </Col>
            <Col xs={24} lg={5}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                label="To"
                name={["search", "to"]}>
                <AirportsAccommodationInput />
              </Form.Item>
            </Col>
            <Col xs={24} lg={4}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                label="Transfer Mode"
                name={["search", "transferMode"]}>
                <Select
                  placeholder="Select Transfer Mode"
                  options={[
                    { label: "group", value: "GROUP" },
                    { label: "private", value: "PRIVATE" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={search?.type === "ONE_WAY" ? 8 : 4}>
              <Form.Item
                initialValue={dayjs()}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                label="Departing"
                name={["search", "departing"]}>
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            {search?.type === "TWO_WAY" && (
              <Col xs={24} lg={4}>
                <Form.Item
                  initialValue={dayjs().add(1, "day")}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                  label={"Returning"}
                  name={["search", "returning"]}>
                  <DatePicker className="w-100" />
                </Form.Item>
              </Col>
            )}

            <Col xs={24} lg={2}>
              <Form.Item
                initialValue={1}
                // rules={[
                //   {
                //     required: checkboxValue ? true : false,
                //     message: "This field is required",
                //   },
                //   {
                //     validator: (_, value) => {
                //       if (value < 1) {
                //         return Promise.reject("Pax must be greater than 1");
                //       } else {
                //         return Promise.resolve();
                //       }
                //     },
                //   },
                // ]}
                label="Pax"
                name={["search", "pax"]}>
                <InputNumber className="w-100" min={1} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col lg={2} style={{ placeContent: "center", marginTop: "16px" }}>
          <div className="d-flex" style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
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
