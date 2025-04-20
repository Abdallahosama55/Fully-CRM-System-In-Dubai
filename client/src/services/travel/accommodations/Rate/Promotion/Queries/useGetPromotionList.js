import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PromotionService from "../promotions.service";

export default function useGetPromotionList(accommodation_Id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_PROMOTIONS_LIST, accommodation_Id],
        queryFn: () => PromotionService.getPromotions(accommodation_Id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_PROMOTIONS_LIST, accommodation_Id] };
}
