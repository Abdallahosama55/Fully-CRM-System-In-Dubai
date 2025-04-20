import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import LivekeyService from "../livekey.service";

export default function useGetLivekeys(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_LIVEKEYS],
    queryFn: () => LivekeyService.get(),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.GET_LIVEKEYS] };
}
