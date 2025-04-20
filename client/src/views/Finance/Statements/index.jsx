import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Empty,
  Flex,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import {
  DateSVG,
  DeleteSVG,
  EmailSVG,
  PhoneSVG,
  PluseSVG,
  StatusSVG,
  WhatsappSVG,
} from "assets/jsx-svg";
import CustomTable from "components/CustomTable";
import { OFFICER_TYPE } from "constants/BUYER_GROUB";
import ROUTER_URLS from "constants/ROUTER_URLS";
import STATEMENTS_STATUS from "constants/STATEMENTS_STATUS";
import usePageTitle from "hooks/usePageTitle";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetBuyerGroups from "services/pricingModule/buyerGroup/Queries/useGetBuyerGroups";
import NewStatement from "./NewStatement";
import dayjs from "dayjs";
import useGetStatements from "services/agencies/Statements/Queries/useGetStatements";
// style
import "./styles.css";
import useAddCreditLineLimit from "services/agencies/Statements/Mutations/useAddCreditLineLimit";
import useGetCreditLineLimit from "services/agencies/Statements/Queries/useGetCreditLineLimit";
import useUpdateStatementStatus from "services/agencies/Statements/Mutations/useUpdateStatementStatus";
import useAddReverseStatment from "services/agencies/Statements/Mutations/useAddReverseStatment";
import { useDebounce } from "hooks/useDebounce";
import AnimatedNumber from "components/common/AnimatedNumber";
import default_image from "assets/images/default_image.png";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";
import Badge from "components/common/Badge";
import { useDrawer } from "hooks/useDrawer";
import useGetAgentStatements from "services/agencies/Statements/Queries/useGetAgentStatements";
import useGetSupplierStatements from "services/agencies/Statements/Queries/useGetSupplierStatements";

