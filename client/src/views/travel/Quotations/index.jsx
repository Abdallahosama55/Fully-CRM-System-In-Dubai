import { Button, Col, Flex, Form, Input, message, Row, Select, Tooltip } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { ArrowDownSVG, EyeSVG, SearchSVG } from "assets/jsx-svg";
import PlusSVG from "assets/jsx-svg/PlusSVG";
import Badge from "components/common/Badge";
import CustomTable from "components/CustomTable";
import NewQuotationModal from "components/AddToQuotation/NewQuotationModal";
import ROUTER_URLS from "constants/ROUTER_URLS";
import dayjs from "dayjs";
import { useDebounce } from "hooks/useDebounce";
import usePageTitle from "hooks/usePageTitle";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCreateQuotation from "services/travel/quotation/Mutations/useCreateQuotation";
import { useListQuotationsWithPagination } from "services/travel/quotation/Queries/useListQuotations";
const Quotations = () => {
  usePageTitle("Quotations");
  const [form] = useForm();
  const navigate = useNavigate();
  const [isAddNewTripOpen, setIsAddNewTripOpen] = useState(false);
  const filters = useWatch("filters", form);
  const debouncedFilters = useDebounce(filters, 500);
  const [page, setPage] = useState(1);
  const quotations = useListQuotationsWithPagination({ page: page, size: 10, ...debouncedFilters });
  const createQuotation = useCreateQuotation({
    onSuccess: (res) => {
      message.success("Quotation created successfully");
      setIsAddNewTripOpen(false);
      quotations.refetch();
      navigate(ROUTER_URLS.TRAVEL.QUOTATION.VIEW.replace(":id", res));
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });

  const handelFinish = (values) => {
    const temp = {
      ...values,
    };
    createQuotation.mutate(temp);
  };

  return (
    <div>
      <NewQuotationModal
        isOpen={isAddNewTripOpen}
        close={() => setIsAddNewTripOpen(false)}
        handelFinish={handelFinish}
        loading={createQuotation?.isPending}
      />
      <Flex align="center" justify="space-between" style={{ marginBottom: "0.75rem" }}>
        <Form form={form} style={{ width: "calc(100% - 90px)" }}>
          <Row gutter={[8, 8]}>
            <Col md={10} xs={16}>
              <Form.Item name={["filters", "name"]}>
                <Input placeholder="name" prefix={<SearchSVG />} />
              </Form.Item>
            </Col>
            <Col md={6} xs={8}>
              <Form.Item name={["filters", "status"]}>
                <Select
                  suffixIcon={<ArrowDownSVG />}
                  allowClear
                  placeholder={"Status"}
                  options={[
                    { label: "New", value: "NEW" },
                    { label: "abroved", value: "ABROVED" },
                    { label: "booked", value: "BOOKED" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button icon={<PlusSVG />} type="primary" onClick={() => setIsAddNewTripOpen(true)}>
          New
        </Button>
      </Flex>
      <CustomTable
        page={page}
        setPage={setPage}
        total={quotations?.data?.count}
        loading={quotations?.isLoading}
        dataSource={quotations?.data?.rows}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name) =>
              name ? name?.substring(0, 1).toUpperCase() + name?.substring(1).toLowerCase() : "-",
          },
          {
            title: "Guest Title",
            dataIndex: "guestTitle",
            key: "guestTitle",
          },
          {
            title: "First Name",
            dataIndex: "guestFirstName",
            key: "guestFirstName",
          },
          {
            title: "Last Name",
            dataIndex: "guestLastName",
            key: "guestLastName",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
              return status ? (
                <Badge
                  status={
                    status === "NEW" ? "warning" : status === "ABROVED" ? "primary" : "success"
                  }>
                  {status}
                </Badge>
              ) : (
                ""
              );
            },
          },
          {
            title: "Last Update",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (date) => {
              return dayjs(date).format("ddd MMM YYYY, HH:mm");
            },
          },
          {
            title: "",
            key: "action",
            dataIndex: "id",
            width: "45px",
            render: (id) => {
              return (
                <Flex align="center" justify="center">
                  <Link to={ROUTER_URLS.TRAVEL.QUOTATION.VIEW.replace(":id", id)}>
                    <Tooltip title={"view"}>
                      <Button
                        type={"primary"}
                        className="table_action_button"
                        icon={<EyeSVG color={"#fff"} />}
                      />
                    </Tooltip>
                  </Link>
                </Flex>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default Quotations;
