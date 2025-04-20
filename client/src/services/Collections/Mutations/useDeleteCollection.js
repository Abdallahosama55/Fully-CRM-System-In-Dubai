import { useMutation } from "@tanstack/react-query";
import CollectionsService from "../collections.service";

export default function useDeleteCollection(config) {
  return useMutation({
    mutationFn: (collectionName) =>
      CollectionsService.deleteCollection(collectionName),
    ...config,
  });
}
