import { useState } from "react";
import { Col, Flex, Input, Row, Select, Typography } from "antd";
import { SearchSiderSVG } from "assets/jsx-svg";
import useGetMeetingQueues from "services/meetings/Querys/useGetMeetingQueues";
import NoDataToShowComponent from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";
import QueueItem from "./QueueItem";
import dayjs from "dayjs";
import useGetDeskEmployees from "services/Desk/Querys/useGetDeskEmployees";
import { useSearchParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Box from "components/Box";
import { getQueryParams } from "./utils";
import Logo from "components/common/Logo";

import "./styles.css";

const DeskQueue = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [deskId, setDeskId] = useState(searchParams.get("desk_id") ?? "all");
  const { data, isLoading } = useGetMeetingQueues(
    { deskId: deskId === "all" ? undefined : deskId },
    {
      select: (data) => data.data.data,
      refetchInterval: 10000,
    },
  );
  const { data: dataListDesk } = useGetDeskEmployees("CUSTOMER_SERVICE_DESK", {
    select: (data) => {
      return [
        { label: "All desk", value: "all" },
        ...data.data.data.map((item) => ({ label: item.name, value: item.id })),
      ];
    },
  });

  const onSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  const handleSelectDesk = (id) => {
    setDeskId(id);
  };
  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: "8px" }}>
        <Typography.Text className="fw-500 fz-18">Desk Queue </Typography.Text>

        <Select
          value={
            (dataListDesk || []).find((item) => String(item.value) === String(deskId)) ?? "all"
          }
          defaultValue={
            (dataListDesk || []).find((item) => String(item.value) === String(deskId)) ?? "all"
          }
          onChange={handleSelectDesk}
          showSearch
          size="small"
          style={{ width: "225px" }}
          options={dataListDesk}></Select>
      </Flex>

      {isLoading ? (
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
            height: "calc(100vh - 240px)",
          }}>
          <Row gutter={[0, 30]}>
            <Col xs={24}>
              <Row justify={"center"}>
                <Logo height={40} />
              </Row>
            </Col>
            <Col xs={24}>
              <Row justify={"center"}>
                <LoadingOutlined />
              </Row>
            </Col>
          </Row>
        </Box>
      ) : (
        <>
          <Input
            onChange={onSearch}
            prefix={<SearchSiderSVG color="#AEAEB2" />}
            placeholder="Search"
          />

          {(data || []).length === 0 ? (
            <NoDataToShowComponent></NoDataToShowComponent>
          ) : (
            <Flex
              vertical
              gap={8}
              style={{
                marginTop: "16px",
                overflow: "auto",
                height: "calc(100vh - 185px)",
              }}>
              {(data || []).filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()),
              ).length > 0
                ? (data || [])
                    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((item) => {
                      const start = dayjs(item.date);
                      const end = new Date(start.add(item.durationInMinutes, "minute"));
                      return (
                        <QueueItem
                          meetingColor={item?.meetingColor}
                          participant={
                            item?.participantBookedMeetings.filter((item) => !item.isHost) ?? []
                          }
                          customers={item?.participantBookedMeetings
                            ?.filter((people) => !!people?.customer)
                            .map((people) => {
                              return {
                                fullName: people?.customer?.account?.fullName,
                                id: people?.customer?.account?.id,
                                email: people?.customer?.account?.email,
                                profileImage: people?.customer?.account?.profileImage,
                              };
                            })}
                          employees={item?.participantBookedMeetings
                            .filter((item) => !!item.employee)
                            .map((employee) => ({
                              fullName: employee?.employee?.account?.fullName,
                              id: employee?.employee?.account?.id,
                              email: employee?.employee?.account?.email,
                            }))}
                          meetingLinkParams={getQueryParams(item.meetingLink)}
                          timeZone={item.timeZone}
                          formTime={start.format("HH:mm")}
                          toTime={dayjs(end).format("HH:mm")}
                          name={item.name}
                          meetingId={item.id}
                          key={item.id}
                          link={item?.meetingLink}></QueueItem>
                      );
                    })
                : "Apologies,couldn't find any matches for your search."}
            </Flex>
          )}
        </>
      )}
    </div>
  );
};
export default DeskQueue;
