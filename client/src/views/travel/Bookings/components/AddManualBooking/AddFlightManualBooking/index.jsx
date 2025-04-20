import { useEffect } from "react";
import { ArrowRightOutlined, SwapOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import { ArrowDownSVG } from "assets/jsx-svg";

import AirportInput from "components/common/AirportInput";
import useManualBookingListAgents from "services/travel/booking/ManualBooking/Queries/useManualBookingListAgents";
import useManualBookingListSuppliers from "services/travel/booking/ManualBooking/Queries/useManualBookingListSuppliers";
import TextEditor from "components/common/TextEditor";
import useManualBookingBookFlight from "services/travel/booking/ManualBooking/Accommodation/Mutations/useManualBookingBookFlight";
import Passengers from "./passengers";

//styles
import "./style.css";
import useManualGetListFligtInSpecficDate from "services/travel/booking/ManualBooking/Accommodation/Mutations/useManualGetListFligtInSpecficDate";
import dayjs from "dayjs";
import { disablePastDates } from "utils/disableDates";

const AddFilghtManualBooking = ({ isOpen, close,refetch }) => {
  const [form] = Form.useForm();

  const agentId = useWatch("agentId", form);
  const type = useWatch("type", form);
  const outboundFlightSupplierId = useWatch("outboundFlightSupplierId", form);
  const from = useWatch("from", form);
  const to = useWatch("to", form);
  const date = useWatch("Date", form);

  const returnFlightSupplierId = useWatch("returnFlightSupplierId", form);
  const returndDate = useWatch("returndDate", form);

  const adults = useWatch("adults", form);
  const children = useWatch("children", form);
  const infant = useWatch("infant", form);

  const agentsList = useManualBookingListAgents();
  const suppliersList = useManualBookingListSuppliers({ agentId }, { enabled: !!agentId });

  const bookFlight = useManualBookingBookFlight({
    onSuccess: () => {
      message.success("Booking added successfully");
      refetch()
      close();
    },
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });

  const flightList = useManualGetListFligtInSpecficDate({
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });
  const returedFlightList = useManualGetListFligtInSpecficDate({
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });

  useEffect(() => {
    if (outboundFlightSupplierId && from && to && date) {
      const data = {
        fromAirportId: from,
        toAirportId: to,
        supplierId: outboundFlightSupplierId,
        date: dayjs(date).format("YYYY-MM-DD"),
      };

      flightList.mutate(data);
    }
  }, [outboundFlightSupplierId, from, to, date]);

  useEffect(() => {
    if (returnFlightSupplierId && from && to && returndDate) {
      //because the flight will return to the start place,
      // so we make switching between from and to
      const data = {
        fromAirportId: to,
        toAirportId: from,
        supplierId: returnFlightSupplierId,
        date: dayjs(returndDate).format("YYYY-MM-DD"),
      };

      returedFlightList.mutate(data);
    }
  }, [returnFlightSupplierId, from, to, returndDate]);

  useEffect(() => {
    form.setFieldValue("outboundFlightSupplierId", undefined);
  }, [form, agentId]);

  const handelFinish = (value) => {
    delete value.Date;
    delete value.adults;
    delete value.children;
    delete value.from;
    delete value.to;
    delete value.infant;
    delete value.returndDate;

    const data = {
      ...value,
      passengers: Object.values(value.passengers).map((data) => {
        if (data.mobile) {
          return { ...data, mobile: data.mobile };
        } else {
          return { ...data };
        }
      }),
    };

    bookFlight.mutate(data);
  };

  return (
    <Modal
      title={"Add Flight Manual Booking"}
      open={isOpen}
      onOk={form.submit}
      okButtonProps={{ loading: bookFlight?.isPending }}
      onCancel={close}
      okText={"Add"}
      width={"800px"}
      centered>
      <Form
        onFinish={handelFinish}
        form={form}
        layout="vertical"
        style={{
          maxHeight: "calc(100dvh - 150px)",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 8px 0 6px",
        }}>
        <Form.Item name={"type"} initialValue={"ONE_WAY"}>
          <Radio.Group>
            <Radio value={"ONE_WAY"}>
              <ArrowRightOutlined /> One Way
            </Radio>
            <Radio value={"TWO_WAY"}>
              <SwapOutlined /> Round Trip
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Typography.Title level={4}>Outbound Flight</Typography.Title>
        <div className="manual-booking-flight-holder">
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item name={"agentId"} label="Agent" rules={[{ required: true }]}>
                <Select
                  placeholder="Select Agent"
                  suffixIcon={<ArrowDownSVG />}
                  options={agentsList?.data?.map((el) => ({ label: el?.fullName, value: el?.id }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"outboundFlightSupplierId"}
                label="Flight Supplier"
                rules={[{ required: true }]}>
                <Select
                  placeholder="Select Supplier"
                  suffixIcon={<ArrowDownSVG />}
                  disabled={suppliersList?.data?.length === 0 || !agentId}
                  options={suppliersList?.data?.map((el) => ({
                    label: el?.fullName,
                    value: el?.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item name={"from"} label="Where from?" rules={[{ required: true }]}>
                <AirportInput />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"to"} label="Where to?" rules={[{ required: true }]}>
                <AirportInput />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item name={"Date"} label="Departure Date" rules={[{ required: true }]}>
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                initialValue={0}
                name={"outboundFlightPrice"}
                label="Price"
                rules={[{ required: true }]}>
                <InputNumber min={0} max={999999999} className="w-100" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name={"outboundFlightId"} label="Flight" rules={[{ required: true }]}>
                <Select
                  disabled={!flightList?.data?.data}
                  options={flightList?.data?.data.map((el) => ({
                    label: el?.flightNo,
                    value: el?.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {type === "TWO_WAY" && (
          <>
            <Typography.Title level={4}>Return Flight</Typography.Title>
            <div className="manual-booking-flight-holder">
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <Form.Item
                    name={"returnFlightSupplierId"}
                    label="Flight Supplier"
                    rules={[{ required: true }]}>
                    <Select
                      placeholder="Select Supplier"
                      suffixIcon={<ArrowDownSVG />}
                      disabled={suppliersList?.data?.length === 0 || !agentId}
                      options={suppliersList?.data?.map((el) => ({
                        label: el?.fullName,
                        value: el?.id,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"returndDate"}
                    label="Returnd Date"
                    rules={[
                      { required: true, message: "Please select a date!" },
                      () => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.reject("Date is required!");
                          }
                          if (value && value.isBefore(date, "day")) {
                            return Promise.reject("You cannot select past dates!");
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}>
                    <DatePicker className="w-100" disabledDate={(curr) => disablePastDates(curr , dayjs())} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <Form.Item name={"returnFlightPrice"} label="Price" rules={[{ required: true }]}>
                    <InputNumber className="w-100" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={"returnFlightId"} label="Flight" rules={[{ required: true }]}>
                    <Select
                      disabled={!returedFlightList?.data?.data}
                      options={returedFlightList?.data?.data.map((el) => ({
                        label: el?.flightNo,
                        value: el?.id,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </>
        )}
        <div>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item name={"clientName"} label="Name" rules={[{ required: true }]}>
                <Input placeholder="Please write your name here" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"clientEmail"}
                label="Email"
                rules={[{ required: true }, { type: "email", message: "Entar valid email" }]}>
                <Input type="email" placeholder="Please write your email here" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <Form.Item
                name="adults"
                label="Adults"
                initialValue={1}
                rules={[
                  { required: true },
                  {
                    validator: (_, value) => {
                      if (value && Number(value) < 1) {
                        return Promise.reject("must be at least one");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <InputNumber className="w-100" min={1} max={100} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                initialValue={0}
                name="children"
                label="Children"
                rules={[{ required: true }]}>
                <InputNumber className="w-100" min={0} max={100} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item initialValue={0} name="infant" label="infant" rules={[{ required: true }]}>
                <InputNumber className="w-100" min={0} max={100} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item name="paymentType" label="payment Type" rules={[{ required: true }]}>
                <Select className="w-100" options={[{ label: "Cash", value: "cash" }]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="coast" label="Coast" rules={[{ required: true }]}>
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          {[...new Array(adults)].map((_, i) => (
            <Passengers key={i} type="Adult" number={i + 1} />
          ))}
          {children > 0 && <Divider />}
          {[...new Array(children)].map((_, i) => (
            <Passengers key={i} type="Child" number={i + 1} />
          ))}
          {infant > 0 && <Divider />}
          {[...new Array(infant)].map((_, i) => (
            <Passengers key={i} type="Infant" number={i + 1} />
          ))}
        </div>
        <Form.Item name="accountingNote" label="Accounting Note">
          <TextEditor minHeight={"120px"} />
        </Form.Item>
        <Form.Item name="bookingNote" label="Booking Note">
          <TextEditor minHeight={"120px"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFilghtManualBooking;
