import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Row, Space, Table } from "antd";
import { QueueSVG, SearchSVG } from "assets/jsx-svg";
import {
  Buttons,
  menuProps,
  tableDataAll,
  tableDataCustomer,
  tableMeetingDesk,
} from "./utils";
import {
  columnsAll,
  columnsCustomer,
  columnsMeetingDesk,
} from "./TableColumns";

import "./styles.css";

const choseTable = {
  1: {
    data: tableDataAll,
    columns: columnsAll,
  },
  2: {
    data: tableDataCustomer,
    columns: columnsCustomer,
  },
  3: {
    data: tableMeetingDesk,
    columns: columnsMeetingDesk,
  },
};

const DeskQueue = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [activeContent, setActiveContent] = useState(1);
  const [ticketsCount, setTicketsCount] = useState(0);
  const [tablecolumns, setTablecolumns] = useState(choseTable[1].columns);
  const [dataSource, setDataSource] = useState(choseTable[1].data);

  const convertTable = (id) => {
    setLoading(true);
    setActiveContent(id);
    setTablecolumns(choseTable[id].columns);
    setDataSource(choseTable[id].data);
    setLoading(false);
  };

  return (
    <div className="DeskQueue">
      <Row align="middle" justify="space-between" className="desk-queue-header">
        <Col>
          <Row align="middle" gutter={[16, 16]}>
            <Col>
              <Row align="middle">
                <QueueSVG className="QueueSVG" />
              </Row>
            </Col>
            <Col>
              <div>Desk Queue</div>
            </Col>
          </Row>
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
                    }}
                  >
                    <SearchSVG />
                  </div>
                }
                suffix={<SearchSVG />}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="Buttons" gutter={16}>
        {Buttons.map((button) => (
          <Button
            className={`${activeContent !== button.id && "converButton"}`}
            onClick={() => convertTable(button.id)}
            key={button.id}
            type={activeContent === button.id && "primary"}
            ghost
          >
            {button.name}
          </Button>
        ))}
      </Row>
      <div style={{ position: "relative" }}>
        <Table
          loading={loading}
          scroll={{ x: 700 }}
          style={{ marginTop: "32px" }}
          columns={tablecolumns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            total: ticketsCount,
            onChange: (page) => {
              setPage((page - 1) * 10);
            },
            defaultCurrent: page / 10 + 1,
          }}
        />
      </div>
    </div>
  );
};
export default DeskQueue;
