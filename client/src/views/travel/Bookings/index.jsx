import {
  Button,
  Col,
  DatePicker,
  Empty,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from "antd";
import React, { useMemo, useState } from "react";
import useGetBookings from "services/travel/booking/common/Queries/useGetBookings";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import dayjs from "dayjs";
// style
import "./styles.css";
import {
  BookingsAll,
  BookingStatusSVG,
  BuildingSVG,
  CalendarSVG,
  CloseSVG,
  ExperiencesSVG,
  FilterFunnelSVG,
  GiftSVG,
  GlobalSVG,
  MoneySVG,
  PlaneSVG,
  SearchSVG,
  TransferSVG,
  VisaSVG,
} from "assets/jsx-svg";
import BookingInfoCard from "./components/BookingInfoCard";
import usePageTitle from "hooks/usePageTitle";
import CustomTable from "components/CustomTable";
// images
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import useListBuyerGroub from "services/pricingModule/Queries/useListBuyerGroub";
import { useWatch } from "antd/es/form/Form";
import { useDebounce } from "hooks/useDebounce";
import Badge from "components/common/Badge";
import { FLIGHT_REQUEST_STATUS } from "constants/BOOKING";
import AddManualBooking from "./components/AddManualBooking";
const Bookings = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [bookingType, setBookingType] = useState(BOOKINGS_TYPES.ALL);
  const [isAdvancedFilters, setIsAdvancedFilters] = useState(false);
  const [form] = Form.useForm();
  const filters = useWatch("filters", form);
  const advancedFilters = useWatch("advancedFilters", form);

  const debounceFilters = useDebounce(filters, 300);
  usePageTitle(`Bookings / ${bookingType.toLowerCase()}`, bookingType);
  // queries
  const buyerGroupsList = useListBuyerGroub();
  const bookingsQuery = useGetBookings(
    {
      page,
      size: pageSize,
      type: bookingType,
      ...(isAdvancedFilters
        ? {
            ...advancedFilters,
            bookingDate: advancedFilters?.bookingDate
              ? dayjs(advancedFilters?.bookingDate).format("YYYY-MM-DD")
              : undefined,
            serviceDate: advancedFilters?.serviceDate
              ? dayjs(advancedFilters?.serviceDate).format("YYYY-MM-DD")
              : undefined,
          }
        : debounceFilters),
    },
    { enabled: !isAdvancedFilters },
  );
  // Check if there is at least one entry with a fullName
  const hasFullName = useMemo(
    () => bookingsQuery?.data?.data?.some((booking) => booking.createdByEmployee?.fullName),
    [bookingsQuery.data],
  );

  return (
    <div className="bookings_page_container">
      <Flex align="start" justify="space-between" wrap="wrap">
        <div>
          <Tabs
            activeKey={bookingType}
            onChange={(key) => {
              setBookingType(key);
              setPage(1);
              setPageSize(10);
            }}
            items={[
              {
                key: BOOKINGS_TYPES.ALL,
                label: "All",
                icon: (
                  <BookingsAll fill={bookingType === BOOKINGS_TYPES.ALL ? "#FFF" : "#667085"} />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.FLIGHT,
                label: "Flight",
                icon: (
                  <PlaneSVG fill={bookingType === BOOKINGS_TYPES.FLIGHT ? "#FFF" : "#667085"} />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.ACCOMMODATION,
                label: "Hotel",
                icon: (
                  <BuildingSVG
                    fill={bookingType === BOOKINGS_TYPES.ACCOMMODATION ? "#FFF" : "#667085"}
                  />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.EXPERIENCE,
                label: "Experience",
                icon: (
                  <ExperiencesSVG
                    fill={bookingType === BOOKINGS_TYPES.EXPERIENCE ? "#FFF" : "#667085"}
                  />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.TRANSFER,
                label: "Rental",
                icon: (
                  <TransferSVG
                    fill={bookingType === BOOKINGS_TYPES.TRANSFER ? "#FFF" : "#667085"}
                  />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS,
                label: "Transfer",
                icon: (
                  <TransferSVG
                    fill={
                      bookingType === BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS ? "#FFF" : "#667085"
                    }
                  />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.PACKAGES,
                label: "Packages",
                icon: (
                  <GiftSVG fill={bookingType === BOOKINGS_TYPES.PACKAGES ? "#FFF" : "#667085"} />
                ),
                children: <></>,
              },
            ]}
          />
        </div>
        <AddManualBooking type={bookingType} refetch={bookingsQuery.refetch} />
      </Flex>

      <Form
        form={form}
        layout="vertical"
        onFinish={() => {
          bookingsQuery.refetch();
        }}>
        {!isAdvancedFilters && (
          <Row gutter={[16, 16]}>
            <Col lg={8}>
              <Form.Item name={["filters", "generalSearch"]}>
                <Input prefix={<SearchSVG />} placeholder="Search booking code, Agency" />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Row gutter={[16, 16]}>
                <Col lg={8}>
                  <div className="select-with-prefix">
                    <GlobalSVG className="select-prefix-icon" />
                    <Form.Item noStyle name={["filters", "buyerGroupId"]} className="w-100">
                      <Select
                        allowClear
                        suffixIcon={<></>}
                        showSearch
                        className="custom-select w-100"
                        placeholder="buyer groups"
                        options={buyerGroupsList?.data?.map((el) => ({
                          label: el?.name,
                          value: el.id,
                        }))}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="select-with-prefix">
                    <BookingStatusSVG className="select-prefix-icon" />
                    <Form.Item noStyle name={["filters", "bookingStatus"]} className="w-100">
                      <Select
                        suffixIcon={<></>}
                        allowClear
                        showSearch
                        className="custom-select w-100"
                        placeholder="Booking status"
                        options={[
                          {
                            label: "request pending",
                            value: FLIGHT_REQUEST_STATUS.REQUEST_PENDING,
                          },
                          { label: "finalized", value: FLIGHT_REQUEST_STATUS.FINALIZED },
                          { label: "cancelled", value: FLIGHT_REQUEST_STATUS.CANCELLED },
                          {
                            label: "request processing",
                            value: FLIGHT_REQUEST_STATUS.REQUEST_PROCESSING,
                          },
                          {
                            label: "credit card failed",
                            value: FLIGHT_REQUEST_STATUS.CREDIT_CARD_FAILED,
                          },
                          {
                            label: "amendment processing",
                            value: FLIGHT_REQUEST_STATUS.AMENDMENT_PROCESSING,
                          },
                          {
                            label: "cancellation processing",
                            value: FLIGHT_REQUEST_STATUS.CANCELLATION_PROCESSING,
                          },
                          {
                            label: "payment processing",
                            value: FLIGHT_REQUEST_STATUS.PAYMENT_PROCESSING,
                          },
                          {
                            label: "payment outstanding",
                            value: FLIGHT_REQUEST_STATUS.PAYMENT_OUTSTANDING,
                          },
                          {
                            label: "cancelled and refunded",
                            value: FLIGHT_REQUEST_STATUS.CANCELLED_AND_REFUNDED,
                          },
                          {
                            label: "alternative advised",
                            value: FLIGHT_REQUEST_STATUS.ALTERNATIVE_ADVISED,
                          },
                          { label: "reserved", value: FLIGHT_REQUEST_STATUS.RESERVED },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="select-with-prefix">
                    <MoneySVG className="select-prefix-icon" />
                    <Form.Item noStyle name={["filters", "paymentStatus"]} className="w-100">
                      <Select
                        suffixIcon={<></>}
                        allowClear
                        showSearch
                        className="custom-select w-100"
                        placeholder="Payment Status"
                        options={[
                          { label: "Confirmed", value: "Confirmed" },
                          { label: "Cancelled", value: "Cancelled" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <Button
                className="w-100"
                icon={<FilterFunnelSVG />}
                onClick={() => {
                  setIsAdvancedFilters(true);
                  form.resetFields();
                }}>
                Advanced
              </Button>
            </Col>
          </Row>
        )}
        {isAdvancedFilters && (
          <div className="advance_filters_card">
            <div className="space-between mb-1">
              <p className="md_text_bold" style={{ color: "var(--vbooking-b600)" }}>
                Advanced Filter
              </p>
              <CloseSVG
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsAdvancedFilters(false);
                  form.resetFields();
                }}
              />
            </div>
            <Row gutter={[16, 16]}>
              <Col lg={12}>
                <Form.Item
                  name={["advancedFilters", "generalSearch"]}
                  label={<p className="sm_text_medium">Search</p>}>
                  <Input
                    prefix={<SearchSVG />}
                    placeholder="Booking ID, Agency, Booking owner, Passenger name, Hotel name"
                  />
                </Form.Item>
              </Col>
              <Col lg={6}>
                <Form.Item
                  name={["advancedFilters", "bookingDate"]}
                  label={<p className="sm_text_medium">Booking Date</p>}>
                  <DatePicker
                    suffixIcon={<CalendarSVG color={"var(--vbooking-b600)"} />}
                    placeholder="Select Date"
                  />
                </Form.Item>
              </Col>
              <Col lg={6}>
                <Form.Item
                  name={["advancedFilters", "serviceDate"]}
                  label={<p className="sm_text_medium">Service Date</p>}>
                  <DatePicker
                    suffixIcon={<CalendarSVG color={"var(--vbooking-b600)"} />}
                    placeholder="Select Date"
                  />
                </Form.Item>
              </Col>
              <Col lg={6}>
                <div className="select-with-prefix">
                  <GlobalSVG className="select-prefix-icon" />
                  <Form.Item noStyle name={["advancedFilters", "buyerGroupId"]} className="w-100">
                    <Select
                      allowClear
                      showSearch
                      className="custom-select w-100"
                      placeholder="buyer groups"
                      options={buyerGroupsList?.data?.map((el) => ({
                        label: el?.name,
                        value: el.id,
                      }))}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col lg={6}>
                <div className="select-with-prefix">
                  <BookingStatusSVG className="select-prefix-icon" />
                  <Form.Item noStyle name={["advancedFilters", "bookingStatus"]} className="w-100">
                    <Select
                      allowClear
                      showSearch
                      className="custom-select w-100"
                      placeholder="Booking status"
                      options={[
                        { label: "Confirmed", value: "Confirmed" },
                        { label: "Cancelled", value: "Cancelled" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col lg={6}>
                <div className="select-with-prefix">
                  <MoneySVG className="select-prefix-icon" />
                  <Form.Item noStyle name={["advancedFilters", "paymentStatus"]} className="w-100">
                    <Select
                      allowClear
                      showSearch
                      className="custom-select w-100"
                      placeholder="Payment Status"
                      options={[
                        { label: "Confirmed", value: "Confirmed" },
                        { label: "Cancelled", value: "Cancelled" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col lg={6}>
                <div className="select-with-prefix">
                  <VisaSVG className="select-prefix-icon" />
                  <Form.Item noStyle name={["advancedFilters", "paymentType"]} className="w-100">
                    <Select
                      allowClear
                      showSearch
                      className="custom-select w-100"
                      placeholder="Payment Method"
                      options={[
                        { label: "Cash", value: "cash" },
                        { label: "Card", value: "card" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div className="d-flex mt-1" style={{ justifyContent: "flex-end" }}>
              <Space>
                <Button
                  onClick={() => {
                    bookingsQuery.refetch();
                    form.resetFields();
                  }}>
                  Clear Filter
                </Button>
                <Button type="primary" htmlType="submit">
                  Apply Filter
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Form>
      <CustomTable
        tableLayout="auto"
        loading={bookingsQuery.isLoading}
        dataSource={bookingsQuery?.data?.data}
        page={page}
        pageSize={pageSize}
        total={bookingsQuery?.data?.total}
        setPage={setPage}
        locale={{
          emptyText: (
            <Empty
              style={{ marginTop: "5rem", marginBottom: "5rem", background: "#fff" }}
              image={empty_booking_screen}
              description={
                <span className="fz-14 fw-500">
                  Start by creating a booking to view details here.
                </span>
              }
            />
          ),
        }}
        columns={[
          {
            title: "Date of booking",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date, rowData) => (
              <div>
                <p className="fz-12">{dayjs(date).format("YYYY/MM/DD")}</p>
                <p className="fz-12">{dayjs(date).format("hh:mm A")}</p>

                <p
                  className="fz-12 fw-600 d-flex"
                  style={{ alignItems: "center", marginTop: "0.5rem" }}>
                  <span className="outline_circle" />
                  My Office
                </p>
              </div>
            ),
          },
          {
            title: "Booking",
            dataIndex: "moduleType",
            key: "moduleType",
            render: (moduleType, rowData) => (
              <BookingInfoCard
                maxWidth={!hasFullName ? "20dvw" : "17dvw"}
                moduleType={moduleType}
                data={rowData}
              />
            ),
          },
          hasFullName && {
            title: "Booked by",
            dataIndex: "createdByEmployee",
            key: "createdByEmployee",
            ellipsis: true,
            render: (employee) => (
              <div style={{ maxWidth: "10dvw" }}>
                <Typography.Paragraph ellipsis className="fz-12 fw-500 table_pargraph">
                  {employee?.fullName}
                </Typography.Paragraph>
                <Typography.Paragraph ellipsis className="fz-12 fw-400 gc table_pargraph">
                  {employee?.email}
                </Typography.Paragraph>
              </div>
            ),
          },
          {
            title: "Passengers",
            dataIndex: "passengers",
            key: "passengers",
            ellipsis: true,
            render: (passengers) => (
              <div style={{ maxWidth: !hasFullName ? "17dvw" : "12dvw", minWidth: "70px" }}>
                {passengers?.map((passenger) => (
                  <Typography.Paragraph
                    key={passenger?.id || passenger}
                    ellipsis={{ tooltip: passenger?.fullName || passenger }}
                    className="fz-12 fw-400 table_pargraph">
                    {passenger?.fullName ? passenger?.fullName : passenger}
                  </Typography.Paragraph>
                ))}
              </div>
            ),
          },
          {
            title: "Service date",
            dataIndex: "serviceDates",
            key: "serviceDates",
            render: (dates) => (
              <div>
                {dates && dates.length > 0 && dates[0]?.fromDateTime ? (
                  <>
                    <p>
                      <Badge status="warning" className="fz-12">
                        {dates[0]?.fromDateTime
                          ? dayjs(dates[0].fromDateTime).format("YYYY/MM/DD")
                          : "No Start Date"}
                      </Badge>
                    </p>
                    {!dayjs(dates[0]?.fromDateTime).isSame(dayjs(dates[0]?.toDateTime), "day") && (
                      <p className="fz-12" style={{ marginTop: "4px" }}>
                        <Badge className="fz-12">
                          {dates[0]?.toDateTime
                            ? dayjs(dates[0].toDateTime).format("YYYY/MM/DD")
                            : "No End Date"}
                        </Badge>
                      </p>
                    )}
                  </>
                ) : (
                  <p className="fz-12" style={{ color: "red" }}>
                    No dates available
                  </p>
                )}
              </div>
            ),
          },
          {
            title: "Paid status",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (totalPrice, rowData) => {
              const statusMap = {
                FINALIZED: "success",
                CANCELLED: "error",
              };

              return (
                <div>
                  <p className="fz-14">
                    Price: <span className="fw-500">{totalPrice} USD</span>
                  </p>
                  <p className="fz-14">
                    Remaining: <span className="fw-500">{rowData?.remainingAmount || 0} USD</span>
                  </p>
                  <p style={{ marginTop: "4px" }}>
                    <Badge
                      status={rowData.remainingAmount !== 0 ? "success" : "error"}
                      className="fz-14 fw-500">
                      {rowData.remainingAmount !== 0 ? "Paid" : "Not Paid"}
                    </Badge>
                  </p>
                  {rowData?.status && <Badge status={statusMap?.[rowData?.status] || "grey"}>
                    {rowData?.status}
                  </Badge>}
                </div>
              );
            },
          },
        ].filter((el) => Boolean(el))}
      />
    </div>
  );
};

export default Bookings;
