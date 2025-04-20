import { Flex, Form, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import ColoredCircle from "components/common/ColoredCircle";
import TextEditor from "components/common/TextEditor";
import { TEMPLATE_TYPES } from "constants/PACKAGE_ENGAGEMENTS_TYPES";
import React from "react";
import useAddPackageMessageTemplate from "services/travel/packages/engagement/mutations/useAddPackageMessageTemplate";
import useListEngagementTags from "services/travel/packages/engagement/queries/useListEngagementTags";
const TypeItemRender = ({ value, label }) => (
  <Flex gap={8} align="center">
    <ColoredCircle
      color={(() => {
        switch (value) {
          case TEMPLATE_TYPES?.WELCOMING:
            return "#89AAE9";
          case TEMPLATE_TYPES?.ENGAGEMENT:
            return "#90D1DE";
          case TEMPLATE_TYPES?.FEEDBACK:
            return "#FFD137";
          case TEMPLATE_TYPES?.UPSELL:
            return "#B5C621";
          case TEMPLATE_TYPES?.REMINDER:
            return "#C1AFEE";
          case TEMPLATE_TYPES?.OTHER:
            return "#D1D3D6";
          default:
            break;
        }
      })()}
    />
    <span>{label}</span>
  </Flex>
);
const AddNewTemplateModal = ({ isOpen, close }) => {
  const [form] = useForm();
  const engagementTags = useListEngagementTags();
  const addNewTemplate = useAddPackageMessageTemplate({
    onSuccess: () => {
      message.success("new template created successfully");
      close();
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const handelFinish = (values) => {
    if (addNewTemplate?.isPending) return;
    if (values?.content === "<p><br></p>" || values?.content === "<p></p>") {
      message.error("Content is required");
      return;
    }

    addNewTemplate.mutate(values);
  };

  return (
    <Modal okText={"Save"} open={isOpen} onCancel={close} onOk={form.submit} width={"70%"} centered>
      <Form form={form} layout="vertical" onFinish={handelFinish}>
        <p className="lg_text_medium mb-1">Create new template</p>
        <Form.Item
          label="Template type"
          name="type"
          rules={[{ required: true, message: "Select tempate type" }]}>
          <Select
            placeholder={"Select template type"}
            labelRender={(el) => <TypeItemRender {...el} />}
            optionRender={(el) => <TypeItemRender {...el} />}
            options={[
              { label: "Welcoming", value: TEMPLATE_TYPES?.WELCOMING },
              { label: "Engagement", value: TEMPLATE_TYPES?.ENGAGEMENT },
              { label: "Feedback", value: TEMPLATE_TYPES?.FEEDBACK },
              { label: "Upsell", value: TEMPLATE_TYPES?.UPSELL },
              { label: "Reminder", value: TEMPLATE_TYPES?.REMINDER },
              { label: "Other", value: TEMPLATE_TYPES?.OTHER },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          validateTrigger="submit"
          rules={[{ required: true, message: "Enter template content" }]}>
          <TextEditor tags={engagementTags?.data?.map((el) => `[${el}]`)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewTemplateModal;
