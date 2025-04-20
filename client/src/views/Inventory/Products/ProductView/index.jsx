import { Button, Col, Dropdown, Input, Row, Space, Table, Select, Typography, Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { ArrowDownSVG, FilterSVG } from "assets/jsx-svg";
import { columns } from "./TableColumns";
import { DownOutlined } from "@ant-design/icons";
import defaultImg from "assets/images/logo.png";
import AddProductView from "../AddProductView";
import AddVariantProductView from "../AddVariantProductView";
import ProductService from "services/product.service";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";
import ReorderTheCol from "./ReorderTheCol";
import "./styles.css";
import { useDrawer } from "hooks/useDrawer";

function Categoreis() {
  const { openNotificationWithIcon } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [productsdata, setProductsdata] = useState([]);
  const [columsName, setColumsName] = useState("name");
  const [sordBy, setSordBy] = useState("oldest");
  const [data, setData] = useState(columns);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const DrawerAPI = useDrawer();
  const { user } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem("product")) {
      const orderedData = JSON.parse(localStorage.getItem("product"));
      setData((prev) => {
        return prev.slice().sort((a, b) => {
          const aIndex = orderedData.findIndex((item) => item.dataIndex === a.dataIndex);
          const bIndex = orderedData.findIndex((item) => item.dataIndex === b.dataIndex);
          return aIndex - bIndex;
        });
      });
    }
  }, []);

  const onClose = () => {
    DrawerAPI.close();
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Simple",
          onClick: () => {
            DrawerAPI.open("70%");
            DrawerAPI.handleSetDestroyOnClose(false);
            DrawerAPI.setDrawerContent(
              <AddProductView
                setProductsCount={setProductsCount}
                setProductsdata={setProductsdata}
                onClose={onClose}
              />,
            );
          },
        },
        {
          key: "2",
          label: "Variant",
          onClick: () => {
            DrawerAPI.open("70%");
            DrawerAPI.handleSetDestroyOnClose(false);
            DrawerAPI.setDrawerContent(
              <AddVariantProductView
                setProductsCount={setProductsCount}
                setProductsdata={setProductsdata}
                onClose={onClose}
              />,
            );
          },
        },
      ]}
    />
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      ProductService.get(searchText ? searchText : "", columsName, sordBy)
        .then(({ data }) => {
          setIsLoading(false);
          setProductsdata(data.data.products);
          setProductsCount(data.data.count);
        })
        .catch(() => {
          setIsLoading(false);
          openNotificationWithIcon("error", "Something wrong happened!");
        });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, searchText, columsName, sordBy]);

  useEffect(() => {
    setTableData(
      productsdata?.map((product, i) => {
        const { id, productVariants, customerBusinessId, productTranslations, status, options } =
          product;

        const enProduct = productTranslations.find((i) => i.languageCode === user?.languageCode);
        return {
          key: id,
          actions: {
            id,
            customerBusinessId,
            setProductsdata,
            setProductsCount,
            setRefresh,
            product,
            index: i,
            isVariant: options ? true : false,
          },
          name: enProduct?.name,
          description: enProduct?.description,
          logo:
            productVariants.length > 0 && productVariants[0].images
              ? productVariants[0].images[0] || defaultImg
              : defaultImg,
          status: status === "Active" ? "Active" : "Draft",
          price: productVariants.length > 0 && productVariants[0].price,
          customerBusinessId,
        };
      }),
    );
  }, [productsdata]);

  const handleSelect = (vlaue) => {
    setSordBy(vlaue);
  };

  return (
    <>
      {DrawerAPI.Render}
      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Products Table</Typography.Text>
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
                            items: [
                              {
                                key: "1",
                                label: "name",
                                onClick: () => {
                                  setColumsName("name");
                                },
                              },
                              {
                                key: "2",
                                label: "description",
                                onClick: () => {
                                  setColumsName("description");
                                },
                              },
                            ],
                          }}>
                          <Space>
                            {columsName}
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
                      onSelect={handleSelect}
                      defaultValue={sordBy}
                      options={[
                        {
                          value: "newest",
                          label: (
                            <Typography.Text className="fz-12">
                              Sort by: <span className="fw-600">Newest</span>
                            </Typography.Text>
                          ),
                        },
                        {
                          value: "oldest",
                          label: (
                            <Typography.Text className="fz-12">
                              Sort by: <span className="fw-600">Oldest</span>
                            </Typography.Text>
                          ),
                        },
                      ]}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Dropdown
                  placement="bottomRight"
                  trigger={["click"]}
                  dropdownRender={() => <ReorderTheCol data={data} setData={setData} />}>
                  <Button>
                    <FilterSVG className="filter-svg" />
                  </Button>
                </Dropdown>
              </Col>
              <Col>
                <Dropdown dropdownRender={() => menu} trigger={["click"]}>
                  <Button style={{ background: "#272942", color: "#fff" }}>
                    <Row align="middle" gutter={[8, 0]} wrap={false}>
                      <Col>Add Products </Col>
                      <Col>
                        <ArrowDownSVG color="#fff" />
                      </Col>
                    </Row>
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>

        <div style={{ position: "relative" }}>
          <Table
            loading={isLoading}
            scroll={{ x: 700 }}
            style={{ marginTop: "32px" }}
            columns={data.filter((val) => !val.hidden)}
            dataSource={tableData}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              position: ["none", "bottomCenter"],
              total: productsCount,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total Products : {productsCount}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default Categoreis;
