import React from "react";
import FlightCard from "../FlightCard";
import { Empty, Flex, Pagination } from "antd";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
// FlightsTab
const FlightsResults = ({
  data,
  travelers,
  fromDate,
  toDate,
  setPage,
  page,
  totalFlightsCount,
}) => {
  if (data?.length === 0) {
    return (
      <Flex
        justify="center"
        align="center"
        className="mt-1"
        style={{ minHeight: "450px", border: "1px solid #E5E5EA", borderRadius: "8px" }}>
        <Empty description={"No results match your filters"} image={empty_booking_screen} />
      </Flex>
    );
  }
  return (
    <div>
      {data?.map((flight, index) => (
        <FlightCard
          key={index}
          fromDate={fromDate}
          toDate={toDate}
          data={flight}
          resultsCount={data?.length}
          index={index}
          travelers={travelers}
        />
      ))}
      {totalFlightsCount > 10 && (
        <Pagination
          showSizeChanger={false}
          onChange={setPage}
          total={totalFlightsCount}
          pageSize={10}
          current={page}
          align="end"
        />
      )}
    </div>
  );
};

export default FlightsResults;
