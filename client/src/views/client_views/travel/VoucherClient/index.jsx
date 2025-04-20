import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// voucherss
import TransferVoucherWrapper from "./components/TransferVoucherWrapper";
import HotelVoucherWrapper from "./components/HotelVoucherWrapper";
import FlightVoucherWrapper from "./components/FlightVoucherWrapper";
import { VOUCHER_TYPES } from "constants/client/VOUCHER_TYPES";
// style
import "./styles.css";
import ExperienceVoucherWrapper from "./components/ExperienceVoucherWrapper";
import AirportHotelTransferVoucherWrapper from "./components/AirportHotelTransferVoucherWrapper";
const VoucherClient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type")?.toLowerCase();
  const id = queryParams.get("id");
  switch (type) {
    case VOUCHER_TYPES.FLIGHT.toLowerCase():
      return <FlightVoucherWrapper id={id} />;
    case VOUCHER_TYPES.ACCOMMODATION.toLowerCase():
      return <HotelVoucherWrapper id={id} />;
    case VOUCHER_TYPES.TRANSFER.toLowerCase():
      return <TransferVoucherWrapper id={id} />;
      case VOUCHER_TYPES.AIRPORT_HOTEL_TRANSFERS.toLowerCase():
        return <AirportHotelTransferVoucherWrapper id={id} />;
    case VOUCHER_TYPES.EXPERIENCE.toLowerCase():
      return <ExperienceVoucherWrapper id={id} />;
    default:
      return (
        <div>
          <h1>Invalid Type</h1>
          <p>The type "{type}" is not supported. Please check the URL.</p>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      );
      break;
  }
};

export default VoucherClient;
