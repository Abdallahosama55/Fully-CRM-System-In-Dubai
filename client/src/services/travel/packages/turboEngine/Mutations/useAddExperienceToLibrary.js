import { useMutation } from "@tanstack/react-query";
import PackagesTurboEngineService from "../turbo_engine.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => PackagesTurboEngineService.addExperienceToLibrary(data),
    ...config,
  });

  return mutatino;
};
