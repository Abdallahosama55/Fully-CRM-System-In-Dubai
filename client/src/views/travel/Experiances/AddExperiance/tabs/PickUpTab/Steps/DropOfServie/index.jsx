import { Col, Form, Row, Switch, Table, Typography, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import getTableCoulmns from "./table.columns";
import CustomButton from "components/common/Button";
import { PlusOutlineSVG } from "assets/jsx-svg";
import AddOrEditLocation from "../components/AddOrEditLocation";
import useGetLocations from "services/travel/experiance/PickUpTab/Querys/useGetLocations";
import useGetDropOfService from "services/travel/experiance/PickUpTab/Querys/useGetDropOfService";
import useAddDropOfService from "services/travel/experiance/PickUpTab/Mutations/useAddDropOfService";
import { PICK_UP_TYPES } from "constants/EXPERIENCE";
import { STEPS_KEYS } from "views/travel/Experiances/AddExperiance";

const DropOfServie = ({ id: productId, next, updateDoneSteps, pickUpType }) => {
  const [form] = Form.useForm();
  const isOfferDropOff = Form.useWatch("isOfferDropOff", form);
  const isSamePlacePickup = Form.useWatch("isSamePlacePickup", form);

  const [isAddOrEditDropOfLocation, setIsAddOrEditDropOfLocation] = useState(false);

  const [editId, setEditId] = useState(null);

  const getLocationsQuery = useGetLocations(
    { productId, isDropOf: true },
    {
      initialData: [],
    },
  );

  const getDropOfServiceQuery = useGetDropOfService(productId);

  const { addDropOfService } = useAddDropOfService(productId, {
    onSuccess: () => {
      updateDoneSteps(STEPS_KEYS.DROP_OFF_SERVICE);
      next();
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  useEffect(() => {
    if (getLocationsQuery.isError) {
      message.error(getLocationsQuery.error.message);
    }
  }, [getLocationsQuery.error, getLocationsQuery.isError]);

  useEffect(() => {
    if (getDropOfServiceQuery.data) {
      form.setFieldsValue(getDropOfServiceQuery.data);
    }
  }, [form, getDropOfServiceQuery.data]);

  const TABLE_COLUMNS = useMemo(() => {
    return getTableCoulmns({
      onDelete: getLocationsQuery.refetch,
      startEdit: (id) => {
        setEditId(id);
        setIsAddOrEditDropOfLocation(true);
      },
    });
  }, [getLocationsQuery.refetch]);

  const handelFinish = (values) => {
    if (
      values.isOfferDropOff &&
      !values.isSamePlacePickup &&
      !values.isCustomDropOffLocations &&
      getLocationsQuery.data?.length === 0
    ) {
      message.error("You have to add at least one Drop-of location");
    } else {
      addDropOfService(values);
    }
  };

  if (isAddOrEditDropOfLocation) {
    return (
      <AddOrEditLocation
        editId={editId}
        back={() => {
          setEditId(null);
          setIsAddOrEditDropOfLocation(false);
          getLocationsQuery.refetch();
        }}
        productId={productId}
        isDropOfLocation={true}
      />
    );
  }

  return (
    <div>
      <Typography.Title level={3} className="fz-18 title">
        Will you be providing drop-off service at the end of your experience?
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title mb-2">
        You can offer different drop-off locations from the pick-up locations
      </Typography.Paragraph>
      <Form id="form_inside_tab" form={form} layout="vertical" onFinish={handelFinish}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <p className="fz-18 fw-600">Offer drop-off service</p>
            <p className="fz-14 check_container">
              <Form.Item valuePropName="checked" initialValue={false} name="isOfferDropOff">
                <Switch className="switch_input" size="small" />
              </Form.Item>
              I want to enable drop-off services for my customers
            </p>
          </Col>
          {isOfferDropOff && (
            <>
              <Col span={24}>
                <p className="fz-18 fw-600">Custom drop-off locations</p>
                <p className="fz-14 gc">
                  You can allow the customer to enter a custom drop-off location, the customer will
                  then fill out an address to be dropped off at
                </p>
                <p className="fz-14 check_container">
                  <Form.Item
                    valuePropName="checked"
                    initialValue={false}
                    name="isCustomDropOffLocations">
                    <Switch className="switch_input" size="small" />
                  </Form.Item>
                  Allow the customer to enter a custom drop-off location
                </p>
              </Col>
              <Col span={24}>
                <p className="fz-18 fw-600">Use the same places from the pick-up service</p>
                <p className="fz-14 gc">
                  You can offer customers to be picked up and dropped off on different locations by
                  enabling this feature.
                </p>
                <p className="fz-14 check_container">
                  <Form.Item valuePropName="checked" initialValue={false} name="isSamePlacePickup">
                    <Switch className="switch_input" size="small" />
                  </Form.Item>
                  I want to drop-off users to the same places that they can be picked up from
                </p>
              </Col>
            </>
          )}
        </Row>
        {isOfferDropOff && !isSamePlacePickup && (
          <div className="mt-1">
            <Table
              loading={getLocationsQuery.isLoading}
              columns={TABLE_COLUMNS}
              dataSource={getLocationsQuery.data}
              bordered={false}
              pagination={false}
            />
            <CustomButton
              icon={<PlusOutlineSVG color="#FFF" />}
              className="mt-1"
              onClick={() => {
                setIsAddOrEditDropOfLocation(true);
              }}>
              Add Drop-of location
            </CustomButton>
          </div>
        )}
      </Form>
    </div>
  );
};

export default DropOfServie;
