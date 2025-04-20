import { useMutation } from "@tanstack/react-query";
import TransferService from "../transfer.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => TransferService.addVehicle(data),
    ...config,
  });

  return mutatino;
};
