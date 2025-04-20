import { Table } from "antd";
import { useWatch } from "antd/es/form/Form";
import React, { useMemo } from "react";
import { renderColumns } from "../../../renderColumns";
import Box from "components/Box";
import { convertInputToOutput } from "../utils";
import useGetAllAirlineCompanies from "services/travel/Settings/Queries/useGetAllAirlineCompanies";
const ViewResult = () => {
  const data = useWatch();
  const { isPending, data: company } = useGetAllAirlineCompanies(
    { size: 400, generalSearch: "" },
    {
      refetchOnMount: false,
      select: (data) => {
        return data.data.data.rows.map((item) => {
          return { ...item, value: item.id, label: item.name };
        });
      },
    },
  );
  const columns = useMemo(() => {
    return renderColumns();
  }, []);

  return (
    <Box
      sx={{
        marginTop: "24px",

        ".ant-table .ant-table-body": {
          maxHeight: "400px",
          minHeight: "200px",
        },
      }}>
      <Table
        loading={isPending}
        scroll={{ y: 400 }}
        style={{ maxHeight: "400px", minHeight: "200px" }}
        dataSource={convertInputToOutput({
          ...data,
          companyName: company?.find((item) => data?.airlineCompanyId === item.value)?.label ?? "-",
        })}
        columns={columns}
      />
    </Box>
  );
};
export default ViewResult;
