import { message } from "antd";

export const axiosCatch = (error) => {
  if (
    error?.response?.data?.message === "Unauthorized" ||
    error?.response?.data?.msg === "Unauthorized"
  ) {
    return;
  }
  const errorMessage =
    error?.response?.data?.message || error?.response?.data?.msg || error.message;
  const finalMessageError =
    typeof error.response.data.errors === "object" && error?.response?.data?.errors?.length > 0
      ? error?.response?.data?.errors?.[0] ?? errorMessage
      : errorMessage;
  message.error({
    message: finalMessageError,
  });
};
