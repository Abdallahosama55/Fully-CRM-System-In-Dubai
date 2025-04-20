import { Button, Spin, Switch } from "antd";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import { useDrawer } from "context/drawerContext";
import { useNotification } from "context/notificationContext";
import React, { useCallback, useState } from "react";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import useDeleteAirlineCompany from "services/travel/Settings/Mutations/useDeleteAirlineCompany";
import EditAirlineCompany from "./AddAirlineCompany";
import useEditAirlineCompanyStatus from "services/travel/Settings/Mutations/useEditAirlineCompanyStatus";
const Actions = ({ id, countryId, name, status }) => {
  const { openNotificationWithIcon } = useNotification();
  const DrawerAPI = useDrawer();
  const [isActive, setIsActive] = useState(status);
  const { editStatusAirlineCompany, isPending: isEditStatusPending } = useEditAirlineCompanyStatus({
    onMutate: () => {
      setIsActive((prev) => !prev);
      return { optimisticTodo: !isActive };
    },
    onSuccess: (result, variables, context) => {
      setIsActive(context.optimisticTodo);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRLINE_COMPANIES] });

      // Replace optimistic todo in the todos list with the result
    },
    onError: (error, variables, context) => {
      // Remove optimistic todo from the todos list
      setIsActive(!context.optimisticTodo);
    },
  });
  const { deleteAirlineCompany, isPending } = useDeleteAirlineCompany({
    onSuccess: () => {
      openNotificationWithIcon("success", "Deleted successfully");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRLINE_COMPANIES] });
    },
  });
  const handleDelete = useCallback(async () => {
    await deleteAirlineCompany(id);
  }, [id]);
  const handleEdit = useCallback(() => {
    DrawerAPI.open("440px");
    DrawerAPI.setDrawerContent(
      <EditAirlineCompany
        close={DrawerAPI.close}
        defaultValues={{
          id,
          name,
          countryId,
        }}
      />,
    );
  }, [id, name, countryId]);
  const handleChangeStatus = useCallback(
    async (check) => {
      await editStatusAirlineCompany({ id, isActive: check });
    },
    [id],
  );
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Spin size="small" spinning={isEditStatusPending}>
        <Switch
          checked={isActive}
          title={status ? "Deactivate" : "Activate"}
          size="small"
          onChange={handleChangeStatus}
        // onChange={(e) => onRowSwitchChanged(record, e)}
        />
      </Spin>
      <Button size="small" className="table_action_button" type={"primary"} icon={<EditSVG color="#fff" />} onClick={handleEdit} />
      <Spin size="small" spinning={isPending}>
        <Button disabled={isPending} size="small" className="table_action_button" icon={<DeleteSVG />} onClick={handleDelete} />
      </Spin>
    </div>
  );
};

export default Actions;
