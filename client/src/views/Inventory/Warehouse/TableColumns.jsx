import { Col, Dropdown, Image, Row, Typography } from "antd";
import { DeleteSVG, EditSVG, EyeSVG, MoreSVG } from "assets/jsx-svg";
import { useState } from "react";
import WarehousesService from "services/warehouses.service";

import "./styles.css";
import EditWarehouses from "./Edit-Warehouses/EditWarehouses";
import { Link } from "react-router-dom";
import { useDrawer } from "context/drawerContext";
import { useNotification } from "context/notificationContext";

export const columns = [
  {
    title: "Logo",
    dataIndex: "logo",
    width: 200,
    render: (image) => (
      <>
        <Image
          preview={false}
          alt="product img"
          width={31}
          height={31}
          style={{ borderRadius: "4px" }}
          src={image}
        />
      </>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "Description",
    dataIndex: "description",
    width: 200,
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Typography.Text className={`${status}-status status`}>{status}</Typography.Text>
    ),

    width: 100,
  },
  {
    title: "Sort Order",
    dataIndex: "sortOrder",
    ellipsis: true,
    align: "center",
    width: 150,
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 140,
    render: (action) => (
      <RowAction
        setWarehousesCount={action.setWarehousesCount}
        setWarehousesdata={action.setWarehousesdata}
        id={action.id}
        setRefresh={action.setRefresh}
      />
    ),
  },
];

function RowAction({ id, setWarehousesdata, setWarehousesCount, setRefresh }) {
  const { openNotificationWithIcon } = useNotification();
  const DrawerAPI = useDrawer();

  const [isDeletionLoading, setIsDeletionLoading] = useState(false);
  const onClose = () => {
    DrawerAPI.close();
  };

  const deleteWarehouse = () => {
    setIsDeletionLoading(true);
    WarehousesService.WarehouseDelete(id).then(
      (response) => {
        const { deletedWarehouses } = response.data?.data || {};

        setIsDeletionLoading(false);
        setWarehousesdata((warehouses) => {
          return warehouses.filter(
            (warehouse) => !deletedWarehouses.includes(Number(warehouse.id)),
          );
        });
        setWarehousesCount((prev) => prev - 1);
      },
      () => {
        setIsDeletionLoading(false);
        openNotificationWithIcon("error", "Something went wrong");
      },
    );
  };

  return (
    <Row wrap={false} justify="center" align="middle" gutter={[6, 0]}>
      <Col>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Link to={`/inventory/warehouse/warehouse-inf/${id}`}>
                    <Row align="middle" gutter={[8, 0]} wrap={false}>
                      <Col>
                        <Row align="middle">
                          <EyeSVG />
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text>View Details</Typography.Text>
                      </Col>
                    </Row>
                  </Link>
                ),
                key: "1",
              },

              {
                label: (
                  <Row
                    onClick={() => {
                      DrawerAPI.open("70%");
                      DrawerAPI.setDrawerContent(
                        <EditWarehouses onClose={onClose} id={id} setRefresh={setRefresh} />,
                      );
                    }}
                    align="middle"
                    gutter={[8, 0]}
                    wrap={false}>
                    <Col>
                      <Row align="middle">
                        <EditSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text>Edit</Typography.Text>
                    </Col>
                  </Row>
                ),
                key: "2",
              },
              {
                label: (
                  <Row onClick={deleteWarehouse} align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <DeleteSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: "red" }}>Delete</Typography.Text>
                    </Col>
                  </Row>
                ),
                key: "3",
              },
            ],
          }}
          trigger={["click"]}
          placement="topRight">
          <div className="more-btn">
            <MoreSVG style={{ rotate: "90deg" }} />
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
}
