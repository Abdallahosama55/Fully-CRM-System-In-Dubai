import "./style.css";
import { Badge, Button, Col, Input, Row, Space, Typography } from "antd";
import { FilterMailSVG } from "assets/jsx-svg";
import { useCallback, useMemo, useState } from "react";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import FilterPanel from "views/Customers/Overview/Components/FilterPanel";
import CustomersSelectionTable from "./CustomersSelectionTable";
import { omit } from "lodash-es";

const ImportParticipants = ({ onImportSelected, onCancelSelection }) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filterParams, setFilterParams] = useState();
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const [page, setPage] = useState(1);

  const { data, isPending } = useGetCustomers(
    { page, limit: 10, body: filterParams },
    {
      select: (data) => {
        return data?.data?.data;
      },
    },
  );

  const handleCloseFiltersPanel = () => {
    setIsFilterPanelOpen(false);
  };

  const handleOpenFiltersPanel = () => {
    setIsFilterPanelOpen(true);
  };

  const handleChangePage = useCallback((value) => {
    setPage(value);
  }, []);

  const handleFilter = (filters) => {
    if (filters) {
      setFilterParams({ ...filterParams, ...filters });
    } else {
      //when reset filter panel then search based on name "general search"
      setFilterParams({
        generalSearchValue: filterParams.generalSearchValue,
        customerType: filterParams.customerType,
      });
    }
  };

  const handleImportSelected = () => {
    onImportSelected(selectedCustomers);
  };

  const handleCancelSelection = () => {
    setSelectedCustomers([]);
    onCancelSelection();
  };

  const handleCustomersSelectionChange = (selection) => {
    setSelectedCustomers(selection);
  };

  const filtersCount = useMemo(() => {
    let objectFilterToCount = omit(filterParams, ["generalSearchValue", "customerType"]);
    return Object.values(objectFilterToCount || {}).filter(Boolean).length;
  }, [filterParams]);

  const handelChangeGeneralSearch = (value) => {
    setFilterParams({ ...filterParams, generalSearchValue: value });
  };
  return (
    <Row className="import-participants-root">
      <Col
        xs={24}
        md={7}
        className="filter-panel-container h-100"
        style={{ display: isFilterPanelOpen ? "block" : "none" }}>
        <FilterPanel
          onFilter={handleFilter}
          isLoading={isPending}
          onCloseFiltersPanel={handleCloseFiltersPanel}
        />
      </Col>
      <Col xs={24} md={isFilterPanelOpen ? 17 : 24} className="customers-list">
        <Row align="middle" justify="space-between" gutter={[12, 12]} style={{ minHeight: 76 }}>
          <Col>
            <Typography.Title level={5}>Contacts</Typography.Title>
          </Col>
          <Col>
            <Row align="middle" gutter={[16, 16]}>
              <Space>
                <Badge count={filtersCount}>
                  <Button icon={<FilterMailSVG />} onClick={handleOpenFiltersPanel}>
                    Add Filter
                  </Button>
                </Badge>
                <Button onClick={handleCancelSelection}>Cancel</Button>
                <Button
                  onClick={handleImportSelected}
                  disabled={!selectedCustomers.length}
                  style={{ background: "#272942", color: "#fff" }}>
                  Import Selected
                </Button>
              </Space>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col>
            <Input
              allowClear
              size="small"
              placeholder="Search name, email, phone"
              onChange={(e) => handelChangeGeneralSearch(e.target.value)}
            />
          </Col>
        </Row>
        <CustomersSelectionTable
          filterParams={filterParams}
          isPending={isPending}
          page={page}
          count={data?.count}
          rows={data?.data}
          onPageChange={handleChangePage}
          onSelectionChange={handleCustomersSelectionChange}
        />
      </Col>
    </Row>
  );
};
export default ImportParticipants;
