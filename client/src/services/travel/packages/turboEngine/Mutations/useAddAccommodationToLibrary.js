import { useMutation } from "@tanstack/react-query";
import PackagesTurboEngineService from "../turbo_engine.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => PackagesTurboEngineService.addAccommodationToLibrary(data),
    ...config,
  });

  return mutatino;
};
