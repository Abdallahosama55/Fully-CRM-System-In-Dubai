import { useMemo, useState } from "react";
import { Button, Col, Form, Input, message, Modal, Row, Select, Typography } from "antd";
import { NavLink } from "react-router-dom";
import getExperiancesTableColumns from "./table.columns";
import { useDebounce } from "hooks/useDebounce";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { ArrowDownSVG, PlusSVG, SearchSVG } from "assets/jsx-svg";

// style
import "./styles.css";
import usePageTitle from "hooks/usePageTitle";
import CustomTable from "components/CustomTable";
import useGetAllExperiances from "services/travel/experiance/Querys/useGetAllExperiances";
import useDeleteExperiance from "services/travel/experiance/Mutations/useDeleteExperiance";
import { queryClient } from "services/queryClient";
import useFlipExperianceState from "services/travel/experiance/Mutations/useFlipExperianceState";
import useGetThemes from "services/travel/experiance/ExperianceTab/Querys/useGetThemes";
import SvgImage from "components/common/SvgImage";

const PAGE_SIZE = 10;
const Experiances = () => {
  usePageTitle("Experiances");
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const filters = Form.useWatch("filters", form);
  const debounceFilters = useDebounce(filters, 300);

  // QURIES
  const experiancesQuery = useGetAllExperiances({ page, size: PAGE_SIZE, ...debounceFilters })
  const themesQuery = useGetThemes();
  // MUTATIONS
  const deleteExperiance = useDeleteExperiance({
    onSuccess: (_, payload) => {
      message.success("Experiance deleted successfully.");
      queryClient.setQueryData(experiancesQuery.key, (oldData) => {
        return {
          ...oldData,
          data: oldData.data.filter((item) => item.id !== payload),
          total: oldData.total - 1
        }
      })
    },
    onError: (error) => {
      message.error("Failed to delete Experiance.");
      console.log(error)
    }
  });

  const flipStateLocal = (id) => {
    queryClient.setQueryData(experiancesQuery.key, (oldData) => {
      return {
        ...oldData,
        data: oldData?.data?.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isActive: !item.isActive
            }
          }
          return item
        }),
        total: oldData.total
      }
    })
  }
  const flipActiveState = useFlipExperianceState({
    onSuccess: (res, payload) => {
      const isActive = queryClient.getQueryData(experiancesQuery.key)?.data?.find((item) => item?.id === payload)?.isActive
      message.success(`Experiance ${isActive ? "activated" : "deactivated"} successfully.`);
    },
    onError: (error, payload) => {
      message.error("Failed to delete Experiance.");
      console.log(error)
      flipStateLocal(payload)
    },
  });

  const TABLE_COLUMNS = useMemo(() => {
    return getExperiancesTableColumns({
      handelDelete: (id) => Modal.confirm({
        title: "Do you want to delete this experiance?",
        content: <p className="gc">This action is irreversible and cannot be undone.</p>,
        centered: true,
        okText: "Delete",
        okType: "danger",
        okButtonProps: {
          type: "primary",
        },
        cancelText: "Cancel",
        onOk() {
          return deleteExperiance .mutateAsync(id);
        },
      }),
      handelStatusChange: (id) => flipActiveState.mutate(id),
      flipStateLocal: flipStateLocal
    });
  }, []);

  return (
    <div className="experiances_page">
      <Form form={form}>
        <Row align="middle" justify="space-between" gutter={[12, 12]}>
          <Col lg={10}>
            <Form.Item name={["filters", "title"]} noStyle>
              <Input
                placeholder="Search by title"
                prefix={<SearchSVG />}
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item name={["filters", "themeId"]} noStyle>
              <Select
                showSearch
                allowClear
                filterOption={(input, option) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
                className="w-100"
                placeholder="Select theme"
                suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                disabled={themesQuery?.isLoading}
                optionRender={item => <div className="select_item_with_icon">
                  {item?.data?.icon ? <SvgImage svgContent={item?.data?.icon} /> : ""} {item.label}
                </div>}
                options={themesQuery?.data?.map((el) => {
                  return {
                    label: el?.name,
                    value: el?.id,
                    icon: el?.image ? el?.image : undefined
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col lg={8} className="d-flex" style={{ justifyContent: "flex-end" }}>
            <NavLink to={ROUTER_URLS.TRAVEL.EXPERIANCES.ADD}>
              <Button icon={<PlusSVG />} type="primary">New</Button>
            </NavLink>
          </Col>
        </Row>
      </Form>
      <CustomTable
        className="mt-1"
        tableLayout="auto"
        loading={experiancesQuery?.isLoading || deleteExperiance.isPending}
        columns={TABLE_COLUMNS}
        dataSource={experiancesQuery?.data?.data}
        page={page}
        pageSize={PAGE_SIZE}
        total={experiancesQuery?.data?.total}
        setPage={setPage}
        bottomContent={<Typography.Text className="hide-sm">
          Total experiances :{experiancesQuery?.data?.total}
        </Typography.Text>}
      />
    </div >
  );
};

export default Experiances;
