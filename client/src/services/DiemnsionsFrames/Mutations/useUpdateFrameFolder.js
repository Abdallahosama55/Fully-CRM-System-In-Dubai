import { useMutation } from "@tanstack/react-query";
import DiemnsionsFramesService from "../diemnsionsFrames.service";

export default function useUpdateFrameFolder(config = {}) {
  return useMutation({
    mutationFn: ({ frameId, folderId }) => DiemnsionsFramesService.updateFolder(frameId, folderId),
    ...config,
  });
}
