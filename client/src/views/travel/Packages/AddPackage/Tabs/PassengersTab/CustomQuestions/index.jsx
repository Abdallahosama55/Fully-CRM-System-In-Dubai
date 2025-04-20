import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useToggle } from "hooks/useToggle";
import useGetPackageQuestions from "services/travel/packages/passengers/Queries/useGetPackageQuestions";
import TYPE_OF_ANSWER from "constants/TYPE_OF_ANSWER";
import { useForm, useWatch } from "antd/es/form/Form";
import { DeleteSVG, EditSVG, PlusCircleSVG } from "assets/jsx-svg";
import useAddPackageQuestion from "services/travel/packages/passengers/Mutations/useAddPackageQuestion";
import useEditPackageQuestion from "services/travel/packages/passengers/Mutations/useEditPackageQuestion";
import useDeletePackageQuestion from "services/travel/packages/passengers/Mutations/useDeletePackageQuestion";

const CustomQuestions = ({ tripId }) => {
  const [form] = useForm();
  const typeOfAnswer = useWatch("typeOfAnswer", form);
  const [isAddModalOpen, toggleAddModal] = useToggle();
  const [editId, setEditId] = useState();
  const [loadingDeleteIds, setLoadingDeleteIds] = useState([]);
  // queries
  const packageQuestions = useGetPackageQuestions(tripId, { enabled: !!tripId });
  // mutations
  const addQuestion = useAddPackageQuestion(tripId, {
    onSuccess: () => {
      packageQuestions.refetch();
      message.success("New Question added successfully");
      toggleAddModal();
      form.resetFields();
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });

  const editQuestion = useEditPackageQuestion(tripId, {
    onSuccess: () => {
      packageQuestions.refetch();
      message.success("Question updated successfully");
      toggleAddModal();
      form.resetFields();
      setEditId(undefined);
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });

  const deleteQuestion = useDeletePackageQuestion({
    onSuccess: (_, payload) => {
      packageQuestions.refetch();
      setLoadingDeleteIds((prev) => prev?.filter((el) => el !== payload));
      message.success("Question deleted successfully");
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });

  const handelFinish = (values) => {
    if (editId) {
      editQuestion.mutate({ ...values, id: editId });
    } else {
      addQuestion.mutate(values);
    }
  };
  return (
    <div>
      <Modal
        title={editId ? "Edit Question" : "Add Question"}
        open={isAddModalOpen}
        onCancel={toggleAddModal}
        onOk={form.submit}>
        <Form layout={"vertical"} form={form} onFinish={handelFinish}>
          <Row gutter={[12, 12]}>
            <Col md={12} xs={24}>
              <Form.Item name={"question"} rules={[{ required: true, message: "Enter question" }]}>
                <Input placeholder="Question label" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                name={"typeOfAnswer"}
                rules={[{ required: true, message: "Select answer type" }]}>
                <Select
                  placeholder={"Answer type"}
                  options={[
                    { label: "Short text", value: TYPE_OF_ANSWER.SHORT_TEXT },
                    { label: "Long text", value: TYPE_OF_ANSWER.LONG_TEXT },
                    { label: "Number", value: TYPE_OF_ANSWER.NUMBER },
                    { label: "Checkbox", value: TYPE_OF_ANSWER.CHECKBOX },
                    { label: "Date", value: TYPE_OF_ANSWER.DATE },
                    {
                      label: "List of options",
                      value: TYPE_OF_ANSWER.LIST_OF_OPTIONS,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item name={"helpText"}>
                <Input placeholder="help text" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item name={"placeholder"}>
                <Input placeholder="placeholder" />
              </Form.Item>
            </Col>
            {typeOfAnswer === TYPE_OF_ANSWER.LIST_OF_OPTIONS ||
              (typeOfAnswer === TYPE_OF_ANSWER.CHECKBOX && (
                <Col md={24} xs={24}>
                  <Form.Item name={"options"}>
                    <Select mode="tags" placeholder="Options" />
                  </Form.Item>
                </Col>
              ))}
            <Col md={24} xs={24}>
              <Flex gap={8}>
                <Form.Item name={"isForPersonalData"}>
                  <Checkbox>Personal data</Checkbox>
                </Form.Item>
                <Form.Item name={"isAnswerRequired"}>
                  <Checkbox>Required</Checkbox>
                </Form.Item>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Table
        loading={packageQuestions?.isLoading}
        dataSource={packageQuestions?.data}
        columns={[
          {
            dataIndex: "question",
            key: "question",
            title: "Question",
          },
          {
            dataIndex: "id",
            key: "id",
            width: "100px",
            title: (
              <Button
                icon={<PlusCircleSVG />}
                onClick={() => {
                  form.resetFields();
                  setEditId(undefined);
                  toggleAddModal();
                }}>
                New
              </Button>
            ),
            render: (id, rowData) => {
              return (
                <Space>
                  <Tooltip title={"Edit"}>
                    <Button
                      type="primary"
                      icon={<EditSVG color={"#fff"} />}
                      className="table_action_button"
                      onClick={() => {
                        setEditId(id);
                        form.setFieldsValue(rowData);
                        toggleAddModal();
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={"Delete"}>
                    <Button
                      type="primary"
                      danger
                      disabled={loadingDeleteIds?.includes(id)}
                      icon={<DeleteSVG color={"#fff"} />}
                      className="table_action_button"
                      onClick={() => {
                        setLoadingDeleteIds((prev) => [...prev, id]);
                        deleteQuestion.mutate(id);
                      }}
                    />
                  </Tooltip>
                </Space>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default CustomQuestions;
