import { Spin, Switch } from "antd";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import { useDrawer } from "context/drawerContext";
import { useNotification } from "context/notificationContext";
import { useCallback, useState } from "react";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import useDeleteAirport from "services/travel/Settings/Mutations/useDeleteAirport";

import useEditAirportStatus from "services/travel/Settings/Mutations/useEditAirportStatus";
import AddAirports from "./AddAirports";
const Actions = ({ id, countryId, cityId, code, name, status, stateId }) => {
  const { openNotificationWithIcon } = useNotification();
  const DrawerAPI = useDrawer();
  const [isActive, setIsActive] = useState(status);
  const { editStatusAirport, isPending: isEditStatusPending } = useEditAirportStatus({
    onMutate: () => {
      setIsActive((prev) => !prev);
      return { optimisticTodo: !isActive };
    },
    onSuccess: (result, variables, context) => {
      setIsActive(context.optimisticTodo);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRPORTS] });

      // Replace optimistic todo in the todos list with the result
    },
    onError: (error, variables, context) => {
      // Remove optimistic todo from the todos list
      setIsActive(!context.optimisticTodo);
    },
  });
  const { deleteAirport, isPending } = useDeleteAirport({
    onSuccess: () => {
      openNotificationWithIcon("success", "Deleted successfully");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_AIRPORTS] });
    },
  });
  const handleDelete = useCallback(async () => {
    await deleteAirport(id);
  }, [id]);
  const handleEdit = useCallback(() => {
    DrawerAPI.open("440px");
    DrawerAPI.setDrawerContent(
      <AddAirports
        close={DrawerAPI.close}
        defaultValues={{
          id,
          name,
          cityId,
          code,
          stateId,
          countryId,
        }}
      />,
    );
  }, [id, name, countryId]);
  const handleChangeStatus = useCallback(
    async (check) => {
      await editStatusAirport({ id, isActive: check });
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
      <span style={{ cursor: "pointer" }} onClick={handleEdit}>
        <EditSVG color="#030713" />
      </span>
      <Spin size="small" spinning={isPending}>
        <span
          onClick={handleDelete}
          title="Delete"
          style={{ cursor: isPending ? "not-allowed" : "pointer" }}>
          <DeleteSVG />
        </span>
      </Spin>
    </div>
  );
};

export default Actions;
