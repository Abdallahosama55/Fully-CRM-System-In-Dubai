import { useEffect, useMemo, useState } from "react";
import { Button, Form, Table, Typography, message } from "antd";
import { PlusOutlineSVG, PlusSVG } from "assets/jsx-svg";
import getTableCoulmns from "./table.columns";
import AddOrEditLocation from "../components/AddOrEditLocation";
import useGetLocations from "services/travel/experiance/PickUpTab/Querys/useGetLocations";
import { PICK_UP_TYPES } from "constants/EXPERIENCE";
import { STEPS_KEYS } from "views/travel/Experiances/AddExperiance";

const PickUpService = ({ next, id: productId, pickUpType, updateDoneSteps }) => {
  const [isAddOrEditPickUpLocation, setIsAddOrEditPickUpLocation] = useState(false);
  const [editId, setEditId] = useState("");

  const getLocationsQuery = useGetLocations(
    { productId, isDropOf: false },
    {
      initalValue: [],
    },
  );

  useEffect(() => {
    if (getLocationsQuery.isError) {
      message.error(getLocationsQuery.error.message);
    }
  }, [getLocationsQuery.error, getLocationsQuery.isError]);

  const TABLE_COLUMNS = useMemo(() => {
    return getTableCoulmns({
      onDelete: getLocationsQuery.refetch,
      startEdit: (id) => {
        setEditId(id);
        setIsAddOrEditPickUpLocation(true);
      },
    });
  }, [getLocationsQuery.refetch]);

  if (
    isAddOrEditPickUpLocation ||
    (getLocationsQuery?.isSuccess && getLocationsQuery?.data?.length === 0)
  ) {
    return (
      <AddOrEditLocation
        productId={productId}
        editId={editId}
        back={() => {
          setEditId(null);
          setIsAddOrEditPickUpLocation(false);
          getLocationsQuery.refetch();
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
          if (getLocationsQuery.data?.length === 0) {
            message.error("You have to add at least one meeting point");
          } else {
            updateDoneSteps(STEPS_KEYS.PICK_UP_SERVICE);
            next();
          }
        }}
      />
      <Typography.Title level={3} className="fz-26 title">
        Where can travellers be picked up from?
      </Typography.Title>
      <Typography.Paragraph className="fz-18 sub_title">
        We recommend picked up at a location that's easy for the traveller to find, such as a bus
        stop, a well-known building, or a landmark
      </Typography.Paragraph>
      <Table
        loading={getLocationsQuery.isLoading}
        columns={TABLE_COLUMNS}
        dataSource={getLocationsQuery.data}
        bordered={false}
        pagination={false}
      />
      <Button
        icon={<PlusSVG color="currentColor" />}
        type="primary"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setIsAddOrEditPickUpLocation(true);
        }}>
        Add Pick-Up location
      </Button>
    </div>
  );
};

export default PickUpService;
