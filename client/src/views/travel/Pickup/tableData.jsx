import { Typography, Tag, Button } from "antd";
import dayjs from "dayjs";

export const columns = (handleViewDetails) => [
  {
    title: "holder Name",
    dataIndex: "holderName",
    key: "holderName",
    render: (holderName) => {
      return (
        <Typography.Paragraph
          style={{ marginBottom: "0px" }}
          className="fz-14"
          ellipsis={{ rows: 2, tooltip: holderName }}>
          {holderName}
        </Typography.Paragraph>
      );
    },
  },

  {
    title: "inventory type",
    dataIndex: "moduleType",
    key: "moduleType",
    render: (moduleType) => {
      return (
        <Typography.Paragraph
          style={{ marginBottom: "0px" }}
          className="fz-14"
          ellipsis={{ rows: 2, tooltip: moduleType }}>
          {moduleType}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: "From Date",
    dataIndex: "fromDateTime",
    key: "fromDateTime",
    render: (fromDateTime) => {
      return (
        <Typography.Paragraph
          style={{ marginBottom: "0px" }}
          className="fz-14"
          ellipsis={{ rows: 2, tooltip: fromDateTime && dayjs(fromDateTime).format("YYYY-MM-DD") }}>
          {fromDateTime && dayjs(fromDateTime).format("YYYY-MM-DD")}
        </Typography.Paragraph>
      );
    },
  },

  {
    title: "To Date",
    dataIndex: "toDateTime",
    key: "toDateTime",
    render: (toDateTime) => {
      return (
        <Typography.Paragraph
          style={{ marginBottom: "0px" }}
          className="fz-14"
          ellipsis={{ rows: 2, tooltip: toDateTime && dayjs(toDateTime).format("YYYY-MM-DD") }}>
          {toDateTime && dayjs(toDateTime).format("YYYY-MM-DD")}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: "pax",
    dataIndex: "pax",
    key: "pax",
    render: (pax) => {
      return (
        <Typography.Paragraph
          style={{ marginBottom: "0px" }}
          className="fz-14"
          ellipsis={{ rows: 2, tooltip: pax }}>
          {pax}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: "Quotation",
    dataIndex: "withQuotation",
    key: "withQuotation",
    render: (withQuotation) => {
      return <>{withQuotation ? <Tag color="blue">Yes</Tag> : <Tag color="red">No Items</Tag>}</>;
    },
  },
  {
    title: "Booking & Quotation Details ",
    render: (_, record) => {
      return (
        <>
          <Button type="link" onClick={() => handleViewDetails(record)}>
            View Details
          </Button>
        </>
      );
    },
  },

  {
    title: "Rate",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (totalPrice, value) => {
      return (
        <>
          {totalPrice ? (
            <Typography.Paragraph style={{ marginBottom: "0px" }} className="fz-14">
              {`${totalPrice} ${value.currencyCode}`}
            </Typography.Paragraph>
          ) : (
            <Typography.Paragraph style={{ marginBottom: "0px" }} className="fz-14">
              0
            </Typography.Paragraph>
          )}
        </>
      );
    },
  },
];
