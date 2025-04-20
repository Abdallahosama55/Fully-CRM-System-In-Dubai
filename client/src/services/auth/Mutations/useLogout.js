import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import { useUserContext } from "context/userContext";
import { useNavigate } from "react-router-dom";
import AuthService from "services/auth.service";

export default function useLogout(config = {}) {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const tempMutation = useMutation({
    mutationFn: () => {
      return AuthService.logout();
    },
    onSuccess: () => {
      localStorage.removeItem("vindo-token");
      localStorage.removeItem("DMC_TOKEN");
      localStorage.removeItem("user-id");
      localStorage.removeItem("time-zone");
      axios.defaults.headers.authorization = null;
      navigate("/login");
      setUser(null);
    },
    onError: () => {
      message.error("Something went wrong");
    },
    ...config,
  });
  return tempMutation;
}
