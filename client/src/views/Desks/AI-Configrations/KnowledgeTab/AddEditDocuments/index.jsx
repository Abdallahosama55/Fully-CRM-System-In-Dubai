import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Input, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useGetDocumentByid from "services/Collections/Querys/useGetDocumentByid";
import useAddOrEditsDocuments from "services/Collections/Mutations/useAddOrEditsDocuments";

import "./styles.css";

export default function AddEditDocuments({
  collectionName,
  id,
  collectionDataQueryKey,
  setIsModalOpen,
}) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const collectionData = useGetDocumentByid(
    { collectionName, ids: id },
    {
      enabled: !!collectionName,
    },
  );

  const addOrEditsMutation = useAddOrEditsDocuments({
    onSuccess: async (_, variables) => {
      if (id) {
        queryClient.setQueryData(collectionDataQueryKey, (prev) => {
          const prevData = prev.data.data.data;
          if (prevData) {
            const currentIndex = prevData.ids.findIndex((docId) => docId === id);
            prevData.document = variables.document;
            if (currentIndex > -1) {
              prevData.metadatas[currentIndex] = {
                ...variables.metadatas[currentIndex],
                tokens: prevData.metadatas[currentIndex].tokens,
              };
            }
          }

          return { ...prev };
        });
      } else {
        await queryClient.invalidateQueries(collectionDataQueryKey);
      }
      message.success(`Document ${id ? "edited" : "added"} successfully`);
      setIsModalOpen(false);
    },
    onError: (error) => message.error(error?.message),
  });

  useEffect(() => {
    if (collectionData.isError) {
      message.error(collectionData.error?.response?.data?.error);
    }

    if (
      !collectionData.isLoading &&
      collectionData.isSuccess &&
      collectionData.data?.data?.data &&
      id
    ) {
      const data = collectionData.data.data.data.data;
      const items = [];
      data?.ids?.forEach((id, index) => {
        const metadata = [];
        for (const [key, value] of Object.entries(data.metadatas[index])) {
          if (key !== "tokens") {
            metadata.push({
              key,
              value,
            });
          }
        }
        items[index] = {
          id: data.ids[index],
          metadata,
          document: data.documents[index],
        };
      });

      form.setFieldValue("items", items);
    }
  }, [
    collectionData.data,
    collectionData.error,
    collectionData.isError,
    collectionData.isSuccess,
    collectionData.isLoading,
    form,
    id,
  ]);

  const onFinish = (values) => {
    if (!values || !values.items) {
      message.info("Add one doucment at least to send the data");
      return;
    }
    const ids = [];
    const documents = [];
    const metadatas = [];
    values.items?.forEach((data) => {
      const metadata = {};
      ids.push(data.id);
      documents.push(data.document);
      data.metadata?.forEach((meta) => {
        metadata[meta.key] = meta.value || {};
      });
      metadatas.push(metadata);
    });

    addOrEditsMutation.mutate({
      collectionName: collectionName,
      ids,
      documents,
      metadatas,
    });
  };

  return (
    <div className="AddEditDocuments">
      <Card bordered loading={collectionData.isLoading}>
        <Form layout="vertical" name={`AddEditCollections${id}`} form={form} onFinish={onFinish}>
          <p style={{ marginBottom: "16px" }} className="fz-20 fw-700">
            {collectionName} Documents
          </p>
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Document ${field.name + 1}`}
                    key={field.key}
                    extra={
                      id ? null : (
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      )
                    }>
                    <Form.Item initialValue={uuidv4()} label="ID" name={[field.name, "id"]}>
                      <Input readOnly disabled />
                    </Form.Item>

                    <Form.Item
                      rules={[{ required: true, message: "Please Enter Document" }]}
                      label="Document"
                      name={[field.name, "document"]}>
                      <Input.TextArea rows={6} placeholder="Enter Document" />
                    </Form.Item>
                  </Card>
                ))}
                {id ? null : (
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Document
                  </Button>
                )}
              </div>
            )}
          </Form.List>
          <Form.Item className="mt-1">
            <Button
              className="w-100"
              type="primary"
              htmlType="submit"
              loading={addOrEditsMutation.isPending}>
              {id ? "Edit" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
