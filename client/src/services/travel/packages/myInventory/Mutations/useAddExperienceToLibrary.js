import { useMutation } from "@tanstack/react-query";
import PackagesMyInventoryService from "../my_Inventory.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => PackagesMyInventoryService.addExperienceToLibrary(data),
    ...config,
  });

  return mutatino;
};
