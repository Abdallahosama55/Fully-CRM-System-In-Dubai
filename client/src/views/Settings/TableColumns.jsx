import { Col, Dropdown, Image, Row, Typography, notification } from "antd";
import { DeleteSVG, DuplicateSVG, EditSVG, EyeSVG, MoreSVG } from "assets/jsx-svg";
import { useNotification } from "context/notificationContext";
import { useState, useContext } from "react";

// import "./styles.css";
import StoreService from "services/store.service";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 200,
  },

  {
    title: "value",
    dataIndex: "value",
    width: 200,
    ellipsis: true,
  },

  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 140,
    render: (action) => (
      <RowAction
        tab={action.tab}
        settlistTax={action.settlistTax}
        setId={action.setId}
        setIsModalOpen={action.setIsModalOpen}
        setRefresh={action.setRefresh}
        setTabsData={action.setTabsData}
      />
    ),
  },
];

function RowAction({ tab, setId, setIsModalOpen, setRefresh, setTabsData }) {
  const { openNotificationWithIcon } = useNotification();
  const deleteProduct = () => {
    StoreService.deleteTax(tab.id).then(
      () => {
        setRefresh((prev) => !prev);
        openNotificationWithIcon("success", "deleted sucessfully");
      },
      () => {
        notification.error({ description: "Something wrong happend!" });
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
                  setId(tab.id);
                  setIsModalOpen(true);
                  setTabsData(tab);
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
                key: "4",
                onClick: deleteProduct,
              },
            ],
          }}
          trigger={["click"]}
          placement="topRight">
          <div className="more-btn clickable">
            <MoreSVG style={{ rotate: "90deg" }} />
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
}
