import { useMutation } from "@tanstack/react-query";
import LivekeyService from "../livekey.service";

export default function useDeleteLiveKey(config = {}) {
  return useMutation({
    mutationFn: (id) => LivekeyService.deleteLivekey(id),
    ...config,
  });
}
