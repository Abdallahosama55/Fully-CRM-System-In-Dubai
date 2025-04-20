import React from "react";
import HotelCard from "../HotelCard";
import { Pagination } from "antd";

const HotelsResults = ({
  totalResults,
  data,
  queryString,
  isLocalBook,
  page,
  setPage,
}) => {
  return (
    <div>
      {data?.map((hotel, index) => (
        <HotelCard
          isLocalBook={isLocalBook}
          queryString={queryString}
          key={hotel.id}
          data={hotel}
          resultsCount={data?.length}
          index={index}
        />
      ))}
      {totalResults > 10 && (
        <Pagination
          current={page}
          total={totalResults}
          align="end"
          pageSize={10}
          showSizeChanger={false} // Disables page size options (to replace `pageSizeOptions={[]}`)
          onChange={(page) => {
            setPage(page);
          }}
        />
      )}
    </div>
  );
};

export default HotelsResults;
