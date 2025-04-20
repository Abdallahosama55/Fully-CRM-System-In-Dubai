import React, { useRef } from "react";
import Container from "../Container";
import Header from "../Header";
import TransferVoucher from "components/vouchers/TransferVoucher";
import useGetVoucherDetails from "services/travel/client_side/vouchers/Queries/useGetVoucherDetails";
import { VOUCHER_TYPES } from "constants/client/VOUCHER_TYPES";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "antd";
import hexToHexWithAlpha from "utils/hexToHexWithAlpha";

const AirportHotelTransferVoucherWrapper = ({ id }) => {
  const voucherDetails = useGetVoucherDetails({ id, type: VOUCHER_TYPES.AIRPORT_HOTEL_TRANSFERS });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Container>
      <Header
        title={"TRANSFER VOUCHER"}
        logo={voucherDetails?.data?.content?.companyImage}
        isLoading={voucherDetails?.isLoading}
        handlePrint={handlePrint}
      />
      {voucherDetails?.isLoading ? (
        <Skeleton active />
      ) : (
        <div ref={componentRef} className="print-container">
          <TransferVoucher
            data={voucherDetails?.data}
            isTemplate={false}
            primaryColor={voucherDetails?.data?.content?.primaryColor}
            secondaryColor={voucherDetails?.data?.content?.secondaryColor}
            primaryColorWithOpacity={hexToHexWithAlpha(
              voucherDetails?.data?.content?.primaryColor,
              0.1,
            )}
          />
        </div>
      )}
    </Container>
  );
};

export default AirportHotelTransferVoucherWrapper;
