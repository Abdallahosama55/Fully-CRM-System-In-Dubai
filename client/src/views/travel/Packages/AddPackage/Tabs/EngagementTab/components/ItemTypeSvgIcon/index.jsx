import {
  HotelSVG,
  ExperiencesSVG,
  TransferSVG,
  FlightSVG,
} from "assets/jsx-svg/PackagesItemsTypesIcons";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";

const ItemTypeSvgIcon = ({ type }) => {
  return (
    <>
      {type === "ACCOMODATION" && <HotelSVG />}
      {type === BOOKINGS_TYPES.EXPERIENCE && <ExperiencesSVG />}
      {type === BOOKINGS_TYPES.TRANSFER && <TransferSVG />}
      {type === BOOKINGS_TYPES.FLIGHT && <FlightSVG />}
    </>
  );
};

export default ItemTypeSvgIcon;
