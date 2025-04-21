import { Button, Flex, Form, Input, Modal, Row, Select, Space, Tooltip, Typography } from "antd";
import { useMemo, useState, useRef, useEffect } from "react";
import { renderColumns } from "./renderColumns";
import dayjs from 'dayjs';
import Filters from "./components/Filters";
import Box from "components/Box";
import AddCharter from "./AddCharter";
import { DeleteSVG, EditSVG, EyeSVG } from "assets/jsx-svg";
import './Froms.css'
import Link from "antd/es/typography/Link";
import EditCharterDrawer from "./EditCharter";
import { useDrawer } from "context/drawerContext";
import usePageTitle from "hooks/usePageTitle";
import CustomTable from "components/CustomTable";
import useGetForm from "services/CrmForms/Queries/useGetForms";
import ShareIcon from "assets/EyeFormSVG";
import ShareModal from "views/Desks/DeskInformation/ShareModal";
import { SaveOutlined } from "@ant-design/icons";
const Forms = () => {
  usePageTitle("Charters");
  const DrawerAPI = useDrawer();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [editingRows, setEditingRows] = useState({});

  const { data, isPending } = useGetForm({page, });
  // console.log(Filters)
  const handleEdit = (record) => {
    setEditingRows({
      ...editingRows,
      [record.id]: removeLastAirport(record?.outboundFlight?.fromAirPortInfo?.name)
    });
  };

  const handleSave = async (id) => {
    try {
      console.log('Saving value:', editingRows[id]);
      const newEditingRows = {...editingRows};
      delete newEditingRows[id];
      setEditingRows(newEditingRows);
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  const handleCancel = (id) => {
    const newEditingRows = {...editingRows};
    delete newEditingRows[id];
    setEditingRows(newEditingRows);
  };

  const removeLastAirport = (name) => {
    if (!name) return name;
    const lastIndex = name?.toLowerCase()?.lastIndexOf("airport");
    if (lastIndex === -1 && name?.toLowerCase()?.endsWith("airport")) return name;
    return name.slice(0, lastIndex) + name.slice(lastIndex + "Airport".length);
  };

  const handleEditGroup = (record) => {
    const listByGroupId = (data?.rows || [])
      .filter((item) => item.outboundFlight.groupId === record.outboundFlight.groupId)
      .map((item) => {
        return {
          ...item,
          outboundFlight: {
            ...item.outboundFlight,
            toDateTime: dayjs(item.outboundFlight.toDateTime),
            fromDateTime: dayjs(item.outboundFlight.fromDateTime),
          },
        };
      });
    console.log("defaultValues", listByGroupId);
    DrawerAPI.open("1280px");
    DrawerAPI.setDrawerContent(
      <EditCharterDrawer
        groupId={record.outboundFlight.groupId}
        list={listByGroupId || []}
        close={DrawerAPI.close}
      />,
    );
    
  };
  // const columns = useMemo(() => {
  //   return renderColumns(true, editingRows, setEditingRows, handleSave, handleCancel);
  // }, [editingRows]);

const columns = [
  {
    title: 'Form Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => dayjs(text).format('YYYY-MM-DD'),
  },
  {
    title: 'Responses',
    dataIndex: 'responses',
    key: 'responses',
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
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
        }}
      >
        <Filters setFilter={setFilter} />
        <AddCharter />
      </Box>

      <Box
        sx={{
          ".ant-table .ant-table-body": {
            maxHeight: "calc(100vh - 317px) !important",
            minHeight: "300px !important",
          },
        }}
      >
        <CustomTable
          loading={isPending}
          style={{ marginBlock: "px" }}
          tableLayout="auto"
          pageSize={10}
          page={page}
          setPage={setPage}
          total={data?.data?.totalPages}
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
                    <Tooltip title={rowData?.outboundFlight?.groupId}>
                      <Link>
                        <Button
                          size="small"
                          className="table_action_button custom-action-button"
                          icon={<EyeSVG color={"#000"} />}
                          onClick={() => handleEditGroup(rowData)}
                        />
                      </Link>
                    </Tooltip>

                    <Tooltip title={"Share It now "}>
                      <Link>
                        <Button
                          size="small"
                          className="table_action_button custom-action-button"
                          icon={<ShareIcon color={"#000"} />}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                      <Button
                        type="primary"
                        className="table_action_button"
                        danger
                        onClick={() => {
                          Modal.confirm({
                            title: "Do you want to delete this Item?",
                            content: <p className="gc">This action is irreversible and cannot be undone.</p>,
                            centered: true,
                            okText: "Delete",
                            okType: "danger",
                            okButtonProps: {
                              type: "primary",
                            },
                            cancelText: "Cancel",
                            onOk() {
                              return deleteOfficeByIdMutation.mutateAsync(id);
                            },
                          });
                        }}
                        icon={<DeleteSVG color={"#fff"} />}
                      />
                    </Tooltip>
                    
                    <Tooltip title={isEditing ? "Save" : "Edit Name"}>
                      <Link>
                        <Button
                          type="primary"
                          size="small"
                          className="table_action_button"
                          icon={isEditing ? <SaveOutlined /> : <EditSVG color={"#fff"} />}
                
                        />
                      </Link>
                    </Tooltip>
                  </Space>
                );
              },
            },
          ]}
        />
      </Box>

      <ShareModal />
    </section>
  );
};

export default Forms;