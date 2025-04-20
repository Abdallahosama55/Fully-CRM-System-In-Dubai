import axios from "axios";
import { API_BASE } from "services/config";

const SERVICE_BASE = API_BASE + "vindo/auth/";

const invitationAcceptJoinCompany = (data) => {
  return axios.post(SERVICE_BASE + "join-company", data).then((item) => {
    return item.data;
  });
};

const InvitationService = {
  invitationAcceptJoinCompany,
};

export default InvitationService;
