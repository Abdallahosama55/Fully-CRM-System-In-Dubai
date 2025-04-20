import Box from "components/Box";
import Navigation from "components/crm-board/Content/Navigation";
import React from "react";
import useGetDeskEmployees from "services/Desk/Querys/useGetDeskEmployees";
const TableFilters = ({ activeDesk, setActiveDesk }) => {
  const { data } = useGetDeskEmployees("CUSTOMER_SERVICE_DESK", {
    select: (data) => {
      return [
        { lable: "All desk", id: "all" },
        ...data.data.data.map((item) => ({ lable: item.name, id: item.id })),
      ];
    },
  });
  return (
    <Box
      sx={{
        "& .top-nav": {
          overflowX: "auto",
        },
      }}>
      <Navigation setActiveTab={setActiveDesk} activeTab={activeDesk} navItemsIn={data ?? []} />
    </Box>
  );
};
export default TableFilters;
