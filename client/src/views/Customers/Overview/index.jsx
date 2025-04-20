import CustomerTable from "./Components/CustomersTable";
import "./style.css";
import FilterPanel from "./Components/FilterPanel";

import { Badge, Button, Col, Input, Modal, Row, Space, Tabs } from "antd";
import {
  ClientsSVG,
  CompaniesSVG,
  FilterMailSVG,
  PlusSVG,
  ProspectsSVG,
  QualitySVG,
  SearchSVG,
  ViewAllSVG,
} from "assets/jsx-svg";
import InviteCustomerEmail from "./Components/InviteCustomerByEmail";
import CustomerDrawer from "./Components/CustomerForm/CustomerDrawer";
import CustomeSteps from "./Components/CustomerForm";
import { useCallback, useMemo, useState, useEffect } from "react";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import ViewCustomer from "../ViewCustomer/ViewCustomer";
import { useQueryClient } from "@tanstack/react-query";
import InviteSVG from "assets/jsx-svg/InviteSVG";
import { omit } from "lodash-es";
import { useNavigate, useParams } from "react-router-dom";
import usePageTitle from "hooks/usePageTitle";
import { useDrawer } from "hooks/useDrawer";

const tapsFilter = [
  {
    key: "ALL",
    label: `View All`,
    icon: <ViewAllSVG />,
  },
  {
    key: "LEAD",
    label: `Leads`,
    icon: <ProspectsSVG />,
  },
  {
    key: "QUALIFIED",
    label: `Qualified`,
    icon: <QualitySVG />,
  },
  {
    key: "CLIENT",
    label: `Clients`,
    icon: <ClientsSVG />,
  },
  {
    key: "COMPANY",
    label: `Companies`,
    icon: <CompaniesSVG />,
  },
];
const Customer = () => {
  const history = useNavigate();

  const { tapKey } = useParams();
  const [selectedTab, setSelectedTab] = useState(tapKey ? tapKey : "ALL");
  const [selectedCustomerIdToView, setSelectedCustomerIdToView] = useState();
  const [filterParams, setFilterParams] = useState({ customerType: tapKey ? tapKey : "ALL" });
  const [confirmationModal, contextHolder] = Modal.useModal();
  const DrawerAPI = useDrawer();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const queryClient = useQueryClient();
  // set the new page title
  usePageTitle(`Customers / ${selectedTab.toLowerCase()}`, selectedTab);

  useEffect(() => {
    setFilterParams({ customerType: tapKey ? tapKey : "ALL" });
    setSelectedTab(tapKey);
    setPage(1);
  }, [tapKey]);

  const { data, isPending, key } = useGetCustomers(
    { page, limit: pageSize, body: filterParams },
    {
      select: (data) => {
        return data?.data?.data;
      },
    },
  );

  // const handleCloseFiltersPanel = () => {
  //   setIsFilterPanelOpen(false);
  // };

  // const handleOpenFiltersPanel = () => {
  //   setIsFilterPanelOpen(true);
  // };
  const handleFilter = (filters) => {
    setPage(1);
    if (filters) {
      setFilterParams({ ...filterParams, ...filters });
    } else {
      //when reset filter panel then search based on name "general search"
      setFilterParams({
        generalSearchValue: filterParams?.generalSearchValue,
        customerType: filterParams?.customerType,
      });
    }
  };
  const onClose = useCallback(() => {
    DrawerAPI.close();
  }, []);
  const handleOpenFiltersPanel = () => {
    DrawerAPI.open("25%");
    DrawerAPI.setDrawerContent(
      <FilterPanel onFilter={handleFilter} isLoading={isPending} onCloseFiltersPanel={onClose} />,
    );
  };
  const handleChangePage = useCallback((value, pageSize) => {
    setPage(value);
    setPageSize(pageSize);
  }, []);

  const handleOpenCustomerModal = useCallback(
    (value) => {
      setSelectedCustomerIdToView(value);
    },
    [setSelectedCustomerIdToView],
  );

  const handleRefetchData = () => {
    queryClient.invalidateQueries({ queryKey: key });
  };

  const filtersCount = useMemo(() => {
    let objectFilterToCount = omit(filterParams, ["generalSearchValue", "customerType"]);
    return Object.values(objectFilterToCount || {}).filter(Boolean).length;
  }, [filterParams]);

  const handelChangeGeneralSearch = (value) => {
    setPage(1);
    setFilterParams({ ...filterParams, generalSearchValue: value });
  };

  const replaceCurrentUrl = (value) => {
    const currentPath = window.location.pathname;
    // Split the path into segments
    const pathSegments = currentPath.split("/");
    // Replace the last segment with 'test'
    pathSegments[pathSegments.length - 1] = value;
    // Join the segments back into a full path
    const newPath = pathSegments.join("/");
    // Navigate to the new path
    history(newPath);
  };
  const handelSelectedTabs = (value) => {
    setFilterParams({ ...filterParams, customerType: value });
    setSelectedTab(value);
    replaceCurrentUrl(value);
  };

  return (
    <Row className="customers-root">
      {DrawerAPI.Render}
      <Col xs={24} md={24} className="customers-list">
        <Row>
          <Tabs
            onChange={(value) => handelSelectedTabs(value)}
            activeKey={selectedTab}
            items={tapsFilter}
            style={{ width: "100%"  }}
          />
        </Row>
        <Row align="middle" justify="space-between" style={{ marginBottom: 15 }}>
          <Col span={12}>
            <Input
              style={{ height: "40px" }}
              prefix={<SearchSVG color="#3F65E4" />}
              allowClear
              placeholder="Search name, email, phone"
              onChange={(e) => handelChangeGeneralSearch(e.target.value)}
            />
          </Col>
          <Col>
            <Space>
              <Badge count={filtersCount}>
                <Button
                  style={{ height: "40px" }}
                  icon={<FilterMailSVG color="#3A5EE3" />}
                  onClick={handleOpenFiltersPanel}>
                  Advanced
                </Button>
              </Badge>
              <InviteCustomerEmail>
                <Button
                  icon={<InviteSVG />}
                  style={{ background: "#52546426", color: "#313342", height: "40px" }}>
                  Invite
                </Button>
              </InviteCustomerEmail>
              <CustomerDrawer
                trigger={
                  <Button style={{ height: "40px" }} icon={<PlusSVG />} type="primary">
                    New
                  </Button>
                }>
                <CustomeSteps isCompany={selectedTab == "COMPANY"}></CustomeSteps>
              </CustomerDrawer>
            </Space>
          </Col>
        </Row>
        <CustomerTable
          isPending={isPending}
          page={page}
          pageSize={pageSize}
          count={data?.count}
          rows={data?.data}
          filterParams={filterParams}
          onPageChange={handleChangePage}
          onOpenCustomerModal={handleOpenCustomerModal}
          onRefetchData={handleRefetchData}
          confirmationModal={confirmationModal}
        />
      </Col>
      {contextHolder}
      <ViewCustomer
        id={selectedCustomerIdToView}
        onClose={() => setSelectedCustomerIdToView()}
        onUpdateSuccess={handleRefetchData}
      />
    </Row>
  );
};
export default Customer;
