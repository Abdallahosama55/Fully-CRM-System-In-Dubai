import { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Typography,
} from "antd";
import { LiveKeysSVG } from "assets/jsx-svg";
import { useEffect, useState } from "react";
import useAddLiveKey from "services/Livekey/Mutations/useAddLiveKey";
import useDeleteLiveKey from "services/Livekey/Mutations/useDeleteLiveKey";
import useUpdateLiveKey from "services/Livekey/Mutations/useUpdateLiveKey";
import useGetLivekeys from "services/Livekey/Querys/useGetLivekeys";
import { axiosCatch } from "utils/axiosUtils";

export default function LiveKeys({ setStreamCrdential }) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCreateNew, setOpenCreateNew] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [selectedLiveStream, setSelectedLiveStream] = useState(null);
  const queryClient = useQueryClient();

  const getLivekeysQuery = useGetLivekeys({
    enabled: isModalOpen,
    select: (res) => res.data.data,
  });

  const addLiveKeyMutation = useAddLiveKey({
    onSuccess: (newData) => {
      queryClient.setQueryData(getLivekeysQuery.queryKey, (prev) => {
        const prevData = prev.data.data.rows;
        prevData.push(newData.data.data);
        return { ...prev };
      });
      form.resetFields();
      setOpenCreateNew(false);
      message.success("New LiveStream created successfully");
    },
    onError: (err) => {
      console.log("err", err);

      axiosCatch(err);
    },
  });

  const updateLiveKeyMutation = useUpdateLiveKey({
    onSuccess: (newData, variables) => {
      queryClient.setQueryData(getLivekeysQuery.queryKey, (prev) => {
        const prevData = prev.data.data.rows;
        const updatedIndex = prevData.findIndex((livekey) => livekey.id === variables.id);
        if (updatedIndex > -1) {
          prevData[updatedIndex] = {
            ...prevData[updatedIndex],
            ...variables.data,
          };
        }
        return { ...prev };
      });
      form.resetFields();
      setOpenCreateNew(false);
      message.success("LiveStream updated successfully");
    },
    onError: (err) => {
      console.log("err", err);

      axiosCatch(err);
    },
  });

  const deleteLiveKeyMutation = useDeleteLiveKey({
    onSuccess: (_, livekeyId) => {
      if (selectedLiveStream === livekeyId) {
        setSelectedLiveStream(null);
      }
      queryClient.setQueryData(getLivekeysQuery.queryKey, (prev) => {
        prev.data.data.rows = prev.data.data.rows.filter((livekey) => livekey.id !== livekeyId);
        return { ...prev };
      });
      form.resetFields();
      setOpenCreateNew(false);
      message.success("New LiveStream created successfully");
    },
    onMutate: (livekeyId) => setDeleteLoading(livekeyId),
    onSettled: () => setDeleteLoading(null),
    onError: (err) => {
      console.log("err", err);

      axiosCatch(err);
    },
  });

  useEffect(() => {
    if (getLivekeysQuery.isError) {
      axiosCatch(getLivekeysQuery.error);
    }
  }, [getLivekeysQuery.error, getLivekeysQuery.isError]);

  const onFinish = (values) => {
    console.log("values", values);
    const regex = /^rtmp:\/\/a\.rtmp\.youtube\.com\/live2\/[A-Za-z0-9-]{24}$/;

    const streamCrdential = values.streamUrl + "/" + values.streamKey;

    if (regex.test(streamCrdential)) {
      if (typeof openCreateNew === "number") {
        updateLiveKeyMutation.mutate({
          id: openCreateNew,
          data: values,
        });
      } else {
        addLiveKeyMutation.mutate(values);
      }
    } else {
      message.info("Please enter correct values");
    }
    console.log(values);
  };

  return (
    <>
      <Row
        className="clickable"
        onClick={() => setIsModalOpen(true)}
        justify={"space-between"}
        gutter={[16, 0]}
        wrap={false}>
        <Col>
          <LiveKeysSVG />
        </Col>

        <Col flex={1}>
          <Typography.Text className="fw-500">Livekeys</Typography.Text>
        </Col>
      </Row>

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setOpenCreateNew(false);
          setIsModalOpen(false);
          setSelectedLiveStream(null);
        }}
        closeIcon={false}
        footer={() => (
          <Row justify="end" gutter={[32, 0]}>
            <Col>
              <Button
                onClick={() => {
                  setOpenCreateNew(false);
                  setIsModalOpen(false);
                  setSelectedLiveStream(null);
                }}
                style={{ width: "100px", borderRadius: "2rem" }}>
                CANCEL
              </Button>
            </Col>
            <Col>
              <Button
                loading={
                  addLiveKeyMutation.isPending ||
                  getLivekeysQuery.isLoading ||
                  updateLiveKeyMutation.isPending
                }
                onClick={() => {
                  if (openCreateNew) {
                    form.submit();
                  } else {
                    const foundLiveStream = getLivekeysQuery.data?.rows?.find(
                      (livekey) => livekey.id === selectedLiveStream,
                    );
                    console.log("foundLiveStream", foundLiveStream);
                    if (foundLiveStream) {
                      setStreamCrdential(
                        foundLiveStream.streamUrl + "/" + foundLiveStream.streamKey,
                      );
                      setOpenCreateNew(false);
                      setIsModalOpen(false);
                    }
                  }
                }}
                style={{ width: "100px", borderRadius: "2rem" }}
                type="primary">
                {typeof openCreateNew === "number" ? "UPDATE" : "SAVE"}
              </Button>
            </Col>
          </Row>
        )}
        centered>
        {openCreateNew ? (
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  itemMarginBottom: 12,
                  labelColor: "#7091D2",
                },
              },
            }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Typography.Text className="fz-22 fw-600">
                  {typeof openCreateNew === "number" ? "Update" : "New"} LiveStream Setup
                </Typography.Text>
              </Col>
              <Col>
                <Button style={{ border: "none" }} onClick={() => setOpenCreateNew(false)}>
                  Back
                </Button>
              </Col>
            </Row>
            <Form
              requiredMark={false}
              form={form}
              onFinish={onFinish}
              layout="vertical"
              style={{ marginBlock: "2rem" }}>
              <Form.Item
                name="name"
                label="LiveStream Name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter LiveStream Name",
                  },
                ]}>
                <Input placeholder="Enter LiveStream Name" />
              </Form.Item>

              <Form.Item
                name="streamKey"
                label="Stream Key"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Stream Key",
                  },
                ]}>
                <Input.Password placeholder="Enter Stream Key" />
              </Form.Item>

              <Form.Item
                name="streamUrl"
                label="Stream URL"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Stream URL",
                  },
                ]}>
                <Input placeholder="Enter Stream URL" />
              </Form.Item>

              <Form.Item
                name="backUpStreamUrl"
                label="Backup Stream URL"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Backup Stream URL",
                  },
                ]}>
                <Input placeholder="Enter Backup Stream URL" />
              </Form.Item>
            </Form>
          </ConfigProvider>
        ) : (
          <>
            <Flex justify="space-between" gap={12}>
              <Typography.Text className="fz-18 fw-600">Choose Livestream</Typography.Text>

              <Button style={{ border: "none" }} onClick={() => setOpenCreateNew(true)}>
                Create New
              </Button>
            </Flex>

            <Select
              onChange={(id) => setSelectedLiveStream(id)}
              value={selectedLiveStream}
              open={openSelect}
              onMouseDown={() => setOpenSelect(true)}
              onBlur={() => setOpenSelect(false)}
              loading={getLivekeysQuery.isLoading}
              placeholder="Select livestream"
              style={{ borderRadius: "2rem" }}
              className="w-100"
              optionLabelProp="title"
              onSelect={(e) => {
                console.log(e);
                setOpenSelect(false);
              }}
              options={getLivekeysQuery.data?.rows.map((livekey) => ({
                title: livekey.name,
                label: (
                  <Row justify="space-between">
                    <Col flex={1}>{livekey.name}</Col>
                    <Row gutter={[12, 0]} wrap={false}>
                      <Col>
                        <EditOutlined
                          onClick={() => {
                            form.setFieldsValue(livekey);
                            setOpenCreateNew(livekey.id);
                          }}
                        />
                      </Col>
                      <Col>
                        {deleteLoading === livekey.id ? (
                          <LoadingOutlined />
                        ) : (
                          <Popconfirm
                            okButtonProps={{
                              loading: deleteLiveKeyMutation.isPending,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={(e) => {
                              e.stopPropagation();
                              deleteLiveKeyMutation.mutate(livekey.id);
                            }}
                            onCancel={(e) => e.stopPropagation()}
                            okText="Yes"
                            cancelText="No">
                            <DeleteOutlined />
                          </Popconfirm>
                        )}
                      </Col>
                    </Row>
                  </Row>
                ),

                value: livekey.id,
              }))}
            />
          </>
        )}
      </Modal>
    </>
  );
}
