import { useMutation } from "@tanstack/react-query";
import LivekeyService from "../livekey.service";

export default function useUpdateLiveKey(config = {}) {
  return useMutation({
    mutationFn: ({ id, data }) => LivekeyService.edit(id, data),
    ...config,
  });
}
