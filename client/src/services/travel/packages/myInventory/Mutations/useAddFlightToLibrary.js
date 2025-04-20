import { useMutation } from "@tanstack/react-query";
import PackagesMyInventoryService from "../my_Inventory.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (payload) => PackagesMyInventoryService.addFlightToLibrary(payload),
    ...config,
  });

  return mutatino;
};
