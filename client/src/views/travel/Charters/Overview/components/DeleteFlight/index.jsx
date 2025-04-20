import { Button, Col, Spin } from "antd";
import { DeleteSVG } from "assets/jsx-svg";
import React, { useCallback } from "react";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import useDeleteFlight from "services/travel/charters/Mutations/useDeleteFlight";
const DeleteFlight = ({ id }) => {
  const { deleteFlight, isPending } = useDeleteFlight({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FLIGHT_SOURCES] });
    },
  });
  const handleDeleteFlight = useCallback(() => {
    deleteFlight(id);
  }, [id]);

  return (
    <Spin size="small" spinning={isPending}>
      <Button className="table_action_button" type={"primary"} danger icon={<DeleteSVG
         onClick={handleDeleteFlight} color={"#fff"}/>} 
          />
    </Spin>
  );
};

export default DeleteFlight;
