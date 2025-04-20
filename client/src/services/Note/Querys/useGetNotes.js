import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import NotesService from "../notes.service";

export default (params = {}, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_NOTES, params],
    queryFn: () => NotesService.getNotes(params),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.GET_NOTES, params] };
};
