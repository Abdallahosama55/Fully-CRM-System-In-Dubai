import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "/common/";

const SearchUser = (query) => axios.get(SERVICE_BASE + "search-user?" + query);

const ParticipantsService = { SearchUser };

export default ParticipantsService;
