import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useGetNotes(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.NOTES],
    queryFn: () => CustomerLeadBoardService.getNotes(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.NOTES] };
}
