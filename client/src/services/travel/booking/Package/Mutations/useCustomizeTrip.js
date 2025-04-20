import { useMutation } from "@tanstack/react-query";
import PackageBookingService from "../package.booking.service";

export default function useCustomizeTrip(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => PackageBookingService.customizeTrip(payload),
    ...config,
  });
  return tempMutation;
}
