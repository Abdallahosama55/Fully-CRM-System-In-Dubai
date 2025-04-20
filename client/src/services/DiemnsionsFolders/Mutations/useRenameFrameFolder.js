import { useMutation } from "@tanstack/react-query";
import DiemnsionsFoldersService from "../diemnsionsFolders.service";

export default function useRenameFrameFolder(config = {}) {
  return useMutation({
    mutationFn: ({ folderId, name }) => DiemnsionsFoldersService.renameFrameFolder(folderId, name),
    ...config,
  });
}
