import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useAddAvailability(productId, config = {}) {
  const tempMutation = useMutation({
    mutationFn: (data) => AvailabilityService.addAvailability(productId, data),
    ...config,
  });

  return tempMutation;
}
