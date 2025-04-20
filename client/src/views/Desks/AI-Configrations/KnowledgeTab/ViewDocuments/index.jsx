import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Col, List, message, Modal, Popconfirm, Row, Table, Typography } from "antd";
import { EditFilled } from "@ant-design/icons";

import AddEditDocuments from "../AddEditDocuments";
import useGetCollectionByName from "services/Collections/Querys/useGetCollectionByName";
import useDeleteDocument from "services/Collections/Mutations/useDeleteDocument";
import { Delete2SVG } from "assets/jsx-svg";

export default function ViewDocuments({ collectionName }) {
  const [deleteLoading, setDeleteLoading] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const queryClient = useQueryClient();

  const collectionData = useGetCollectionByName(collectionName, {
    select: (data) => {
      const items = [];
      const currentData = data.data.data.data;
      currentData?.ids?.forEach((id, index) => {
        const metadata = [];
        for (const [key, value] of Object.entries(currentData.metadatas[index])) {
          metadata.push({
            key,
            value,
          });
        }
        items[index] = {
          id: currentData.ids[index],
          metadata,
          document: currentData.documents[index],
        };
      });
      return items;
    },
  });

  console.log(collectionData.data);

  const deleteDocument = useDeleteDocument({
    onSuccess: (_, varibles) => {
      message.success(`Document with id ${varibles.ids} deleted successfully`);
      queryClient.setQueryData(collectionData.queryKey, (prev) => {
        const prevData = prev.data.data.data;
        if (prevData) {
          let deletedIndex = -1;
          deletedIndex = prevData?.ids.findIndex((id) => id === varibles.ids);
          if (deletedIndex > -1) {
            prevData?.ids.splice(deletedIndex, 1);
            prevData?.documents.splice(deletedIndex, 1);
            prevData?.metadatas.splice(deletedIndex, 1);
          }
        }
        return { ...prev };
      });
      setDeleteLoading(undefined);
    },
    onMutate: (varibles) => {
      if (varibles) {
        setDeleteLoading(varibles.ids);
      }
    },
  });

  useEffect(() => {
    if (collectionData.isError) {
      message.error(collectionData.error?.message);
    }
  }, [collectionData.error, collectionData.isError]);

  return (
    <main>
      <List
        loading={collectionData.isLoading}
        header={
          <Row justify="space-between">
            <Col>
              <Typography.Text className="fw-700 fz-22">{collectionName} Documents</Typography.Text>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  setSelectedDocumentId(null);
                  setIsModalOpen(true);
                }}>
                Add Documents
              </Button>
            </Col>
          </Row>
        }
        bordered
        dataSource={collectionData.data}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        renderItem={(item) => {
          if (item.document) {
            const dataSource = parseTableData(item.document);

            // Create columns configuration for antd Table
            const columns = Object.keys(dataSource[0] || {}).map((key) => ({
              title: key,
              dataIndex: key,
              key,
            }));
            return (
              <List.Item key={item.id}>
                <Row gutter={[0, 8]} className="w-100">
                  <Col xs={24}>
                    <Row>
                      <Col flex={1}>
                        <Typography.Text className="fw-700">[ID] {item.id}</Typography.Text>
                      </Col>
                      <Col>
                        <Row gutter={[16, 16]}>
                          <Col>
                            <Button
                              onClick={() => {
                                setSelectedDocumentId(item.id);
                                setIsModalOpen(true);
                              }}
                              disabled={deleteLoading === item.id}
                              icon={<EditFilled />}>
                              Edit
                            </Button>
                          </Col>
                          <Col>
                            <Popconfirm
                              title="Delete the document"
                              description="Are you sure to delete this document?"
                              onConfirm={() => {
                                console.log(item);
                                deleteDocument.mutate({
                                  collectionName,
                                  ids: item.id,
                                });
                                console.log("Test");
                              }}
                              okText="Yes"
                              cancelText="No">
                              <Button
                                loading={deleteLoading === item.id}
                                danger
                                type="dashed"
                                icon={<Delete2SVG color="#f00" />}>
                                Delete
                              </Button>
                            </Popconfirm>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Typography.Text className="fw-700">
                      {dataSource.length ? "[Table of doucments]" : `[Document]`}
                    </Typography.Text>
                    <br />
                    {dataSource.length ? (
                      <Table
                        className="mt-1"
                        dataSource={dataSource}
                        columns={columns}
                        rowKey={(record, index) => index}
                        // pagination={false} // Disable pagination if you don't need it
                      />
                    ) : (
                      <Typography.Text>{item.document}</Typography.Text>
                    )}
                  </Col>
                </Row>
              </List.Item>
            );
          }
        }}
      />

      <Modal
        title={selectedDocumentId ? "Edit Document" : "Add Document"}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
        width={800}
        centered>
        <AddEditDocuments
          collectionName={collectionName}
          id={selectedDocumentId}
          collectionDataQueryKey={collectionData.queryKey}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </main>
  );
}

function parseTableData(tableData) {
  // Remove leading and trailing spaces or pipes
  tableData = tableData.trim();

  // Split the entire string by the pipe character '|'
  const segments = tableData.split("|").map((segment) => segment.trim());

  console.log("Segments:", segments);

  if (segments.length) {
    const headers = [];
    let data = [];

    // Extract headers (assuming headers are in the first row)
    let index = 1; // Start after the first pipe
    while (segments[index] !== "" && index < segments.length) {
      headers.push(segments[index]);
      index++;
    }

    console.log("Headers:", headers);

    index += 1; // Skip the row divider

    // Extract data rows
    while (index < segments.length) {
      const productData = {};

      for (let i = 0; i < headers.length; i++) {
        if (segments[index + i] !== "") {
          productData[headers[i]] = segments[index + i];
        }
      }

      if (Object.keys(productData).length > 0) {
        data.push(productData);
      }

      // Move index to the next data row, considering an empty segment as a row separator
      index += headers.length + 1;
    }

    console.log("Data:", data);
    data.shift();
    return data;
  }

  return [];
}
