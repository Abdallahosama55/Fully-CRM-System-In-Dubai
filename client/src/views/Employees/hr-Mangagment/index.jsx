import {
  Button,
  Col,
  Dropdown,
  Input,
  Row,
  Space,
  Table,
  Select,
  Typography,
  Breadcrumb,
} from "antd";
import { FilterSVG, PlusSVG, SearchSVG } from "assets/jsx-svg";
import { useState } from "react";
import { columns } from "./TableColumns";
import { menuProps, tableData } from "./utils";
import { DownOutlined } from "@ant-design/icons";
import "./styles.css";
import AddTimeForm from "./add-time-form";
import { useDrawer } from "hooks/useDrawer";

function Index() {
  const [loading, setLoading] = useState(false);
  const [ticketsCount, setTicketsCount] = useState(0);
  const [page, setPage] = useState(0);
  const DrawerAPI = useDrawer();

  const onClose = () => {
    DrawerAPI.close();
  };

  return (
    <>
      {DrawerAPI.Render}
      <Breadcrumb
        style={{ marginBottom: "24px" }}
        items={[
          {
            title: <div>Management</div>,
          },
          {
            title: <div className="bc">Hr Management</div>,
          },
          {
            title: <div className="pc">Time-Off Management</div>,
          },
        ]}
      />

      <section className="body-content hr-management">
        <Row align="middle" justify="space-between" gutter={[12, 12]}>
          <Col>
            <Typography.Text>
              <span className="fz-16 fw-600">Time- Off Management</span>
              <span className="fz-12 fw-400"> (Leave And Vacations)</span>
            </Typography.Text>
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
                <Button>
                  <FilterSVG className="filter-svg" />
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    DrawerAPI.open("40%");
                    DrawerAPI.setDrawerContent(<AddTimeForm onClose={onClose} />);
                  }}
                  style={{ background: "#272942", color: "#fff" }}>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <PlusSVG />
                      </Row>
                    </Col>
                    <Col>Create</Col>
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
            Total tickets : {ticketsCount}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default Index;
