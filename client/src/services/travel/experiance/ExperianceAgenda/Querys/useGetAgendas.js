import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AgendasService from "../agendas.service";
import { useEffect } from "react";

export default function useGetAgendas(id, config = {}) {
  const configLocal = {
    onSuccess: () => {},
    onError: () => {},
    ...config,
  };
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_AGENDAS],
    queryFn: () => AgendasService.getAgendas(id),
    ...configLocal,
  });

  useEffect(() => {
    if (query.isSuccess) {
      configLocal.onSuccess(query?.data);
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      configLocal.onError(query?.error);
    }
  }, [query.isError]);
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_AGENDAS] };
}
