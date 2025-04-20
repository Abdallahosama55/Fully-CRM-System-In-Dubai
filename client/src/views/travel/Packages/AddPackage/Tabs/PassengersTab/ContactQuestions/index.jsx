import { Button, Checkbox, Flex, Form, message, Modal } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { PlusCircleSVG } from "assets/jsx-svg";
import { useToggle } from "hooks/useToggle";
import React from "react";
import useAddPackageContactInformation from "services/travel/packages/passengers/Mutations/useAddPackageContactInformation";
import useListPackagePassengersRequierdInformation from "services/travel/packages/passengers/Queries/useListPackagePassengersRequierdInformation";
import useListPackageSystemContactInformation from "services/travel/packages/passengers/Queries/useListPackageSystemContactInformation";

const ContactQuestions = ({ tripId }) => {
  const [isAddModalOpen, toggleAddModal] = useToggle();
  const [form] = useForm();
  const passengerContactInformation = useWatch("passengerContactInformation", form);

  // queries
  const passengersRequierdInfo = useListPackagePassengersRequierdInformation(tripId, {
    enabled: !!tripId,
  });

  const contactInformation = useListPackageSystemContactInformation();
  // mutations
  const addContactInformation = useAddPackageContactInformation(tripId, {
    onSuccess: () => {
      passengersRequierdInfo.refetch();
      message.success("Questions updated successfully");
      toggleAddModal();
    },
    onError: (error) => {
      message?.error(error?.message || "something went wrong");
    },
  });

  const handelFinih = (values) => {
    const temp = {
      passengerContactInformation: values?.passengerContactInformation?.filter((el) =>
        Boolean(el?.id),
      ),
    };

    addContactInformation.mutate(temp);
  };
  return (
    <div>
      <Modal
        centered
        title={"Add Questions"}
        open={isAddModalOpen}
        onOk={form.submit}
        okButtonProps={{ disabled: addContactInformation?.isPending }}
        onCancel={() => {
          toggleAddModal();
          form.resetFields();
        }}>
        <Form form={form} onFinish={handelFinih}>
          {contactInformation?.data?.map((el, index) => {
            return (
              <Flex
                key={el?.id}
                align="center"
                justify="space-between"
                style={{ marginBottom: "8px" }}>
                <Form.Item
                  valuePropName="checked"
                  noStyle
                  initialValue={el?.isDefault}
                  name={["passengerContactInformation", index, "id"]}>
                  <Checkbox
                    disabled={el?.isDefault}
                    onChange={(e) =>
                      form.setFieldValue(
                        ["passengerContactInformation", index, "id"],
                        e?.target?.checked ? el?.id : undefined,
                      )
                    }>
                    {el?.name}
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  noStyle
                  valuePropName="checked"
                  name={["passengerContactInformation", index, "isRequired"]}>
                  <Checkbox
                    disabled={
                      Array.isArray(passengerContactInformation) &&
                      !passengerContactInformation[index]?.id
                    }>
                    Required
                  </Checkbox>
                </Form.Item>
              </Flex>
            );
          })}
        </Form>
      </Modal>
      <Flex vertical gap={16} wrap style={{ maxHeight: "300px" }}>
        {passengersRequierdInfo?.data?.map((el) => {
          return (
            <p className="xl_text_medium" key={el?.id}>
              {el?.systemContactInformtion?.name} {el?.isRequired ? "*" : ""}
              {el?.isDefault && (
                <span
                  className="lg_text_regular"
                  style={{ color: "var(--font-secondary)" }}>
                  Collect by default
                </span>
              )}
            </p>
          );
        })}
      </Flex>
      <Button
        style={{ marginTop: "1rem" }}
        icon={<PlusCircleSVG />}
        onClick={() => {
          toggleAddModal();
          form.setFieldsValue({
            passengerContactInformation: contactInformation?.data?.map((el) => {
              const temp = passengersRequierdInfo?.data?.find(
                (addedItem) => el?.id === addedItem?.systemContactInformtionId,
              );

              return {
                id: temp ? el?.id : undefined,
                isRequired: temp ? temp?.isRequired : false,
              };
            }),
          });
        }}>
        Add Questions
      </Button>
    </div>
  );
};

export default ContactQuestions;
