import { Button, Col, Input, Row, Table, Typography } from "antd";
import { useMemo, useState } from "react";
import { useNotification } from "context/notificationContext";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import { useQueryClient } from "@tanstack/react-query";

import WarningModal from "./Components/WarningModal";
import { useDrawer } from "context/drawerContext";
import AddEditLabels from "./Components/AddEditLabels";
import useGetAllLabelsInfo from "services/newSettings/Query/useGetAllLabelsInfo";
import useDeleteLabel from "services/newSettings/Mutations/useDeleteLabel";
import { QUERY_KEY } from "services/constants";

const Labels = () => {
  const DrawerAPI = useDrawer();
  const queryClient = useQueryClient();

  const [textSearch, setTextSearch] = useState("");
  const { openNotificationWithIcon } = useNotification();
  const [page, setPage] = useState(0);
  const [labelToDelete, setLabelToDelete] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isPending } = useGetAllLabelsInfo({
    select: (data) => {
      return data.data.data.map((item, index) => ({ ...item, index: index + 1 }));
    },
  });

  const { deleteLabel, isDeleteLabelPending } = useDeleteLabel(labelToDelete.id, {
    onSuccess: (data, id) => {
      openNotificationWithIcon("success", `Deleted successfully`);
      queryClient.setQueryData([QUERY_KEY.LABELS], (prev) => {
        return {
          ...prev,
          data: {
            data: prev.data.data?.filter((item) => item.id !== id),
          },
        };
      });
    },
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
  });

  const tableData = useMemo(() => {
    if (!!data)
      return data.filter((item) =>
        ["name"].some((field) =>
          String(item[field]).toLowerCase().includes(textSearch.toLowerCase()),
        ),
      );

    return [];
  }, [data, textSearch]);

  const columns = useMemo(() => {
    return [
      {
        title: "NO.",
        dataIndex: "index",
        width: "5%",
      },
      {
        title: "Label Name",
        dataIndex: "name",
        width: "20%",
        sorter: (a, b) => b.name.localeCompare(a.name),
      },
      {
        title: "Label Color",
        dataIndex: "color",
        width: "40%",
        render: (_, record) => {
          return <div className="color_btn" style={{ backgroundColor: record.color }} />;
        },
      },
      {
        title: "Actions",
        key: "actions",
        dataIndex: "actions",
        align: "center",
        width: "5%",
        render: (_, record) => {
          return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  DrawerAPI.open("40%");
                  DrawerAPI.setDrawerContent(<AddEditLabels labelData={record} />);
                }}>
                <EditSVG color="#030713" />
              </span>
              <span
                title="Delete"
                style={{ cursor: "pointer" }}
                onClick={() => onRowDelete(record)}>
                <DeleteSVG />
              </span>
            </div>
          );
        },
      },
    ];
  }, []);

  const onRowDelete = (labelObj) => {
    setIsDeleteModalOpen(true);
    setLabelToDelete(labelObj);
  };

  const handleDeleteModalOk = () => {
    deleteLabel(labelToDelete.id);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setLabelToDelete(null);
  };

  const onChangeSearchText = (text) => {
    setTextSearch(text);
  };

  return (
    <>
      <WarningModal
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${labelToDelete?.name}" label?`}
      />

      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Labels</Typography.Text>
          </Col>
          <Col className="search-bar" xs={24} sm={24} md={12} lg={12}>
            <Row
              justify="end"
              className="search-bar-row"
              align="middle"
              gutter={[16, 16]}
              style={{ height: 10 }}>
              <Col className="search-input-col" span={13}>
                <Row
                  style={{ borderRadius: "10px" }}
                  align="middle"
                  justify="end"
                  gutter={[10, 10]}
                  wrap={false}>
                  <Col style={{ paddingLeft: 0 }} flex={1}>
                    <Input
                      value={textSearch}
                      size="small"
                      className="general-table-search"
                      placeholder="Search"
                      onChange={(e) => onChangeSearchText(e.target.value)}
                      onBlur={(e) => onChangeSearchText(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={11}>
                <Button
                  style={{
                    background: "#272942",
                    color: "#fff",
                    width: "100%",
                  }}
                  size="small"
                  onClick={() => {
                    DrawerAPI.open("40%");
                    DrawerAPI.setDrawerContent(<AddEditLabels />);
                  }}>
                  + New label
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <div style={{ position: "relative" }}>
          <Table
            rowKey={"id"}
            loading={isPending || isDeleteLabelPending}
            scroll={{ x: 700 }}
            style={{ marginTop: "32px" }}
            columns={columns}
            dataSource={tableData}
            pagination={{
              pageSize: 10,
              total: tableData?.length,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
            locale={{ emptyText: "No labels yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {tableData.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
};

export default Labels;
