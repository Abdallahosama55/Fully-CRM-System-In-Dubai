import React from "react";
import FlightCard from "../FlightCard";
import { Badge, Button, Space, Table, Tooltip, Typography } from "antd";
import { CreditCardCheck, FileDownloadSVG, FileSVG, NotAlowedSVG, PlaneSVG, PrintSVG, ReceiptSVG, SendSVG2 } from "assets/jsx-svg";

const FlightBookingInfo = ({ data , handelSendEmail  , handlePrint , handelDownload }) => {
  return (
    <div className="booking_info_general_tab">
      <div style={{ marginBottom: "24px" }}>
        <p className="md_text_bold">Booking Items</p>
        <Table
          pagination={false}
          style={{ marginTop: "12px" }}
          dataSource={[
            {
              type: "Flight",
              refId: data?.refId,
              confirmationNumber: data?.flightConfirmationNumber,
              bookingStatus: data?.status,
              status: {
                documentIssued: data?.documentIssued,
                payedByPassenger: data?.payedByPassenger,
                invoiceIssued: data?.invoiceIssued,
              },
            },
          ]}
          columns={[
            {
              title: "type",
              dataIndex: "type",
              onCell: () => {
                return {
                  style: {
                    verticalAlign: "top",
                  },
                };
              },
              render: (data) => (
                <p
                  className="xs_text_semibold"
                  style={{
                    color: "var(--gray-700);",
                    display: "grid",
                    gridTemplateColumns: "12px 1fr",
                    gap: "8px",
                    alignItems: "center",
                  }}>
                  <PlaneSVG /> {data}
                </p>
              ),
            },
            {
              title: "Booking ID",
              dataIndex: "refId",
              render: (refId, rowData) => (
                <div>
                  <p className="xs_text_semibold" style={{ color: "var(--font-link)" }}>
                    {refId}
                  </p>
                  <Typography.Paragraph
                    className="xs_text_regular"
                    style={{ color: "var(--gray-700)" }}>
                    Flight confirmation number:{" "}
                    <span className="sm_text_bold">{rowData?.confirmationNumber}</span>
                  </Typography.Paragraph>
                </div>
              ),
            },
            {
              title: "Booking Status",
              dataIndex: "bookingStatus",
              render: (bookingStatus) => (
                <Badge fullWidth status="success">
                  {bookingStatus}
                </Badge>
              ),
            },
            {
              title: "Status",
              dataIndex: "status",
              render: (status) => (
                <div>
                  {status?.documentIssued && (
                    <p
                      className="product_card_info_with_icon xs_text_medium"
                      style={{ marginBottom: "4px" }}>
                      <FileSVG color="#344054" />
                      <span>Document Issued</span>
                    </p>
                  )}
                  {status?.payedByPassenger && (
                    <p
                      className="product_card_info_with_icon xs_text_medium"
                      style={{ marginBottom: "4px" }}>
                      <CreditCardCheck color="#344054" />
                      <span>Payed by passenger</span>
                    </p>
                  )}
                  {status?.invoiceIssued && (
                    <p
                      className="product_card_info_with_icon xs_text_medium"
                      style={{ marginBottom: "4px" }}>
                      <ReceiptSVG color="#344054" />
                      <span>Invoice Issued</span>
                    </p>
                  )}
                </div>
              ),
            },
            {
              title: "Actions",
              dataIndex: "id",
              render: (id) => (
                <Space>
                  <Tooltip title="Resend voucher">
                    <Button
                      className="table_action_button"
                      onClick={handelSendEmail}
                      icon={<SendSVG2 />}
                      size="small"
                    />
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <Button className="table_action_button" icon={<NotAlowedSVG />} size="small" />
                  </Tooltip>
                  <Tooltip title="print voucher">
                    <Button
                      className="table_action_button"
                      icon={<PrintSVG />}
                      onClick={handlePrint}
                      size="small"
                    />
                  </Tooltip>
                  <Tooltip title="Download voucher">
                    <Button
                      className="table_action_button"
                      icon={<FileDownloadSVG />}
                      size="small"
                      onClick={handelDownload}
                    />
                  </Tooltip>
                </Space>
              ),
            },
          ]}
        />
      </div>
      {Array.isArray(data?.passengersData) && data?.passengersData?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <p className="md_text_bold">Passenger Data</p>
          <Table
            pagination={false}
            style={{ marginTop: "12px" }}
            dataSource={data?.passengersData}
            columns={[
              {
                title: "#",
                dataIndex: "index",
                render: (_, __, index) => index + 1,
              },
              {
                title: "Type",
                dataIndex: "type",
              },
              {
                title: "Name",
                dataIndex: "name",
              },
              {
                title: "Nationality",
                dataIndex: "nationality",
                render: (nationality) => (
                  <p className="xs_text_semibold">{!nationality ? "Not provided" : nationality}</p>
                ),
              },
            ]}
          />
        </div>
      )}
      <div>
        <FlightCard data={data?.outboundFlightData} type="Outbound" />
        {data?.flightType === "TWO_WAY" && data?.returnFlightData && (
          <FlightCard data={data?.returnFlightData} type="Return" />
        )}
      </div>
    </div>
  );
};

export default FlightBookingInfo;
