import { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Skeleton, Switch, Typography, message } from "antd";
import Editor from "components/common/Editor";
import ExperianceService from "services/travel/experiance";
// images
import pulsePNG from "assets/images/pulsePNG.png";
import TextEditor from "components/common/TextEditor";
const Info = ({ id, next }) => {
  const [form] = Form.useForm();
  const [physicalDifficulties, setPhysicalDifficulties] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ageLimit = Form.useWatch("ageLimit", form);

  useEffect(() => {
    const setup = async () => {
      try {
        setIsLoading(true);
        const tempDifficulties = await ExperianceService.ExperianceTap.getPhysicalDifficulty();
        const tempRestrictions = await ExperianceService.ExperianceTap.getRestrictionsList();
        setPhysicalDifficulties(tempDifficulties);
        setRestrictions(tempRestrictions);

        if (id) {
          const tempData = await ExperianceService.ExperianceTap.getThingsToKnow(id);
          form.setFieldsValue(tempData);
        }
        setIsLoading(false);
      } catch (error) {
        message.error(error.message);
      }
    };
    setup();
  }, [id]);

  const handelFinish = (values) => {
    setIsLoading(true);
    ExperianceService.ExperianceTap.addThingsToKnow(values, id)
      .then(() => {
        next();
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      <img src={pulsePNG} alt="pulse" />
      <Typography.Title level={3} className="fz-18 title">
        Before You Book
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        Note important details like health restrictions, physical requirements, and accessibility
        information. For instance, specify wheelchair accessibility and availability of infant seats
      </Typography.Paragraph>
      <Form layout="vertical" form={form} onFinish={handelFinish} id="form_inside_tab">
        <Row gutter={[12, 12]}>
          <Col md={24} lg={12}>
            <Form.Item name="restrictions" label="What Should Travelers Know Before They Book?">
              <Select
                mode="multiple"
                placeholder="Select"
                options={restrictions.map((el) => {
                  return {
                    value: el?.id,
                    label: el?.name,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col md={24} lg={12}>
            <Form.Item name="productPhysicalDifficultyLevelId" label="Physical Difficulty Level">
              <Select
                placeholder="Select"
                options={physicalDifficulties.map((el) => {
                  return {
                    value: el?.id,
                    label: el?.name,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="details" label="Description">
              <TextEditor minHeight={150} placeholder={"Description"} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="whatToBring" label="What customers should bring with theme?">
              <TextEditor minHeight={150} placeholder={"Details"} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography.Paragraph className="fw-600">Age limit</Typography.Paragraph>
            <p className="fz-14 check_container">
              <Form.Item valuePropName="checked" initialValue={false} name="ageLimit">
                <Switch className="switch_input" size="small" />
              </Form.Item>
              Set the age limit for this experience
            </p>
          </Col>
          {ageLimit && (
            <Col span={24}>
              <Form.Item
                name="minimumAge"
                label="Minimum Age"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("You have to add the minimum age");
                      }

                      if (value < 0) {
                        return Promise.reject("age can't be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default Info;
