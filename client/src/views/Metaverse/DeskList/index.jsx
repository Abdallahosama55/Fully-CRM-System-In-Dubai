import { useContext, useEffect, useState } from "react";
import { Table, Typography } from "antd";

import CallsAndMeetingsColumns from "./TableColumns";

import { axiosCatch } from "utils/axiosUtils";

import DimensionDeskService from "services/dimension-desk.service";

export default function DesksList({ companyDimensionId }) {
  const [loading, setLoading] = useState(false);
  const [desks, setDesks] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const res = await DimensionDeskService.list(companyDimensionId);

        setDesks(res.data.data);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (desks.length) {
      setTableData(
        desks.map((desk) => {
          return {
            key: desk.id,
            ...desk,
          };
        }),
      );
    } else {
      setTableData([]);
    }
  }, [desks]);

  return (
    <div style={{ position: "relative" }}>
      <Table
        loading={loading}
        style={{ marginTop: "32px" }}
        columns={CallsAndMeetingsColumns({ setDesks })}
        dataSource={tableData}
        pagination={{
          pageSize: 10,
          total: desks.length,
          onChange: (page) => {
            setPage((page - 1) * 10);
          },
          defaultCurrent: page / 10 + 1,
        }}
      />

      <Typography.Text className="table-bottom-info hide-sm">
        Showing data {page} to {page + Math.min(10, tableData?.length)} of{" "}
        {desks.length} entries
      </Typography.Text>
    </div>
  );
}
