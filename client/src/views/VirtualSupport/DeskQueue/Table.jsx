import { Table } from "antd";
import React, { useState } from "react";
import { generateColumns } from "./generateColumns";
import useGetMeetingQueues from "services/meetings/Querys/useGetMeetingQueues";
import dayjs from "dayjs";
import TableToolbar from "./TableToolbar";
import Box from "components/Box";
import TableFilters from "./TableFilters";
import { useSearchParams } from "react-router-dom";
import { getQueryParams } from "./utils";
const deskId = "all";

const QueueTable = () => {
  const [searchParams] = useSearchParams();

  const [activeDesk, setActiveDesk] = useState(
    searchParams.get("meetingType") === "MEETING_DESK"
      ? "all"
      : searchParams.get("desk_id") ?? "all",
  );

  const { data, isLoading } = useGetMeetingQueues(
    { deskId: activeDesk === "all" ? undefined : activeDesk },
    {
      select: (data) => {
        return data.data.data.map((item) => {
          const start = dayjs(item.date);
          const end = new Date(start.add(item.durationInMinutes, "minute"));
          const formTime = start.format("HH:mm");
          const toTime = dayjs(end).format("HH:mm");
          return {
            id: item.id,
            meetingName: item.name,
            meetingId: item.id,
            meetingLinkParams: getQueryParams(item.meetingLink),
            meetingLink: item.meetingLink,
            meetingColor: item?.meetingColor,
            meetingType: item.meetingType,
            desk: item?.desk?.name ?? "-",
            customers: item?.participantBookedMeetings
              ?.filter((people) => !!people?.customer)
              .map((people) => {
                return {
                  fullName: people?.customer?.account?.fullName,
                  id: people?.customer?.account?.id,
                  email: people?.customer?.account?.email,
                  profileImage: people?.customer?.account?.profileImage,
                };
              }),
            time: formTime + " - " + toTime + " " + item.timeZone,
            employees: item?.participantBookedMeetings
              .filter((item) => !!item.employee)
              .map((employee) => ({
                fullName: employee?.employee?.account?.fullName,
                id: employee?.employee?.account?.id,
                email: employee?.employee?.account?.email,
              })),
          };
        });
      },
      refetchInterval: 10000,
    },
  );
  console.log("data", data);

  return (
    <div>
      <TableToolbar length={(data || []).length}></TableToolbar>
      <Box sx={{ padding: "24px" }}>
        {!searchParams.get("desk_id") && (
          <TableFilters activeDesk={activeDesk} setActiveDesk={setActiveDesk} />
        )}
        <Table loading={isLoading} dataSource={data} columns={generateColumns}></Table>
      </Box>
    </div>
  );
};
export default QueueTable;
