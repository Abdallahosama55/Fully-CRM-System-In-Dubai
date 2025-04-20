import { Button, message, Skeleton, Table } from "antd";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router-dom";
import useGetExperianceSessions from "services/travel/booking/Experience/Queries/useGetExperianceSessions";
import useAddToQuotation from "services/travel/quotation/Mutations/useAddToQuotation";
/*
[
    {
        "id": 5179,
        "fromDate": "2025-03-08T00:00:00.000Z",
        "toDate": "2025-03-08T00:00:00.000Z",
        "startTime": null,
        "endTime": null,
        "freeSeats": null
    }
]
*/
const SelectSessionSection = ({ bookingKey, onAddItem, data, date, categories }) => {
  const experianceSessionsQuery = useGetExperianceSessions(bookingKey, { enabled: !!bookingKey });
  const { id: qutationId } = useParams();
  const addToQuotation = useAddToQuotation({
    onSuccess: () => {
      message.success("Item added to trip");
      onAddItem();
    },
    onError: (error) => {
      message?.error(error?.message || "something went wrong");
    },
  });

  const onAddClick = (sessionId) => {
    console.log("sessionId", sessionId);
    addToQuotation.mutate({
      qutationId,
      item: {
        type: QUOTATION_ITEM_TYPES.EXPERIENCE,
        id: data?.id,
        name: data?.title,
        bookingKey: data?.bookingKey + "|" + sessionId,
        arrivalDate: dayjs(date).format("YYYY-MM-DD"),
        price: data?.finalPrice,
        adults: categories?.adults,
        childs: categories?.childsAges?.length,
      },
    });
  };

  if (experianceSessionsQuery?.isLoading) {
    return <Skeleton active />;
  }

  return (
    <Table
      dataSource={experianceSessionsQuery.data?.sessions}
      pagination={experianceSessionsQuery.data?.sessions?.length > 5 ? { pageSize: 5 } : false}
      columns={[
        {
          title: "Start Date",
          dataIndex: "fromDate",
          key: "fromDate",
          render: (value) => (value ? dayjs(value).format("DD MMM YYYY") : "-"),
        },
        {
          title: "End Date",
          dataIndex: "toDate",
          key: "toDate",
          render: (value) => (value ? dayjs(value).format("DD MMM YYYY") : "-"),
        },
        {
          title: "Start Time",
          dataIndex: "startTime",
          key: "startTime",
          render: (value) => (value ? dayjs(value).format("hh: mm A") : "-"),
        },
        {
          title: "End Time",
          dataIndex: "endTime",
          key: "endTime",
          render: (value) => (value ? dayjs(value).format("hh: mm A") : "-"),
        },
        {
          title: "Free Seats",
          dataIndex: "freeSeats",
          key: "freeSeats",
          render: (value) => (value ? value : "Avilable"),
        },
        {
          title: "",
          key: "id",
          dataIndex: "id",
          width: "150px",
          render: (id) => (
            <Button loading={experianceSessionsQuery?.isPending} onClick={() => onAddClick(id)}>
              Add To Trip {JSON.stringifyid}
            </Button>
          ),
        },
      ]}
    />
  );
};

export default SelectSessionSection;
