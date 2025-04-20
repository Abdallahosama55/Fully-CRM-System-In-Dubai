import { Button, Flex, Space, Table, Tooltip, Typography } from "antd";
import {
  BuildingSVG,
  CalendarSVG,
  CreditCardCheck,
  FileDownloadSVG,
  FileSVG,
  NotAlowedSVG,
  PrintSVG,
  RateStarSVG,
  ReceiptSVG,
  SendSVG2,
  UserSVG,
} from "assets/jsx-svg";
import React, { useMemo, useState } from "react";
import isValidJson from "utils/isValidJson";
import default_image from "assets/images/defaultEvent.jpeg";
import AccommodationCancelModal from "./AccommodationCancelModal";
import Description from "components/common/Description";
import Badge from "components/common/Badge";

const AccommodationBookingInfo = ({
  data,
  refetchData,
  handelSendEmail,
  handlePrint,
  handelDownload,
}) => {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const description = useMemo(
    () =>
      isValidJson(data?.accommodationData?.description)
        ? JSON.parse(data?.accommodationData?.description || "[]")?.find(
            (lang) => lang.name === "english",
          )?.value
        : data?.accommodationData?.description,
    [data?.accommodationData?.description],
  );

  return (
    <div className="booking_info_general_tab">
      <AccommodationCancelModal
        isOpen={isCancelOpen}
        close={() => setIsCancelOpen(false)}
        onCancelBooking={refetchData}
        refId={data?.refId}
        confirmationNumber={data?.hotelConfirmationNumber}
      />

      <div style={{ marginBottom: "1rem" }}>
        <p className="md_text_bold">
          {data?.type} Booking ID: <span className="color-link">{data?.id || data?.refId}</span>
        </p>

        <div className="product_card">
          <div>
            <img
              width={"256px"}
              height={"256px"}
              style={{ borderRadius: "8px", objectFit: "cover", width: "256px", height: "256px" }}
              src={
                data?.vehicleData?.image ||
                (isValidJson(data?.accommodationData?.images)
                  ? JSON.parse(data?.accommodationData?.images)[0]?.link
                  : default_image)
              }
              alt="product"
            />
          </div>
          <div className="product_card_body">
            <Flex align="center" justify="space-between" gap={12}>
              <p className="product_card_body_title lg_text_bold" style={{ maxWidth: "80%" }}>
                {data?.accommodationData?.name}
              </p>
              <Space>
                <Tooltip title="Resend voucher">
                  <Button
                    className="table_action_button"
                    onClick={handelSendEmail}
                    icon={<SendSVG2 />}
                    size="small"
                  />
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
                    onClick={handelDownload}
                    size="small"
                  />
                </Tooltip>
                {data?.bookingDetailsWithPassengers?.[0]?.status !== "CANCELLED" && (
                  <Tooltip title="Cancel">
                    <Button
                      className="table_action_button"
                      danger
                      onClick={() => setIsCancelOpen(true)}
                      icon={<NotAlowedSVG />}
                      size="small"
                    />
                  </Tooltip>
                )}
              </Space>
            </Flex>
            {data?.accommodationData?.rate && (
              <Flex gap={4} align="center">
                {[...new Array(Number(data?.accommodationData?.rate))].map((el, index) => (
                  <RateStarSVG key={index} />
                ))}
              </Flex>
            )}
            {data?.accommodationData?.address && <p>{data?.accommodationData?.address}</p>}
            {data?.accommodationData?.roomData && (
              <p className="product_card_info_with_icon sm_text_regular">
                <UserSVG color="#344054" /> <span>{data?.accommodationData?.roomData}</span>
              </p>
            )}
            {data?.checkIn && (
              <p className="product_card_info_with_icon sm_text_regular">
                <CalendarSVG color="#344054" />
                <span>{data?.checkIn}</span>
              </p>
            )}
            {data?.checkOut && (
              <p className="product_card_info_with_icon sm_text_regular">
                <CalendarSVG color="#344054" />
                <span>{data?.checkOut}</span>
              </p>
            )}
            {description && <Description description={description} rows={5} />}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "24px" }}>
        <Table
          pagination={false}
          style={{ marginTop: "12px" }}
          dataSource={[
            {
              type: data?.type,
              refId: data?.refId,
              confirmationNumber: data?.hotelConfirmationNumber,
              bookingStatus: data?.bookingDetailsWithPassengers?.[0]?.status,
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
                    gridTemplateColumns: "20px 1fr",
                    gap: "8px",
                    alignItems: "center",
                  }}>
                  <BuildingSVG />
                  {data} ROOM
                </p>
              ),
            },
            {
              title: "Booking ID",
              dataIndex: "refId",
              render: (id, rowData) => (
                <div>
                  <p className="xs_text_semibold" style={{ color: "var(--font-link)" }}>
                    {id}
                  </p>
                  <Typography.Paragraph
                    className="xs_text_regular"
                    style={{ color: "var(--gray-700)" }}>
                    {rowData?.type} confirmation number:{" "}
                    <span className="sm_text_bold">{rowData?.confirmationNumber}</span>
                  </Typography.Paragraph>
                </div>
              ),
            },
            {
              title: "Booking Status",
              dataIndex: "bookingStatus",
              render: (bookingStatus) => {
                const statusMap = {
                  FINALIZED: "success",
                  CANCELLED: "error",
                };

                return (
                  <Badge fullWidth status={statusMap?.[bookingStatus] || "grey"}>
                    {bookingStatus}
                  </Badge>
                );
              },
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
          ]}
        />
      </div>
      {data?.bookingDetailsWithPassengers?.map((roomBooking) => {
        return (
          <>
            <div style={{ marginBottom: "24px" }}>
              <p className="md_text_bold">Passenger Data</p>
              <Table
                pagination={false}
                style={{ marginTop: "12px" }}
                dataSource={roomBooking?.passengers || data?.passengers}
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
                      <p className="xs_text_semibold">
                        {!nationality ? "Not provided" : nationality}
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default AccommodationBookingInfo;
