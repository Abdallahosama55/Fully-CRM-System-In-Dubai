import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PickUpService from "../pick_up.service";
import { useEffect } from "react";

export default function useGetPickUpType(productId, config = { onSuccess: () => {} }) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PICK_UP_TYPE],
    queryFn: () => PickUpService.getPickUpType(productId),
    ...config,
  });

  useEffect(() => {
    if (query.isSuccess) {
      config.onSuccess(query.data);
    }
  }, [query.isSuccess]);
  return { ...query, key: [QUERY_KEY.GET_PICK_UP_TYPE] };
}
