import axios from "axios";
import { API_BASE } from "./config";

const VINDO_SERVICE_BASE = API_BASE + "vindo/auth/";
const CUSTOMER_SERVICE_BASE = API_BASE + "customer/auth/";
const COMMON_TEST_BASE = `${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6`;

const getAuth = () => {
  return axios.get(VINDO_SERVICE_BASE + "me")
    .then((res) => {
      if (res?.data?.data?.companyApps) {
        localStorage.setItem("companyApps", JSON.stringify(res.data.data.companyApps))
      }
      if (res?.data?.data?.companyLogo) {
        localStorage.setItem("companyLogo", JSON.stringify({ logo: res?.data?.data?.companyLogo }))
      }
      return res;
    });
};

const getCustomerAuth = () => {
  return axios.get(COMMON_TEST_BASE + "/customer-portal/auth/me");
};

const login = (data) => {
  return axios.post(VINDO_SERVICE_BASE + "login", data)
    .then((res) => {
      if (res?.data?.data?.companyApps) {
        localStorage.setItem("companyApps", JSON.stringify(res.data.data.companyApps))
      }
      return res;
    });
};

const loginAsGuest = (data) => {
  return axios.post(COMMON_TEST_BASE + "/customer-portal/auth/login-as-guest", data);
};

const signup = (data) => {
  return axios.post(VINDO_SERVICE_BASE + "signup", data);
};
const signupEmployee = (data) => {
  return axios.post(VINDO_SERVICE_BASE + "signup-employee", data);
};

const logout = () => {
  return axios.get(VINDO_SERVICE_BASE + "logout");
};

const forgetPassword = (data) => {
  return axios.post(VINDO_SERVICE_BASE + "forget-password", data);
};

const verifyForgetPassword = (data) => {
  return axios.put(VINDO_SERVICE_BASE + "verify-forget-password", data);
};

const completeSignup = (data) => {
  return axios.post(VINDO_SERVICE_BASE + "complete-signup", data);
};

const AuthService = {
  getAuth,
  login,
  loginAsGuest,
  logout,
  signup,
  forgetPassword,
  verifyForgetPassword,
  completeSignup,
  signupEmployee,
  getCustomerAuth,
};

export default AuthService;
