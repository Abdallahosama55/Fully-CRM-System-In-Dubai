import { Col, Row } from "antd";
import { useDrawer } from "context/drawerContext";
import { useState } from "react";
import useGetCustomerById from "services/Customers/Querys/useGetCustomerById";
import CustomerSideInfo from "views/Customers/ViewCustomer/Components/CustomerSideInfo";
import Content from "views/Customers/ViewCustomer/Components/NewStyleComponents/Content";
import "../../Collaboration/CallsAndMeetingsAdd/styles.css";
import AddEditNewLeadForm from "./AddEditNewLeadForm";
import LeadContent from "./LeadContent";
import LeadSideInfo from "./LeadSideInfo";
import "./styles.css";
import AddEditContent from "views/Customers/Overview/Components/CustomerForm/AddEditContent";
import useIsMobile from "hooks/useIsMobile";

const LeadDetails = ({
  leadStoredData,
  onClose,
  selectedPipelineId,
  reloadState,
  setReloadState,
}) => {
  const [isEditing, setIsEditing] = useState(!leadStoredData);
  const [customerId, setCustomerId] = useState();
  const DrawerAPI = useDrawer();
  const [isEditClicked, setIsEditClicked] = useState(false);
  const isMobile = useIsMobile();
  const { data: customerData, isLoading } = useGetCustomerById(
    leadStoredData?.customerId ?? customerId,
    {
      refetchOnMount: false,
      enabled: Boolean(leadStoredData?.customerId ?? customerId),
      select: (data) => {
        return data?.data?.data;
      },
    },
  );

  const handleShowEditForm = () => {
    setIsEditing(true);
  };

  const handleOpenCustomerModal = (id) => {
    DrawerAPI.open("70%");
    DrawerAPI.handleSetDestroyOnClose(true);
    DrawerAPI.setDrawerContent(
      <WrapperState>
        {(value, setValue) => (
          <Row style={{ height: "100%" }} gutter={12}>
            <Col className="columns" span={7}>
              <CustomerSideInfo
                handleBack={() => {
                  DrawerAPI.handleSetDestroyOnClose(true);
                  DrawerAPI.setDrawerContent(
                    <LeadDetails
                      {...{
                        leadStoredData: leadStoredData ?? customerData,
                        onClose,
                        selectedPipelineId,
                        reloadState,
                        setReloadState,
                      }}></LeadDetails>,
                  );
                }}
                setIsEditClicked={() => {
                  setValue(true);
                }}
                id={leadStoredData?.customerId ?? id}
                onUpdateSuccess={onClose}
              />
            </Col>
            <Col span={17}>
              {value ? (
                <div className="cem-personal-card">
                  <AddEditContent
                    onUpdateSuccess={() => {
                      setValue(false);
                    }}
                    isCompany={leadStoredData?.type == "COMPANY"}
                    id={leadStoredData?.customerId}
                    onCancel={() => setValue(false)}
                  />
                </div>
              ) : (
                <Content
                  id={leadStoredData?.customerId}
                  CustomerData={customerData}
                  hasAttachement
                />
              )}
            </Col>
          </Row>
        )}
      </WrapperState>,
    );
  };

  const handleCancelEdit = (data) => {
    if (data) setCustomerId(data?.data?.data?.customerId);
    setIsEditing(false);
  };
  if (isLoading) {
    return <>Loading</>;
  }

  return isEditing ? (
    <AddEditNewLeadForm
      leadStoredData={leadStoredData}
      onClose={handleCancelEdit}
      selectedPipelineId={selectedPipelineId}
      reloadState={reloadState}
      setReloadState={setReloadState}
    />
  ) : isMobile ? (
    <>
      <LeadSideInfo
        id={leadStoredData?.customerId ?? customerId}
        leadStoredData={leadStoredData ?? customerData}
        selectedPipelineId={selectedPipelineId}
        onEditClicked={handleShowEditForm}
        handleOpenCustomerModal={handleOpenCustomerModal}
      />
      <LeadContent
        id={leadStoredData?.customerId ?? customerId}
        CustomerData={customerData}
        leadId={leadStoredData?.id}
      />
    </>
  ) : (
    <Row style={{ height: "100%" }} gutter={12}>
      <Col className="columns" span={7}>
        <LeadSideInfo
          id={leadStoredData?.customerId ?? customerId}
          leadStoredData={leadStoredData ?? customerData}
          selectedPipelineId={selectedPipelineId}
          onEditClicked={handleShowEditForm}
          handleOpenCustomerModal={handleOpenCustomerModal}
        />
      </Col>
      <Col span={17}>
        <LeadContent
          id={leadStoredData?.customerId ?? customerId}
          CustomerData={customerData}
          leadId={leadStoredData?.id}
        />
      </Col>
    </Row>
  );
};
export default LeadDetails;
const WrapperState = ({ children }) => {
  const [state, setState] = useState(false);
  return children(state, setState);
};
