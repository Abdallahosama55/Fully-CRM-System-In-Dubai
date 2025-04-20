import { useMutation } from "@tanstack/react-query";
import DiemnsionsFramesService from "../diemnsionsFrames.service";

export default function useUpdateFrameStatus(config = {}) {
  return useMutation({
    mutationFn: ({ frameId, isFav }) => DiemnsionsFramesService.updateStatus(frameId, isFav),
    ...config,
  });
}
