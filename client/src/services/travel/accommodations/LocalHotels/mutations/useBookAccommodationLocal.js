import { useMutation } from "@tanstack/react-query";
import AccommodationLocalService from "../accommodation.local.service";
export default function useBookAccommodationLocal(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => {
      return AccommodationLocalService.bookLocal(payload);
    },
    ...config,
  });
  return tempMutation;
}
