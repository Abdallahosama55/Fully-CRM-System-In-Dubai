import { useMutation } from "@tanstack/react-query";
import DiemnsionsFoldersService from "../diemnsionsFolders.service";

export default function useUpdateFrameFolderStructure(config = {}) {
  return useMutation({
    mutationFn: ({ eventId, frameFolder }) =>
      DiemnsionsFoldersService.updateFrameFolderStructure(eventId, frameFolder),
    ...config,
  });
}
