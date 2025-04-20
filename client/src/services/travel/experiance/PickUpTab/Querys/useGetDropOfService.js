import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PickUpService from "../pick_up.service";

export default function useGetDropOfService(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_DROP_OF_SERVICE],
    queryFn: () => PickUpService.getDropOfService(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_DROP_OF_SERVICE] };
}
