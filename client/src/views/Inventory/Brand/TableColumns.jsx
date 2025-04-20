import { Col, Dropdown, Image, Row, Typography } from "antd";
import { DeleteSVG, EditSVG, EyeSVG, MoreSVG } from "assets/jsx-svg";
import { useState } from "react";
import BrandsService from "services/brands.service";

import "./styles.css";
import EditBrands from "./Edit-Brands/EditBrands";
import { Link } from "react-router-dom";
import { useNotification } from "context/notificationContext";
import { useDrawer } from "hooks/useDrawer";

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
    title: "Parent",
    dataIndex: "parent",
    ellipsis: true,
    align: "center",
  },
  {
    title: "Sort Order",
    dataIndex: "sortOrder",
    ellipsis: true,
    align: "center",
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 140,
    render: (action) => (
      <RowAction
        setBrandsCount={action.setBrandsCount}
        setBrandsdata={action.setBrandsdata}
        id={action.id}
        setRefresh={action.setRefresh}
      />
    ),
  },
];

function RowAction({ id, setBrandsdata, setBrandsCount, setRefresh }) {
  const { openNotificationWithIcon } = useNotification();
  const DrawerAPI = useDrawer();

  const [isDeletionLoading, setIsDeletionLoading] = useState(false);
  const onClose = () => {
    DrawerAPI.close();
  };

  const deleteBrands = () => {
    setIsDeletionLoading(true);
    BrandsService.BrandDelete(id).then(
      (response) => {
        const { deletedBrands, brandsCannotBeDeleted } = response.data || {};
        setIsDeletionLoading(false);
        if (deletedBrands.length >= 1) {
          setBrandsdata((prev) => {
            return prev.filter((brand) => {
              return !deletedBrands.includes(String(brand.id));
            });
          });
          deletedBrands && setBrandsCount((prev) => prev - 1);
        }
        if (brandsCannotBeDeleted.length >= 1) {
          openNotificationWithIcon("error", "Can not delete this Brand");
        }
      },
      () => {
        setIsDeletionLoading(false);
        openNotificationWithIcon("error", "Something wrong happend!");
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
                  <Link to={`/inventory/brands/brands-info/${id}`}>
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
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
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
                onClick: () => {
                  DrawerAPI.open("70%");
                  DrawerAPI.setDrawerContent(
                    <EditBrands onClose={onClose} id={id} setRefresh={setRefresh} />,
                  );
                },
              },
              {
                label: (
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
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
                onClick: deleteBrands,
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
