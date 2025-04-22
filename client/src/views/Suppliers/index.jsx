import React, { useState } from "react";
import {
  Badge,
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
  DeleteSVG,
  EditSVG,
  EmailSVG,
  PhoneSVG,
  StatusSuppliersSVG,
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
import { EyeOutlined } from "@ant-design/icons";
import useActivateOffice from "services/agencies/Mutations/useActivateOfficer";

const tapsFilter = [
  {
    key: "ALL",
    label: `View All`,
  },
  {
    key: "LEAD",
    label: `Lead`,
  },
  {
    key: "REGISTERED",
    label: `Registered`,
  },
  {
    key: "CLIENTS",
    label: `Clients`,
  },
  {
    key: "NEWREQUESTE",
    label: `New Requests`,
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
  const [formModal] = Form.useForm();
  const [selectedTab, setSelectedTab] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modulData, setModulData] = useState(null);

  usePageTitle("Suppliers / " + selectedTab);

  const DrawerAPI = useDrawer();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // filters
  const [form] = Form.useForm();
  const filters = Form.useWatch("filters", form);
  const debounceFilters = useDebounce(filters);

  // queries

  const activateOffice = useActivateOffice();

  const officesQuery = useGetOffices({
    page,
    size: pageSize,
    type: OFFICER_TYPE.SUPPLIER,
    ...{
      generalSearchValue: debounceFilters?.generalSearchValue,
      supplierOf: selectedTab === "NEWREQUESTE" ? undefined : debounceFilters?.supplierOf,
      status: selectedTab === "NEWREQUESTE" ? "PENDING" : debounceFilters?.status,
      lastLoginBefore: selectedTab === "NEWREQUESTE" ? undefined : debounceFilters?.lastLoginBefore,
      lastLoginAfter: selectedTab === "NEWREQUESTE" ? undefined : debounceFilters?.lastLoginAfter,
      lastLoginBefore: debounceFilters?.loginRange?.[1]?.format("YYYY-MM-DD"),
      lastLoginAfter: debounceFilters?.loginRange?.[0]?.format("YYYY-MM-DD"),
      loginRange: undefined,
      level: selectedTab === "ALL" || selectedTab === "NEWREQUESTE" ? undefined : selectedTab,
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
  const showModal = (data) => {
    setIsModalOpen(true);
    setModulData(data);
  };

  const handleOk = async () => {
    await activateOffice.mutateAsync({ id: modulData.id, data: { ...formModal.getFieldValue() } });
    officesQuery.refetch();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="suppliers_page">
      {DrawerAPI.Render}
      <Tabs
        className="suppliers-page-tab"
        onChange={(value) => setSelectedTab(value)} // Handle tab changes
        activeKey={selectedTab} // Track the currently active tab
        items={tapsFilter.map((el) => ({
          key: el.key,
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ marginLeft: 8 }}>{el.label}</span> {/* Render the label */}
              {el.key === "NEWREQUESTE" && officesQuery.data?.pendingRequestsCount > 0 && (
                <Badge
                  className="bades"
                  status={selectedTab === "NEWREQUESTE" ? "default" : "error"}
                  count={officesQuery.data?.pendingRequestsCount}
                />
              )}
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
            <Col lg={selectedTab === "NEWREQUESTE" ? 24 : 7}>
              <Form.Item name={["filters", "generalSearchValue"]}>
                <Input
                  type="search"
                  className="w-100"
                  prefix={<SearchSVG color="#3F65E4" />}
                  placeholder="Search name, email, phone"
                />
              </Form.Item>
            </Col>
            {selectedTab !== "NEWREQUESTE" && (
              <>
                <Col lg={14}>
                  <Row gutter={[12, 12]}>
                    <Col lg={8}>
                      <Form.Item name={["filters", "loginRange"]}>
                        <DatePicker.RangePicker
                          className="w-100"
                          placeholder="Select Date"
                          suffixIcon={<DateSVG color="#3F65E4" width={16} height={16} />}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
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
                    <Col lg={8}>
                      <div className="select-with-prefix">
                        <StatusSuppliersSVG className="select-prefix-icon" color={"#3F65E4"} />
                        <Form.Item noStyle name={["filters", "status"]} className="w-100">
                          <Select
                            allowClear
                            showSearch
                            className="custom-select w-100"
                            placeholder="Status"
                            options={[
                              { label: "All", value: "ALL" },
                              { label: "Active", value: "ACTIVE" },
                              { label: "Inactive", value: "INACTIVE" },
                              { label: "Pending", value: "PENDING" },
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        DrawerAPI.setDrawerContent(
                          <AddSupplier
                            onEnd={() => officesQuery.refetch()}
                            DrawerAPI={DrawerAPI}
                          />,
                        );
                        DrawerAPI.open("calc(100% - 110px)");
                      }}
                      icon={<PluseSVG color="#fff" />}
                      type="primary">
                      New
                    </Button>
                  </div>
                </Col>
              </>
            )}
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
            title: <p className="xs_text_medium">Status</p>,
            dataIndex: "status",
            onCell: () => ({ style: { verticalAlign: "middle", textAlign: "center" } }),
            render: (status) => {
              const style = {
                ACTIVE: {
                  backGround: "#A6F4C5",
                  color: "#027A48",
                },
                INACTIVE: {
                  backGround: "#FECDCA",
                  color: "#B42318",
                },
                PENDING: {
                  backGround: "#FFEFCC",
                  color: "#F49B19",
                },
              };
              return (
                <Typography.Paragraph>
                  <span
                    style={{
                      backgroundColor: style[status].backGround,
                      color: style[status].color,
                      padding: "2px 27px",
                      borderRadius: "15px",
                      whiteSpace: "nowrap",
                    }}>
                    {status.charAt(0) + status.substring(1).toLowerCase()}
                  </span>
                </Typography.Paragraph>
              );
            },
          },
          {
            title: <p className="xs_text_medium">Actions</p>,
            dataIndex: "id",
            render: (id, data) => (
              <Space>
                {selectedTab === "NEWREQUESTE" ? (
                  <Tooltip title="active">
                    <Button
                      type="primary"
                      onClick={() => showModal(data)}
                      className="table_action_button"
                      style={{ background: "#ddd" }}
                      icon={<EyeOutlined />}
                    />
                  </Tooltip>
                ) : (
                  <ChangeOfficePassword officeId={id} />
                )}

                <Tooltip title={"Delete"}>
                  <Button
                    type="primary"
                    className="table_action_button"
                    danger
                    onClick={() => {
                      Modal.confirm({
                        title: "Do you want to delete this supplier?",
                        content: (
                          <p className="gc">This action is irreversible and cannot be undone.</p>
                        ),
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
      <Modal
        title="Confirm the Supplier Request"
        centered
        open={isModalOpen}
        destroyOnClose={true}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm">
        <Form
          form={formModal}
          layout="vertical"
          initialValues={{
            supplierOf: modulData?.supplierOf,
          }}>
          <Form.Item
            rules={[{ required: true }]}
            label={<p className="sm_text_medium">supplier Of</p>}
            name={"supplierOf"}
            className="w-100">
            <Select
              allowClear
              showSearch
              mode="multiple"
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
        </Form>
      </Modal>
    </div>
  );
};

export default Suppliers;
