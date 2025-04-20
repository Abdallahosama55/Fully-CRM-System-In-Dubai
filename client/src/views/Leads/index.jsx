import { Breadcrumb, Button, Col, Dropdown, Input, Row, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import Kanban from "./Kanban";
import AddEditNewLeadForm from "./AddEditNewLeadForm";
import { menuProps } from "./utlits";
// icons
import { DownOutlined } from "@ant-design/icons";
import { PlusSVG, SearchSVG } from "assets/jsx-svg";
// style
import "./styles.css";
// drawer
import { useDrawer } from "context/drawerContext";

function Leads() {
  const DrawerAPI = useDrawer();
  const onCloseDrawer = () => {
    DrawerAPI.close();
  };
  const handelOpenDrawer = () => {
    DrawerAPI.open("32%");
    DrawerAPI.setDrawerContent(<AddEditNewLeadForm onClose={onCloseDrawer} />);
  };
  const { piplineId } = useParams();

  return (
    <div className="leads">
      {/* <div>
        <Row align="middle" justify="space-between" gutter={[12, 20]}>
          <Col>
            <Breadcrumb
              items={[
                {
                  title: <Link to={"/employee/employee-query"}>Management</Link>,
                },
                {
                  title: <div>Leads</div>,
                },
              ]}
            />
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
                        All variables
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
                <Button onClick={handelOpenDrawer} style={{ background: "#272942", color: "#fff" }}>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <PlusSVG />
                      </Row>
                    </Col>
                    <Col>New Lead</Col>
                  </Row>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div> */}

      <Breadcrumb
        style={{ marginBottom: "8px" }}
        items={[
          {
            title: (
              <Link to="/crm/pipelines" className="black">
                Pipelines
              </Link>
            ),
          },
          {
            title: "Pipeline view",
          },
        ]}
      />
      <div>
        <Kanban UrlPiplineId={piplineId} />
      </div>
    </div>
  );
}

export default Leads;
