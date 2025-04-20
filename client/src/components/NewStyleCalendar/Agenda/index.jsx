import { Select, Table } from "antd";
import { useCallback, useMemo, useState } from "react";
import "./styles.css";
import { EyeOutlined } from "@ant-design/icons";
import useGetMeetings from "services/calendar/Querys/useGetMeetings";
import { renderColumns } from "./renderColumns";
import { queryClient } from "services/queryClient";
import { useTableFilters } from "context/TableFilterContext";

const Agenda = ({ today, selectedDesk }) => {
  const { tableFilters } = useTableFilters();
  const { searchText } = tableFilters?.agenda || "";
  const { filters } = tableFilters?.agenda || {};

  const [page, setPage] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([
    "NO.",
    "Label",
    "Title",
    "Participants",
    "Schedule type",
    "Time",
    "Date",
    "Desk",
    "Actions",
    "Status",
  ]);

  const {
    data: events,
    isPending,
    queryKey,
  } = useGetMeetings(
    {
      deskId: selectedDesk === "all" ? undefined : selectedDesk,
      type: "agenda",
      date: today,
      page: page + 1,
      limit: 10,
      labelId: filters?.label,
      schedualeType: filters?.scheduleType,
      statusId: filters?.status,
      creator: filters?.creator,
      includeQueueAppointments : true,
      aiAgent : false
    },
    {
      select: (data) => {
        return data.data.data;
      },
    },
  );

  const onChangeLabel = useCallback(
    (data) => {
      queryClient.setQueryData(queryKey, (prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              rows: prev.data.data.rows.map((item) => {
                if (item.id === data.id) {
                  return { ...item, label: data.label };
                }
                return item;
              }),
            },
          },
        };
      });
    },
    [queryKey],
  );

  const columns = useMemo(() => {
    return renderColumns(onChangeLabel);
  }, []);

  const tableData = useMemo(() => {
    const searchTextValue = searchText ?? "";

    if (!!events?.rows) {
      return (events?.rows || []).filter((row) => {
        return Object.values(row).some((cellValue) =>
          String(cellValue).toLowerCase().includes(searchTextValue?.toLowerCase()),
        );
      });
    }
    return [];
  }, [events?.rows, searchText]);

  return (
    <div className="agenda">
      <div style={{ margin: "20px" }}>
        <Select
          value={selectedColumns}
          mode="multiple"
          onChange={(value) => setSelectedColumns(value)}
          placeholder={
            <>
              <EyeOutlined style={{ marginRight: "10px" }} />
              Show/Hide
            </>
          }
          allowClear
          style={{ minWidth: "130px" }}
          popupMatchSelectWidth={false}
          maxTagCount={1}>
          {columns.map((column, i) => (
            <Select.Option key={column.title} value={column.title}>
              {column.title}
            </Select.Option>
          ))}
        </Select>
        <Table
          rowKey={"id"}
          loading={isPending}
          scroll={{ x: 700 }}
          style={{ marginTop: "32px" }}
          columns={columns.filter((column) => selectedColumns.includes(column.title))}
          dataSource={tableData || []}
          pagination={{
            pageSize: 10,
            total: events?.count ?? 0,
            onChange: (page) => {
              setPage(page - 1);
            },
            defaultCurrent: page / 10 + 1,
          }}
          locale={{ emptyText: "No Meeting yet" }}
        />
      </div>
    </div>
  );
};

export default Agenda;
