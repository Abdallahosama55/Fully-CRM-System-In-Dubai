import { Suspense, useCallback, useRef, useState } from "react";
import { Col, Row, Steps, Typography, message } from "antd";
import Box from "components/Box";
import Address from "./Address";
import ContactDetails from "./ContactDetails";
import useAddCustomer from "services/Customers/Mutations/useAddCustomer";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import { omitBy, isUndefined, isNull } from "lodash";
import Attachments from "./Attachments";
import AddEditContent from "./AddEditContent";
import LoadingPage from "components/common/LoadingPage";
const steps = [
  {
    title: "personal info",
    key: "personal",
  },
  {
    title: "Address",
    key: "address",
  },
  {
    title: "Contact details",
    key: "details",
  },
  {
    title: "Attachments",
    key: "attachments",
  },
];
const CustomeSteps = ({ onClose, isLoading, id, isCompany }) => {
  const [current, setCurrent] = useState(0);
  const query = useQueryClient();
  const formRef = useRef();
  const customRef = useRef();

  const formData = useRef({});
  const { addCustomer, isPending } = useAddCustomer({
    onError: (data) => {
      message.error(data?.response?.data?.errors ?? data?.response?.data?.message);
    },
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: [QUERY_KEY.CUSTOMERS] });
      message.success(data.data.message);
      onClose();
    },
  });

  return (
    <section>
      <AddEditContent isCompany={isCompany} onCancel={onClose} />
    </section>
  );
};

export default CustomeSteps;
