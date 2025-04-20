import { Button, Flex, Row, Space, Tooltip, Typography } from "antd";
import { useMemo, useState } from "react";
import { renderColumns } from "./renderColumns";
import useGetSearchFlight from "services/travel/charters/Queries/useGetSearchCharter";
import Filters from "./components/Filters";
import Box from "components/Box";
import AddCharter from "./AddCharter";
import { EyeSVG, GroupsSVG, ViewAllSVG } from "assets/jsx-svg";
import DeleteFlight from "./components/DeleteFlight";
import Link from "antd/es/typography/Link";
import EditCharterDrawer from "./EditCharter";
import { useDrawer } from "context/drawerContext";
import dayjs from "dayjs";
import usePageTitle from "hooks/usePageTitle";
import CustomTable from "components/CustomTable";
import useListFlights from "services/travel/charters/Queries/useListFlights";
const Overview = () => {
  usePageTitle("Charters");
  const DrawerAPI = useDrawer();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const { data, isPending } = useListFlights({ ...filter, page, size: 10 });
  console.log('data', data)
  const columns = useMemo(() => {
    return renderColumns(true);
  }, []);
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
  return (
    <section>
      <Box
        sx={{
          display: "flex",
          gap: 8,
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
          tableLayout='auto'
          pageSize={10}
          page={page}
          setPage={setPage}
          total={data?.total}
          dataSource={data?.rows ?? []}
          columns={[
            ...columns,
            {
              width: 85,
              title: <Typography.Text ellipsis={{ tooltip: "Actions" }}>Actions</Typography.Text>,
              dataIndex: "action",
              align: "center",
              key: "action",
              render: (id, rowData) => {
                return (
                  <Space >
                    <Tooltip title={"Delete"}>
                      <DeleteFlight id={rowData.outboundFlight.id} />
                    </Tooltip>
                    <Tooltip title={rowData?.outboundFlight?.groupId}>
                      <Link onClick={() => handleEditGroup(rowData)}>
                        <Button size="small" className="table_action_button" icon={<EyeSVG color={"#2D6ADB"} />} />
                      </Link>
                    </Tooltip>
                  </Space>
                );
              },
            },
          ]}
        />
      </Box>
    </section >
  );
};
export default Overview;
