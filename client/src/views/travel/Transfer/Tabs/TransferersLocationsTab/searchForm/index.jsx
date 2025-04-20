import React, { useEffect } from "react";
import { Button, Col, Flex, Form, InputNumber, Row, Select } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { ArrowDownSVG, PlusSVG } from "assets/jsx-svg";
import AirportsAccommodationInput from "components/common/AirportsAccommodationInput";
import AddTransfer from "../../../components/AddTransfer";
import { useDebounce } from "hooks/useDebounce";

const SearchForm = ({ DrawerAPI, setData, SearchAirportHotelTransferMutation }) => {
  const [form] = useForm();
  const search = useWatch("search", form);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const data = {
      ...search,
      pickupPoint: search?.pickupLocation && search?.pickupLocation?.type,
      pickupLocation: search?.pickupLocation && search?.pickupLocation?.id,
    };

    SearchAirportHotelTransferMutation(data);
  }, [debouncedSearch]);

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={[12, 12]}>
        <Col span={7}>
          <Form.Item name={["search", "pickupPoint"]} label="pickup Point">
            <Select
              suffixIcon={<ArrowDownSVG />}
              allowClear
              placeholder="Select"
              options={[
                { label: "All", value: "ALL" },
                { label: "Accomodation", value: "ACCOMODATION" },
                { label: "Airport", value: "AIRPORT" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={["search", "pickupLocation"]} label="From">
            <AirportsAccommodationInput allowClear />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Price"
                name={["search", "price"]}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Price cant be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <InputNumber className="w-100" min={0} placeholder="Price" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={2}>
          <Flex justify="end" vertical style={{ height: "100%" }}>
            <Form.Item>
              <Button
                type={"primary"}
                icon={<PlusSVG fill={"currentColor"} />}
                className="w-100"
                onClick={() => {
                  DrawerAPI.open("50%");
                  DrawerAPI.setDrawerContent(
                    <AddTransfer
                      DrawerAPI={DrawerAPI}
                      setData={setData}
                      onUpdate={() => {
                        SearchAirportHotelTransferMutation({
                          ...search,
                          pickupPoint: search?.pickupLocation && search?.pickupLocation?.type,
                          pickupLocation: search?.pickupLocation && search?.pickupLocation?.id,
                        });
                      }}
                    />,
                  );
                }}>
                Add
              </Button>
            </Form.Item>
          </Flex>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
