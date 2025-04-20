import {
  HotelSVG,
  ExperiencesSVG,
  TransferSVG,
  FlightSVG,
} from "assets/jsx-svg/PackagesItemsTypesIcons";
import { PACKAGE_ITEMS_TYPES } from "constants/PACKAGE_TYPES";

const ItemTypeSvgIcon = ({ type }) => {
  return (
    <>
      {type === PACKAGE_ITEMS_TYPES.ACCOMODATION && <HotelSVG />}
      {type === PACKAGE_ITEMS_TYPES.EXPERIENCE && <ExperiencesSVG />}
      {type === PACKAGE_ITEMS_TYPES.TRANSFER && <TransferSVG />}
      {type === PACKAGE_ITEMS_TYPES.FLIGHT && <FlightSVG />}
    </>
  );
};

export default ItemTypeSvgIcon;
