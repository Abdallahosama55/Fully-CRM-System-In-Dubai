import { useMutation } from "@tanstack/react-query";
import WebBuilderService from "../web-builder.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => WebBuilderService.addPage(data),
    ...config,
  });

  return mutatino;
};
