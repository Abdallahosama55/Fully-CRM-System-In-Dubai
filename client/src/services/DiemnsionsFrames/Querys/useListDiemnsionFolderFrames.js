import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DiemnsionsFramesService from "../diemnsionsFrames.service";

export default function useListDiemnsionFolderFrames(type, dimensionId, config) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_DIEMNSION_FOLDER_FRAMES, type + dimensionId],
    queryFn: () => DiemnsionsFramesService.listFolderFrames(type, dimensionId),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.LIST_DIEMNSION_FOLDER_FRAMES, type + dimensionId] };
}
