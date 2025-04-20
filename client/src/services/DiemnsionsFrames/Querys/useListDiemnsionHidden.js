import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DiemnsionsFramesService from "../diemnsionsFrames.service";

export default function useListDiemnsionHidden(type, dimensionId, config) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_DIEMNSION_HIDDEN_FRAMES, type + dimensionId],
    queryFn: () => DiemnsionsFramesService.listHidden(type, dimensionId),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.LIST_DIEMNSION_HIDDEN_FRAMES, type + dimensionId] };
}
