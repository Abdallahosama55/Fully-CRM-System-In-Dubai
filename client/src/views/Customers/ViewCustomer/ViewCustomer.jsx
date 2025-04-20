// import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import { Col, Drawer, Row } from "antd";
import useGetCustomerById from "services/Customers/Querys/useGetCustomerById";
import CustomerSideInfo from "./Components/CustomerSideInfo";
import Content from "./Components/NewStyleComponents/Content";
import { useState } from "react";
import AddEditContent from "../Overview/Components/CustomerForm/AddEditContent";
import useIsMobile from "hooks/useIsMobile";

export default function ViewCustomer({ id, onClose, onUpdateSuccess }) {
  const [isEditClicked, setIsEditClicked] = useState(false);
  const isMobile = useIsMobile();
  const [selectedLead, setSelectedLead] = useState(false);
  const { data: customerData } = useGetCustomerById(id, {
    refetchOnMount: false,
    enabled: Boolean(id),
    select: (data) => {
      return data?.data?.data;
    },
  });
  return customerData ? (
    <Drawer
      rootClassName={`right-drawer`}
      title={null}
      width="81%"
      onClose={() => {
        onClose();
        setSelectedLead(false);
        setIsEditClicked(false);
      }}
      styles={{
        header: {
          border: "none",
          padding: "0px",
        },
      }}
      open={!!id}>
      {isMobile ? (
        <>
          <CustomerSideInfo
            setIsEditClicked={setIsEditClicked}
            id={id}
            onUpdateSuccess={onUpdateSuccess}
            isCompany={customerData?.type == "COMPANY"}></CustomerSideInfo>

          {isEditClicked ? (
            <div className="cem-personal-card">
              <AddEditContent
                onUpdateSuccess={onUpdateSuccess}
                isCompany={customerData?.type == "COMPANY"}
                id={id}
                onCancel={() => setIsEditClicked(false)}
              />
            </div>
          ) : (
            <Content isSelectedLead={selectedLead} id={id} CustomerData={customerData} />
          )}
        </>
      ) : (
        <Row style={{ height: "100%" }} gutter={12}>
          {!isEditClicked && (
            <Col className="columns" span={7}>
              <CustomerSideInfo
                onChangeSelectedLead={setSelectedLead}
                setIsEditClicked={setIsEditClicked}
                id={id}
                onUpdateSuccess={onUpdateSuccess}
                isCompany={customerData?.type == "COMPANY"}></CustomerSideInfo>
            </Col>
          )}
          <Col span={isEditClicked ? 24 : 17}>
            {isEditClicked ? (
              <div className="cem-personal-card">
                <AddEditContent
                  onUpdateSuccess={onUpdateSuccess}
                  isCompany={customerData?.type == "COMPANY"}
                  id={id}
                  onCancel={() => setIsEditClicked(false)}
                />
              </div>
            ) : (
              <Content isSelectedLead={selectedLead} id={id} CustomerData={customerData} />
            )}
          </Col>
        </Row>
      )}
    </Drawer>
  ) : null;
}
