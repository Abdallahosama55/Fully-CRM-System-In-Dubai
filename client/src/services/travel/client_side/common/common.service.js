import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const API_BASE = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + '/v1/b2c/common';
// GET LANGUAGES
const getLanguages = () => {
    console.log("RUN RUN RUN")
    return axios.get(API_BASE + `/list-language`)
        .then((res) => res.data.data)
        .catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const getNationalites = () => {
    return axios.get(API_BASE + `/list-nationalites`)
        .then((res) => res.data.data)
        .catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const CommonService = {
    getLanguages,
    getNationalites
}

export default CommonService;