import { useMutation } from "@tanstack/react-query";
import AccommodationTboService from "../accommodation.tbo.service";
export default function useBookAccommodationLocal(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => {
      return AccommodationTboService.bookLocal(payload);
    },
    ...config,
  });
  return tempMutation;
}
