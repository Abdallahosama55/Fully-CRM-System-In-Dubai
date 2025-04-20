import { useMutation } from "@tanstack/react-query";
import VverseMediaService from "../vverse-media.service";

export default function useAddMediaFolder(config) {
  return useMutation({
    mutationFn: (data) => VverseMediaService.addFolder(data),
    ...config,
  });
}
