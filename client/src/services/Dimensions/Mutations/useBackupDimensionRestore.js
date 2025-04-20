import { useMutation } from "@tanstack/react-query";
import DimensionsService from "services/dimensions.service";

export default function useBackupDimensionRestore(config = {}) {
  return useMutation({
    mutationFn: ({ dimensionId, backupId }) =>
      DimensionsService.backupDimensionRestore(dimensionId, backupId),
    ...config,
  });
}
