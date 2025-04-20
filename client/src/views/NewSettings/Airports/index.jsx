import { Table } from "antd";
import Box from "components/Box";
import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import { renderColumns } from "./components/renderColumns";
import useGetAllAirports from "services/travel/Settings/Queries/useGetAllAirports";
const Airports = () => {
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetAllAirports(
    {
      page: page,
      size: 10,
    },
    {
      select: (data) => {
        return data.data.data;
      },
    },
  );
  console.log("data", data?.data);
  const columns = useMemo(() => {
    return renderColumns;
  }, []);
  return (
    <section className="body-content products">
      <Header />
      <Box>
        <Table
          loading={isPending}
          scroll={{ x: 700, y: 400 }}
          pagination={{
            pageSize: 10,
            total: data?.count,
            onChange: (page) => {
              setPage(page);
            },
            defaultCurrent: 1,
          }}
          dataSource={data?.rows || []}
          columns={columns}
          style={{ marginTop: "24px" }}
        />
      </Box>
    </section>
  );
};
export default Airports;
