import { useState } from "react";
import { Table, Typography } from "antd";

import "./styles.css";
import { columns } from "./DataTable";
import { useEffect } from "react";
import StoreService from "services/store.service";
import { useNotification } from "context/notificationContext";
import CustomTable from "components/CustomTable";

// const actionMenu = (
//   <Menu
//     items={[
//       {
//         key: "1",
//         label: "Restor",
//       },
//       {
//         key: "2",
//         label: "Delete",
//       },
//       {
//         key: "3",
//         label: "Delete All",
//       },
//     ]}
//   />
// );

export default function OrdersTable() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData);
  const [isLoading, setIsLoading] = useState(false);
  const { openNotificationWithIcon } = useNotification();

  useEffect(() => {
    setIsLoading(true);

    try {
      const getOrder = async () => {
        const res = await StoreService.listOrder();
        setTableData(() => {
          return res.data.data.map((order) => {
            return {
              key: order.id,
              action: {
                action: order,
                setFilteredData: setFilteredData,
                setTableData: setTableData,
              },
              numberOfProducts: order.orderDetails.length,
              amount: order.totalPrice,
              customer: order.customer?.account?.fullName,
              orderNumber: order.id,
              status:
                order.status === 0
                  ? "Active"
                  : order.status === 1
                  ? "Pending"
                  : order.status === 2
                  ? "Confirmed"
                  : order.status === 3
                  ? "Picked Up"
                  : order.status === 4
                  ? "On The Way"
                  : order.status === 5
                  ? "Delivered"
                  : "Cancel",
              // deliveryStatus:
              //   i === 0
              //     ? "Active"
              //     : i === 1
              //     ? "Pending"
              //     : i === 2
              //     ? "Confirmed"
              //     : i === 3
              //     ? "Picked Up"
              //     : i === 4
              //     ? "On The Way"
              //     : i === 5
              //     ? "Delivered"
              //     : "Cancel",
            };
          });
        });
      };
      getOrder();

      setIsLoading(false);
    } catch (error) {
      openNotificationWithIcon("error", "Something wrong happened!");
      setIsLoading(false);
    }
  }, []);

  // const onSearch = (value) => {
  //   setFilteredData(() =>
  //     tableData.filter((row) => row.name.toLowerCase().includes(value.toLowerCase()) === true),
  //   );
  // };

  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  return (
    <CustomTable
      scroll={{ x: 900 }}
      loading={isLoading}
      columns={columns}
      dataSource={tableData}
    />
  );
}
