import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useGetEmails(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.EMAILS],
    queryFn: () => CustomerLeadBoardService.getEmails(),
    ...config,
    // select: (data) => data.data.data.rows,
  });
  return { ...query, key: [QUERY_KEY.EMAILS] };
}
