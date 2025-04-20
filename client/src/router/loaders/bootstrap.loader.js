import { fetchConstants } from "services/Constants/Querys/useGetConstants";
import { fetchLabelLookups } from "services/newSettings/Query/useGetAllLabelsInfo";

export const bootstrapLoader = async () => {
  try {
    fetchConstants();
    fetchLabelLookups();
    // Any additional initialization tasks can be added here
    return true; // Indicate successful initialization
  } catch (error) {
    console.error("Error during bootstrap:", error);
    return false; // Indicate failed initialization
  }
};
