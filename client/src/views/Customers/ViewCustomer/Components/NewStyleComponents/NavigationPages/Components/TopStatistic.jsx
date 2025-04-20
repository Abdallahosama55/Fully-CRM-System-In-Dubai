import React from "react";
import Statistic from "./Statistic";
import dayjs from "dayjs";
import { Grid } from "antd";
import Box from "components/Box";
import { useGetStatisticsSuspense } from "services/Customers/Querys/useGetStatistics";
const TopStatistic = ({ customerId }) => {
  const { data } = useGetStatisticsSuspense(customerId, { select: (data) => data.data.data });

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexWrap: "wrap",
        gap: "4px",
      }}>
      <Statistic
        title={"Orders"}
        trends={[
          {
            label: "Total",
            value: data?.orders.total || 0,
            color: "blue",
          },
          {
            label: "Count",
            value: data?.orders?.count || 0,
            color: "green",
          },
        ]}
      />
      <Statistic
        title={"Meetings"}
        trends={[
          {
            label: "Total",
            value: data?.totalMeetings?.totalCount,
            color: "blue",
          },
          {
            label: "Attend",
            value: data?.totalMeetings?.attendMeetingsCount || 0,
            color: "green",
          },
          {
            label: "Absent",
            value: data?.totalMeetings?.absentMeetingsCount || 0,
            color: "red",
          },
        ]}
      />
      {data?.recentActivity && (
        <Statistic
          title={"Next Activity"}
          dateTime={
            data?.recentActivity && {
              title: data?.recentActivity?.name,
              lastDate: dayjs(data?.recentActivity.date).format("dd MMM, YYYY "),
            }
          }
        />
      )}
    </Box>
  );
};

export default TopStatistic;
