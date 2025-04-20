import { Avatar, Col, Input, Row, Typography } from "antd";
import { SearchSVG } from "assets/jsx-svg";

import "./styles.css";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import EmployeeService from "services/Employee/employee.service";
import { axiosCatch } from "utils/axiosUtils";

export default function MeetingCallParticipants({ employees }) {
  const [allEmployees, setAllEmployees] = useState([]);
  const [currentEmployees, setCurrentEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await EmployeeService.search({ limit: 100 });
        setAllEmployees(res.data.data.rows);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useMemo(() => {
    setCurrentEmployees(
      allEmployees.filter(
        (emp) =>
          employees.includes(emp.id + "") &&
          emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [allEmployees, employees, searchQuery]);

  return (
    <>
      <Typography.Text className="fw-500 fz-18">Participants</Typography.Text>

      <Row gutter={[0, 14]} style={{ marginTop: "14px", maxWidth: "300px" }}>
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col xs={24}>
          {loading ? (
            <Row justify="center" align="middle" style={{ height: "80px" }}>
              <LoadingOutlined />
            </Row>
          ) : (
            <Row className="support-participants" gutter={[0, 12]}>
              {currentEmployees?.map((employee) => (
                <Col key={employee.id} xs={24}>
                  <Row align="middle" wrap={false}>
                    <Avatar style={{ objectFit: "cover" }} src={employee.profileImage} size={35} />

                    <Typography.Text
                      ellipsis
                      style={{
                        marginInlineStart: "0.5rem",
                        color: "#888888",
                      }}
                      className="fz-12">
                      {employee.fullName}
                    </Typography.Text>
                  </Row>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
}
