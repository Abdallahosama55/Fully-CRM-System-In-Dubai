import {
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import { DownOutlined } from "@ant-design/icons";
import { FilterSVG } from "assets/jsx-svg";
import "./OrdersTable/styles.css";
import { useDrawer } from "context/drawerContext";
import AddOrderView from "../AddOrder";
import usePageTitle from "hooks/usePageTitle";

export default function OrdersView() {
  const DrawerAPI = useDrawer();
  usePageTitle("Orders");
  return (
    <>
      <main style={{ padding: "0.5rem" }}>
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="lg_text_medium">Orders Table</Typography.Text>
          </Col>
          <Col className="search-bar" xs={24} sm={24} md={20} lg={20}>
            <Row justify="end" className="search-bar-row" align="middle" gutter={[16, 16]}>
              <Col className="search-input-col" span={13}>
                <Row
                  style={{ background: "#ECECEE", borderRadius: "10px" }}
                  align="middle"
                  justify="end"
                  gutter={[10, 16]}
                  wrap={false}>
                  <Col style={{ paddingLeft: 0 }} flex={1}>
                    <Input
                      className="general-table-search"
                      placeholder="Search"
                      // onChange={(e) => setSearchText(e.target.value)}
                      addonBefore={
                        <Dropdown
                          trigger={["click"]}
                          menu={{
                            items: [],
                          }}>
                          <Space>
                            All columns
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
                    DrawerAPI.open("70%");
                    DrawerAPI.setDrawerContent(<AddOrderView />);
                  }}
                  style={{ background: "#272942", color: "#fff" }}>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>Add Order </Col>
                  </Row>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ marginTop: "0.75rem" }}>
          <OrdersTable />
        </div>
      </main>
    </>
  );
}
