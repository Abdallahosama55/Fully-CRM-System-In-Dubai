import { useMutation } from "@tanstack/react-query";
import VverseMediaService from "../vverse-media.service";

export default function useDeleteMediaFolder(config) {
  return useMutation({
    mutationFn: ({ folderId }) => VverseMediaService.deleteFolder(folderId),
    ...config,
  });
}
