import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useMemo, useState, useRef, useEffect } from "react";
import { renderColumns } from "./renderColumns";
import dayjs from "dayjs";
import Filters from "./components/Filters";
import Box from "components/Box";
import AddCharter from "./AddCharter";
import { DeleteSVG, EditSVG, EyeSVG } from "assets/jsx-svg";
import "./Froms.css";
import Link from "antd/es/typography/Link";
import EditCharterDrawer from "./EditCharter";
import { useDrawer } from "context/drawerContext";
import usePageTitle from "hooks/usePageTitle";
import CustomTable from "components/CustomTable";
import useGetForm from "services/CrmForms/Queries/useGetForms";
import ShareIcon from "assets/EyeFormSVG";

import { SaveOutlined } from "@ant-design/icons";
import useDeleteForm from "services/CrmForms/Mutations/useDeleteForm";
import useUpdateForm from "services/CrmForms/Mutations/useUpdateForm";
import useGetResponses from "services/CrmForms/Queries/useGetResponses";
import ShareModal from "./ShareModal";

const Forms = () => {
  usePageTitle("Charters");
  const { updateForm, isUpdating } = useUpdateForm();
  const { deleteForm, isPending: isDeleting } = useDeleteForm({
    onSuccess: () => {
      message.success("Form deleted successfully.");
    },
    onError: (err) => {
      console.error(err);
      message.error("Failed to delete form.");
    },
  });

  const DrawerAPI = useDrawer();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  // console.log(Filters)
  const [editingRows, setEditingRows] = useState({});

  const { data, isPending } = useGetForm({ ...filter, page });

// console.log(filter)
  const handleEdit = (record) => {
    setEditingRows({
      ...editingRows,
      [record.id]: removeLastAirport(record?.outboundFlight?.fromAirPortInfo?.name),
    });
  };

  const handleSave = async (id) => {
    try {
      console.log("Saving value:", editingRows[id]);
      const newEditingRows = { ...editingRows };
      delete newEditingRows[id];
      setEditingRows(newEditingRows);
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  const handleCancel = (id) => {
    const newEditingRows = { ...editingRows };
    delete newEditingRows[id];
    setEditingRows(newEditingRows);
  };

  const removeLastAirport = (name) => {
    if (!name) return name;
    const lastIndex = name?.toLowerCase()?.lastIndexOf("airport");
    if (lastIndex === -1 && name?.toLowerCase()?.endsWith("airport")) return name;
    return name.slice(0, lastIndex) + name.slice(lastIndex + "Airport".length);
  };
const { getResponses, isGettingResponses } = useGetResponses();

const handleEditGroup = async (formId) => {
  try {
    const response = await getResponses({ formId, page: 1 });

    // Log to debug
    // console.log("Raw response:", response?.data?.submissions);

    // Check for submissions
    const submissions = response?.data?.submissions;
    if (!Array.isArray(submissions)) {
      console.warn("No submissions found!");
      return;
    }
    console.log(submissions)
    const formattedList = submissions.map((submission) => ({
      id: submission.id,
      submittedAt: dayjs(submission.submittedAt).format("YYYY-MM-DD - HH:mm"),
      answers: `${submission.answers.length} Answers`,
    }));

    console.log("Formatted Responses", formattedList);
const columns = [
  {
    title: "Response ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Date Submitted",
    dataIndex: "submittedAt",
    key: "submittedAt",
  },
  {
    title: "Answers",
    dataIndex: "answers",
    key: "answers",
  },
];

    DrawerAPI.open("1280px");
    DrawerAPI.setDrawerContent(
      <Table
  style={{ maxHeight: "100%", minHeight: "100%" }}
  scroll={{ y: 400 }}
  bordered
  pagination={{ pageSize: 50, position: ["none", "bottomCenter"] }}
  dataSource={formattedList}
  columns={columns}
/>
      
    );
  } catch (error) {
    console.error("Error loading responses:", error);
  }
};
const [selectedDeskId, setSelectedDeskId] = useState(null);
const [isOpen, setIsOpen] = useState(false);
const handleShareModal = async (slug) => {
   setIsOpen(true);
     setSelectedDeskId(slug);
}


  // const columns = useMemo(() => {
  //   return renderColumns(true, editingRows, setEditingRows, handleSave, handleCancel);
  // }, [editingRows]);

  const columns = [
    {
      title: "Form Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Responses",
      dataIndex: "responses",
      key: "responses",
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: 8,
          marginInline: "12px",
          marginBottom: "24px",
        }}>
        <Filters setFilter={setFilter} />
        <AddCharter />
      </Box>

      <Box
        sx={{
          ".ant-table .ant-table-body": {
            maxHeight: "calc(100vh - 317px) !important",
            minHeight: "300px !important",
          },
        }}>
        <CustomTable
          loading={isPending}
          style={{ marginBlock: "30px" }}
          tableLayout="auto"
          pageSize={10}
          page={page}
          setPage={setPage}
          total={data?.data?.total}
          dataSource={data?.data?.forms ?? []}
          columns={[
            ...columns,
            {
              width: 85,
              title: <Typography.Text ellipsis={{ tooltip: "Actions" }}>Actions</Typography.Text>,
              dataIndex: "action",
              align: "center",
              key: "action",
              render: (id, rowData) => {
                const isEditing = editingRows[rowData.id] !== undefined;
                return (
                  <Space>
                    <Tooltip title="responses">
                      <Link>
                        <Button
                          size="small"
                          className="table_action_button custom-action-button"
                          icon={<EyeSVG color={"#000"} />}
                          onClick={() => handleEditGroup(rowData.id)}
                        />
                      </Link>
                    </Tooltip>

                    <Tooltip title={"Share It now "}>
                     <ShareModal isOpen={isOpen} deskId={selectedDeskId} setIsOpen={setIsOpen} classes="fromModal" />
                      <Link>
                        <Button
                          size="small"
                          className="table_action_button custom-action-button"
                          onClick={()=>handleShareModal(rowData.slug)}
                          icon={<ShareIcon color={"#000"}
                           />}
                        />
                      </Link>
                    </Tooltip>
                         

                    <Tooltip title={"Delete"}>
                      <Button
                        type="primary"
                        className="table_action_button"
                        danger
                        loading={isDeleting}
                        onClick={() => {
                          Modal.confirm({
                            title: "Do you want to delete this Item?",
                            content: (
                              <p className="gc">
                                This action is irreversible and cannot be undone.
                              </p>
                            ),
                            centered: true,
                            okText: "Delete",
                            okType: "danger",
                            cancelText: "Cancel",
                            okButtonProps: {
                              type: "primary",
                            },
                            onOk: () => deleteForm(rowData.id),
                          });
                        }}
                        icon={<DeleteSVG color={"#fff"} />}
                      />
                    </Tooltip>

                    <Tooltip
                      title={`Set as ${rowData.status === "active" ? "inactive" : "active"}`}>
                      <Link>
                        <Button
                          type="primary"
                          size="small"
                          className="table_action_button"
                          icon={isUpdating ? <SaveOutlined /> : <EditSVG color={"#fff"} />}
                          onClick={() => {
                            const newStatus = rowData.status === "active" ? "inactive" : "active";
                            Modal.confirm({
                              title: `Do you want to set this form as ${newStatus}?`,
                              content: (
                                <p className="gc">
                                  This will change the form status to <b>{newStatus}</b>.
                                </p>
                              ),
                              centered: true,
                              okText: `Set as ${newStatus}`,
                              okType: "primary",
                              cancelText: "Cancel",
                              onOk: () =>
                                updateForm({
                                  groupId: rowData.id, // or rowData.id
                                  status: newStatus,
                                }),
                            });
                          }}>
                          
                        </Button>
                      </Link>
                    </Tooltip>
                  </Space>
                );
              },
            },
          ]}
        />
      </Box>

    </section>
  );
};

export default Forms;
