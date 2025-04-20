import { Table, Typography, Row, Col, Select, Form, Button } from "antd";
import { useMemo, useState } from "react";
import renderColumns from "./renderColumns";
import SelectionTagRender from "components/Studio/GoLive/components/CustomersSelectionTable/SelectionTagRender";
import SendEmailModal from "components/SendEmailModal";
import { EmailSVG } from "assets/jsx-svg";
import useGetCustomersMini from "services/Customers/Querys/useGetCustomersMini";

const CustomerTable = ({
  isPending,
  count,
  rows,
  page,
  pageSize,
  onPageChange,
  filterParams,
  onOpenCustomerModal,
  onRefetchData,
  confirmationModal,
  onSelectionChange,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const { data: allCustomersMini, isPending: isCustomersMiniPending } = useGetCustomersMini(
    { ...filterParams },
    {
      select: (data) => {
        return data?.data?.data?.data;
      },
    },
  );

  const columns = useMemo(() => {
    return renderColumns(onOpenCustomerModal, onRefetchData, confirmationModal);
  }, [onOpenCustomerModal, onRefetchData, confirmationModal]);

  const onSelect = (newSelection, selected) => {
    if (selected) {
      handleSelectCustomer(newSelection);
    } else {
      handleDeselectCustomer(newSelection);
    }
  };

  const onSelectAll = (isSelectAll) => {
    if (isSelectAll) {
      handleSelectCustomers(allCustomersMini);
    } else {
      handleDeselectCustomers(allCustomersMini);
    }
  };

  const handleDeselectCustomer = (customer) => {
    const filteredSelectedRows = selectedRows.filter((row) => row.id !== customer.id);
    const filteredSelectedRowKeys = selectedRowKeys.filter((key) => key != customer.id);

    setSelectedRows(filteredSelectedRows);
    setSelectedRowKeys(filteredSelectedRowKeys);
    onSelectionChange?.(filteredSelectedRows);
  };

  const handleDeselectCustomers = (customers) => {
    const selectedRowsMap = selectedRows.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    customers?.forEach((customer) => {
      delete selectedRowsMap[customer?.id];
    });

    setSelectedRows(Object.values(selectedRowsMap));
    setSelectedRowKeys(Object.keys(selectedRowsMap));
    onSelectionChange?.(Object.values(selectedRowsMap));
  };

  const handleClearCustomers = () => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
    onSelectionChange?.([]);
  };

  const handleOpenSendEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const handleSelectCustomer = (customer) => {
    const newSelectedRowKeys = new Set([...selectedRowKeys, customer.id]);
    const newSelectedRows = selectedRows.slice();
    if (!selectedRows.find((row) => row.id == customer.id)) {
      newSelectedRows.push(customer);
    }
    setSelectedRows(newSelectedRows);
    setSelectedRowKeys(Array.from(newSelectedRowKeys));
    onSelectionChange && onSelectionChange?.(newSelectedRows);
  };

  const handleSelectCustomers = (customers) => {
    const selectionMap = [...customers, ...selectedRows].reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr }),
      {},
    );
    const newSelectedRowKeys = Object.keys(selectionMap).map((id) => +id);
    const newSelectedRows = Object.values(selectionMap);

    setSelectedRows(newSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
    onSelectionChange?.(newSelectedRows);
  };

  const selectionOptions = useMemo(
    () => selectedRows.map((row) => ({ label: row.fullName, key: row.id, value: row })),
    [selectedRows],
  );

  return (
    <>
      {selectionOptions?.length ? (
        <Row style={{ marginBottom: 16 }} className="d-flex align-center">
          <Col flex={1}>
            <Form layout="vertical">
              <Form.Item label={`Selected (${selectedRowKeys.length})`}>
                <Select
                  optionLabelProp="fullName"
                  loading={isCustomersMiniPending}
                  variant="borderless"
                  allowClear
                  maxTagCount={6}
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Select participants"
                  value={selectionOptions}
                  options={selectionOptions ?? []}
                  showSearch={false}
                  popupClassName="d-none"
                  suffixIcon
                  optionRender={() => null}
                  dropdownRender={() => null}
                  searchValue=""
                  tagRender={SelectionTagRender}
                  onClear={handleClearCustomers}
                  onDeselect={handleDeselectCustomer}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col>
            <Button
              type="primary"
              className="d-flex align-center"
              icon={<EmailSVG color="white" />}
              disabled={isCustomersMiniPending}
              onClick={handleOpenSendEmailModal}>
              Send Email
            </Button>
            <SendEmailModal
              isOpen={isEmailModalOpen}
              onClose={() => setIsEmailModalOpen(false)}
              selectedCustomers={selectionOptions}
              onEmailSent={() => setIsEmailModalOpen(false)}
            />
          </Col>
        </Row>
      ) : null}
      <Table
        loading={isPending}
        scroll={{ x: 700, y: "calc(100dvh - 290px)" }}
        rowKey={"id"}
        bordered={true}
        className="customers-table"
        pagination={{
          pageSize: pageSize,
          showSizeChanger: false,
          total: count,
          current: page,
          onChange: onPageChange,
          defaultCurrent: page,
        }}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onSelect,
          onSelectAll,
        }}
        dataSource={rows ?? []}
        locale={{ emptyText: "No customers yet" }}
        columns={columns}
      />
    </>
  );
};

export default CustomerTable;
