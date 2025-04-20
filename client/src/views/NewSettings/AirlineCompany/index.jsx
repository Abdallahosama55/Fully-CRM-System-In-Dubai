import Box from "components/Box";
import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import { renderColumns } from "./components/renderColumns";
import useGetAllAirlineCompanies from "services/travel/Settings/Queries/useGetAllAirlineCompanies";
import CustomTable from "components/CustomTable";
import usePageTitle from "hooks/usePageTitle";
const AirlineCompanies = () => {
  usePageTitle("Airline Companies");
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetAllAirlineCompanies(
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

  const columns = useMemo(() => {
    return renderColumns;
  }, []);
  return (
    <section className="body-content products" style={{ padding: "1rem" }}>
      <Header />
      <Box>
        <CustomTable
          loading={isPending}
          scroll={{ x: 700, y: 400 }}
          page={page}
          pageSize={10}
          total={data?.count}
          setPage={setPage}
          dataSource={data?.rows ?? []}
          columns={columns}
          style={{ marginTop: "24px" }}
        />
      </Box>
    </section>
  );
};
export default AirlineCompanies;
