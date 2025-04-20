import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
// GET
const getRates = (data) => {
    let query = ""
    Object.keys(data).forEach((key) => {
        if (key !== "children_age") {
            query += `${key}=${data[key]}&`
        }
    })


    query = query.slice(0, -1);
    return TravelDashboardAPI.get(`/accommodation/contract/simulator/search?${query}`).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

const SimulatorAPI = {
    getRates
}

export default SimulatorAPI;