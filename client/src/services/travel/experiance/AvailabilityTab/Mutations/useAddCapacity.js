import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useAddCapacity(id, config = {}) {
  const tempMutation = useMutation({
    mutationFn: (data) => AvailabilityService.addCapacity(id, data),
    ...config,
  });

  return tempMutation;
}
