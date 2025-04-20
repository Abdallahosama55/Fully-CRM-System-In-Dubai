import { useMutation } from "@tanstack/react-query";
import AccommodationAPI from "../../accommodation.service";

export default function useGetHotelInfoByName(config = {}) {
  const query = useMutation({
    mutationFn: (hotelCode) => AccommodationAPI.getHotelInfoByName(hotelCode),
    ...config,
  });
  return query;
}
