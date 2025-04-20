import React, { useMemo, useState } from "react";
import { Button, Col, Flex, Form, Input, message, Modal, Row, Select, Typography } from "antd";
import { ArrowDownSVG, PlusSVG, SearchSVG } from "assets/jsx-svg";
import { useDebounce } from "hooks/useDebounce";
import getAccommodationsColumns from "./getAccommodationsColumns";
import CustomTable from "components/CustomTable";
import { queryClient } from "services/queryClient";
import useDeleteAccommodation from "services/travel/accommodations/common/Mutations/useDeleteAccommodation";
import CityInput from "components/common/CityInput";
import useGetAccommodationTypesList from "services/travel/accommodations/common/Queries/useGetAccommodationTypesList";
import useGetAccommodations from "services/travel/accommodations/common/Queries/useGetAccommodations";
import usePageTitle from "hooks/usePageTitle";
import { useForm, useWatch } from "antd/es/form/Form";

// style
import "./styles.css";
import AddNewAccommodationHelper from "./components/AddNewAccommodationHelper";
const PAGE_SIZE = 10;
const Accommodations = () => {
  usePageTitle("Hotels");
  const [page, setPage] = useState(1);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [form] = useForm();
  const filters = useWatch("filters", form);
  const debounceFilters = useDebounce(filters, 300);
  // queries
  const accommodationsList = useGetAccommodations({
    page,
    size: PAGE_SIZE,
    ...debounceFilters,
    city: debounceFilters?.city?.city,
  });

  const accommodationTypesQuery = useGetAccommodationTypesList({});
  // MUTATIONS
  const deleteAccommodation = useDeleteAccommodation({
    onSuccess: (res, payload) => {
      console.log({ res, payload });
      message.success("Hotel deleted successfully");
      queryClient.setQueryData(accommodationsList?.key, (oldData) => {
        return {
          ...oldData,
          data: oldData?.data?.filter((el) => el.id !== payload),
          totalCount: oldData?.totalCount - 1,
        };
      });
    },
    onError: (error) => {
      message.error("Failed to delete hotel");
      console.log(error);
    },
  });

  const TABLE_COLUMNS = useMemo(() => {
    return getAccommodationsColumns({
      handelDelete: (id) => Modal.confirm({
        title: "Do you want to delete this hotel?",
        content: <p className="gc">This action is irreversible and cannot be undone.</p>,
        centered: true,
        okText: "Delete",
        okType: "danger",
        okButtonProps: {
          type: "primary",
        },
        cancelText: "Cancel",
        onOk() {
          return deleteAccommodation.mutateAsync(id);
        },
      })
    });
  }, []);

  return (
    <div>
      <AddNewAccommodationHelper isOpen={isAddNewOpen} close={() => setIsAddNewOpen(false)} />
      <Form form={form}>
        <Row className="page_header" gutter={[12, 12]}>
          <Col lg={7} xs={12}>
            <Form.Item name={["filters", "name"]}>
              <Input prefix={<SearchSVG color="#3F65E4" />} placeholder="accommodation name" />
            </Form.Item>
          </Col>
          <Col lg={7} xs={12}>
            <Form.Item name={["filters", "city"]}>
              <CityInput suffixIcon={<></>} placeholder="City" />
            </Form.Item>
          </Col>
          <Col lg={7} xs={12}>
            <Form.Item name={["filters", "type"]}>
              <Select
                className="w-100"
                placeholder="Select Accommodation type"
                disabled={accommodationTypesQuery.isLoading}
                suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                options={accommodationTypesQuery.data?.map((el) => ({
                  label: el.name,
                  value: el.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col lg={3} xs={12}>
            <Flex align="center" justify="end" fullWidth>
              <Button type="primary" icon={<PlusSVG />} onClick={() => setIsAddNewOpen(true)}>
                New
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
      <CustomTable
        className={"mt-1"}
        tableLayout="auto"
        loading={accommodationsList?.isLoading}
        columns={TABLE_COLUMNS}
        dataSource={accommodationsList?.data?.data}
        page={page}
        pageSize={PAGE_SIZE}
        total={accommodationsList?.data?.totalCount}
        setPage={(page) => {
          setPage(page);
        }}
        bottomContent={
          <Typography.Text>Total hotels :{accommodationsList?.data?.totalCount}</Typography.Text>
        }
      />
    </div>
  );
};

export default Accommodations;
