import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { Col, Row } from "antd";
import useSuspenseAllEmployees from "services/Employees/Querys/useSuspenseAllEmployees";
import useSuspenseDeskEmployeesById from "services/Desk/Querys/useSuspenseDeskEmployeesById";
const ListEmployees = ({ id, isEditView }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const { data: employeeData, isLoading: isLoadingDesk } = useSuspenseDeskEmployeesById(id, {
    refetchOnMount: true,
    select: (data) => {
      return data.data.data;
    },
  });
  const { data } = useSuspenseAllEmployees(
    { page: 1, limit: 100 },
    { select: (data) => data.data.data },
  );
  useEffect(() => {
    setSelectedIds(employeeData?.[0].employees.map((item) => item.deskEmployee.employeeId));
  }, []);
  function handleSelected(event, id) {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1),
      );
    }
    setSelectedIds(newSelected);
  }
  return (
    <Row gutter={[16, 16]} justify="start">
      {(isEditView ? data : employeeData?.[0]?.employees || []).map((item) => {
        const props = isEditView
          ? {
              id: item.id,
              handleClick: handleSelected,
              isSelected: selectedIds.some((id) => id === item.id),
            }
          : { id: item.deskEmployee.employeeId };
        return (
          <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={4} key={item.id}>
            <EmployeeCard
              {...props}
              profileImage={item?.account?.profileImage}
              jobPosition={item?.jobPosition?.title}
              name={item?.account?.fullName}
            />
          </Col>
        );
      })}
    </Row>
  );
};
export default ListEmployees;
