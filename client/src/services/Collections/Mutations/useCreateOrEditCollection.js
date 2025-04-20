import { useMutation } from "@tanstack/react-query";
import CollectionsService from "../collections.service";

export default function useCreateOrEditCollection(config) {
  return useMutation({
    mutationFn: (data) => CollectionsService.createOrEditCollection(data),
    ...config,
  });
}
