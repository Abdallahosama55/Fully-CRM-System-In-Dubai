import { useMutation } from "@tanstack/react-query";
import PackagesTripService from "../packages.trips.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => PackagesTripService.addTrip(data),
    ...config,
  });

  return mutatino;
};
