import { Button, Dropdown, message, Table } from "antd";
import { BackArrow, DeleteSVG, EditSVG, MenuDotsSVG, PlusSVG } from "assets/jsx-svg";
import CustomButton from "components/common/Button";
import AddCancellation from "./components/AddCancellation";
// API CALLS
import useGetCancelationPoliciesList from "services/travel/accommodations/Rate/Cancelation/Queries/useGetCancelationPoliciesList";
import useGetCancelationPoliciesPeriodTypes from "services/travel/accommodations/Rate/Cancelation/Queries/useGetCancelationPoliciesPeriodTypes";
import useDeleteCancelationPolicy from "services/travel/accommodations/Rate/Cancelation/Mutations/useDeleteCancelationPolicy";
import { queryClient } from "services/queryClient";
import { STEPS_KEYS } from "..";
import { useDrawer } from "hooks/useDrawer";
import { HOTEL_CANCELLATION_PERIOD_TYPES } from "constants/HOTEL_CANCELLATION_TYPES";

const Cancellation = ({ id, moveTo }) => {
  const DrawerAPI = useDrawer();
  // QUERIES
  const cancelationPoliciesQuery = useGetCancelationPoliciesList(id);
  // MUTATIONS
  const deleteCancelationPolicyMutation = useDeleteCancelationPolicy({
    onSuccess: (_, payload) => {
      queryClient.setQueryData(cancelationPoliciesQuery.key, (prev) => {
        return prev.filter((el) => el.id !== payload);
      });
    },
    onError: (error) => message.error(error.message),
  });
  return (
    <div>
      {DrawerAPI.Render}
      <div className="move_header space-between mb-1">
        <div className="prev move_link" onClick={() => moveTo(STEPS_KEYS.PROMOTION)}>
          <BackArrow color="#000" /> Promotion
        </div>
        <div>
          <Button
            type="primary"
            size="small"
            icon={<PlusSVG />}
            onClick={() => {
              DrawerAPI.open("45%");
              DrawerAPI.setDrawerContent(
                <AddCancellation
                  onEnd={() => {
                    cancelationPoliciesQuery.refetch();
                    DrawerAPI.close();
                  }}
                  accommodationId={id}
                />,
              );
            }}>
            New
          </Button>
        </div>
      </div>
      <div className="table_container">
        <Table
          loading={cancelationPoliciesQuery.isFetching}
          style={{ marginTop: "32px" }}
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
                return rowData?.periodHours + " hours " + rowData?.periodType ===
                  HOTEL_CANCELLATION_PERIOD_TYPES.BEFORE_CHECK_IN
                  ? "before check-in"
                  : "after reservation";
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
                                accommodationId={id}
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
    </div>
  );
};

export default Cancellation;
