import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Typography,
  message,
  Button,
  Select,
  Space,
  Dropdown,
} from "antd";
import { useNavigate } from "react-router-dom";

import { filterWorkingHoursObject, separateDays } from "utils/WokingHours";
import GeneralWorkingHours from "../GeneralWorkingHours";
import EmployeeService from "services/Employee/employee.service";
import { columns } from "./TableColumns";

import { FilterSVG, PlusSVG } from "assets/jsx-svg";
import { DownOutlined } from "@ant-design/icons";

import "./styles.css";
import { axiosCatch } from "utils/axiosUtils";
import { useNotification } from "context/notificationContext";

export default function EmployeesQuery() {
  const { openNotificationWithIcon } = useNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [Column, setColumn] = useState("All columns");
  const [page, setPage] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [generalWorkingModal, setGeneralWorkingModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [addWorkingHoursLoading, setAddWorkingHoursLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            setLoading(true);

            const res = await EmployeeService.search({
              offset: page,
              searchKey: searchQuery,
            });

            setEmployeesCount(res.data.data.count);
            setEmployees(res.data.data.rows);
          } catch (err) {
            axiosCatch(err);
          } finally {
            setLoading(false);
          }
        })();
      },
      searchQuery.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [page, searchQuery]);

  useEffect(() => {
    setTableData(
      employees.map((employee) => {
        const {
          id,
          fullName,
          email,
          mobile,
          prefix,
          isActive,
          profileImage,
          country,
          city,
          street,
        } = employee;

        return {
          key: id,
          userImage: profileImage,
          employeeName: fullName,
          phoneNumber: `${prefix || ""} ${mobile || ""}`,
          email: email,
          address: (country || city || street) && `${country || ""}-${city || ""}-${street || ""}`,
          desks: "",
          status: [isActive ? "Active" : "InActive"],
          toggleGeneralWorkingModal: () => {
            setSearchParams({ employeeId: id });
            setGeneralWorkingModal((prev) => !prev);
          },
        };
      }),
    );
  }, [employees, setSearchParams]);

  const onFinish = async (values) => {
    const filterdValues = filterWorkingHoursObject(values);
    const result = separateDays(filterdValues);

    if (result.length === 0) {
      openNotificationWithIcon("info", "You should add one day at least");

      return;
    }

    const formatObj = {};

    result.forEach((day) => {
      formatObj[day.day] = {
        startTime: day.startTime,
        endTime: day.endTime,
      };
    });

    try {
      setAddWorkingHoursLoading(true);
      await EmployeeService.addEditGeneralWorkingHours(searchParams.get("employeeId"), formatObj);
      message.success("Working Hours Added Successfully");
      setGeneralWorkingModal(false);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setAddWorkingHoursLoading(false);
    }
  };

  return (
    <section className="body-content employees-query">
      <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
        <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
          <Typography.Text className="fz-16 fw-600">Employee Query</Typography.Text>
        </Col>
        <Col className="search-bar" xs={24} sm={24} md={20} lg={20}>
          <Row justify="end" className="search-bar-row" align="middle" gutter={[16, 16]}>
            <Col className="search-input-col" span={13}>
              <Row
                style={{ borderRadius: "10px" }}
                align="middle"
                justify="end"
                gutter={[10, 16]}
                wrap={false}>
                <Col style={{ paddingLeft: 0 }} flex={1}>
                  <Input
                    className="general-table-search"
                    placeholder="Search"
                    onChange={(e) => {
                      setPage(0);
                      setEmployeesCount(0);

                      setSearchQuery(e.target.value);
                    }}
                    addonBefore={
                      <Dropdown
                        className="clickable"
                        trigger={["click"]}
                        menu={{
                          items: columns
                            .filter(
                              (column) => column.title !== "Avatar" && column.title !== "Actions",
                            )
                            .map((column, i) => ({
                              key: i,
                              label: <div>{column.title}</div>,
                              onClick: (e) => setColumn(column.title),
                            })),
                        }}>
                        <Space>
                          {Column}
                          <DownOutlined />
                        </Space>
                      </Dropdown>
                    }
                  />
                </Col>
                <Col style={{ paddingRight: 0 }}>
                  <Select
                    className="general-table-select"
                    style={{ width: "100%" }}
                    defaultValue="newest"
                    options={[
                      {
                        value: "newest",
                        label: (
                          <Typography.Text className="fz-12">
                            Sort by: <span className="fw-600">Newest</span>
                          </Typography.Text>
                        ),
                      },
                    ]}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Button>
                <FilterSVG className="filter-svg" />
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  navigate("/employee/add/");
                }}
                style={{ background: "#272942", color: "#fff" }}>
                <Row align="middle" gutter={[8, 0]} wrap={false}>
                  <Col className="center-items">
                    <PlusSVG />
                  </Col>
                  <Col>Add</Col>
                </Row>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div style={{ position: "relative" }}>
        <Table
          loading={loading}
          scroll={{ x: 700 }}
          style={{ marginTop: "32px" }}
          columns={columns}
          dataSource={tableData}
          pagination={{
            pageSize: 10,
            total: employeesCount,
            onChange: (page) => setPage((page - 1) * 10),
            defaultCurrent: page / 10 + 1,
          }}
        />

        <Typography.Text className="table-bottom-info hide-sm">
          Showing data {page + 1} to {page + Math.min(10, tableData?.length)} of {employeesCount}{" "}
          entries
        </Typography.Text>
      </div>

      <Modal
        footer={false}
        open={generalWorkingModal}
        onCancel={() => {
          form.resetFields();
          setGeneralWorkingModal(false);
        }}
        closable={false}
        destroyOnClose={true}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <GeneralWorkingHours
            form={form}
            employeeId={searchParams.get("employeeId")}
            setGeneralWorkingModal={setGeneralWorkingModal}
            loading={addWorkingHoursLoading}
          />
        </Form>
      </Modal>
    </section>
  );
}