const Statements = ({ officerId, officeType }) => {
  const { pathname } = useLocation();
  const [form] = useForm();
  const filters = useWatch("filters", form);
  const filtersDebounce = useDebounce(filters, 300);
  const { user } = useUserContext();
  const isAgent = useMemo(() => user?.officerType === OFFICER_TYPES.AGENT, [user.officerType]);
  const isSupplier = useMemo(
    () => user?.officerType === OFFICER_TYPES.SUPPLIER,
    [user.officerType],
  );
  const isDMC = useMemo(() => user?.officerType === OFFICER_TYPES.DMC, [user.officerType]);

  const DrawerAPI = useDrawer();
  const { setPageTitle } = usePageTitle();
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isNewStatementsPage, setIsNewStatements] = useState(false);
  const [modalProps, setModalProps] = useState(undefined);
  // for update status modal
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  // for delete statment modal
  const [isDeleteStatmentOpen, setIsDeleteStatmentOpen] = useState(false);
  // for credit line limit
  const [visible, setVisible] = useState(false);
  const [isCreditLineLimit, setIsCreditLineLimit] = useState(false);
  const [creditLineLimit, setCreditLineLimit] = useState(0);
  const [error, setError] = useState(false);

  const handleSwitchChange = (checked) => {
    setVisible(checked);
    setIsCreditLineLimit(checked);

    if (!checked) {
      addCreditLineLimit.mutate({
        officeId: officerId,
        creditLineLimit: false,
      });
    }
  };

  const isFullPage = useMemo(
    () => pathname.toLowerCase() === ROUTER_URLS.FINANCE.STATEMENTS.INDEX.toLowerCase(),
    [pathname],
  );
  // QUERIES
  const buyerGroups = useGetBuyerGroups();

  const allStatments = useGetStatements(
    {
      ...filtersDebounce,
      fromDate: filtersDebounce?.dateRange && filtersDebounce?.dateRange?.[0]?.format("YYYY-MM-DD"),
      toDate: filtersDebounce?.dateRange && filtersDebounce?.dateRange?.[1]?.format("YYYY-MM-DD"),
      dateRange: undefined,
      officerId,
      page,
      size: pageSize,
    },
    { enabled: isDMC && isFullPage },
  );

  const agentsStatments = useGetAgentStatements(
    {
      ...filtersDebounce,
      fromDate: filtersDebounce?.dateRange && filtersDebounce?.dateRange?.[0]?.format("YYYY-MM-DD"),
      toDate: filtersDebounce?.dateRange && filtersDebounce?.dateRange?.[1]?.format("YYYY-MM-DD"),
      dateRange: undefined,
      officerId,
      page,
      size: pageSize,
    },
    { enabled: (isAgent && isFullPage) || officeType === OFFICER_TYPE.AGENT },
  );

  const supplierStatments = useGetSupplierStatements(
    {
      ...filtersDebounce,
      fromDate: filtersDebounce?.dateRange && filtersDebounce?.dateRange?.[0]?.format("YYYY-MM-DD"),
      toDate: filtersDebounce?.dateRange && filtersDebounce?.dateRange?.[1]?.format("YYYY-MM-DD"),
      dateRange: undefined,
      officerId,
      page,
      size: pageSize,
    },
    { enabled: (isSupplier && isFullPage) || officeType === OFFICER_TYPE.SUPPLIER },
  );

  const statments =
    isDMC && isFullPage
      ? allStatments
      : isSupplier || officeType === OFFICER_TYPE.SUPPLIER
      ? supplierStatments
      : agentsStatments;
  console.log({ statments: statments?.data });
  const creditLineLimitQuery = useGetCreditLineLimit(officerId, { enabled: !!officerId });

  useEffect(() => {
    if (creditLineLimitQuery.data && creditLineLimitQuery.isSuccess) {
      setIsCreditLineLimit(creditLineLimitQuery?.data?.creditLineLimit || false);
      setCreditLineLimit(creditLineLimitQuery?.data?.creditLineLimitValue || 0);
    }
  }, [creditLineLimitQuery.isSuccess]);

  useEffect(() => {
    if (isFullPage) {
      setPageTitle("Statements");
    }
  }, [isFullPage]);

  // mutations
  const addCreditLineLimit = useAddCreditLineLimit({
    onSuccess: () => {
      message.success("Credit line limit updated successfully");
    },
    onError: (error) => {
      message.error("Something went wrong");
      console.log(error);
    },
  });

  const updateStatementStatus = useUpdateStatementStatus({
    onSuccess: () => {
      message.success("status updated successfully");
      statments.refetch();
    },
    onError: (error) => {
      message.error("Something went wrong");
      console.log(error);
    },
  });

  const addReverseStatment = useAddReverseStatment({
    onSuccess: () => {
      message.success("Reverse added statment successfully");
      statments.refetch();
    },
    onError: (error) => {
      message.error("Something went wrong");
      console.log(error);
    },
  });

  if (isNewStatementsPage) {
    return (
      <NewStatement
        officerId={officerId}
        isFullPage={isFullPage}
        isAgent={isAgent}
        back={() => {
          setIsNewStatements(false);
          statments.refetch();
        }}
      />
    );
  }

  return (
    <div>
      {DrawerAPI.Render}
      <Modal
        open={isUpdateStatusOpen}
        okText="Save"
        title={"Updat statement status"}
        onCancel={() => setIsUpdateStatusOpen(false)}
        onClose={() => {
          setModalProps(undefined);
          setIsUpdateStatusOpen(false);
        }}
        onOk={() => {
          console.log(modalProps);
          updateStatementStatus.mutate({ ...modalProps, officerId });
          setIsUpdateStatusOpen(false);
        }}>
        <div style={{ margin: "0.5rem 0" }}>
          <Select
            className="w-100"
            placeholder="Status"
            value={modalProps?.status}
            onChange={(value) => {
              setModalProps((prev) => ({ ...prev, status: value }));
            }}
            options={[
              { label: "Confirmed", value: STATEMENTS_STATUS.CONFIRMED },
              { label: "Canceled", value: STATEMENTS_STATUS.CANCELED },
            ]}
          />
        </div>
      </Modal>
      <Modal
        open={isDeleteStatmentOpen}
        okText="Delete"
        okButtonProps={{ danger: true }}
        title={"Delete statement"}
        onCancel={() => setIsDeleteStatmentOpen(false)}
        onClose={() => {
          setModalProps(undefined);
          setIsDeleteStatmentOpen(false);
        }}
        onOk={() => {
          addReverseStatment.mutate(modalProps);
          setIsDeleteStatmentOpen(false);
        }}>
        <div style={{ margin: "0.5rem 0" }}>
          <p className="fz-14 fw-500" style={{ marginBottom: "0.5rem" }}>
            Note that once a statment is added, it cannot be deleted. However, this will create a
            reversing statment to offset it. For example, if you added a balance of $1,000, you
            cannot delete this entry, but you can generate a reversal of -$1,000 to cancel out its
            effect.
          </p>
          <Input.TextArea
            rows={6}
            placeholder="delete comment"
            value={modalProps?.deleteComment}
            onChange={(e) =>
              setModalProps((prev) => ({ ...prev, deleteComment: e?.target?.value }))
            }
          />
        </div>
      </Modal>
      <ConfigProvider
        theme={{
          components: {
            Switch: {
              colorPrimary: "rgb(37,68,156)",
              colorPrimaryHover: "rgb(20,36,80)",
            },
            DatePicker: {
              cellHeight: 16,
              cellWidth: 24,
            },
          },
        }}>
        <Form form={form} style={{ marginBottom: "0.5rem" }}>
          <Row gutter={[8, 8]}>
            <Col lg={isFullPage ? 8 : officeType === OFFICER_TYPE.SUPPLIER ? 12 : 4}>
              {isFullPage ? (
                <Form.Item noStyle name={["filters", "name"]}>
                  <Input placeholder="Search name, email, phone" />
                </Form.Item>
              ) : (
                <Flex align="center" style={{ height: "100%" }}>
                  <p className="lg_text_medium">Statements</p>
                </Flex>
              )}
            </Col>
            <Col lg={isFullPage ? 16 : officeType === OFFICER_TYPE.SUPPLIER ? 12 : 20}>
              <Row gutter={[8, 8]}>
                <Col lg={isFullPage ? 8 : officeType === OFFICER_TYPE.SUPPLIER ? 18 : 9}>
                  <Form.Item noStyle name={["filters", "dateRange"]}>
                    <DatePicker.RangePicker
                      placeholder="Select Date"
                      suffixIcon={<DateSVG color={"#2D6ADB"} />}
                    />
                  </Form.Item>
                </Col>
                {isFullPage && (
                  <>
                    <Col lg={4}>
                      <Form.Item noStyle name={["filters", "groub"]}>
                        <Select
                          className="w-100"
                          placeholder="Group"
                          showSearch
                          allowClear
                          disabled={buyerGroups.isLoading}
                          options={buyerGroups?.data?.map((el) => ({
                            label: el?.name,
                            value: el?.id,
                          }))}
                        />
                      </Form.Item>
                    </Col>
                    {!isAgent && officeType !== OFFICER_TYPE.AGENT && (
                      <Col lg={4}>
                        <Form.Item noStyle name={["filters", "officeType"]}>
                          <Select
                            className="w-100"
                            placeholder="Type"
                            allowClear
                            options={[
                              { label: "Agent", value: OFFICER_TYPE.AGENT },
                              { label: "Supplier", value: OFFICER_TYPE.SUPPLIER },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    )}
                  </>
                )}
                <Col lg={!isFullPage && officeType === OFFICER_TYPE.SUPPLIER ? 6 : 4}>
                  <Form.Item noStyle name={["filters", "status"]}>
                    <Select
                      className="w-100"
                      placeholder="Status"
                      allowClear
                      options={[
                        { label: "Pending", value: STATEMENTS_STATUS.PENDING },
                        { label: "Confirmed", value: STATEMENTS_STATUS.CONFIRMED },
                        { label: "Canceled", value: STATEMENTS_STATUS.CANCELED },
                      ]}
                    />
                  </Form.Item>
                </Col>
                {!isFullPage && officeType !== OFFICER_TYPE.SUPPLIER && (
                  <Col lg={8}>
                    <div
                      style={{
                        padding: "10px 14px",
                        border: "1px solid #CFD5DE",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                        borderRadius: "8px",
                      }}>
                      <p className={"sm_text_medium"}>Credit Line Limit</p>
                      <Popconfirm
                        title="Credit Line Limit"
                        okText="Save"
                        onConfirm={() => {
                          if (!creditLineLimit || creditLineLimit <= 0) {
                            setError(true);
                            setVisible(true);
                            return;
                          } else {
                            setError(false);
                            addCreditLineLimit.mutate({
                              officeId: officerId,
                              creditLineLimit: true,
                              creditLineLimitValue: creditLineLimit,
                            });
                          }
                        }}
                        trigger={["focus", "hover", "click"]}
                        description={
                          <div style={{ width: "200px" }}>
                            <Input
                              type={"number"}
                              className="w-100"
                              placeholder="Credit Line Limit"
                              value={creditLineLimit}
                              status={error ? "error" : ""}
                              onChange={(e) => {
                                if (e.target.value && e.target.value > 0) {
                                  setCreditLineLimit(e.target.value);
                                }
                              }}
                            />
                            {error && (
                              <span className="fz-12 fw-400 w-100" style={{ color: "red" }}>
                                Enter credit line limit
                              </span>
                            )}
                          </div>
                        }
                        open={visible && isCreditLineLimit}
                        onOpenChange={(newVisible) => setVisible(newVisible)}>
                        <Switch
                          onChange={handleSwitchChange}
                          checked={isCreditLineLimit}
                          disabled={addCreditLineLimit?.isPending}
                        />
                      </Popconfirm>
                    </div>
                  </Col>
                )}
                {officeType !== OFFICER_TYPE.SUPPLIER && (
                  <Col
                    lg={!isAgent ? 3 : 8}
                    style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type={"primary"}
                      icon={isAgent ? undefined : <PluseSVG color={"#fff"} />}
                      onClick={() => {
                        if (isFullPage) {
                          DrawerAPI.setDrawerContent(
                            <NewStatement
                              DrawerAPI={DrawerAPI}
                              isAgent={isAgent}
                              isFullPage={isFullPage}
                              back={() => {
                                DrawerAPI.close();
                                statments.refetch();
                              }}
                            />,
                          );
                          DrawerAPI.open("30%");
                        } else {
                          setIsNewStatements(true);
                        }
                      }}>
                      {isAgent ? "Request" : "New"}
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
      <CustomTable
        loading={statments.isLoading}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        total={statments?.data?.count}
        bordered={true}
        columns={[
          !officerId && !isAgent
            ? {
                title: "Agency Name",
                dataIndex: "officer",
                key: "officer",
                width: "250px",
                fixed: "left",
                render: (_, rowData) => {
                  const officer = rowData?.officer || rowData?.agent || rowData?.supplier;
                  return (
                    <div className="company_name_cell" style={{ cursor: "pointer" }}>
                      <Image
                        src={officer?.logo || default_image}
                        width={40}
                        height={40}
                        alt={officer?.companyName + " logo"}
                        style={{ borderRadius: "4px" }}
                      />
                      <div>
                        <Tooltip title={officer?.companyName}>
                          <p className="xs_text_medium" style={{ color: "#000" }}>
                            {officer?.companyName}
                          </p>
                        </Tooltip>
                        <Tooltip title={officer?.address}>
                          <p className="xs_text_medium" style={{ color: "#475467" }}>
                            {officer?.address}
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                  );
                },
              }
            : {
                title: "Charged by",
                dataIndex: "account",
                key: "account",
                width: "120px",
                fixed: "left",
                render: (account) => (
                  <Typography.Paragraph ellipsis={{ rows: 2 }}>
                    {account?.fullName}
                  </Typography.Paragraph>
                ),
              },
          ,
          {
            title: "Time",
            dataIndex: "createdAt",
            render: (date) =>
              date ? (
                <div style={{ maxWidth: "120px" }}>
                  <p className="fz-12 fw-400" color={"#445568"}>
                    {dayjs(date).format("DD MMM, YYYY")}
                  </p>
                  <p className="fz-12 fw-400" color={"#445568"}>
                    {dayjs(date).format("hh:mm a")}
                  </p>
                </div>
              ) : (
                ""
              ),
            width: "120px",
          },
          {
            title: "Services",
            dataIndex: "service",
            key: "services",
            width: "100px",
            render: (transactiontype) => (
              <Typography.Paragraph
                ellipsis={{ rows: 2, tooltip: transactiontype?.replace("_", " ") }}
                className="capital_first_letter xs_text_semibold"
                style={{ color: "var(--vbooking-b700)" }}>
                {transactiontype ? transactiontype?.replace("_", " ") : ""}
              </Typography.Paragraph>
            ),
          },
          !isFullPage && {
            title: "Comment",
            dataIndex: "comments",
            key: "comments",
            width: "130px",
            render: (comments) => (
              <p className="capital_first_letter xs_text_regular">{comments}</p>
            ),
          },
          !officerId &&
            !isAgent && {
              title: "Contact",
              dataIndex: "officer",
              key: "officer",
              width: "220px",
              render: (_, rowData) => {
                const officer = rowData?.officer || rowData?.agent || rowData?.supplier;

                return (
                  <div>
                    {officer?.email && (
                      <div className="statement_info_line_with_icon">
                        <EmailSVG fill={"#1D2939"} />
                        <Tooltip title={officer?.email}>
                          <p className="xs_text_regular">{officer?.email}</p>
                        </Tooltip>
                      </div>
                    )}
                    {officer?.phone && (
                      <div className="statement_info_line_with_icon">
                        <PhoneSVG fill={"#1D2939"} />
                        <Tooltip title={officer?.phone}>
                          <p className="xs_text_regular">{officer?.phone}</p>
                        </Tooltip>
                      </div>
                    )}
                    {officer?.whatsapp && (
                      <div className="statement_info_line_with_icon">
                        <WhatsappSVG fill={"#1D2939"} />
                        <Tooltip title={officer?.whatsapp}>
                          <p className="xs_text_regular">{officer?.whatsapp}</p>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                );
              },
            },
          !officerId &&
            !isAgent && {
              title: "Charged by",
              dataIndex: "account",
              key: "account",
              width: "120px",
              fixed: "left",
              render: (account) => (
                <Typography.Paragraph ellipsis={{ rows: 2 }}>
                  {account?.fullName}
                </Typography.Paragraph>
              ),
            },
          {
            title: "Payment Status",
            dataIndex: "status",
            key: "status",
            width: "120px",
            render: (status) =>
              status ? (
                <Badge
                  status={
                    status === "CONFIRMED" ? "success" : status === "CANCELED" ? "error" : "primary"
                  }>
                  {status}
                </Badge>
              ) : (
                ""
              ),
          },
          !isSupplier &&
            officeType !== OFFICER_TYPE.SUPPLIER && {
              title: "Payments",
              dataIndex: "amount",
              key: "amount",
              width: "100px",
              render: (amount) => (
                <div>
                  <p
                    className="xs_text_semibold fw-600"
                    style={{ color: amount >= 0 ? "#009B4D" : "#ED0002" }}>
                    {amount || 0}
                  </p>
                  <p className="sm_text_regular">USD</p>
                </div>
              ),
            },
          {
            title: "Booking",
            dataIndex: "booking",
            key: "booking",
            width: "100px",
            render: (booking) => (
              <div>
                <p
                  className="xs_text_semibold  fw-600"
                  style={{ color: booking >= 0 ? "#009B4D" : "#ED0002" }}>
                  {booking}
                </p>
                <p className="sm_text_regular">USD</p>
              </div>
            ),
          },
          !isSupplier &&
            officeType !== OFFICER_TYPE.SUPPLIER && {
              title: "Balance",
              dataIndex: "balance",
              key: "balance",
              width: "100px",
              render: (balance, rowData) => (
                <div>
                  <p
                    className="xs_text_semibold  fw-600"
                    style={{
                      color: (balance || rowData?.officer?.balance) >= 0 ? "#009B4D" : "#ED0002",
                    }}>
                    {balance || rowData?.officer?.balance}
                  </p>
                  <p className="sm_text_regular">USD</p>
                </div>
              ),
            },
          {
            title: "Actions",
            dataIndex: "id",
            width: "100px",
            render: (id, rowData) =>
              rowData.service !== "reversal transaction" ? (
                <Space style={{ display: "flex", justifyContent: "center" }}>
                  {rowData?.status === STATEMENTS_STATUS.PENDING && isDMC && (
                    <Tooltip title="Update status">
                      <Button
                        className={"table_action_button"}
                        type={"primary"}
                        icon={<StatusSVG fill={"#fff"} />}
                        onClick={() => {
                          setModalProps({
                            id,
                            officerId: rowData?.agent?.id || rowData?.supplier?.id,
                            status: rowData?.status,
                          });
                          setIsUpdateStatusOpen(true);
                        }}
                      />
                    </Tooltip>
                  )}
                  {rowData.status === STATEMENTS_STATUS.CONFIRMED && (
                    <Tooltip title="Reverse">
                      <Button
                        className={"table_action_button"}
                        type={"primary"}
                        danger
                        icon={<DeleteSVG color={"#fff"} />}
                        onClick={() => {
                          setModalProps({
                            id,
                            officerId: rowData?.agent?.id || rowData?.supplier?.id,
                            status: rowData?.status,
                          });
                          setIsDeleteStatmentOpen(true);
                        }}
                      />
                    </Tooltip>
                  )}
                </Space>
              ) : (
                <></>
              ),
          },
        ]?.filter((el) => Boolean(el))}
        locale={{
          emptyText: <Empty />,
        }}
        dataSource={statments?.data?.rows}
        bottomContent={
          <Space size={10}>
            {!isSupplier && officeType !== OFFICER_TYPE.SUPPLIER && (
              <div>
                Payments:{" "}
                <span className="xs_text_semibold  fw-600" style={{ color: "#009B4D" }}>
                  {statments?.data?.totals?.totalAmount}
                </span>{" "}
                USD,
              </div>
            )}
            <div>
              Booking:{" "}
              <span className="xs_text_semibold  fw-600" style={{ color: "#009B4D" }}>
                {statments?.data?.totals?.totalBooking}
              </span>{" "}
              USD
            </div>
            {!isSupplier && officeType !== OFFICER_TYPE.SUPPLIER && (
              <div>
                ,Balance:{" "}
                <span
                  className="xs_text_semibold  fw-600"
                  style={{
                    color: statments?.data?.totals?.balance >= 0 ? "#009B4D" : "#ED0002",
                  }}>
                  {statments?.data?.totals?.balance}
                </span>{" "}
                USD
              </div>
            )}
          </Space>
        }
      />
    </div>
  );
};

export default Statements;
