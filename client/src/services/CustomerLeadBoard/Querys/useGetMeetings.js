import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useGetMeetings(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.MEETINGS],
    queryFn: () => CustomerLeadBoardService.getMeetings(),
    ...config,
    // select: (data) => data.data.data.rows,
  });
  return { ...query, key: [QUERY_KEY.MEETINGS] };
}
