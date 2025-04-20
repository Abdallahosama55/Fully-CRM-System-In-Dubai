import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE_OFFICES = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + "dashboard/officer/";

const addOffice = (params) => {
  return axios
    .post(SERVICE_BASE_OFFICES + "add", params)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(
        error?.response?.data?.errors
          ? error.response.data.errors[0]
          : "something went wrong with the server",
      );
    });
};

const editOffice = (params) => {
  return axios
    .put(SERVICE_BASE_OFFICES + `edit/${params.id}`, params)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const updateOfficePassword = (payload) => {
  return axios
    .put(SERVICE_BASE_OFFICES + `change-password/${payload.id}`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getOfficeById = (id) => {
  return axios
    .get(SERVICE_BASE_OFFICES + `get-by-id/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getOffices = (params) => {
  return axios
    .get(SERVICE_BASE_OFFICES + `search`, {
      params: params,
    })
    .then((res) => {
      return {
        data: res.data.data.rows,
        totalCount: res.data.data.count,
        totalPages: res.data.data.totalPages,
      };
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const deleteOfficeById = (id) => {
  return axios
    .delete(SERVICE_BASE_OFFICES + `delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getOfficeInsights = (id) => {
  return axios
    .get(SERVICE_BASE_OFFICES + `get-insights/${id}`)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const editOfficeLevel = ({ id, level }) => {
  return axios
    .put(SERVICE_BASE_OFFICES + `edit-office-level/${id}`, { level })
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// *STATEMENTS APIS
const addStatement = (payload) => {
  return axios
    .post(SERVICE_BASE_OFFICES + "add-statment", payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// add-reverse-statment
const addReverseStatment = (payload) => {
  return axios
    .put(SERVICE_BASE_OFFICES + `add-reverse-statment/${payload?.id}`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addCreditLineLimit = (payload) => {
  return axios
    .put(SERVICE_BASE_OFFICES + "set-credit-line-limit", payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const updateStatementStatus = (payload) => {
  return axios
    .put(SERVICE_BASE_OFFICES + `update-statment/${payload?.id}`, { ...payload, id: undefined })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getAgentStatements = (params) => {
  return axios
    .get(SERVICE_BASE_OFFICES + "list-agent-statement", { params: params })
    .then((res) => {
      return {
        ...res?.data?.data,
        totals: res?.data?.totals,
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getSupplierStatements = (params) => {
  return axios
    .get(SERVICE_BASE_OFFICES + "list-supplier-statement", { params: params })
    .then((res) => {
      return {
        ...res?.data?.data,
        totals: res?.data?.totals,
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getStatements = (params) => {
  return axios
    .get(SERVICE_BASE_OFFICES + "list-all-statement", { params: params })
    .then((res) => {
      return {
        ...res?.data?.data,
        totals: res?.data?.totals,
      };
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getCreditLineLimit = (officerId) => {
  return axios
    .get(SERVICE_BASE_OFFICES + `get-credit-line-limit/${officerId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const generateofficerToken = (officerId) => {
  return axios
    .post(SERVICE_BASE_OFFICES + `generate-token/${officerId}`)
    .then((res) => {
      console.log({ data: res?.data?.data });
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : "something went wrong with the server",
      );
    });
};

const StatementsService = {
  addStatement,
  addReverseStatment,
  addCreditLineLimit,
  updateStatementStatus,
  getCreditLineLimit,
  getStatements,
  getAgentStatements,
  getSupplierStatements,
};

// *USERS APIS
const addOfficeUser = (payload) => {
  return axios
    .post(SERVICE_BASE_OFFICES + "add-office-user", payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        error?.response?.data?.errors
          ? error.response.data.errors[0]
          : "something went wrong with the server",
      );
    });
};

const editOfficeUser = (payload) => {
  return axios
    .put(SERVICE_BASE_OFFICES + `edit-office-user/${payload.userId}`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getOfficeUsers = (params) => {
  return axios
    .get(SERVICE_BASE_OFFICES + `list-office-users`, { params: params })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getOfficeUserById = (id) => {
  return axios
    .get(SERVICE_BASE_OFFICES + `get-office-user-data/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const flipOfficeUserActiveStatus = (id) => {
  return axios
    .put(SERVICE_BASE_OFFICES + `activate-office-user/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const OfficesUsersService = {
  addOfficeUser,
  editOfficeUser,
  getOfficeUsers,
  getOfficeUserById,
  flipOfficeUserActiveStatus,
};

const OfficesService = {
  addOffice,
  editOffice,
  updateOfficePassword,
  getOfficeById,
  getOffices,
  generateofficerToken,
  deleteOfficeById,
  getOfficeInsights,
  editOfficeLevel,
  StatementsService,
  OfficesUsersService,
};

export default OfficesService;
