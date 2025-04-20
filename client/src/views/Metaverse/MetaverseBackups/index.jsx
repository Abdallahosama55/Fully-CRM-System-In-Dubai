import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Empty, message, Space, Table, Tooltip } from "antd";
import dayjs from "dayjs";

import useBackupDimensionRestore from "services/Dimensions/Mutations/useBackupDimensionRestore";
import useBackupDimensionList from "services/Dimensions/Queries/useBackupDimensionList";
import LoadingPage from "components/common/LoadingPage";
import { EyeSVG, LastUpdate } from "assets/jsx-svg";

export default function MetaverseBackups() {
  const { dimensionId } = useParams();
  const [restorIdLoading, setRestorIdLoading] = useState(null);
  const backupDimensionListQuery = useBackupDimensionList(dimensionId, {
    select: (res) => {
      return res.data.data;
    },
  });
  const backupDimensionRestoreMutation = useBackupDimensionRestore({
    onMutate: (variables) => {
      console.log("variables", variables);
      setRestorIdLoading(variables.backupId);
    },
    onSuccess: () => {
      setRestorIdLoading(null);
      message.success("Restored successfully");
    },
    onError: (err) => {
      setRestorIdLoading(null);
      message.error(err.response?.data?.message);
    },
    onSettled: () => {
      setRestorIdLoading(null);
    },
  });

  useEffect(() => {
    if (backupDimensionListQuery.isError) {
      console.log("backupDimensionListQuery.error", backupDimensionListQuery.error);
      message.error(backupDimensionListQuery.error.message);
    }
  }, [backupDimensionListQuery.error, backupDimensionListQuery.isError]);

  const columns = [
    {
      title: "Backup id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Backup Date",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
      render: (createdAt) => {
        return createdAt ? dayjs(createdAt).format("DD MMM, YYYY") : "-";
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
            <Tooltip title={"Restor"}>
              <Button
                size="small"
                icon={<LastUpdate fill="#fff" />}
                type="primary"
                loading={restorIdLoading === record.id}
                onClick={() =>
                  backupDimensionRestoreMutation.mutate({
                    dimensionId,
                    backupId: record.id,
                  })
                }
              />
            </Tooltip>
            <Tooltip title={"View"}>
              <Link to={`/metaverse/${dimensionId}?backupMode=true&backupId=${record.id}`}>
                <Button icon={<EyeSVG />} size="small" type="link" />
              </Link>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  if (backupDimensionListQuery.isLoading) {
    return <LoadingPage />;
  }
  return (
    <section className="body-content">
      <Table
        loading={backupDimensionListQuery.isLoading}
        dataSource={backupDimensionListQuery.data ?? []}
        columns={columns?.map((col) => ({
          ...col,
          onCell: () => ({
            style: {
              padding: "2rem 1rem",
            },
          }),
        }))}
        locale={{
          emptyText: <Empty description={"No Backups fot this dimension"} />,
        }}
        pagination={false}
      />
    </section>
  );
}
