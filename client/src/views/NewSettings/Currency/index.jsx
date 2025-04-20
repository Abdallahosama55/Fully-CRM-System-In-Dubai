import React, { useMemo } from "react";
import Header from "./components/Header";
import Box from "components/Box";
import { Table } from "antd";
import { renderColumns } from "./components/renderColumns";
import useGetCurrencies from "services/travel/Currencies/Queries/useGetCurrencies";
const Currency = () => {
  const { data } = useGetCurrencies();

  const columns = useMemo(() => {
    return renderColumns;
  }, []);
  return (
    <section className="body-content products">
      <Box>
        <Header />
      </Box>
      <Box>
        <Table
          pagination={{
            pageSize: 50,
            position: ["none", "bottomCenter"],
          }}
          scroll={{ y: 400 }}
          dataSource={data}
          columns={columns}
          style={{ marginTop: "24px" }}
        />
      </Box>
    </section>
  );
};
export default Currency;
