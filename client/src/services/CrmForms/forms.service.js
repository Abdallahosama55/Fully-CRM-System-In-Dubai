import { update } from "firebase/database";
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
const getAllResponses = (params = {}) => {
    const { page = 1, formId = '' } = params;
    return axios.get(`${FORM_BASE_API}/api/forms/${formId}/submissions?page=${page}&limit=10`);
};

const addForm = (data) => axios.post(`${FORM_BASE_API}/api/forms`, data);
const deleteForm = (id) => axios.delete(`${FORM_BASE_API}/api/forms/${id}`);
const updateForm = (id, data) => axios.put(`${FORM_BASE_API}/api/forms/${id}`, data);
const FormService = {
    getAllForms,
    addForm,
    deleteForm,
    updateForm,
    getAllResponses
};

export default FormService;