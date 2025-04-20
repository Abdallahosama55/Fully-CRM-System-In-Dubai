import { useMutation } from "@tanstack/react-query";
import PackagesTripService from "../packages.trips.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (id) => PackagesTripService.deleteTrip(id),
    ...config,
  });

  return mutatino;
};
