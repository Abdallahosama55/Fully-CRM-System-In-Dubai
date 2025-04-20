import { Pagination, Typography } from "antd";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import DeskCard from "./DeskCard";
import "./styles.css";

const PAGE_SIZE = 6;

export default function DesksList({ desks, onDeskSelected }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const linkAndBtnColor = queryParams.get("linkColor") || "#272942";

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedDesks = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = currentPage * PAGE_SIZE;
    return desks?.slice(start, end) ?? [];
  }, [currentPage, desks]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography.Text className="topic-title w-100">
        Please choose a topic to view available dates and times.
      </Typography.Text>
      <div className="desks-container">
        {paginatedDesks.map((desk) => (
          <DeskCard key={desk.id} desk={desk} onSelect={onDeskSelected} />
        ))}
      </div>
      <Pagination
        style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center" }}
        defaultCurrent={1}
        current={currentPage}
        pageSize={PAGE_SIZE}
        onChange={handleChangePage}
        total={desks?.length ? desks?.length : 0}
      />
    </>
  );
}
