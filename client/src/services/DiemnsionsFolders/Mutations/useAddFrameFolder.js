import { useMutation } from "@tanstack/react-query";
import DiemnsionsFoldersService from "../diemnsionsFolders.service";

export default function useAddFrameFolder(config = {}) {
  return useMutation({
    mutationFn: (data) => DiemnsionsFoldersService.addFrameFolder(data),
    ...config,
  });
}
