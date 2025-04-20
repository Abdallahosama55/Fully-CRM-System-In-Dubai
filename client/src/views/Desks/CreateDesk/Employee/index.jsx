import { useEffect, useState } from "react";
import { Avatar, Col, Collapse, Input, Row, Typography } from "antd";

import { ArrowDownSVG, CloseSVG, SearchSVG } from "assets/jsx-svg";

import "./styles.css";

import { LoadingOutlined } from "@ant-design/icons";
import WorkingHours from "./WorkingHours";
import { useParams, useSearchParams } from "react-router-dom";

import dayjs from "dayjs";
import { diffStarTimeEndTime } from "utils/WokingHours";
import newColorFind from "utils/randomColor";
import DeskService from "services/Desk/desk.service";
import EmployeeService from "services/Employee/employee.service";
import useGetDeskEmployessById from "services/Desk/Querys/useGetDeskEmployessById";
import useGetEmployeeSearch from "services/Employee/Querys/useGetEmployeeSearch";
import { useDebounce } from "hooks/useDebounce";
import useGetSearchEmployees from "services/Employees/Querys/useGetSearchEmployees";
import useSuspenseDeskEmployeesById from "services/Desk/Querys/useSuspenseDeskEmployeesById";

const Employee = ({ form, loading, seletedEmployess, setSeletedEmployess }) => {
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const { data: employeeData, isLoading: isLoadingDesk } = useSuspenseDeskEmployeesById(id, {
    refetchOnMount: true,
    select: (data) => {
      return data.data.data;
    },
  });
  const searchQueryDebounce = useDebounce(searchQuery);
  const { isLoading: isLoadingSearchEmployee, data: searchEmployee } = useGetSearchEmployees(
    {
      limit: 100,
      searchKey: searchQueryDebounce,
    },
    {
      select: (data) => {
        return data.data.data.data;
      },
    },
  );
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(
  //     () => {
  //       (async () => {
  //         try {
  //           setSearchLoading(true);
  //           const res = await EmployeeService.search({
  //             limit: 100,
  //             searchKey: searchQuery,
  //           });
  //           setSearchEmployee(res.data.data.rows);
  //         } catch (err) {
  //           console.log(err);
  //         } finally {
  //           setSearchLoading(false);
  //         }
  //       })();
  //     },
  //     searchQuery.length > 0 ? 500 : 0,
  //   );

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchQuery]);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = employeeData;

        const empArray =
          data.length &&
          data[0].employees.length &&
          data[0].employees.map((employee) => {
            if (employee.deskEmployee.workingHours) {
              for (const [key, value] of Object.entries(employee.deskEmployee.workingHours)) {
                form.setFieldValue(
                  [`employee${employee.deskEmployee.employeeId}`, `${key}Time`],
                  [dayjs(value.startTime, "HH:mm"), dayjs(value.endTime, "HH:mm")],
                );
                form.setFieldValue(
                  [`employee${employee.deskEmployee.employeeId}`, `${key}Select`],
                  true,
                );
                form.setFieldValue(
                  [`employee${employee.deskEmployee.employeeId}`, `${key}Total`],
                  diffStarTimeEndTime(
                    dayjs(value.startTime, "HH:mm"),
                    dayjs(value.endTime, "HH:mm"),
                  ),
                );
              }
            }

            return employee.deskEmployee.employeeId;
          });
        if (empArray) {
          const filterdEmployee = searchEmployee.filter((employee) =>
            empArray.includes(employee.id),
          );
          setSeletedEmployess(filterdEmployee);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, searchEmployee, employeeData]);

  return (
    <section className="employee-information-section">
      <Row gutter={[0, 8]}>
        <Col span={24} style={{ margin: "0" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Text className="fw-500 fz-14">Select EMPLOYEES</Typography.Text>
            </Col>
            <Col>
              <Input
                style={{ height: "36px" }}
                allowClear
                placeholder="Search.."
                className="general-table-search"
                addonAfter={
                  <div
                    className="clickable center-items"
                    style={{
                      width: "44px",
                      height: "36px",
                      borderRadius: "0 8px 8px 0",
                    }}>
                    <SearchSVG />
                  </div>
                }
                suffix={<SearchSVG />}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row align="middle" gutter={[16, 16]}>
            {seletedEmployess.map((seletedEmployes) => (
              <Col key={seletedEmployes.id}>
                <Row align="middle" gutter={[8, 0]} wrap={false} className="selected-employee-tag">
                  <Col>
                    <Typography.Text className="fz-12 seleted-employes-fullName" ellipsis>
                      {seletedEmployes.fullName}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Row align="middle">
                      <CloseSVG
                        style={{ width: "8px", height: "8px" }}
                        className="clickable"
                        onClick={() => {
                          const foundIndex = seletedEmployess.findIndex(
                            (emp) => emp.id === seletedEmployes.id,
                          );
                          if (foundIndex !== -1) {
                            setSeletedEmployess((prev) => {
                              prev.splice(foundIndex, 1);
                              return [...prev];
                            });
                          }
                        }}
                      />
                    </Row>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24}>
          {isLoadingSearchEmployee || isLoadingDesk ? (
            <Row justify="center" align="middle" style={{ height: "214px" }}>
              <LoadingOutlined />
            </Row>
          ) : (
            <div className="employee-cards-wraper">
              {searchEmployee.map((employee) => {
                const isSelectedIndex = seletedEmployess.findIndex((emp) => emp.id === employee.id);

                return (
                  <div
                    key={employee.id}
                    className={`employee-card ${isSelectedIndex !== -1 && "employee-card-active"}`}
                    onClick={() => {
                      if (isSelectedIndex === -1) {
                        setSeletedEmployess((prev) => [...prev, employee]);
                      } else {
                        setSeletedEmployess((prev) => {
                          prev.splice(isSelectedIndex, 1);
                          return [...prev];
                        });
                      }
                    }}>
                    <div>
                      <Row justify="center" align="middle">
                        <Avatar
                          src={employee.profileImage}
                          size={60}
                          style={{
                            objectFit: "cover",
                            backgroundColor:
                              !employee.profileImage && `${newColorFind(employee.id)}`,
                          }}
                          icon={<div>{employee?.fullName?.slice(0, 2)}</div>}
                        />
                      </Row>
                    </div>
                    <div>
                      <Row justify="center">
                        <Typography.Text className="fw-500">{employee.fullName}</Typography.Text>
                      </Row>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Col>
        {seletedEmployess.length > 0 && (
          <>
            <Col span={24} style={{ margin: "40px 0 8px" }}>
              <Typography.Text className="bc fz-16">
                Define Desk’s Employees Working Times
              </Typography.Text>
            </Col>
            <Col span={24}>
              <Collapse
                size="small"
                className="employee-collapse"
                expandIcon={({ isActive }) => (
                  <ArrowDownSVG
                    style={{
                      rotate: !isActive ? "-90deg" : "0deg",
                      transition: "all 0.2s ease",
                    }}
                  />
                )}>
                {seletedEmployess.map((employee) => (
                  <Collapse.Panel header={`${employee.fullName}`} key={employee.id}>
                    <WorkingHours
                      form={form}
                      employeeId={employee.id}
                      employeeData={
                        employeeData.length &&
                        employeeData[0].employees.filter(
                          (emp) => emp.deskEmployee.employeeId === employee.id,
                        )
                      }
                    />
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Col>
          </>
        )}
      </Row>
    </section>
  );
};
export default Employee;
