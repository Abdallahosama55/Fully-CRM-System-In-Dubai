import { LoadingOutlined } from "@ant-design/icons";
import { Avatar, Col, Input, Row, Typography } from "antd";
import { SearchSVG } from "assets/jsx-svg";
import { useContext, useEffect, useState } from "react";
import EmployeeService from "services/Employee/employee.service";
import { axiosCatch } from "utils/axiosUtils";
import userContext from "context/userContext";

import "./styles.css";

export default function ReassignMenu({ onEmployeeSelect, clickLoading, noFilterMyself = false }) {
  const { user } = useContext(userContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            setLoading(true);
            const res = await EmployeeService.search({
              limit: 100,
              searchKey: searchQuery,
            });
            if (noFilterMyself) {
              setEmployees(res.data.data.rows);
            } else {
              setEmployees(res.data.data.rows.filter((emp) => emp.id !== user.id));
            }
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
  }, [searchQuery, user.id]);

  return (
    <Row className="reassign-menu" gutter={[0, 16]}>
      <Col xs={24}>
        <Input
          className="general-table-search"
          placeholder="Search"
          addonAfter={
            <div
              className="clickable center-items"
              style={{
                width: "44px",
                height: "42px",
                borderRadius: "0 8px 8px 0",
              }}>
              <SearchSVG />
            </div>
          }
          suffix={<SearchSVG />}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </Col>
      <Col xs={24}>
        {clickLoading ? (
          <Row justify="center">
            <LoadingOutlined />
          </Row>
        ) : (
          <Row
            style={{
              maxHeight: "280px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
            gutter={[0, 12]}>
            {employees.map((employee) => (
              <Col
                xs={24}
                key={employee.id}
                className="clickable employee-item"
                onClick={() => onEmployeeSelect(employee.id)}>
                <Row justify="space-between" align="middle">
                  <Col flex={1}>
                    <Row align="middle" gutter={[16, 0]}>
                      <Col>
                        <Avatar
                          src={employee.profileImage}
                          size={32}
                          style={{ objectFit: "cover" }}
                        />
                      </Col>
                      <Col>
                        <Typography.Text>{employee.fullName}</Typography.Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col>{loading && <LoadingOutlined />}</Col>
                </Row>
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
}
