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
import { FilterSVG } from "assets/jsx-svg";
import { useContext, useEffect, useState } from "react";
import { columns } from "./TableColumns";
import { DownOutlined } from "@ant-design/icons";
import "./styles.css";
import AddWarehouses from "./Add-Warehouses/AddWarehouses";
import WarehousesService from "services/warehouses.service";
import defaultImg from "assets/images/logo.png";
import { useDrawer } from "context/drawerContext";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";

function Warehouse() {
  const { openNotificationWithIcon } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [warehousesCount, setWarehousesCount] = useState(0);
  const [warehousesdata, setWarehousesdata] = useState([]);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const DrawerAPI = useDrawer();
  const { user } = useContext(userContext);

  const onClose = () => {
    DrawerAPI.close();
  };
  useEffect(() => {
    function getWarehouses() {
      setIsLoading(true);
      WarehousesService.search(searchText ? searchText : "").then(
        (res) => {
          setIsLoading(false);
          const warehouses = res.data.data.warehouses;
          setWarehousesdata(warehouses);
          setWarehousesCount(res.data.data.count);
        },
        () => {
          setIsLoading(false);
          openNotificationWithIcon("error", "Something went wrong");
        },
      );
    }
    getWarehouses();
  }, [refresh, searchText]);
  useEffect(() => {
    setTableData(
      warehousesdata?.map((warehouse) => {
        const { id, image, showStatus, sortOrder, companyId, warehouseTranslations } = warehouse;
        const enWarehouse = warehouseTranslations.find(
          (i) => i.languageCode === `${user.languageCode}`,
        );

        return {
          key: id,
          actions: {
            id,
            companyId,
            setWarehousesdata,
            setWarehousesCount,
            setRefresh,
          },
          name: enWarehouse.name,
          description: enWarehouse.description,
          parent: `Washing & Cleaning`,
          logo: image || defaultImg,
          sortOrder: sortOrder,
          status: showStatus ? "Active" : "Draft",
          companyId,
        };
      }),
    );
  }, [warehousesdata]);
  return (
    <>
      <Breadcrumb
        className="breadcrumb-warehouse"
        items={[
          {
            title: <div>Inventory</div>,
          },
          {
            title: <div className="bc">Products Management</div>,
          },
          {
            title: <div className="pc">Warehouses</div>,
          },
        ]}
      />

      <section className="body-content warehouse">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Warehouses Table</Typography.Text>
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
                      onChange={(e) => setSearchText(e.target.value)}
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
                    DrawerAPI.setDrawerContent(
                      <AddWarehouses
                        setWarehousesdata={setWarehousesdata}
                        setWarehousesCount={setWarehousesCount}
                        onClose={onClose}
                      />,
                    );
                  }}
                  style={{ background: "#272942", color: "#fff" }}>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>Add Warehouses</Col>
                  </Row>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <div style={{ position: "relative" }}>
          <Table
            loading={isLoading}
            scroll={{ x: 700 }}
            style={{ marginTop: "32px" }}
            columns={columns}
            dataSource={tableData}
            pagination={{
              pageSize: 10,
              total: warehousesCount,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total Warehouses : {warehousesCount}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default Warehouse;
