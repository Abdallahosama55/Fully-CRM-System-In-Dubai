import { useEffect } from "react";
import { Col, Form, Input, Row, Switch, Table, message } from "antd";
import useGetLocations from "services/travel/experiance/PickUpTab/Querys/useGetLocations";
import useGetPickTiming from "services/travel/experiance/PickUpTab/Querys/useGetPickTiming";
import useAddPickUpTiming from "services/travel/experiance/PickUpTab/Mutations/useAddPickUpTiming";
import { STEPS_KEYS } from "views/travel/Experiances/AddExperiance";

const PickUpTiming = ({ id: productId, next , updateDoneSteps }) => {
  const [form] = Form.useForm();
  const perLocation = Form.useWatch("perLocation", form);

  const getLocationsQuery = useGetLocations(
    { productId, isDropOf: false },
    {
      initalValue: [],
    },
  );

  const getPickTiming = useGetPickTiming(productId);

  useEffect(() => {
    if (getLocationsQuery.isError) {
      message.error(getLocationsQuery.error.message);
    }
  }, [getLocationsQuery.error, getLocationsQuery.isError]);

  useEffect(() => {
    if (getPickTiming.isError) {
      message.error(getPickTiming.error.message);
    }
  }, [getPickTiming.error, getPickTiming.isError]);

  useEffect(() => {
    const data = getPickTiming.data;
    if (getPickTiming.data) {
      form.setFieldsValue({
        start: data?.pickupBegiData?.start || 30,
        timeWindow: data?.pickupBegiData?.timeWindow || 0,
        perLocation: data?.pickupBegiData?.perLocation,
        individualLocations: data?.pickupPlacesBegin?.map((el) => {
          return {
            id: el?.productPickupPlaceId,
            minBeforeStart: el?.minBeforeStart,
          };
        }),
      });
    }
  }, [form, getPickTiming.data]);

  const { addPickUpTiming, isPending } = useAddPickUpTiming(productId, {
    onSuccess: () => {
      updateDoneSteps(STEPS_KEYS.PICK_UP_TIMING);
      next();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handelFinish = (values) => {
    if (!isPending) {
      addPickUpTiming({
        ...values,
        start: !Boolean(perLocation) ? values?.start : undefined,
        perLocation: Boolean(perLocation) ? undefined : perLocation,
      });
    }
  };

  const minutesValidator = (_, value) => {
    if (isNaN(value)) {
      return Promise.reject("You need to add time in minutes");
    }

    if (value < 0) {
      return Promise.reject("Minutes can't be less than 0");
    }

    return Promise.resolve();
  };

  return (
    <div>
      <Form id="form_inside_tab" form={form} layout="vertical" onFinish={handelFinish}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Form.Item
              name="start"
              initalValue={60}
              label={
                <div>
                  <p className="fz-16">When does the pick-up start?</p>
                  <p className="fz-14 gc">
                    How many minutes before departure does the pick-up start?
                  </p>
                </div>
              }
              rules={[{ validator: minutesValidator }]}>
              <Input type="number" min={0} disabled={perLocation} placeholder="Minutes" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="timeWindow"
              initalValue={0}
              label={
                <div>
                  <p className="fz-16">Do you need to give your customers a pick-up time window?</p>
                  <p className="fz-14 gc">Use this to define a pick-up time window.</p>
                </div>
              }
              rules={[{ validator: minutesValidator }]}>
              <Input type="number" min={0} placeholder="Minutes" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <p className="fz-18 fw-600">You can also define pick-up start times, per location.</p>
            <p className="fz-14 check_container">
              <Form.Item valuePropName="checked" initialValue={false} name="perLocation">
                <Switch className="switch_input" size="small" />
              </Form.Item>
              I need to define pick-up times for individual locations.
            </p>
          </Col>
          {perLocation && (
            <Col span={24}>
              <p className="fz-18 fw-600">Pick-up times for individual locations</p>
              <Table
                columns={[
                  {
                    title: "Location",
                    dataIndex: "title",
                    key: "title",
                  },
                  {
                    title: "Min before start",
                    dataIndex: "id",
                    key: "id",
                    width: 300,
                    render: (id, _, index) => {
                      return (
                        <>
                          <Form.Item
                            hidden
                            name={["individualLocations", index, "id"]}
                            initialValue={id}
                          />
                          <Form.Item
                            name={["individualLocations", index, "minBeforeStart"]}
                            rules={[{ validator: minutesValidator }]}
                            initialValue={0}>
                            <Input type="number" min={0} style={{ maxWidth: "250px" }} />
                          </Form.Item>
                        </>
                      );
                    },
                  },
                ]}
                dataSource={getLocationsQuery.data}
                pagination={false}
                bordered={false}
              />
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default PickUpTiming;
