import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  message,
  Radio,
  Row,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { SearchSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import React, { useState } from "react";
import { ArrowRightOutlined, SwapOutlined } from "@ant-design/icons";
import AirportsAccommodationInput from "components/common/AirportsAccommodationInput";
import { useSearchEngine } from "services/travel/dashboard";
import TransferCard from "../TransferCard";

const AddNewTransferModal = ({ onClose = () => {} }) => {
  const [form] = useForm();
  const search = Form.useWatch(["search"], form);
  const [results, setResults] = useState();

  const searchEngine = useSearchEngine({
    onSuccess: (res) => {
      if (res.rows?.length > 0) {
        setResults(res?.rows);
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
      page: 1,
      size: 10,
    };

    searchEngine.mutate(data);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            cellHeight: 20,
            cellWidth: 30,
            textHeight: 40,
          },
        },
      }}>
      <Form form={form} layout="vertical" onFinish={handelSearch}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item name={["search", "type"]} initialValue={"TWO_WAY"} noStyle>
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
          <Col xs={24} lg={search?.type === "ONE_WAY" ? 10 : 5}>
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
            <Col xs={24} lg={5}>
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
          <Col xs={24} lg={3}>
            <Form.Item initialValue={1} label="Pax" name={["search", "pax"]}>
              <InputNumber className="w-100" min={1} />
            </Form.Item>
          </Col>
          <Col lg={1} style={{ placeContent: "center", marginTop: "16px" }}>
            <Button
              icon={<SearchSVG color="#fff" />}
              type="primary"
              block
              htmlType="submit"
              loading={searchEngine.isPending}
              style={{ width: "45px" }}
            />
          </Col>
        </Row>
      </Form>
      {Array.isArray(results) && results?.length > 0 && <Divider />}
      {Array.isArray(results) &&
        results?.length > 0 &&
        results?.map((el) => (
          <TransferCard
            data={el}
            key={el?.id}
            isAddItemCard={true}
            onAddItem={onClose}
            arrivalDate={dayjs(search?.departing).format("YYYY-MM-DD")}
            search={search}
            departureDate={
              search?.type === "TWO_WAY" && search?.returning
                ? dayjs(search?.returning).format("YYYY-MM-DD")
                : undefined
            }
            paxes={{ adults: search?.pax }}
          />
        ))}
    </ConfigProvider>
  );
};

export default AddNewTransferModal;
