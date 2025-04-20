import { Table, Typography, Row, Col, Select, Form } from "antd";
import { useMemo, useState } from "react";
import renderColumns from "./renderColumns";
import SelectionTagRender from "./SelectionTagRender";
import useGetCustomersMini from "services/Customers/Querys/useGetCustomersMini";

const CustomersSelectionTable = ({
  isPending,
  count,
  rows,
  page,
  filterParams,
  onPageChange,
  onSelectionChange,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const { data: allCustomersMini, isPending: isCustomersMiniPending } = useGetCustomersMini(
    { ...filterParams },
    {
      select: (data) => {
        return data?.data?.data?.data;
      },
    },
  );

  const columns = useMemo(() => {
    return renderColumns();
  }, []);

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

  const handleClearCustomers = () => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
    onSelectionChange?.([]);
  };

  const handleDeselectCustomer = (customer) => {
    const filteredSelectedRows = selectedRows.filter((row) => row.id !== customer.id);
    const filteredSelectedRowKeys = selectedRowKeys.filter((key) => key !== customer.id);

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

  const handleSelectCustomer = (customer) => {
    const newSelectedRowKeys = new Set([...selectedRowKeys, customer.id]);
    const newSelectedRows = selectedRows.slice();
    if (!selectedRows.find((row) => row.id == customer.id)) {
      newSelectedRows.push(customer);
    }
    setSelectedRows(newSelectedRows);
    setSelectedRowKeys(Array.from(newSelectedRowKeys));
    onSelectionChange?.(newSelectedRows);
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
      <Row style={{ marginBottom: 16 }}>
        <Col flex={1}>
          <Form layout="vertical">
            <Form.Item label={`Selected (${selectedRowKeys.length})`}>
              <Select
                optionLabelProp="fullName"
                variant="borderless"
                allowClear
                maxTagCount={8}
                mode="tags"
                style={{ width: "100%" }}
                loading={isCustomersMiniPending}
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
      </Row>
      <Table
        loading={isPending}
        scroll={{ x: 700, y: 400 }}
        rowKey={"id"}
        className="customers-table"
        pagination={{
          pageSize: 10,
          total: count,
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
        locale={{ emptyText: "No contacts yet" }}
        columns={columns}
      />
      <Typography.Text className="table-bottom-count hide-sm">
        Total Count : {count}
      </Typography.Text>
    </>
  );
};

export default CustomersSelectionTable;
