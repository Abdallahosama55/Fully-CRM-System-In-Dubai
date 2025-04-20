import { useMutation } from "@tanstack/react-query";
import PackagesTripService from "../packages.trips.service";

export default (tripId, config) => {
  const mutatino = useMutation({
    mutationFn: (data) => PackagesTripService.addDescription({ tripId, ...data }),
    ...config,
  });

  return mutatino;
};
