import { LeftOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import LoadingPage from "components/common/LoadingPage";
import CustomerCard from "components/crm-board/CustomerCard";
import { useDrawer } from "hooks/useDrawer";
import { useCallback, useState } from "react";
import useUpdateStatusCustomer from "services/Customers/Mutations/useUpdateStatusCustomer";
import useGetCustomerInfo from "services/Customers/Querys/useGetCustomerInfo";
import useGetLeadById from "services/Leads/Querys/useGetLeadById";
import LeadSideInfo from "views/Leads/AddEditNewLeadForm/LeadSideInfo";

const CustomerSideInfo = ({
  id,
  onUpdateSuccess,
  isCompany,
  setIsEditClicked,
  handleBack,
  onChangeSelectedLead,
}) => {
  const DrawerAPI = useDrawer();
  const onClose = useCallback(() => {
    DrawerAPI.close();
  }, []);
  const [selectLeadId, setSelectLeadId] = useState();
  const queryClient = useQueryClient();
  const { data: CustomerData, key } = useGetCustomerInfo(id, {
    refetchOnMount: false,
    select: (data) => {
      return data?.data?.data;
    },
  });
  const { data, isLoading } = useGetLeadById(selectLeadId, {
    enabled: !!selectLeadId,
    select: (data) => data.data.data,
  });
  const { updateStatus } = useUpdateStatusCustomer();

  const handleOpen = () => {
    setIsEditClicked(true);
  };
  const onEditStatus = async () => {
    await updateStatus({ id });
    queryClient.setQueryData(key, (prev) => ({
      ...prev,
      data: { ...prev.data, data: { ...prev.data.data, isActive: !prev.data.data.isActive } },
    }));
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  return (
    <>
      {DrawerAPI.Render}
      {handleBack && (
        <div style={{ cursor: "pointer" }} onClick={handleBack}>
          <LeftOutlined /> Back
        </div>
      )}
      {data && selectLeadId ? (
        <LeadSideInfo
          leadStoredData={data}
          handleOpenCustomerModal={() => {
            setSelectLeadId();
            onChangeSelectedLead && onChangeSelectedLead(false);
          }}
        />
      ) : (
        <CustomerCard
          isLoading={isLoading}
          onSelectLead={(value) => {
            onChangeSelectedLead && onChangeSelectedLead(true);
            setSelectLeadId(value);
          }}
          isCompany={isCompany}
          status={CustomerData?.isActive}
          onEditStatus={onEditStatus}
          onEditClicked={handleOpen}
          isShowingIcons={false}
          CustomerData={CustomerData}
        />
      )}
    </>
  );
};

export default CustomerSideInfo;
