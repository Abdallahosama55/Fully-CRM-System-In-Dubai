import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DeskService from "../desk.service";

export default (id, config = {}) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.DESK_METAVERSES, id],
    queryFn: () => DeskService.getMetaverse(id),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.DESK_METAVERSES, id] };
};
