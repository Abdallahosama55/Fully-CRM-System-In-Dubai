import { useEffect, useState } from "react";
import { Button, Empty, message, Space, Tooltip, Typography } from "antd";
import useGetEvents from "services/Events/Querys/useGetEvents";
import useDeleteEvent from "services/Events/Mutations/useDeleteEvent";
import WarningModal from "components/common/WarningModal";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import CustomTable from "components/CustomTable";
import Badge from "components/common/Badge";
import EVENT_STATUS from "constants/EVENTES_STATUS";
import { Link } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";

const pageSize = 10;
const EventsTable = ({ refetchCounter, filters }) => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    refetch: refetchEvents,
  } = useGetEvents(
    {
      page: page,
      limit: pageSize,
      ...filters,
      startDate: filters?.loginRange && filters?.loginRange[0] ? dayjs(filters.loginRange[0]).format("YYYY-MM-DD") : undefined,
      endDate: filters?.loginRange && filters?.loginRange[1] ? dayjs(filters.loginRange[1]).format("YYYY-MM-DD") : undefined,
      loginRange: undefined,
      refetchCounter
    },
    {
      select: (data) => {
        return data?.data?.data;
      },
    },
  );

  const columns = [
    {
      title: "Event Name",
      dataIndex: "title",
      key: "title",
      render: (title) => <Typography.Paragraph
        className="sm_text_medium"
        style={{ margin: "0" , textTransform:"capitalize" }}
        ellipsis={{ rows: 2, tooltip: title }}
      >{title}</Typography.Paragraph>
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      ellipsis: true,
      width: 140,
      render: (startDate) => {
        return startDate ? dayjs(startDate).format("DD MMM, YYYY") : "-";
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      ellipsis: true,
      width: 140,
      render: (endDate) => {
        return endDate ? dayjs(endDate).format("DD MMM, YYYY") : "-";
      },
    },
    {
      title: "Duration",
      dataIndex: "startDate",
      key: "startDate",
      ellipsis: true,
      width: 140,
      render: (startDate, rowData) => {
        return rowData?.endDate && startDate ? Math.abs(dayjs(rowData?.endDate)?.diff(dayjs(startDate), 'day') + 1) + " day" : "-";
      },
    },
    {
      title: "Status",
      dataIndex: "actionStatus",
      key: "actionStatus",
      ellipsis: true,
      width: 140,
      render: (id, record) => {
        return <Badge
          fullWidth
          status={
            record?.actionStatus?.id === EVENT_STATUS.PASSED
              ? "success"
              : record?.actionStatus?.id === EVENT_STATUS.SCHEDULED
                ? "primary"
                : record?.actionStatus?.id === EVENT_STATUS.LIVE
                  ? "warning" :
                  record?.actionStatus?.id === EVENT_STATUS.CANCELED
                    ? "error" : "grey"
          }>{record?.actionStatus?.name || "-"}</Badge>

      },
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      ellipsis: true,
      width: 120,
      render: (_, record) => {
        return (
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title={"Delete"}>
              <Button
                icon={<DeleteSVG color="#fff" />}
                type="primary"
                danger
                className="table_action_button"
                onClick={() => onRowDelete(record)}
              />
            </Tooltip>
            <Tooltip title={"Edit"}>
              <Link to={ROUTER_URLS.EVENT.EDIT + record.id}>
                <Button
                  icon={<EditSVG color="#fff" />}
                  type="primary"
                  className="table_action_button"
                />
              </Link>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});
  const { deleteEvent, isPending: isDeletePending } = useDeleteEvent({
    onError: (error) => {
      var errors = error?.response.data?.errors;
      message.error(errors[0]);
    },
    onSuccess: (data, payload) => {
      refetchEvents();
      message.success("Deleted successfully");
    },
  });
  const onRowDelete = (EventObj) => {
    showDeleteModal();
    setItemToDelete(EventObj);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteEvent(itemToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };
  return (
    <div
      className="position-relative"
      style={{ border: "1.5px solid #2729420F", borderRadius: 15, marginTop: "6px" }}>
      <WarningModal
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${itemToDelete?.title}" event?`}
      />

      <CustomTable
        loading={isLoading || isDeletePending}
        page={page}
        pageSize={pageSize}
        total={data?.count}
        setPage={setPage}
        className="studio-table"
        dataSource={data?.rows ?? []}
        columns={columns?.map((col) => ({
          ...col,
          onCell: () => ({
            style: {
              padding: "2rem 1rem",
            },
          }),
        }))}
        locale={{
          emptyText: <Empty
            description={"No events yet"}
          />
        }}
      />
    </div>
  );
};
export default EventsTable;
