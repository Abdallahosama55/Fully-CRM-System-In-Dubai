import React, { useRef } from "react";
import Container from "../Container";
import Header from "../Header";
import HotelVoucher from "components/vouchers/HotelVoucher";
import useGetVoucherDetails from "services/travel/client_side/vouchers/Queries/useGetVoucherDetails";
import { VOUCHER_TYPES } from "constants/client/VOUCHER_TYPES";
import { Skeleton } from "antd";
import { useReactToPrint } from "react-to-print";
import hexToHexWithAlpha from "utils/hexToHexWithAlpha";

const HotelVoucherWrapper = ({ id }) => {
  const voucherDetails = useGetVoucherDetails({ id, type: VOUCHER_TYPES.ACCOMMODATION });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Container>
      <Header
        title={"Hotel VOUCHER"}
        logo={voucherDetails?.data?.content?.companyImage}
        isLoading={voucherDetails?.isLoading}
        handlePrint={handlePrint}
      />
      {voucherDetails?.isLoading ? (
        <Skeleton active />
      ) : (
        <div ref={componentRef} className="print-container">
          <HotelVoucher
            data={voucherDetails?.data}
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

export default HotelVoucherWrapper;
