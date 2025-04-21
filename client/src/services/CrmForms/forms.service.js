import { FORM_BASE_API } from "../config";
import axios from "axios";

const getAllForms = (params = {}) => {
    const {
        status = '',
            startDate = '',
            endDate = '',
            page = 1
    } = params;

    return axios.get(`${FORM_BASE_API}/api/forms/?status=${status}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=10`);
};

const FormService = {
    getAllForms,
};

export default FormService;