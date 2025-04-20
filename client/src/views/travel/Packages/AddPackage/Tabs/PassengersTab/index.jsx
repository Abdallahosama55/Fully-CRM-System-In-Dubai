import { Button, Divider, Form, message, Select, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { ArrowDownSVG } from "assets/jsx-svg";
import Section from "components/common/Section";
import React, { useEffect } from "react";
import ContactQuestions from "./ContactQuestions";
import CustomQuestions from "./CustomQuestions";
import useAddPackageWhoCanSeeParticipants from "services/travel/packages/passengers/Mutations/useAddPackageWhoCanSeeParticipants";
import useGetPackageWhoCanSeeParticipants from "services/travel/packages/passengers/Queries/useGetPackageWhoCanSeeParticipants";
import "./styles.css";
const PassengersTab = ({ id: tripId }) => {
  const [form] = useForm();
  const getWhoCanSeeParticipants = useGetPackageWhoCanSeeParticipants(tripId, {
    enabled: !!tripId,
  });

  useEffect(() => {
    if (getWhoCanSeeParticipants?.data) {
      form.setFieldsValue({
        whoCanSeeParticipants: getWhoCanSeeParticipants?.data,
      });
    }
  }, [getWhoCanSeeParticipants?.data]);

  const addWhoCanSeeParticipants = useAddPackageWhoCanSeeParticipants(tripId, {
    onSuccess: () => {
      message.success("Passengers updated successfully");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleFinish = (values) => {
    addWhoCanSeeParticipants.mutate(values);
  };

  return (
    <Section
      className="package_passengers_tab"
      title={"Passengers"}
      headerEnd={
        <Button
          type="primary"
          onClick={() => form?.submit()}
          loading={addWhoCanSeeParticipants?.isPending}>
          Save & Next
        </Button>
      }>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name={"whoCanSeeParticipants"}
          rules={[{ required: true, message: "Select who can see participants" }]}
          initialValue={"ONLY_PARTICIPANTS"}
          label={
            <p className="sm_text_medium" style={{ color: "var(--gray-700)" }}>
              Who can see participants list
            </p>
          }>
          <Select
            style={{ width: "33%" }}
            suffixIcon={<ArrowDownSVG />}
            placeholder={"Who can see?"}
            options={[
              { label: "Only participants", value: "ONLY_PARTICIPANT" },
              { label: "public", value: "PUBLIC" },
            ]}
          />
        </Form.Item>
      </Form>

      <Divider className="divider-space-16" />

      {/* Static questions */}
      <p className="md_text_medium mb-1" style={{ color: "var(--gray-700)" }}>
        What information do you want to collect from participants?
      </p>
      <Tabs
        className="questions_tabs"
        defaultActiveKey={"1"}
        items={[
          {
            key: "1",
            label: "Questions",
            children: <ContactQuestions tripId={tripId} />,
          },
          {
            key: "2",
            label: "Custom",
            children: <CustomQuestions tripId={tripId} />,
          },
        ]}
      />
    </Section>
  );
};

export default PassengersTab;
