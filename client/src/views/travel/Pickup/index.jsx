import React, { useEffect, useRef, useState } from "react";
import { Empty, Form } from "antd";
import useOperationsSearch from "services/travel/operations/Mutations/useOperationsSearch";
import usePageTitle from "hooks/usePageTitle";
import { useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { columns } from "./tableData";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import { useDebounce } from "hooks/useDebounce";
import TabHeader from "./component/tabHeader";
import { replaceStringToObject } from "./helper";
import OperationForm from "./component/operationForm";
import CustomTable from "components/CustomTable";
import OperationModal from "./component/operationModal";

// styles
import "./styles.css";

const Pickup = () => {
  usePageTitle("Operation");

  const isFirstRender = useRef(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [bookingType, setBookingType] = useState(BOOKINGS_TYPES.ALL);

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form] = Form.useForm();
  const dates = useWatch("rangeDate", form);
  const filters = useWatch(["filters", "clientName"], form);
  const agentId = useWatch(["filters", "agentId"], form);

  const OperationsSearch = useOperationsSearch();

  const debounceFilters = useDebounce(filters, 1000);

  const handleViewDetails = (record) => {
    const bookingDetilsData = replaceStringToObject(record.bookingDetils);
    setSelected({
      bookingDetilsData,
      quotation: record.quotationItems,
      withQuotation: record.withQuotation,
    });
    setOpenModal(true);
  };

  useEffect(() => {
    if (!dates) {
      OperationsSearch.mutate({
        body: {
          fromDate: dayjs().format("YYYY-MM-DD"),
          toDate: dayjs().format("YYYY-MM-DD"),
          type: bookingType,
        },
        params: { page, size: pageSize },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // ⛔ skip on initial render
    }
    OperationsSearch.mutate({
      body: {
        ...OperationsSearch.variables.body,
        clientName: debounceFilters,
        agentId,
        type: bookingType,
      },
      params: { page, size: pageSize },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceFilters, bookingType, page, pageSize, agentId]);

  return (
    <div className="operation_page_container">
      <TabHeader
        bookingType={bookingType}
        setBookingType={setBookingType}
        setPage={setPage}
        setPageSize={setPageSize}
        OperationsSearch={OperationsSearch}
      />
      <OperationForm OperationsSearch={OperationsSearch} form={form} />

      <CustomTable
        locale={{
          emptyText: (
            <Empty
              style={{ padding: "5rem 0" }}
              description={
                <div>
                  <p>No Operation to display. </p>
                </div>
              }
            />
          ),
        }}
        style={{ padding: "0 20px" }}
        loading={OperationsSearch.isPending}
        scroll={{ x: 700, y: 400 }}
        page={page}
        pageSize={pageSize}
        total={OperationsSearch.data?.data?.data?.count}
        setPage={setPage}
        dataSource={OperationsSearch.isSuccess && OperationsSearch.data.data.data.rows}
        columns={columns(handleViewDetails)}
      />

      <OperationModal openModal={openModal} selected={selected} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Pickup;
