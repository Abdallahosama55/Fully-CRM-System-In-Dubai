import React, { useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Empty,
  Form,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import usePageTitle from "hooks/usePageTitle";
// icons
import SearchSVG from "assets/jsx-svg/SearchSVG";
import DateSVG from "assets/jsx-svg/DateSVG";
import PluseSVG from "assets/jsx-svg/PluseSVG";
// styles
import "./styles.css";
import AddSupplier from "./AddSupplier";
import useGetOffices from "services/agencies/Queries/useGetOffices";
import { OFFICER_TYPE } from "constants/BUYER_GROUB";
import {
  ArrowDownSVG,
  ArrowRightSVG,
  BackArrow,
  ClientsSVG,
  DeleteSVG,
  EditSVG,
  EmailSVG,
  PhoneSVG,
  ProspectsSVG,
  QualitySVG,
  ViewAllSVG,
  WhatsappSVG,
  WorldMapSVG,
} from "assets/jsx-svg";
import useDeleteOfficeById from "services/agencies/Mutations/useDeleteOfficeById";
import { queryClient } from "services/queryClient";
import dayjs from "dayjs";
import { useDebounce } from "hooks/useDebounce";
import TravelOfficeView from "components/TravelOfficeView";
import CustomTable from "components/CustomTable";
import default_image from "assets/images/default_image.png";
import { useDrawer } from "hooks/useDrawer";
import ChangeOfficePassword from "components/ChangeOfficePassword";

const tapsFilter = [
  {
    key: "ALL",
    label: `View All`,
    icon: <ViewAllSVG />,
  },
  {
    key: "LEAD",
    label: `Lead`,
    icon: <ProspectsSVG />,
  },
  {
    key: "REGISTERED",
    label: `Registered`,
    icon: <QualitySVG />,
  },
  {
    key: "CLIENTS",
    label: `Clients`,
    icon: <ClientsSVG />,
  },
];

const itemRender = (_, type, originalElement) => {
  if (type === "prev") {
    return (
      <Button size="small" type="default">
        <BackArrow color={"#344054"} />
      </Button>
    );
  }
  if (type === "next") {
    return (
      <Button size="small" type="default">
        <ArrowRightSVG color={"#344054"} />
      </Button>
    );
  }

  if (type === "page") {
    return (
      <Button size="small" type="default">
        {originalElement}
      </Button>
    );
  }

  return originalElement;
};

const Suppliers = () => {
  const [selectedTab, setSelectedTab] = useState("ALL");
  usePageTitle("Suppliers / " + selectedTab);

  const DrawerAPI = useDrawer();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // filters
  const [form] = Form.useForm();
  const filters = Form.useWatch("filters", form);
  const debounceFilters = useDebounce(filters);

  // queries
  const officesQuery = useGetOffices({
    page,
    size: pageSize,
    type: OFFICER_TYPE.SUPPLIER,
    ...{
      ...debounceFilters,
      lastLoginBefore: debounceFilters?.loginRange?.[1]?.format("YYYY-MM-DD"),
      lastLoginAfter: debounceFilters?.loginRange?.[0]?.format("YYYY-MM-DD"),
      loginRange: undefined,
      level: selectedTab === "ALL" ? undefined : selectedTab,
    },
  });

  const deleteOfficeByIdMutation = useDeleteOfficeById({
    onSuccess: (_, id) => {
      queryClient.setQueryData(officesQuery.key, (oldData) => {
        console.log(oldData);
        return {
          data: oldData.data.filter((el) => el.id !== id),
          totalCount: oldData.totalCount - 1,
          totalPages: Math.ceil((oldData.totalCount - 1) / pageSize),
        };
      });
      message.success("Office deleted successfully");
    },
    onError: (error) => {
      console.log(error);
      message.error("Something went wrong");
    },
  });

  return (
    <div className="suppliers_page">
      {DrawerAPI.Render}
      <Tabs
        onChange={(value) => setSelectedTab(value)} // Handle tab changes
        activeKey={selectedTab} // Track the currently active tab
        items={tapsFilter.map((el) => ({
          key: el.key,
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              {el.icon} {/* Render the icon */}
              <span style={{ marginLeft: 8 }}>{el.label}</span> {/* Render the label */}
            </div>
          ),
          children: <></>, // Render the page content for each tab
        }))}
        style={{ width: "100%" }} // Ensure full width of the container
      />
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              cellHeight: 18,
              cellWidth: 28,
            },
          },
        }}>
        <Form form={form}>
          <Row gutter={[12, 12]}>
            <Col lg={7}>
              <Form.Item name={["filters", "generalSearchValue"]}>
                <Input
                  type="search"
                  className="w-100"
                  prefix={<SearchSVG color="#3F65E4" />}
                  placeholder="Search name, email, phone"
                />
              </Form.Item>
            </Col>
            <Col lg={14}>
              <Row gutter={[12, 12]}>
                <Col lg={12}>
                  <Form.Item name={["filters", "loginRange"]}>
                    <DatePicker.RangePicker
                      className="w-100"
                      placeholder="Select Date"
                      suffixIcon={<DateSVG color="#3F65E4" width={16} height={16} />}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12}>
                  <div className="select-with-prefix">
                    <WorldMapSVG
                      className="select-prefix-icon"
                      fill="#3F65E4"
                      width={16}
                      height={16}
                    />
                    <Form.Item noStyle name={["filters", "supplierOf"]} className="w-100">
                      <Select
                        allowClear
                        showSearch
                        className="custom-select w-100"
                        placeholder="supplier of"
                        suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                        options={[
                          { label: "Hotels", value: "HOTELS" },
                          { label: "Flights", value: "FLIGHTS" },
                          { label: "Experiences", value: "EXPERIENCES" },
                          { label: "Transfers", value: "TRANSFERS" },
                          { label: "All", value: null },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={3}>
              <div
                className="w-100"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Divider type="vertical" />
                <Button
                  onClick={() => {
                    DrawerAPI.setDrawerContent(
                      <AddSupplier onEnd={() => officesQuery.refetch()} DrawerAPI={DrawerAPI} />,
                    );
                    DrawerAPI.open("calc(100% - 110px)");
                  }}
                  icon={<PluseSVG color="#fff" />}
                  type="primary">
                  New
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
      <CustomTable
        tableLayout="auto"
        locale={{
          emptyText: (
            <Empty
              description={
                <div className="fz-12 fw-400">
                  <p>No suppliers added unteil now</p>
                  <p>
                    to add new supplier{" "}
                    <span
                      style={{ color: "#2d5feb", cursor: "pointer" }}
                      onClick={() => {
                        DrawerAPI.setDrawerContent(
                          <AddSupplier
                            onEnd={() => officesQuery.refetch()}
                            DrawerAPI={DrawerAPI}
                          />,
                        );
                        DrawerAPI.open("calc(100% - 110px)");
                      }}>
                      click here
                    </span>
                  </p>
                </div>
              }
            />
          ),
        }}
        dataSource={officesQuery?.data?.data.map((el, index) => ({ ...el, key: index }))}
        loading={officesQuery.isLoading}
        pagination={false}
        total={officesQuery?.data?.totalCount}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        columns={[
          {
            title: <p className="xs_text_medium">Company Name</p>,
            dataIndex: "companyName",
            render: (name, rowData) => (
              <div
                className="company_name_cell"
                onClick={() => {
                  DrawerAPI.setDrawerContent(
                    <TravelOfficeView officerId={rowData.id} DrawerAPI={DrawerAPI} />,
                  );
                  DrawerAPI.open("calc(100% - 80px)");
                }}>
                <Image
                  preview={false}
                  src={rowData.logo || default_image}
                  width={40}
                  height={40}
                  alt={name + " logo"}
                  style={{ borderRadius: "4px" }}
                />
                <div>
                  <Tooltip title={name}>
                    <p className="xs_text_medium" style={{ color: "#000" }}>
                      {name}
                    </p>
                  </Tooltip>
                  <Tooltip title={rowData.address}>
                    <p className="xs_text_medium" style={{ color: "#475467" }}>
                      {rowData.address}
                    </p>
                  </Tooltip>
                </div>
              </div>
            ),
          },
          {
            title: <p className="xs_text_medium">Account Manager</p>,
            dataIndex: "fullName",
            render: (fullName) => (
              <Typography.Paragraph
                ellipsis={{ tooltip: fullName }}
                className="xs_text_regular"
                style={{ minWidth: "102px" }}>
                {fullName}
              </Typography.Paragraph>
            ),
          },
          {
            width: "16%",
            title: <p className="xs_text_medium">Contact</p>,
            dataIndex: "email",
            render: (email, rowData) => (
              <div>
                {email && (
                  <div className="supplier_info_line_with_icon">
                    <EmailSVG fill={"#1D2939"} />
                    <Tooltip title={email}>
                      <Typography.Text ellipsis className="xs_text_regular">
                        {email}
                      </Typography.Text>
                    </Tooltip>
                  </div>
                )}
                {rowData?.phone && (
                  <div className="supplier_info_line_with_icon">
                    <PhoneSVG fill={"#1D2939"} />
                    <Tooltip title={rowData?.phone}>
                      <Typography.Text ellipsis className="xs_text_regular">
                        {rowData?.phone}
                      </Typography.Text>
                    </Tooltip>
                  </div>
                )}
                {rowData?.whatsapp && (
                  <div className="supplier_info_line_with_icon">
                    <WhatsappSVG fill={"#1D2939"} />
                    <Tooltip title={rowData?.whatsapp}>
                      <Typography.Text ellipsis className="xs_text_regular">
                        {rowData?.whatsapp}
                      </Typography.Text>
                    </Tooltip>
                  </div>
                )}
              </div>
            ),
          },
          {
            title: <p className="xs_text_medium">Supplier of</p>,
            dataIndex: "supplierOf",
            render: (supplierOf) => (
              <div className="d-flex" style={{ maxWidth: "300px", gap: "6px", flexWrap: "wrap" }}>
                {supplierOf?.map((el) => (
                  <Tag
                    color={
                      el === "HOTELS"
                        ? "#2D6ADB"
                        : el === "FLIGHTS"
                        ? "#007BFF" // Sky Blue for FLIGHTS
                        : el === "EXPERIENCES"
                        ? "#28A745" // Green for EXPERIENCES
                        : "#D77E00" // Default color (Amber)
                    }
                    key={el}
                    style={{ margin: "0" }}>
                    {el}
                  </Tag>
                ))}
              </div>
            ),
          },
          {
            title: <p className="xs_text_medium">Last login</p>,
            dataIndex: "lastLogin",
            render: (lastLogin) => (
              <Typography.Paragraph
                ellipsis={{
                  tooltip: lastLogin
                    ? dayjs(lastLogin).format("YYYY/MM/DD hh:mm")
                    : "Never logged in",
                }}
                className="xs_text_regular">
                {lastLogin ? dayjs(lastLogin).format("YYYY/MM/DD hh:mm") : "Never logged in"}
              </Typography.Paragraph>
            ),
          },
          {
            title: <p className="xs_text_medium">Actions</p>,
            dataIndex: "id",
            render: (id) => (
              <Space>
                <ChangeOfficePassword officeId={id} />
                <Tooltip title={"Delete"}>
                  <Button
                    type="primary"
                    className="table_action_button"
                    danger
                    onClick={() => {
                      Modal.confirm({
                        title: "Do you want to delete this supplier?",
                        content: <p className="gc">This action is irreversible and cannot be undone.</p>,
                        centered: true,
                        okText: "Delete",
                        okType: "danger",
                        okButtonProps: {
                          type: "primary",
                        },
                        cancelText: "Cancel",
                        onOk() {
                          return deleteOfficeByIdMutation.mutateAsync(id);
                        },
                      });
                    }}
                    icon={<DeleteSVG color={"#fff"} />}
                  />
                </Tooltip>
                <Tooltip title={"Edit"}>
                  <Button
                    type="primary"
                    className="table_action_button"
                    onClick={() => {
                      DrawerAPI.setDrawerContent(
                        <AddSupplier
                          id={id}
                          onEnd={() => officesQuery.refetch()}
                          DrawerAPI={DrawerAPI}
                        />,
                      );
                      DrawerAPI.open("calc(100% - 110px)");
                    }}
                    icon={<EditSVG color={"#fff"} />}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
      />
      {officesQuery?.data?.totalCount > 0 && (
        <Space split={<Divider type="horizontal" />} align="baseline">
          {officesQuery?.data?.totalPages > 1 && (
            <p className="xs_text_medium">
              Showing {page === 1 ? 1 : (page - 1) * pageSize + 1} to{" "}
              {page * pageSize > officesQuery?.data?.totalCount
                ? officesQuery?.data?.totalCount
                : page * pageSize}{" "}
              of {officesQuery?.data?.totalCount} entries
            </p>
          )}
          <Pagination
            current={page}
            pageSize={pageSize}
            onChange={setPage}
            hideOnSinglePage={true}
            onShowSizeChange={(current, size) => {
              const newTotalPages = Math.ceil(officesQuery?.data?.totalCount / size);
              const newPage = page > newTotalPages ? newTotalPages : page;

              setPageSize(size);
              setPage(newPage);
            }}
            total={officesQuery?.data?.totalCount}
            style={{ marginTop: "0.5rem" }}
            itemRender={itemRender}
            simple
          />
        </Space>
      )}
    </div>
  );
};

export default Suppliers;
