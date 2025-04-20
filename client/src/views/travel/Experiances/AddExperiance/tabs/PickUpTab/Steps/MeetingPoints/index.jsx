import { useEffect, useMemo, useState } from "react";
import { Form, Table, Typography, message } from "antd";
import getTableCoulmns from "./table.columns";
import Button from "components/common/Button";
import AddOrEditMeetingPoints from "../components/AddOrEditMeetingPoints";
import useGetPickUpMeetingPoints from "services/travel/experiance/PickUpTab/Querys/useGetPickUpMeetingPoints";
import { PlusOutlineSVG, PlusSVG } from "assets/jsx-svg";
import { STEPS_KEYS } from "views/travel/Experiances/AddExperiance";

const MeetingPoints = ({ id: productId, next, updateDoneSteps }) => {
  const [isAddOrEditMeetingPoints, setIsAddOrEditMeetingPoints] = useState(false);
  const [editId, setEditId] = useState("");

  const getPickUpMeetingPointsQuery = useGetPickUpMeetingPoints(productId, {
    initialData: [],
  });

  useEffect(() => {
    if (getPickUpMeetingPointsQuery.isError) {
      message.error(getPickUpMeetingPointsQuery.error.message);
    }
  }, [getPickUpMeetingPointsQuery.error, getPickUpMeetingPointsQuery.isError]);

  const TABLE_COLUMNS = useMemo(() => {
    return getTableCoulmns({
      onDelete: getPickUpMeetingPointsQuery.refetch,
      startEdit: (id) => {
        setEditId(id);
        setIsAddOrEditMeetingPoints(true);
      },
    });
  }, [getPickUpMeetingPointsQuery.refetch]);

  if (
    isAddOrEditMeetingPoints ||
    (getPickUpMeetingPointsQuery?.isSuccess && getPickUpMeetingPointsQuery?.data?.length === 0)
  ) {
    return (
      <AddOrEditMeetingPoints
        productId={productId}
        editId={editId}
        back={() => {
          setEditId(null);
          setIsAddOrEditMeetingPoints(false);
          getPickUpMeetingPointsQuery.refetch();
        }}
      />
    );
  }

  return (
    <div>
      <Form
        hidden
        id="form_inside_tab"
        onFinish={() => {
          if (getPickUpMeetingPointsQuery.data?.length === 0) {
            message.error("You have to add at least one meeting point");
          } else {
            updateDoneSteps(STEPS_KEYS.MEETING_POINTS);
            next();
          }
        }}
      />
      <Typography.Title level={3} className="fz-18 title">
        Where should travellers meet you?
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        We recommend meeting at a location that's easy for the traveller to find, such as a bus
        stop, a well-known building, or a landmark
      </Typography.Paragraph>
      <Table
        loading={getPickUpMeetingPointsQuery.isLoading}
        columns={TABLE_COLUMNS}
        dataSource={getPickUpMeetingPointsQuery.data}
        bordered={false}
        pagination={false}
      />
      <Button
        type={"primary"}
        icon={<PlusSVG color="currentColor" />}
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setIsAddOrEditMeetingPoints(true);
        }}>
        Add Start Point
      </Button>
    </div>
  );
};

export default MeetingPoints;
