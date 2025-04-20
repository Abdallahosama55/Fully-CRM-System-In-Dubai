import { useMutation } from "@tanstack/react-query";
import TransferService from "../transfer.service";

export default (config = {}) => {
    const mutation = useMutation({
        mutationFn: (id) => TransferService.deleteVehicle(id),
        ...config,
    });
    return mutation;
};
