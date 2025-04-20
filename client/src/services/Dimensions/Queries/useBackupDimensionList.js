import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DimensionsService from "services/dimensions.service";

export default function useBackupDimensionList(dimensionId, config) {
  const query = useQuery({
    queryKey: [QUERY_KEY.BACKUP_DIMENSIONS_LIST],
    queryFn: () => DimensionsService.backupDimensionsList(dimensionId),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.BACKUP_DIMENSIONS_LIST] };
}
