import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";
import CommonService from "../common.service";

export default function useGetLanguagesClient(config = {}) {

    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.GET_LANGUAGES],
        queryFn: () => CommonService.getLanguages(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.GET_LANGUAGES] };
}
