import { useMutation } from "@tanstack/react-query";
import FileUploadService from "../file-upload.service";

export default function useFileUpload(config = {}) {
  return useMutation({
    mutationFn: (data) => FileUploadService.fileUpload(data),
    ...config,
  });
}
