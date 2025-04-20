import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DiemnsionsFramesService from "../diemnsionsFrames.service";

export default function useListDiemnsionFrames(type, dimensionId, config) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_DIEMNSION_FRAMES, type + dimensionId],
    queryFn: () => DiemnsionsFramesService.listFrames(type, dimensionId),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.LIST_DIEMNSION_FRAMES, type + dimensionId] };
}
