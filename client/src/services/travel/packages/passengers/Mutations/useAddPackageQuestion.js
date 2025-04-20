import { useMutation } from "@tanstack/react-query";
import PackagesPassengersService from "../passengers.service";

export default (tripId, config) => {
  const mutatino = useMutation({
    mutationFn: (data) => PackagesPassengersService.addQuestion({ tripId, ...data }),
    ...config,
  });

  return mutatino;
};
