import { useMutation } from "@tanstack/react-query";
import CollectionsService from "../collections.service";

export default function useDeleteDocument(config) {
  return useMutation({
    mutationFn: ({ collectionName, ids }) =>
      CollectionsService.deleteDocument(collectionName, ids),
    ...config,
  });
}
