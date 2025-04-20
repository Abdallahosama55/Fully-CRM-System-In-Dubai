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
  Row,
  Select,
  Space,
  Tabs,
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
import AddAgencie from "./AddAgencie";
import useGetOffices from "services/agencies/Queries/useGetOffices";
import { OFFICER_TYPE } from "constants/BUYER_GROUB";
import {
  ArrowDownSVG,
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
import useListBuyerGroub from "services/pricingModule/Queries/useListBuyerGroub";
import CustomTable from "components/CustomTable";
import TravelOfficeView from "components/TravelOfficeView";
import default_image from "assets/images/default_image.png";
import { useDrawer } from "hooks/useDrawer";
import formatNumber from "utils/formatNumber";
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

const Agencies = () => {
  const [selectedTab, setSelectedTab] = useState("ALL");
  usePageTitle(`Agencies / ${selectedTab}`);

  const DrawerAPI = useDrawer();
  const [page, setPage] = useState(1);
  // filters
  const [form] = Form.useForm();
  const filters = Form.useWatch("filters", form);
  const debounceFilters = useDebounce(filters);
  // queries
  const buyerGroupsList = useListBuyerGroub();

  const officesQuery = useGetOffices({
    page,
    size: 10,
    type: OFFICER_TYPE.AGENT,
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
        return {
          data: oldData.data.filter((el) => el.id !== id),
          totalCount: oldData.totalCount - 1,
          totalPages: Math.ceil((oldData.totalCount - 1) / 10),
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
    <div className="agencies_page">
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
                    <Form.Item noStyle name={["filters", "buyerGroupId"]} className="w-100">
                      <Select
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          option?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                        }
                        className="custom-select w-100"
                        placeholder="buyer groups"
                        suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                        options={buyerGroupsList?.data?.map((el) => ({
                          label: el?.name,
                          value: el.id,
                        }))}
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
                      <AddAgencie onEnd={() => officesQuery.refetch()} DrawerAPI={DrawerAPI} />,
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
        total={officesQuery?.data?.totalCount}
        tableLayout="auto"
        page={page}
        pageSize={10}
        setPage={setPage}
        locale={{
          emptyText: (
            <Empty
              description={
                <div className="fz-12 fw-400">
                  <p>No agencies added unteil now</p>
                  <p>
                    to add new agency{" "}
                    <span
                      style={{ color: "#2d5feb", cursor: "pointer" }}
                      onClick={() => {
                        DrawerAPI.setDrawerContent(
                          <AddAgencie onEnd={() => officesQuery.refetch()} DrawerAPI={DrawerAPI} />,
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
                  src={rowData.logo || default_image}
                  width={40}
                  height={40}
                  alt={name + " logo"}
                  preview={false}
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
                style={{ minWidth: "130px" }}>
                {fullName}
              </Typography.Paragraph>
            ),
          },
          {
            title: <p className="xs_text_medium">Contact</p>,
            dataIndex: "email",
            render: (email, rowData) => (
              <div style={{ minWidth: "150px" }}>
                {email && (
                  <div className="agencies_info_line_with_icon">
                    <EmailSVG fill={"#1D2939"} />
                    <Tooltip title={email}>
                      <Typography.Text ellipsis className="xs_text_regular">
                        {email}
                      </Typography.Text>
                    </Tooltip>
                  </div>
                )}
                {rowData?.phone && (
                  <div className="agencies_info_line_with_icon">
                    <PhoneSVG fill={"#1D2939"} />
                    <Tooltip title={rowData?.phone}>
                      <Typography.Text ellipsis className="xs_text_regular">
                        {rowData?.phone}
                      </Typography.Text>
                    </Tooltip>
                  </div>
                )}
                {rowData?.whatsapp && (
                  <div className="agencies_info_line_with_icon">
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
            width: "12%",
            title: <p className="xs_text_medium">Group</p>,
            dataIndex: "buyerGroupId",
            render: (buyerGroupId) => (
              <Typography.Paragraph
                className="xs_text_medium"
                ellipsis={{
                  tooltip: buyerGroupsList?.data?.find((el) => el.id === buyerGroupId)?.name,
                }}>
                {buyerGroupsList?.data?.find((el) => el.id === buyerGroupId)?.name}
              </Typography.Paragraph>
            ),
          },
          {
            title: <p className="xs_text_medium">Balance</p>,
            dataIndex: "balance",
            render: (balance) => (
              <Typography.Paragraph
                ellipsis={{ tooltip: balance }}
                className="xs_text_regular"
                style={{ minWidth: "60px" }}>
                {formatNumber(balance)}
              </Typography.Paragraph>
            ),
          },
          {
            title: <p className="xs_text_medium">Limit</p>,
            dataIndex: "creditLineLimitValue",
            render: (creditLineLimitValue) => (
              <Typography.Paragraph
                ellipsis={{ tooltip: creditLineLimitValue }}
                className="xs_text_regular"
                style={{ minWidth: "70px" }}>
                {creditLineLimitValue ? formatNumber(creditLineLimitValue) : "-"}
              </Typography.Paragraph>
            ),
          },
          {
            title: <p className="xs_text_medium">Remaining Limit</p>,
            dataIndex: "creditLineLimitRemainingValue",
            render: (creditLineLimitRemainingValue) => (
              <Typography.Paragraph
                ellipsis={{ tooltip: creditLineLimitRemainingValue }}
                className="xs_text_regular"
                style={{ minWidth: "110px" }}>
                {creditLineLimitRemainingValue ? formatNumber(creditLineLimitRemainingValue) : "-"}
              </Typography.Paragraph>
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
                    size="small"
                    icon={<DeleteSVG color={"#fff"} />}
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
                  />
                </Tooltip>
                <Tooltip title={"Edit"}>
                  <Button
                    type="primary"
                    size="small"
                    className="table_action_button"
                    icon={<EditSVG color={"#fff"} />}
                    onClick={() => {
                      DrawerAPI.setDrawerContent(
                        <AddAgencie
                          id={id}
                          onEnd={() => officesQuery.refetch()}
                          DrawerAPI={DrawerAPI}
                        />,
                      );
                      DrawerAPI.open("calc(100% - 110px)");
                    }}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Agencies;
