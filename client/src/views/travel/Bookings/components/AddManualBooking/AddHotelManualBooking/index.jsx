import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Tabs,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { ArrowDownSVG, DeleteSVG, PluseSVG } from "assets/jsx-svg";
import CityInput from "components/common/CityInput";
import CountryInput from "components/common/CountryInput";
import NationalityInput from "components/common/NationalityInput";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import dayjs from "dayjs";
import { useDebounce } from "hooks/useDebounce";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import useManualBookingBookHotel from "services/travel/booking/ManualBooking/Accommodation/Mutations/useManualBookingBookHotel";
import useManualBookingListHotels from "services/travel/booking/ManualBooking/Accommodation/Queries/useManualBookingListHotels";
import useManualBookingListAgents from "services/travel/booking/ManualBooking/Queries/useManualBookingListAgents";
import useManualBookingListSuppliers from "services/travel/booking/ManualBooking/Queries/useManualBookingListSuppliers";
import isValidJson from "utils/isValidJson";
import ManualBookingRoomForm from "./ManualBookingRoomForm";
import RoomsTravelaresInput from "components/common/RoomsTravelaresInput";
import useManualBookingListHotelRooms from "services/travel/booking/ManualBooking/Accommodation/Queries/useManualBookingListHotelRooms";

const AddHotelManualBooking = ({ isOpen, close }) => {
  const [hotelNameSearch, setHotelNameSearch] = useState("");
  const debouncedHotelNameSearch = useDebounce(hotelNameSearch, 500);
  const [accommodationId, setAccommodationId] = useState(undefined);

  const [form] = useForm();
  const supplierId = useWatch("supplierId", form);
  const agentId = useWatch("agentId", form);
  const roomsPaxs = useWatch("roomsPaxs", form);
  const dateRange = useWatch("dateRange", form);
  useEffect(() => {
    form.setFieldValue("supplierId", undefined);
  }, [agentId]);

  const agentsList = useManualBookingListAgents();
  const suppliersList = useManualBookingListSuppliers({ agentId }, { enabled: !!agentId });
  const hotelList = useManualBookingListHotels(
    { supplierId, name: debouncedHotelNameSearch },
    { enabled: !!supplierId },
  );

  const roomsList = useManualBookingListHotelRooms(
    {
      accommodationId,
      rooms: roomsPaxs?.map((el) => {
        return {
          ...el,
          children: el?.childsAges?.join("-"),
        };
      }),
      supplierId,
      arrival:
        Array.isArray(dateRange) && dateRange[0]
          ? dayjs(dateRange[0]).format("YYYY-MM-DD")
          : undefined,
      departure:
        Array.isArray(dateRange) && dateRange[1]
          ? dayjs(dateRange[1]).format("YYYY-MM-DD")
          : undefined,
    },
    {
      enabled: !!accommodationId && !!roomsPaxs && !!supplierId && !!dateRange,
    },
  );
  const hotelOptions = useMemo(
    () => hotelList?.data?.pages?.map((el) => el?.rows)?.flat(),
    [hotelList?.data],
  );

  const bookHotel = useManualBookingBookHotel({
    onSuccess: () => {
      message.success("Booking added successfully");
      close();
    },
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });

  const handelFinish = (values) => {
    const totalSale = values?.rooms?.reduce((acc, room) => acc + room?.sale, 0);
    const totalCost = values?.rooms?.reduce((acc, room) => acc + room?.cost, 0);
    const temp = {
      ...values,
      isMeeting: false,
      accommodationId,
      country: values?.city?.country,
      city: values?.city?.city,
      cityId: values?.city?.id,
      sale: totalSale,
      cost: totalCost,
      agentMarginAmount: totalSale - totalCost,
      holderMobile: values?.holderMobile,
      arrival: values?.dateRange[0] ? dayjs(values?.dateRange[0]).format("YYYY-MM-DD") : undefined,
      departure: values?.dateRange[1]
        ? dayjs(values?.dateRange[1]).format("YYYY-MM-DD")
        : undefined,
      night:
        values?.dateRange[0] && values?.dateRange[1]
          ? dayjs(values?.dateRange[1]).diff(values?.dateRange[0], "d")
          : 0,
      rooms: values?.rooms?.map((room) => {
        return {
          ...room,
          adults: room?.categories?.adults || room?.adults,
          children: room?.categories?.childs || room?.children,
          paxes: room?.paxes?.map((pax) => {
            return {
              ...pax,
              dob: dayjs(pax?.dob)?.format("YYYY-MM-DD"),
              passportExpiry: dayjs(pax?.passportExpiry)?.format("YYYY-MM-DD"),
            };
          }),
        };
      }),
    };

    bookHotel.mutate(temp);
  };

  return (
    <Modal
      title={"Add Hotel Manual Booking"}
      open={isOpen}
      onOk={form.submit}
      okButtonProps={{ loading: bookHotel?.isPending }}
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
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item name="agentId" label="Agent" rules={[{ required: true }]}>
              <Select
                placeholder="Select Agent"
                suffixIcon={<ArrowDownSVG />}
                options={agentsList?.data?.map((el) => ({ label: el?.fullName, value: el?.id }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="supplierId" label="Supplier" rules={[{ required: true }]}>
              <Select
                placeholder="Select Supplier"
                suffixIcon={<ArrowDownSVG />}
                disabled={suppliersList?.data?.length === 0 || !agentId}
                options={suppliersList?.data?.map((el) => ({ label: el?.fullName, value: el?.id }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dateRange" label="Booking dates" rules={[{ required: true }]}>
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                disabledDate={(date) => {
                  if (dayjs(date).isBefore(dayjs(), "day")) {
                    return true;
                  }
                  return false;
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="roomsPaxs"
              label="Rooms"
              rules={[{ required: true }]}
              initialValue={[{ adults: 1 }]}>
              <RoomsTravelaresInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="accommodationName" label="Hotel name" rules={[{ required: true }]}>
              <AutoComplete
                onPopupScroll={(e) => {
                  if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
                    hotelList?.fetchNextPage();
                  }
                }}
                onSearch={() => {
                  if (accommodationId) setAccommodationId(undefined);
                }}
                onSelect={(value) => {
                  const hotel = hotelOptions?.find((el) => value === el?.name);
                  setAccommodationId(hotel?.id);
                  form.setFieldValue("city", {
                    city: hotel?.city,
                    id: hotel?.cityId || Math.random(),
                    country: hotel?.country,
                  });
                }}
                options={[
                  ...(hotelOptions?.length > 0
                    ? hotelOptions.map((el) => ({
                        label: el?.name,
                        value: el?.name,
                      }))
                    : hotelList?.isFetching
                    ? [
                        {
                          label: (
                            <Flex align="center" gap={8}>
                              <Spin size="small" /> <p>Searching for hotels...</p>
                            </Flex>
                          ),
                          value: "loading",
                          disabled: true,
                        },
                      ]
                    : [
                        {
                          label: <p>No hotels found</p>,
                          value: "no_results",
                          disabled: true,
                        },
                      ]),
                  ...(hotelList?.isFetchingNextPage
                    ? [
                        {
                          label: (
                            <Flex align="center" gap={8}>
                              <Spin size="small" /> <p>Loading more hotels...</p>
                            </Flex>
                          ),
                          value: "loading_more",
                          disabled: true,
                        },
                      ]
                    : []),
                ]}>
                <Input placeholder="name" />
              </AutoComplete>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="city" label="Hotel city" rules={[{ required: true }]}>
              <CityInput />
            </Form.Item>
          </Col>
          <Divider />
          {[...new Array(Number(roomsPaxs?.length || 1))].map((_, index) => (
            <ManualBookingRoomForm
              form={form}
              room={roomsList?.data?.[index]}
              key={index}
              roomIndex={index}
              roomPaxs={roomsPaxs?.[index]}
            />
          ))}
          <Col span={12}>
            <Form.Item name="holderName" label="Holder Name" rules={[{ required: true }]}>
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="holderEmail"
              label="Holder Email"
              rules={[{ required: true }, { type: "email", message: "Entar valid email" }]}>
              <Input type="email" placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="holderMobile" label="Holder Mobile" rules={[{ required: true }]}>
              <PhoneNumberInput />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddHotelManualBooking;
