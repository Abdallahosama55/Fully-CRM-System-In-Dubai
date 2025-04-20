import axios from "axios";
import { API_BASE_DOMAIN } from "../config";

const SERVICE_BASE = API_BASE_DOMAIN + "vindo/";

const fileUpload = (data) => {
  return axios.post(SERVICE_BASE + "file-upload", data);
};

const FileUploadService = {
  fileUpload,
};

export default FileUploadService;
