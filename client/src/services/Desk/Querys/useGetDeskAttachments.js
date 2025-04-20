import { useQuery } from "@tanstack/react-query";
import DeskService from "../desk.service";
import { QUERY_KEY } from "services/constants";

export default (id, config) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.DESK_ATTACHMENTS, id],
    queryFn: () => DeskService.getAttachments(id),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.DESK_ATTACHMENTS, id] };
};
