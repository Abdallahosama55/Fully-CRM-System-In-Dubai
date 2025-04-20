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
import AddCategoreis from "./Add-Categoreis/AddCategoreis";
import defaultImg from "assets/images/logo.png";
import CategoryService from "services/category.service";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";
import { useDrawer } from "hooks/useDrawer";

function Categoreis() {
  const { openNotificationWithIcon } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoreisCount, setCategoreisCount] = useState(0);
  const [categoreisdata, setCategoreisdata] = useState([]);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const DrawerAPI = useDrawer();
  const { user } = useContext(userContext);
  const onClose = () => {
    DrawerAPI.close();
  };

  useEffect(() => {
    function getCategories() {
      setIsLoading(true);
      CategoryService.search(false, searchText ? searchText : "").then(
        (res) => {
          setIsLoading(false);
          const categories = res.data.data.categories;
          setCategoreisdata(categories);
          setCategoreisCount(res.data.data.count);
        },
        () => {
          setIsLoading(false);
          openNotificationWithIcon("error", "Something wrong happened!");
        },
      );
    }

    getCategories();
  }, [openNotificationWithIcon, refresh, searchText]);

  useEffect(() => {
    setTableData(
      categoreisdata?.map((category) => {
        const {
          id,
          image,
          showStatus,
          sortOrder,
          companyId,
          categoryTranslations,
          parentCategory,
        } = category;
        const enCategory = categoryTranslations.find(
          (i) => i.languageCode === `${user.languageCode}`,
        );
        const parentName = parentCategory?.categoryTranslations.find(
          (i) => i.languageCode === `${user.languageCode}`,
        );

        return {
          key: id,
          actions: {
            id,
            companyId,
            setCategoreisdata,
            setCategoreisCount,
            setRefresh,
          },
          name: enCategory?.name,
          description: enCategory?.description,
          parent: parentName?.name || "-",
          logo: image || defaultImg,
          sortOrder: sortOrder,
          status: showStatus ? "Active" : "Draft",
          companyId,
        };
      }),
    );
  }, [categoreisdata]);

  return (
    <>
      {DrawerAPI.Render}
      <Breadcrumb
        className="breadcrumb-categories"
        items={[
          {
            title: <div>Inventory</div>,
          },
          {
            title: <div className="bc">Products Management</div>,
          },

          {
            title: <div className="pc">Categories</div>,
          },
        ]}
      />

      <section className="body-content categories">
        <Row className="search-row" align="middle" justify="space-between" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Categories Table</Typography.Text>
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
                      <AddCategoreis
                        setCategoreisdata={setCategoreisdata}
                        setCategoreisCount={setCategoreisCount}
                        setRefresh={setRefresh}
                        onClose={onClose}
                      />,
                    );
                  }}
                  style={{ background: "#272942", color: "#fff" }}>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>Add Category</Col>
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
              total: categoreisCount,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total Categoreis : {categoreisCount}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default Categoreis;
