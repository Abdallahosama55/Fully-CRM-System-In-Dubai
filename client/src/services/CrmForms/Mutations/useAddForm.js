import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import FormService from "../forms.service";

export default (config = {}) => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async(data) => {
            const res = await FormService.addForm(data);
            return res;
        },
        onSuccess: () => {
            message.success("Form saved successfully!");
        },
        onError: (error) => {
            console.error("Error saving form:", error);
            message.error("Failed to save form.");
        },
        ...config,
    });

    return { addForm: mutateAsync, isPending };
};