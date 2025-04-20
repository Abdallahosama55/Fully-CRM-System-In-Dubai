import { Button, Empty, Flex, Form, message, Modal, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { ArrowDownSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router-dom";
import useCancelAccommodationBook from "services/travel/booking/Accommodation/Mutations/useCancelAccommodationBook";
import useGetBookCancelPolicies from "services/travel/booking/Accommodation/Queries/useGetBookCancelPolicies";
const mockRooms = [
  {
    bookingsDetailId: 484,
    roomName:
      "small twin room, non-smoking, housekeeping every 3 days [for stays over 13 nights: every 7 days],1 twin trundle bed",
    roomPrice: 176.89,
    policies: [
      {
        id: 303,
        dateFrom: "2025-04-13T00:00:00.000Z",
        dateTo: "2025-04-17T00:00:00.000Z",
        refundPercentage: 100,
        fees: "10",
      },
      {
        id: 44,
        dateFrom: "2025-04-17T00:00:00.000Z",
        dateTo: "2025-04-20T00:00:00.000Z",
        refundPercentage: 50,
        fees: "0",
      },
      {
        id: 500,
        dateFrom: "2025-04-20T00:00:00.000Z",
        dateTo: "2025-04-21T00:00:00.000Z",
        refundPercentage: 0,
        fees: "0",
      },
    ],
  },
  {
    bookingsDetailId: 484,
    roomName: "TEST ROOM",
    roomPrice: 250,
    policies: [
      {
        id: 303,
        dateFrom: "2025-04-13T00:00:00.000Z",
        dateTo: "2025-04-17T00:00:00.000Z",
        refundPercentage: 100,
        fees: "10",
      },
      {
        id: 44,
        dateFrom: "2025-04-17T00:00:00.000Z",
        dateTo: "2025-04-20T00:00:00.000Z",
        refundPercentage: 50,
        fees: "0",
      },
    ],
  },
];
const AccommodationCancelModal = ({
  isOpen,
  close = () => {},
  onCancelBooking = () => {},
  refId,
  confirmationNumber,
}) => {
  const { id } = useParams();
  const [form] = useForm();
  // QUERY
  const cancelPoliciesQuery = useGetBookCancelPolicies(id);

  // MUTATIONS
  const cancelBook = useCancelAccommodationBook({
    onSuccess: () => {
      message.success("Your booking has been canceled successfully.");
      close();
      onCancelBooking();
    },
    onError: (e) => {
      message.error(e?.message);
    },
  });

  const handelFinish = (values) => {
    cancelBook.mutate({ ...values, refId, confirmationNumber });
  };

  /*
[
    {
        "bookingsDetailId": 484,
        "roomName": "small twin room, non-smoking, housekeeping every 3 days [for stays over 13 nights: every 7 days],1 twin trundle bed",
        "roomPrice": 176.89,
        "policies": [
            {
                "id": 303,
                "dateFrom": "2025-04-13T00:00:00.000Z",
                "dateTo": "2025-04-13T00:00:00.000Z",
                "refundPercentage": 100,
                "fees": "0"
            }
        ]
    }
]
*/
  return (
    <Modal
      centered
      width={1000}
      open={isOpen}
      onCancel={close}
      footer={null}
      title={
        <p className="fz-20 fw-600 color-primary" style={{ color: "#004fa2", fontWeight: 600 }}>
          Hotel Booking Cancellation
        </p>
      }>
      <p className="fz-14 color-secondary" style={{ marginBottom: "1rem" }}>
        You are about to cancel the booking. Please review the details carefully before cancelling.
      </p>
      {cancelPoliciesQuery?.data?.map((room) => {
        const dataSource = room?.policies?.map((policy, index) => ({
          ...policy,
          roomName: index === 0 ? room.roomName : "",
          roomPrice: index === 0 ? room.roomPrice : null,
          rowSpan: index === 0 ? room.policies.length : 0,
          key: `${room.bookingsDetailId}-${policy.id}`,
        }));

        return (
          <Table
            style={{ marginTop: "0.5rem" }}
            key={room.bookingsDetailId}
            loading={cancelPoliciesQuery?.isLoading}
            locale={{
              emptyText: (
                <Empty
                  imageStyle={{ height: "100px" }}
                  description="This booking does not have an available cancellation policy."
                />
              ),
            }}
            dataSource={dataSource}
            columns={[
              {
                title: "Room Name",
                dataIndex: "roomName",
                key: "roomName",
                width: "40%",
                render: (value, row, index) => ({
                  children: value,
                  props: {
                    rowSpan: row.rowSpan,
                  },
                }),
              },
              {
                title: "Room Price",
                dataIndex: "roomPrice",
                key: "roomPrice",
                render: (value, row, index) => ({
                  children: value !== null ? `$${value.toFixed(2)}` : null,
                  props: {
                    rowSpan: row.rowSpan,
                  },
                }),
              },
              {
                title: "Date From",
                dataIndex: "dateFrom",
                key: "dateFrom",
                render: (date) => dayjs(date).format("YYYY-MM-DD"),
              },
              {
                title: "Date To",
                dataIndex: "dateTo",
                key: "dateTo",
                render: (date) => dayjs(date).format("YYYY-MM-DD"),
              },
              {
                title: "Refund %",
                dataIndex: "refundPercentage",
                key: "refundPercentage",
                render: (val) => `${val}%`,
              },
              {
                title: "Fees",
                dataIndex: "fees",
                key: "fees",
              },
            ]}
            pagination={false}
          />
        );
      })}

      <Form form={form} layout="vertical" onFinish={handelFinish}>
        <Form.Item
          name={"cancellationReason"}
          style={{ marginTop: "0.5rem", width: "100%" }}
          rules={[{ required: true, message: "Select cancellation reason" }]}
          label={<p className="fz-14 color-secondary">Cancellation reason</p>}>
          <Select
            suffixIcon={<ArrowDownSVG />}
            placeholder="Choose reason for cancellation"
            options={[
              {
                label: "Guest wants to rescedule the booking",
                value: "Guest wants to rescedule the booking",
              },
              { label: "Found a cheaper option", value: "Found a cheaper option" },
              { label: "Guest plan got cancelled", value: "Guest plan got cancelled" },
              {
                label: "Found a better price/deal somewhere else",
                value: "Found a better price/deal somewhere else",
              },
              { label: "Others, enter the details down", value: "Others" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name={"cancellationDetails"}
          dependencies={["cancellationReason"]}
          rules={[
            {
              validator: (_, value) => {
                if (!value && form.getFieldValue("cancellationReason") === "Others") {
                  return Promise.reject("Type the cancellation reason");
                }
                return Promise.resolve();
              },
            },
          ]}
          label={<p className="fz-14 color-secondary">Cancellation details</p>}>
          <TextArea placeholder="Enter more details (Optional)" rows={4} />
        </Form.Item>
        <Flex align="center" justify="space-between">
          <Button onClick={close} type="primary">
            Keep Booking
          </Button>
          <Button htmlType="submit" type="primary" danger loading={cancelBook?.isPending}>
            Cancel Booking
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AccommodationCancelModal;
