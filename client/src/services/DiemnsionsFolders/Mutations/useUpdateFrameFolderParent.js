import { useMutation } from "@tanstack/react-query";
import DiemnsionsFoldersService from "../diemnsionsFolders.service";

export default function useUpdateFrameFolderParent(config = {}) {
  return useMutation({
    mutationFn: ({ folderId, parentFolderId }) =>
      DiemnsionsFoldersService.updateFrameFolderParent(folderId, parentFolderId),
    ...config,
  });
}
