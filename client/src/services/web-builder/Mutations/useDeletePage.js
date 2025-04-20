import { useMutation } from "@tanstack/react-query";
import WebBuilderService from "../web-builder.service";

export default (config = {}) => {
    const mutation = useMutation({
        mutationFn: (id) => WebBuilderService.deletePage(id),
        ...config,
    });
    return mutation;
};
