import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PromotionService from "../promotions.service";

export default function useGetPromotionByID(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_PROMOTION_BY_ID, id],
        queryFn: () => PromotionService.getPromotionById(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_PROMOTION_BY_ID, id] };
}
