import { Button, message, Space, Table, Tooltip, Typography } from "antd";
import {
  BagSVG,
  CalendarSVG,
  CreditCardCheck,
  FileDownloadSVG,
  FileSVG,
  GiftSVG,
  MoneySVG,
  NotAlowedSVG,
  PrintSVG,
  ReceiptSVG,
  SendSVG2,
  TransferSVG,
  User2SVG,
} from "assets/jsx-svg";
import ExperiencesSVG from "assets/jsx-svg/ExperiencesSVG";
import Badge from "components/common/Badge";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import React, { useMemo } from "react";
// style
import "./styles.css";
import LoadingPage from "components/common/LoadingPage";
import useSendVoucherEmail from "services/travel/booking/common/Mutations/useSendVoucherEmail";
import useGetDownloadVoucher from "services/travel/booking/common/Queries/useGetDownloadVoucher";
import useGetPrintVoucher from "services/travel/booking/common/Queries/useGetPrintVoucher";
import default_image from "assets/images/defaultEvent.jpeg";
import formatNumber from "utils/formatNumber";
import FlightBookingInfo from "./FlightBookingInfo";
import AccommodationBookingInfo from "./AccommodationBookingInfo";

const GeneralTab = ({ type, data, refetchData, isLoading }) => {
  const actionsPayload = useMemo(
    () => ({
      refId: data?.refId,
      type: data?.type,
    }),
    [data],
  );

  // query
  const voucherDownloadQuery = useGetDownloadVoucher(actionsPayload, {
    enabled: Boolean(actionsPayload?.refId && actionsPayload?.type),
  });

  const voucherPrintQuery = useGetPrintVoucher(actionsPayload, {
    enabled: Boolean(actionsPayload?.refId && actionsPayload?.type),
  });

  // mutation
  const voucherEmailMutation = useSendVoucherEmail({
    enabled: !!actionsPayload,
    onSuccess: () => {
      message.success("Email sent successfully");
    },
    onError: (error) => {
      console.log(error);
      message.error("Something went wrong");
    },
  });

  const handelDownload = () => {
    const pdfLink = voucherDownloadQuery?.data?.voucherUrl;
    console.log("voucherDownloadQuery?.data >> ", voucherDownloadQuery?.data);
    if (pdfLink) {
      const link = document.createElement("a");
      link.href = pdfLink;
      link.download = "voucher.pdf";

      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
    } else {
      message.warning("No PDF link available.");
    }
  };

  const handlePrint = () => {
    const pdfLink = voucherPrintQuery?.data?.url?.voucherUrl;
    if (pdfLink) {
      const printWindow = window.open(pdfLink);
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (type === BOOKINGS_TYPES.FLIGHT) {
    return (
      <FlightBookingInfo
        data={data}
        handelDownload={handelDownload}
        handlePrint={handlePrint}
        handelSendEmail={() => voucherEmailMutation.mutate(actionsPayload)}
      />
    );
  }

  if (type === BOOKINGS_TYPES.ACCOMMODATION) {
    return (
      <AccommodationBookingInfo
        refetchData={refetchData}
        data={data}
        handelDownload={handelDownload}
        handlePrint={handlePrint}
        handelSendEmail={() => voucherEmailMutation.mutate(actionsPayload)}
      />
    );
  }

  return (
    <div className="booking_info_general_tab">
      <div style={{ marginBottom: "24px" }}>
        <p className="md_text_bold">Booking Items</p>
        <Table
          pagination={false}
          style={{ marginTop: "12px" }}
          dataSource={[
            {
              type: data?.type,
              refId: data?.refId,
              confirmationNumber: data?.hotelConfirmationNumber || data?.confirmationNumber,
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
                    gridTemplateColumns: "20px 1fr",
                    gap: "8px",
                    alignItems: "center",
                  }}>
                  {type?.toUpperCase() === BOOKINGS_TYPES.EXPERIENCE && <ExperiencesSVG />}
                  {type?.toUpperCase() === BOOKINGS_TYPES.TRANSFER && <TransferSVG />}
                  {type?.toUpperCase() === BOOKINGS_TYPES.PACKAGES && <GiftSVG />}
                  {data}
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
                      onClick={() => voucherEmailMutation.mutate(actionsPayload)}
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
                      onClick={handelDownload}
                      size="small"
                    />
                  </Tooltip>
                </Space>
              ),
            },
          ]}
        />
      </div>
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
      <div>
        <p className="md_text_bold">
          {data?.type} Booking ID:{" "}
          <span style={{ color: "var(--font-link)" }}>{data?.id || data?.refId}</span>
        </p>
        <div className="product_card">
          <div>
            <img
              width={"256px"}
              height={"170px"}
              style={{ borderRadius: "8px" }}
              src={data?.vehicleData?.image || default_image}
              alt="product"
            />
          </div>
          <div className="product_card_body">
            {data?.vehicleData?.vehicleBrand?.name && (
              <p>
                {data?.vehicleData?.vehicleBrand?.name}{" "}
                {data?.vehicleData?.vehicleModel?.name ? data?.vehicleData?.vehicleModel?.name : ""}
              </p>
            )}
            {data?.vehicleData?.maxBags && (
              <p className="product_card_info_with_icon sm_text_regular">
                <BagSVG color="#344054" />
                <span>{data?.vehicleData?.maxBags}</span>
              </p>
            )}
            {data?.vehicleData?.maxPax && (
              <p className="product_card_info_with_icon sm_text_regular">
                <User2SVG color="#344054" />
                <span>{data?.vehicleData?.maxPax}</span>
              </p>
            )}
            {(data?.vehicleData?.initialPrice || data?.vehicleData?.distanePricePerKilo) && (
              <p className="product_card_info_with_icon sm_text_regular">
                <MoneySVG color={"#344054"} />
                Initial Price: ${formatNumber(data?.vehicleData?.initialPrice)} ,Per Per Kilo:${" "}
                {formatNumber(data?.vehicleData?.distanePricePerKilo)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
