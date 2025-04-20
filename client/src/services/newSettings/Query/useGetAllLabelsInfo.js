import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import LabelsService from "../labels.service";
import { queryClient } from "services/queryClient";

export default function useGetAllLabelsInfo(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LABELS],
    queryFn: () => LabelsService.getAll(),

    ...config,
  });
  return { ...query };
}

export const fetchLabelLookups = () => {
  queryClient.fetchQuery({
    queryKey: [QUERY_KEY.LABELS],
    queryFn: () => LabelsService.getAll(),
  });
};
