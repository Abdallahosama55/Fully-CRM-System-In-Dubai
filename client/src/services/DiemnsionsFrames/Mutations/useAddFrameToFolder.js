import { useMutation } from "@tanstack/react-query";
import DiemnsionsFramesService from "../diemnsionsFrames.service";

export default function useAddFrameToFolder(config = {}) {
  return useMutation({
    mutationFn: ({ frameId, folderId }) => DiemnsionsFramesService.addToFolder(frameId, folderId),
    ...config,
  });
}
