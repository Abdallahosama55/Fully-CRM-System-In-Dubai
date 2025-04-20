import { Button, Col, Dropdown, Input, Row, Space, Table, Typography } from "antd";
import { Delete2SVG, SearchSVG } from "assets/jsx-svg";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { columns } from "./TableColumns";
import { menuProps } from "./utils";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getDatabase, ref, onValue } from "firebase/database";
import userContext from "context/userContext";
import "./styles.css";

function Index() {
  const [loading, setLoading] = useState(false);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [unAssignedCall, setUnAssigned] = useState([]);
  const [employeeCall, setEmployeeCall] = useState([]);
  const [customerCall, setCustomerCall] = useState({});

  const { user } = useContext(userContext);
  const [page, setPage] = useState(0);

  const db = getDatabase();
  useEffect(() => {
    const reference = ref(db, `Company/${user.companyId}/Calls/CallUnAssigned`);
    const referenceemployee = ref(db, `Company/${user.companyId}/Calls/empolyee/${user.id}`);

    onValue(reference, (snapShot) => {
      if (snapShot.val()) {
        setUnAssigned(Object.values(snapShot.val()));
      } else {
        setUnAssigned([]);
      }
    });
    onValue(referenceemployee, (snapShot) => {
      if (snapShot.val()) {
        setEmployeeCall(Object.values(snapShot.val()));
      } else {
        setEmployeeCall([]);
      }
    });
  }, [db, user.companyId, user.id]);

  useEffect(() => {
    const ids = [...new Set([...unAssignedCall, ...employeeCall])];

    setCustomerCall((prev) => {
      Object.values(prev).forEach((chatId) => {
        if (!ids.includes(chatId)) {
          delete prev[chatId];
        }
      });

      return { ...prev };
    });

    ids.forEach((callId) => {
      const callsRef = ref(db, `Company/${user.companyId}/Calls/call/${callId}/data`);

      onValue(callsRef, (data) => {
        const infoData = data.val();

        if (infoData) {
          setCustomerCall((prev) => {
            prev[callId] = infoData;
            return { ...prev };
          });
        } else {
          setCustomerCall((prev) => {
            delete prev[callId];
            return { ...prev };
          });
        }
      });
    });
  }, [unAssignedCall, employeeCall, db, user.companyId]);
  useEffect(() => {
    if (customerCall && Object.values(customerCall).length >= 1) {
      setLoading(true);
      setTableData(
        customerCall &&
          Object.values(customerCall)?.map((customer, i) => {
            return {
              key: i,
              id: customer.id,
              name: customer.CustomerName,
              time: dayjs(customer.time).format("h:mm a"),
              callType: customer.callType,
              status: customer.status,
              actions: {
                id: user.id,
                companyId: user.companyId,
                customer: { ...customer },
              },
            };
          }),
      );
      setLoading(false);
    }
  }, [customerCall, user]);

  return (
    <section className="body-content ticketing-desk">
      <Row align="middle" justify="space-between" gutter={[12, 12]}>
        <Col>
          <Typography.Title level={5}>Calls And Meetings</Typography.Title>
        </Col>
        <Col>
          <Row align="middle" gutter={[16, 16]}>
            <Col flex={1}>
              <Input
                className="general-table-search"
                placeholder="Search"
                addonBefore={
                  <Dropdown menu={menuProps}>
                    <Space>
                      All columns
                      <DownOutlined />
                    </Space>
                  </Dropdown>
                }
                addonAfter={
                  <div
                    className="clickable center-items search"
                    style={{
                      width: "44px",
                      height: "42px",
                      borderRadius: "0 8px 8px 0",
                    }}>
                    <SearchSVG />
                  </div>
                }
                suffix={<SearchSVG />}
              />
            </Col>
            <Col>
              <Link to="/desks/ticketing-desk/add-ticket">
                <Button style={{ background: "#272942", color: "#fff" }}>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <Delete2SVG />
                      </Row>
                    </Col>
                    <Col>Clear Data</Col>
                  </Row>
                </Button>
              </Link>
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
            total: activitiesCount,
            onChange: (page) => {
              setPage((page - 1) * 10);
            },
            defaultCurrent: page / 10 + 1,
          }}
        />
      </div>
    </section>
  );
}

export default Index;
