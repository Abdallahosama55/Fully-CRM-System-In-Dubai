import React, { useRef } from "react";
import Container from "../Container";
import Header from "../Header";
import useGetVoucherDetails from "services/travel/client_side/vouchers/Queries/useGetVoucherDetails";
import { VOUCHER_TYPES } from "constants/client/VOUCHER_TYPES";
import { Skeleton } from "antd";
import { useReactToPrint } from "react-to-print";
import ExperienceVoucher from "components/vouchers/ExperienceVoucher";
import hexToHexWithAlpha from "utils/hexToHexWithAlpha";

const ExperienceVoucherWrapper = ({ id }) => {
  const voucherDetails = useGetVoucherDetails({ id, type: VOUCHER_TYPES.EXPERIENCE });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Container>
      <Header
        title={"Experience VOUCHER"}
        logo={voucherDetails?.data?.content?.companyImage}
        isLoading={voucherDetails?.isLoading}
        handlePrint={handlePrint}
      />
      {voucherDetails?.isLoading ? (
        <Skeleton active />
      ) : (
        <div ref={componentRef} className="print-container">
          <ExperienceVoucher
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

export default ExperienceVoucherWrapper;
