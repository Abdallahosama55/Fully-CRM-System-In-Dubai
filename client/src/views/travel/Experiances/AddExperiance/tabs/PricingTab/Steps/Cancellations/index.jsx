import { Button, Dropdown, Form, message, Table, Typography } from "antd";
import { useDrawer } from "context/drawerContext";
import React from "react";
import useDeleteCancelationPolicy from "services/travel/experiance/CancelationTab/Mutations/useDeleteCancelationPolicy";
import useGetCancelationPoliciesList from "services/travel/experiance/CancelationTab/Queries/useGetCancelationPoliciesList";
import AddCancellation from "./AddCancellation";
import { DeleteSVG, EditSVG, MenuDotsSVG, PlusSVG } from "assets/jsx-svg";

const Cancellations = ({ productId, next }) => {
  const DrawerAPI = useDrawer();
  // QUIRES
  const cancelationPoliciesQuery = useGetCancelationPoliciesList(productId, { enabled: !!productId });

  // MUTATIONS
  const deleteCancelationPolicyMutation = useDeleteCancelationPolicy({
    onSuccess: () => {
      message.success("Cancellation deleted successfully");
      cancelationPoliciesQuery.refetch();
    },
    onError: (error) => message.error(error.message),
  });

  const handelFinish = () => {
    if (cancelationPoliciesQuery?.data?.length > 0) {
      next();
    } else {
      message.warning("Add at least one cancellation policy");
    }
  };
  return (
    <div>
      <Typography.Title level={3} className="fz-18 title">
        Manage Your Experience Cancellation Policies
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        Create and customize your experience cancellation policies to suit your needs. Set flexible,
        moderate, or strict cancellation terms that protect your time while providing clarity for
        your customers. Your policies will be clearly communicated during the booking process,
        helping to manage expectations and reduce potential disputes.
      </Typography.Paragraph>
      <Form id="form_inside_tab" layout="vertical" onFinish={handelFinish} hidden />
      <div className="table_container">
        <Table
          loading={cancelationPoliciesQuery.isLoading}
          style={{ marginTop: "32px" }}
          pagination={cancelationPoliciesQuery.data?.length > 5}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
            },
            {
              title: "Period",
              dataIndex: "period",
              key: "period",
              render: (_, rowData) => {
                return (
                  rowData?.periodHours +
                  " hours " +
                  rowData?.periodType?.toLowerCase()?.replaceAll("_", " ")
                );
              },
            },
            {
              title: "",
              dataIndex: "id",
              key: "id",
              fixed: "right",
              width: "120px",
              render: (editId, rowData) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          onClick: () => {
                            DrawerAPI.open("45%");
                            DrawerAPI.setDrawerContent(
                              <AddCancellation
                                onEnd={() => {
                                  cancelationPoliciesQuery.refetch();
                                  DrawerAPI.close();
                                }}
                                experianceId={productId}
                                data={rowData}
                                id={editId}
                              />,
                            );
                          },
                          label: (
                            <div className="d-flex" style={{ gap: "5px", alignItems: "center" }}>
                              <EditSVG />
                              Edit
                            </div>
                          ),
                          key: "0",
                        },
                        {
                          onClick: () => deleteCancelationPolicyMutation.mutate(editId),
                          label: (
                            <div className="d-flex" style={{ gap: "5px", alignItems: "center" }}>
                              <DeleteSVG color="#F40055" />
                              Delete
                            </div>
                          ),
                          key: "1",
                        },
                      ],
                    }}
                    trigger={["click"]}
                    placement="bottom">
                    <Button type="default" size="small" className="actions_btn center-items">
                      <MenuDotsSVG />
                    </Button>
                  </Dropdown>
                );
              },
            },
          ]}
          dataSource={cancelationPoliciesQuery.data}
        />
      </div>

      <Button
        type="primary"
        style={{ marginTop: "0.5rem" }}
        icon={<PlusSVG fill={"currentColor"} />}
        onClick={() => {
          DrawerAPI.open("45%");
          DrawerAPI.setDrawerContent(
            <AddCancellation
              onEnd={() => {
                cancelationPoliciesQuery.refetch();
                DrawerAPI.close();
              }}
              experianceId={productId}
            />,
          );
        }}>
        Cancelation policy
      </Button>
    </div>
  );
};

export default Cancellations;
