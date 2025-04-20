import React, { useState } from "react";
import "./styles.css";
import usePageTitle from "hooks/usePageTitle";
import { useForm, useWatch } from "antd/es/form/Form";
import { useDebounce } from "hooks/useDebounce";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Flex,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Tooltip,
} from "antd";
import {
  ActivitySVG,
  ArrowDownSVG,
  DateSVG,
  DeleteSVG,
  EditSVG,
  PlusSVG,
  SearchSVG,
  TimeSVG,
} from "assets/jsx-svg";
import CustomTable from "components/CustomTable";
import dayjs from "dayjs";
import default_image from "assets/images/default_image.png";
import { Link } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import empty_image from "assets/images/empty_booking_screen.png";
import useListTrips from "services/travel/packages/trip/Queries/useListTrips";
import { PACKAGE_OFFERED_TYPES } from "constants/PACKAGE_TYPES";
import useDeletePackageTrip from "services/travel/packages/trip/Mutations/useDeletePackageTrip";
import { queryClient } from "services/queryClient";
import useUpdatePackageTripStatus from "services/travel/packages/trip/Mutations/useUpdatePackageTripStatus";

const Packages = () => {
  usePageTitle("Packages");
  const [form] = useForm();
  const filters = useWatch("filters", form);
  const debouncedFilters = useDebounce(filters, 300);

  // states
  const [page, setPage] = useState(1);
  const [loadingSwitches, setLoadingSwitches] = useState([]);
  const [loadingDeleteBtns, setLoadingDeleteBtns] = useState([]);

  // queries
  const tripList = useListTrips({ ...debouncedFilters, page, size: 10 });
  // mutations
  const updatePackageTripStatus = useUpdatePackageTripStatus({
    onSuccess: (_, payload) => {
      setLoadingSwitches((prev) => prev?.filter((el) => el !== payload));
    },
    onError: (error, payload) => {
      queryClient.setQueryData(tripList?.key, (oldData) => {
        return {
          total: oldData?.total,
          rows: oldData?.rows?.map((el) => {
            if (el?.id === payload) {
              return {
                ...el,
                status: !el?.status,
              };
            }
            return el;
          }),
        };
      });
      message.error(error?.message);
    },
  });
  const deleteTripMutation = useDeletePackageTrip({
    onSuccess: (res, payload) => {
      queryClient.setQueryData(tripList?.key, (oldData) => {
        return {
          total: oldData?.total - 1 > 0 ? oldData?.total - 1 : 0,
          rows: oldData?.rows?.filter((el) => el?.id !== payload),
        };
      });
      setLoadingDeleteBtns(loadingDeleteBtns?.filter((el) => el !== payload));
      message.success("Trip deleted successfully");
    },
    onError: (error, payload) => {
      setLoadingDeleteBtns(loadingDeleteBtns?.filter((el) => el !== payload));
      console.error("ERROR IN DELETENG TRIP", error);
      message.error(error?.message || "Something went wrong");
    },
  });

  return (
    <div className="packages_page">
      <Form form={form} style={{ marginBottom: "1rem" }}>
        <Row align="middle" justify="space-between" gutter={[8, 8]}>
          <Col lg={6}>
            <Form.Item name={["filters", "name"]} noStyle>
              <Input placeholder="Search" prefix={<SearchSVG />} />
            </Form.Item>
          </Col>
          <Col lg={5}>
            <Form.Item noStyle name={["filters", "date"]} className="w-100">
              <DatePicker suffixIcon={<DateSVG color={"#3F65E4"} />} />
            </Form.Item>
          </Col>
          <Col lg={5}>
            <div className="select-with-prefix">
              <TimeSVG className="select-prefix-icon" fill="#3F65E4" width={16} height={16} />
              <Form.Item noStyle name={["filters", "type"]} className="w-100">
                <Select
                  allowClear
                  className="custom-select w-100"
                  placeholder="type"
                  suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                  options={[
                    { label: "one time", value: PACKAGE_OFFERED_TYPES.ONE_TIME },
                    { label: "Recurring trip", value: PACKAGE_OFFERED_TYPES.RECURRING_TRIP },
                    { label: "All", value: undefined },
                  ]}
                />
              </Form.Item>
            </div>
          </Col>
          <Col lg={5}>
            <div className="select-with-prefix">
              <ActivitySVG className="select-prefix-icon" fill="#3F65E4" width={20} height={20} />
              <Form.Item noStyle name={["filters", "status"]} className="w-100">
                <Select
                  allowClear
                  className="custom-select w-100"
                  placeholder="status"
                  suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                  options={[
                    { label: "Active", value: true },
                    { label: "Sales stopped", value: false },
                    { label: "All", value: undefined },
                  ]}
                />
              </Form.Item>
            </div>
          </Col>
          <Col lg={3} className="d-flex" style={{ justifyContent: "flex-end" }}>
            <Link to={ROUTER_URLS.TRAVEL.PACKAGES.ADD}>
              <Button icon={<PlusSVG color="#fff" />} type="primary">
                New
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
      <CustomTable
        page={page}
        setPage={setPage}
        pageSize={10}
        total={tripList?.data?.total}
        loading={tripList?.isLoading}
        dataSource={tripList?.data?.rows}
        locale={{
          emptyText: (
            <Empty
              style={{ margin: "calc((100dvh - 490px) / 2)" }}
              image={empty_image}
              description="No Packages Found"
            />
          ),
        }}
        columns={[
          {
            width: 100,
            title: "Image",
            dataIndex: "images",
            render: (images, rowData) => (
              <Image
                src={(Array.isArray(images) && images[0]?.link) || default_image}
                alt={rowData?.tripName}
                height={64}
                width={64}
                className="package_image"
                onError={(e) => (e.target.src = default_image)}
                style={{ borderRadius: "8px" }}
              />
            ),
          },
          {
            title: "Trip Name",
            dataIndex: "name",
            onCell: () => ({ style: { height: 84, verticalAlign: "middle" } }),
          },
          {
            title: "Destination",
            dataIndex: "destinations",
            onCell: () => ({ style: { height: 84, verticalAlign: "middle" } }),
            render: (destinations) => (
              <Flex gap={"4px"} wrap="wrap">
                {Array.isArray(destinations) &&
                  destinations.map((destination, index) => (
                    <Tag key={index} className="xs_text_medium">
                      {destination}
                    </Tag>
                  ))}
              </Flex>
            ),
          },
          {
            title: "Offered",
            dataIndex: "type",
            onCell: () => ({ style: { height: 84, verticalAlign: "middle" } }),
            render: (type) =>
              type === PACKAGE_OFFERED_TYPES?.RECURRING_TRIP ? "Recurring Trip" : "One Time",
          },
          {
            title: "Date Created",
            dataIndex: "createdAt",
            onCell: () => ({ style: { height: 84, verticalAlign: "middle" } }),
            render: (createdAt) => (createdAt ? dayjs(createdAt).format("MMM D, YYYY") : "-"),
          },
          {
            title: "Active",
            dataIndex: "status",
            onCell: () => ({ style: { height: 84, verticalAlign: "middle" } }),
            render: (status, rowData) => (
              <Space gap={8} align="center">
                <Switch
                  loading={loadingSwitches.includes(rowData?.id)}
                  onChange={() => {
                    setLoadingSwitches((prev) => [...prev, rowData?.id]);
                    queryClient.setQueryData(tripList?.key, (oldData) => {
                      return {
                        total: oldData?.total,
                        rows: oldData?.rows?.map((el) => {
                          if (el?.id === rowData?.id) {
                            return {
                              ...el,
                              status: !el?.status,
                            };
                          }
                          return el;
                        }),
                      };
                    });
                    updatePackageTripStatus.mutate(rowData?.id);
                  }}
                  checked={status}
                />
                <p className="xs_text_medium">{status ? "Active" : "Stop Sale"}</p>
              </Space>
            ),
          },
          {
            title: "Actions",
            width: 100,
            dataIndex: "id",
            onCell: () => ({ style: { height: 84, verticalAlign: "middle" } }),
            render: (id) => (
              <Space>
                <Tooltip title={"edit"}>
                  <Link to={ROUTER_URLS.TRAVEL.PACKAGES.EDIT + id}>
                    <Button
                      type="primary"
                      className="table_action_button"
                      icon={<EditSVG color={"#fff"} />}
                    />
                  </Link>
                </Tooltip>
                <Tooltip title={"delete"}>
                  <Button
                    type="primary"
                    className="table_action_button"
                    disabled={loadingDeleteBtns.includes(id)}
                    onClick={() => {
                      setLoadingDeleteBtns([...loadingDeleteBtns, id]);
                      deleteTripMutation.mutate(id);
                    }}
                    danger
                    icon={<DeleteSVG color={"#fff"} />}
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

export default Packages;
