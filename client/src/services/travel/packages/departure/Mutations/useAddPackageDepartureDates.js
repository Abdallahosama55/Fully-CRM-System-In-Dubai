import { useMutation } from "@tanstack/react-query";
import PackagesDepartureService from "../departure.service";

export default (tripId, config) => {
  const mutatino = useMutation({
    mutationFn: (payload) => PackagesDepartureService.addDepartureDates({ tripId, ...payload }),
    ...config,
  });

  return mutatino;
};
