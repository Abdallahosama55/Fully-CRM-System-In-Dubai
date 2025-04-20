import { useMutation } from "@tanstack/react-query";
import DiemnsionsFoldersService from "../diemnsionsFolders.service";

export default function useDeleteFrameFolder(config = {}) {
  return useMutation({
    mutationFn: ({ folderId }) => DiemnsionsFoldersService.deleteFrameFolder(folderId),
    ...config,
  });
}
