import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE_PRICING_MODULE =
  import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + "dashboard/pricing-model/";

const listSuppliers = (inventory_type) => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE + `list-supplier/${inventory_type}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listAgentSuppliers = () => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE + `list-agent-suppliers`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listBuyerGroub = () => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE + `list-buyer-groub`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listInventorySuppliers = (buyerGroupId) => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE + `list-inventory-suppliers/${buyerGroupId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const setSupplierToBuyerGroub = (payload) => {
  return axios
    .post(SERVICE_BASE_PRICING_MODULE + `set-supplier-to-buyer-groub`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const setPrice = (payload) => {
  return axios
    .post(SERVICE_BASE_PRICING_MODULE + "set-price", payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const deletePriceModel = (id) => {
  return axios
    .delete(SERVICE_BASE_PRICING_MODULE + `delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getPriceModelPrice = (id) => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE + `get-price/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getSelectedSupplier = (params) => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE + `get-selected-supplier`, { params: params })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const SERVICE_BASE_PRICING_MODULE_AGENT =
  import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + "dashboard/pricing-model/agent/";

const listDmcSuppliersAgent = (inventory_type) => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE_AGENT + `list-buyer-group-suppliers`, {
      params: { inventory_type },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listInventorySuppliersAgent = (buyerGroupId) => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE_AGENT + `list-inventory-suppliers/${buyerGroupId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const setSupplierToBuyerGroubAgent = (payload) => {
  return axios
    .post(SERVICE_BASE_PRICING_MODULE_AGENT + `set-supplier-to-buyer-groub`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const setPriceAgent = (payload) => {
  return axios
    .post(SERVICE_BASE_PRICING_MODULE_AGENT + "set-price", payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const deletePriceModelAgent = (id) => {
  return axios
    .delete(SERVICE_BASE_PRICING_MODULE_AGENT + `delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getPriceModelPriceAgent = (params) => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE_AGENT + `get-price`, { params: { ...params } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getSelectedSupplierAgent = (params) => {
  return axios
    .get(SERVICE_BASE_PRICING_MODULE_AGENT + `get-selected-supplier`, { params: params })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const AgentService = {
  listDmcSuppliersAgent,
  listInventorySuppliersAgent,
  setSupplierToBuyerGroubAgent,
  setPriceAgent,
  deletePriceModelAgent,
  getPriceModelPriceAgent,
  getSelectedSupplierAgent,
};

const PricingModulesService = {
  listSuppliers,
  listAgentSuppliers,
  listBuyerGroub,
  listInventorySuppliers,
  setSupplierToBuyerGroub,
  setPrice,
  deletePriceModel,
  getPriceModelPrice,
  getSelectedSupplier,
  AgentService,
};

export default PricingModulesService;
