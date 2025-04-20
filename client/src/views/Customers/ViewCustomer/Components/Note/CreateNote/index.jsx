import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { NoteSVG, SaveSVG } from "assets/jsx-svg";
import Box from "components/Box";
import Editor from "components/crm-board/Content/Editor";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";

import { useContext, useState } from "react";
import useAddNote from "services/Note/Mutations/useAddNote";
import { queryClient } from "services/queryClient";
import { dayjs } from "utils/time";

import "./styles.css";

const CreateNote = ({ customerId, queryKey, leadId, defaultOpenNote }) => {
  const [isCrete, setIsCreate] = useState(defaultOpenNote ?? false);
  const [form] = useForm();
  const { openNotificationWithIcon } = useNotification();
  const { user } = useContext(userContext);

  const { addNote, isPending } = useAddNote({
    onSuccess: (res) => {
      openNotificationWithIcon("success", "Added successfully");
      queryClient.setQueryData(queryKey, (prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              rows: [
                ...prev.data.data.rows,
                { ...res.data.data, account: { fullName: user.fullName } },
              ],
            },
          },
        };
      });
      form.resetFields();
      setIsCreate(false);
    },
    onError: () => {
      openNotificationWithIcon("error", "Something went wrong");
      setIsCreate(false);
    },
  });

  const onFinish = (data) => {
    if (!data?.description) return;
    addNote({
      text: data.description,
      noteDate: dayjs(new Date()).tz(localStorage.getItem("time-zone")).format("YYYY-MM-DD"),
      customerId,
      dealId: leadId,
    });
  };
  return (
    <Card
      title={
        <Flex align="center" gap={"8px"}>
          <NoteSVG></NoteSVG>Note
        </Flex>
      }
      className={`view-customer-comp-note-create-node-card ${!isCrete ? "hide-card-body" : ""}`}
      extra={
        <Box>
          {!isCrete ? (
            <Button
              onClick={() => setIsCreate(true)}
              icon={<PlusCircleOutlined color="white"></PlusCircleOutlined>}
              size="small"
              type="primary"
              color="primary">
              Add
            </Button>
          ) : (
            <Flex gap={8}>
              <Button
                onClick={() => {
                  form.resetFields();
                  setIsCreate(false);
                }}
                size="small"
                type="default">
                Cancel
              </Button>
              <Button
                className={"button-save "}
                icon={<SaveSVG color="white"></SaveSVG>}
                size="small"
                loading={isPending}
                onClick={() => form.submit()}
                type="default">
                Save
              </Button>
            </Flex>
          )}
        </Box>
      }>
      <Box
        sx={{
          "& .quill": {
            background: "#FFF4CF",
            border: "0.5px solid #E8E8F1",
            borderRadius: "8px",
          },
        }}>
        <Editor onSubmit={onFinish} form={form} />
      </Box>
    </Card>
  );
};

export default CreateNote;
