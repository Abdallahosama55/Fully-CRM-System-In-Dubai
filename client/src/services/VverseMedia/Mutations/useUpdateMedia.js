import { useMutation } from "@tanstack/react-query";
import VverseMediaService from "../vverse-media.service";

export default function useUpdateMedia(config) {
  return useMutation({
    mutationFn: ({ mediaId, folderId }) => VverseMediaService.updateMedia(mediaId, folderId),
    ...config,
  });
}
