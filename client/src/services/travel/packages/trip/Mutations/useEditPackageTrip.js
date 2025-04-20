import { useMutation } from "@tanstack/react-query";
import PackagesTripService from "../packages.trips.service";

export default (id, config) => {
  const mutatino = useMutation({
    mutationFn: (data) => PackagesTripService.editTrip({ id, ...data}),
    ...config,
  });

  return mutatino;
};
