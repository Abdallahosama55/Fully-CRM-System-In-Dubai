import { useMutation } from "@tanstack/react-query";
import CollectionsService from "../collections.service";

export default function useAddOrEditsDocuments(config) {
  return useMutation({
    mutationFn: (data) => CollectionsService.addOrEditsDocuments(data),
    ...config,
  });
}
