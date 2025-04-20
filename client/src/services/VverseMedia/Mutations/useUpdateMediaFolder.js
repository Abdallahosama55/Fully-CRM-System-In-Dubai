import { useMutation } from "@tanstack/react-query";
import VverseMediaService from "../vverse-media.service";

export default function useUpdateMediaFolder(config) {
  return useMutation({
    mutationFn: ({ folderId, newFolderId }) =>
      VverseMediaService.updateFolder(folderId, newFolderId),
    ...config,
  });
}
