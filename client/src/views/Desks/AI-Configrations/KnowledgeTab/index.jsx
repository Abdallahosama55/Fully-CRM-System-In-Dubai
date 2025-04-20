import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, message, Row, Select, Skeleton, Typography } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownSVG } from "assets/jsx-svg";
import useEditDeskAI from "services/Desk/Mutations/useEditDeskAI";
import useListCollections from "services/Collections/Querys/useListCollections";
import ViewDocuments from "./ViewDocuments";

import "./styles.css";

export default function KnowledgeTab({ deskQuery }) {
  const [form] = Form.useForm();
  const { id: idfromPath } = useParams();
  const queryClient = useQueryClient();
  const collectionName = Form.useWatch("collectionName", form);

  const collectionsQuery = useListCollections({
    select: (data) => data.data.data,
  });

  // mutations
  const editDeskMutation = useEditDeskAI(idfromPath, {
    onSuccess: (_, variables) => {
      message.success("AI collection info edited succesfully");
      queryClient.setQueryData(deskQuery.queryKey, (prev) => {
        prev.data.data = {
          ...prev.data.data,
          ...variables,
        };
        return {
          ...prev,
        };
      });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = (values) => {
    editDeskMutation.mutate(values);
  };

  useEffect(() => {
    if (deskQuery.data && deskQuery.isSuccess) {
      form.setFieldValue("collectionName", deskQuery.data.collectionName);
    }
  }, [deskQuery.data, deskQuery.isSuccess, form]);

  if (collectionsQuery.isLoading) {
    return <Skeleton active />;
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={[0, 24]} className="knowledge_tab_ai_form">
        <Col xs={24}>
          <Row>
            <Col xs={24} lg={8}>
              <Typography.Text className="fw-800">Collection List</Typography.Text>
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                Select AI Knowledge Base
              </Typography.Text>
            </Col>
            <Col xs={24} lg={16}>
              <Form.Item name="collectionName">
                <Select
                  placeholder="Select Collection"
                  suffixIcon={<DropdownSVG />}
                  options={collectionsQuery.data?.collections?.map((collection) => ({
                    value: collection.name,
                    label: (
                      <Row align="middle" gutter={[6, 0]} wrap={false}>
                        <Col className="fw-500">{collection.name}</Col>
                      </Row>
                    ),
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      {collectionName && <ViewDocuments collectionName={collectionName} />}

      <Row justify="end" className="mt-1">
        <Button
          disabled={collectionsQuery.isLoading}
          type="primary"
          htmlType="submit"
          style={{ width: "80px" }}>
          Save
        </Button>
      </Row>
    </Form>
  );
}
