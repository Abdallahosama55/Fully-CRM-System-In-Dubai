import { useMutation } from "@tanstack/react-query";
import VverseMediaService from "../vverse-media.service";

export default function useUpdateMediaFolderStructure(config) {
  return useMutation({
    mutationFn: ({ mediaFolder }) => VverseMediaService.updateFolderStructure(mediaFolder),
    ...config,
  });
}
