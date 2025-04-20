import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import LeadService from "../Leads.service";
// import { useQueryClient } from "@tanstack/react-query";

import { useInfiniteQuery } from "@tanstack/react-query";
export default function useGetLeads(params={},config = {}) {
  // const queryClient= useQueryClient();
  const query =useInfiniteQuery({
    queryKey: [QUERY_KEY.LEADS],
    queryFn: ({ pageParam = 1 }) => LeadService.getLeads({page:pageParam}) ,
    // ...options,
    getNextPageParam: (lastPage, allPages) =>{
          return false;
    },
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  }); 


  return { ...query, key: [QUERY_KEY.LEADS] };
}
