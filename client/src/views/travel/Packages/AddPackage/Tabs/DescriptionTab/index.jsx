import { Button, Divider, Flex, Form, Input, message, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import { DeleteSVG, PlusCircleSVG } from "assets/jsx-svg";
import Section from "components/common/Section";
import TextEditor from "components/common/TextEditor";
import React, { useEffect } from "react";
import useAddPackageDescription from "services/travel/packages/trip/Mutations/useAddPackageDescription";
import useGetTripDescription from "services/travel/packages/trip/Queries/useGetTripDescription";
import { ADD_PACKAGES_TABS_KEYS } from "../..";

const DescriptionTab = ({ id: tripId, setActiveTab }) => {
  const [form] = useForm();

  // QUERIES
  const tripDescription = useGetTripDescription(tripId, { enabled: !!tripId });
  useEffect(() => {
    if (tripDescription?.data && tripDescription?.isSuccess) {
      form.setFieldsValue(tripDescription.data);
    }
  }, [tripDescription?.data]);

  // MUTATIONS
  const addDescription = useAddPackageDescription(tripId, {
    onSuccess: () => {
      message.success("Description updated successfully");
      setActiveTab(ADD_PACKAGES_TABS_KEYS.PRICING);
    },
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });
  const handleFinish = (values) => {
    if (addDescription?.isPending) return;
    const postData = {
      description: values.description,
      customParagraph: values.customParagraph || [],
      includesItems: values.includesItems || [],
      notIncludesItems: values.notIncludesItems || [],
    };

    addDescription.mutate(postData);
  };

  return (
    <Section
      title="Trip Description"
      headerEnd={
        <Button type="primary" onClick={() => form.submit()} loading={addDescription?.isPending}>
          Save & Next
        </Button>
      }>
      {tripDescription?.isLoading ? (
        <Skeleton active />
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          scrollToFirstError={{ behavior: "smooth" }}>
          {/* Description */}
          <Form.Item
            label={
              <p className="sm_text_medium" style={{ marginBottom: "4px" }}>
                About this Trip
              </p>
            }
            name="description"
            validateTrigger={"submit"}
            rules={[{ required: true, message: "Please input trip description" }]}>
            <TextEditor minHeight="175px" />
          </Form.Item>

          {/* Custom Paragraph */}
          <Divider className="divider-space-16" />
          <p style={{ color: "#314155", marginBottom: "12px" }}>Custom Paragraph</p>
          <Form.List name="customParagraph">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <div key={key} style={{ marginBottom: "8px" }}>
                    <Flex key={key} gap={8}>
                      <Form.Item
                        style={{ flex: "1", width: "100%" }}
                        name={[name, "title"]}
                        rules={[{ required: true, message: "Please input title" }]}>
                        <Input placeholder="Title" />
                      </Form.Item>
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                          onClick={() => remove(name)}
                          danger
                          type={"primary"}
                          icon={<DeleteSVG color="#fff" />}
                        />
                      </div>
                    </Flex>
                    <Form.Item
                      name={[name, "content"]}
                      validateTrigger={"submit"}
                      rules={[{ required: true, message: "Please input content" }]}>
                      <TextEditor minHeight="120px" />
                    </Form.Item>
                  </div>
                ))}
                <Button
                  icon={<PlusCircleSVG />}
                  onClick={() => add()}
                  style={{ marginBottom: "12px" }}>
                  Add Custom Paragraph
                </Button>
              </>
            )}
          </Form.List>

          {/* Included Items */}
          <Divider className="divider-space-16" />
          <p style={{ color: "#314155", marginBottom: "12px" }}>What included in this trip?</p>
          <Form.List name="includesItems">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }, index) => (
                  <Flex key={key} gap={8}>
                    <Form.Item
                      style={{ flex: "1", width: "100%" }}
                      name={name}
                      rules={[{ required: true, message: `Please input item ${index + 1}` }]}>
                      <Input placeholder={"Item" + (index + 1)} />
                    </Form.Item>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        onClick={() => remove(name)}
                        danger
                        type={"primary"}
                        icon={<DeleteSVG color="#fff" />}
                      />
                    </div>
                  </Flex>
                ))}
                <Button
                  icon={<PlusCircleSVG />}
                  onClick={() => add()}
                  style={{ marginBottom: "12px" }}>
                  Add Included Item
                </Button>
              </>
            )}
          </Form.List>

          {/* Not Included Items */}
          <Divider className="divider-space-16" />
          <p style={{ color: "#314155", marginBottom: "12px" }}>
            What not included items in this trip?
          </p>
          <Form.List name="notIncludesItems">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }, index) => (
                  <Flex key={key} gap={8}>
                    <Form.Item
                      style={{ flex: "1", width: "100%" }}
                      name={name}
                      rules={[{ required: true, message: `Please input item ${index + 1}` }]}>
                      <Input placeholder={"Item " + (index + 1)} />
                    </Form.Item>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        onClick={() => remove(name)}
                        danger
                        type={"primary"}
                        icon={<DeleteSVG color="#fff" />}
                      />
                    </div>
                  </Flex>
                ))}
                <Button
                  icon={<PlusCircleSVG />}
                  onClick={() => add()}
                  style={{ marginBottom: "12px" }}>
                  Add Not Included Item
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      )}
    </Section>
  );
};

export default DescriptionTab;
