import { useMutation } from "@tanstack/react-query";
import VverseMediaService from "../vverse-media.service";

export default function useRenameMediaFolder(config) {
  return useMutation({
    mutationFn: ({ folderId, name }) => VverseMediaService.renameFolder(folderId, name),
    ...config,
  });
}
