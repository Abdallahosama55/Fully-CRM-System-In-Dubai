import { Col, Form, Radio, Row, Skeleton, Typography, message } from "antd";
import RadioInputCard from "components/common/RadioInputCard";
import { EXPERIANCE_TYPES } from "constants/EXPERIENCE";
import useAddExperianceType from "services/travel/experiance/ExperianceTab/Mutations/useAddExperianceType";
import useGetExperianceType from "services/travel/experiance/ExperianceTab/Querys/useGetExperianceType";

const Type = ({ id, next }) => {
  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);
  useGetExperianceType(id, {
    onSuccess: (reqData) => {
      if (reqData) {
        form.setFieldsValue({ type: reqData });
      }
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  const addExperianceTypeMutation = useAddExperianceType(id, {
    onSuccess: () => {
      next();
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const handelFinish = (values) => {
    if (!addExperianceTypeMutation?.isPending) {
      addExperianceTypeMutation.mutate(values?.type);
    }
  };

  if (addExperianceTypeMutation?.isPending) {
    return <Skeleton active />;
  }

  return (
    <div>
      <Typography.Title level={3} className="fz-18 title">
        Adjust your product even further...
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        You have the option to modify the type of experience you offer, make it bookable through the
        booking desk, or connect it to another platform through the Inventory Service
      </Typography.Paragraph>
      <Form id="form_inside_tab" form={form} layout="vertical" onFinish={handelFinish}>
        <Form.Item name="type" initialValue={EXPERIANCE_TYPES.TOUR_ACTIVITY}>
          <Radio.Group>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <RadioInputCard
                  title={"Tour / Activity"}
                  description={"If your experience is a tour or an activity, select this option."}
                  value={EXPERIANCE_TYPES.TOUR_ACTIVITY}
                  isChecked={type === EXPERIANCE_TYPES.TOUR_ACTIVITY}
                />
              </Col>
              <Col span={24}>
                <RadioInputCard
                  title={"Transportation"}
                  description={"If your product is a transportation service, select this option."}
                  value={EXPERIANCE_TYPES.TRANSPORTATION}
                  isChecked={type === EXPERIANCE_TYPES.TRANSPORTATION}
                />
              </Col>
              <Col span={24}>
                <RadioInputCard
                  title={"Event"}
                  description={"If your experience is an event this would be the perfect choice."}
                  value={EXPERIANCE_TYPES.EVENT}
                  isChecked={type === EXPERIANCE_TYPES.EVENT}
                />
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Type;
