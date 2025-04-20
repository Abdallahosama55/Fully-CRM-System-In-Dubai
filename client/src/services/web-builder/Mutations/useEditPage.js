import { useMutation } from "@tanstack/react-query";
import WebBuilderService from "../web-builder.service";

export default (id, config = {}) => {
  const mutation = useMutation({
    mutationFn: (data) => WebBuilderService.editPage({id, ...data}),
    ...config,
  });
  return mutation;
};
