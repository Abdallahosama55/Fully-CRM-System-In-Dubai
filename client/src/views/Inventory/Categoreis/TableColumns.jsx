import { Col, Dropdown, Image, Row, Typography } from "antd";
import { DeleteSVG, EditSVG, EyeSVG, MoreSVG } from "assets/jsx-svg";
import { useState } from "react";

import "./styles.css";
import EditCategoreis from "./Edit-Categoreis/EditCategoreis";
import CategoryService from "services/category.service";
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
    width: 140,
  },
  {
    title: "Sort Order",
    dataIndex: "sortOrder",
    ellipsis: true,
    align: "center",
    width: 140,
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 140,
    render: (action) => (
      <RowAction
        setCategoreisCount={action.setCategoreisCount}
        setCategoreisdata={action.setCategoreisdata}
        id={action.id}
        category={action.category}
        setRefresh={action.setRefresh}
      />
    ),
  },
];

function RowAction({ id, setCategoreisdata, setCategoreisCount, setRefresh, category }) {
  const DrawerAPI = useDrawer();
  const { openNotificationWithIcon } = useNotification();

  const [isDeletionLoading, setIsDeletionLoading] = useState(false);
  const onClose = () => {
    DrawerAPI.close();
  };

  const deleteCategory = () => {
    setIsDeletionLoading(true);
    CategoryService.CategoryDelete(id).then(
      (response) => {
        const { deletedCategories, categoriesCannotBeDeleted } = response.data || {};

        setIsDeletionLoading(false);
        if (deletedCategories.length >= 1) {
          setCategoreisdata((category) => {
            return category.filter((data) => !deletedCategories.includes(Number(data.id)));
          });
          setCategoreisCount((prev) => prev - 1);
        }
        if (categoriesCannotBeDeleted >= 1) {
          openNotificationWithIcon("error", "can not delete this category");
        }
      },
      () => {
        setIsDeletionLoading(false);
        openNotificationWithIcon("error", "Something wrong happened!");
      },
    );
  };

  return (
    <Row wrap={false} justify="center" align="middle" gutter={[6, 0]}>
      {DrawerAPI.Render}
      <Col>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Link to={`/inventory/categoreis/categoreis-info/${id}`}>
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
                    <EditCategoreis DrawerAPI={DrawerAPI} onClose={onClose} id={id} setRefresh={setRefresh} />,
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
                onClick: deleteCategory,
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
