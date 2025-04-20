import { useMutation } from "@tanstack/react-query";
import TransferService from "../transfer.service";

export default (id, config = {}) => {
  const mutation = useMutation({
    mutationFn: (data) => TransferService.editVehicle(id, data),
    ...config,
  });
  return mutation;
};
