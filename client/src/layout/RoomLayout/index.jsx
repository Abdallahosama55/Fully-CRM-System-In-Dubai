import { Outlet, useLocation, useParams } from "react-router-dom";
import Navigation from "components/common/Navigation";

// style
import "views/travel/hotels/common.hotels.css";
import "./styles.css";
import { getHotelMenuItems } from "views/travel/hotels/hotelItems";

const RoomLayout = ({ children }) => {
  const { id } = useParams();
  const location = useLocation();
  const lastPathSegment = location?.pathname?.split("/")?.pop();

  return (
    <div className="room_management hotels_page">
      <Navigation activeTab={lastPathSegment} navItems={getHotelMenuItems(id)} />
      {children && children}
    </div>
  );
};

export default RoomLayout;
