import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";

import { columns, dataSource } from "./TableColumns";
import { PlusSVG, SearchSVG } from "assets/jsx-svg";

import "./styles.css";

import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

export default function Customers() {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(dataSource);
  const [page, setPage] = useState(0);
  const [ticketsCount, setTicketsCount] = useState(0);

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: "Management",
          },
          {
            title: <div className="black">Customers</div>,
          },
        ]}
      />
      <section className="body-content customers-desk">
        <Row align="middle" justify="space-between" gutter={[12, 12]}>
          <Col>
            <Typography.Title level={5}>Customers</Typography.Title>
          </Col>
          <Col>
            <Row align="middle" gutter={[16, 16]}>
              <Col flex={1}>
                <Input
                  className="general-table-search"
                  placeholder="Search"
                  addonBefore={
                    <Dropdown>
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
              <Col>
                <Button style={{ background: "#272942", color: "#fff" }}>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <PlusSVG />
                      </Row>
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
              total: ticketsCount,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
          />

          <Typography.Text className="table-bottom-info hide-sm">
            Total : {ticketsCount}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}
