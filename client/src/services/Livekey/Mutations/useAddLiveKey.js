import { useMutation } from "@tanstack/react-query";
import LivekeyService from "../livekey.service";

export default function useAddLiveKey(config = {}) {
  return useMutation({
    mutationFn: (data) => LivekeyService.add(data),
    ...config,
  });
}
