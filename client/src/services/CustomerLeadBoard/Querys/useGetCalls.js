import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useGetCalls(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.CALLS],
    queryFn: () => CustomerLeadBoardService.getCalls(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.CALLS] };
}
