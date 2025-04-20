import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DiemnsionsFramesService from "../diemnsionsFrames.service";

export default function useListDiemnsionFavourite(type, dimensionId, config) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_DIEMNSION_FAVOURITE_FRAMES, type + dimensionId],
    queryFn: () => DiemnsionsFramesService.listFavourite(type, dimensionId),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.LIST_DIEMNSION_FAVOURITE_FRAMES, type + dimensionId] };
}
