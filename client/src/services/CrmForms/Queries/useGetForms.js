import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import FormsService from "../forms.service";

export default (params = {}, config = {}) => {
    const query = useQuery({
        queryFn: () => FormsService.getAllForms(params),
        queryKey: [QUERY_KEY.GET_FORMS, params],
        ...config,
    });
    return {...query, key: [QUERY_KEY.GET_FORMS, params] };
};