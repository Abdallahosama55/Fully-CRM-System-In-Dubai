import { Col, Dropdown, Image, Row, Typography } from "antd";
import { DeleteSVG, EditSVG, MoreSVG } from "assets/jsx-svg";

import "./styles.css";
import { useNotification } from "context/notificationContext";
import StoreService from "services/store.service";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 200,
    ellipsis: true,
  },

  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 140,
    render: (actions) => (
      <RowAction
        id={actions.paymntGatewayId}
        setListCompanyPaymentGatewayData={actions.setListCompanyPaymentGatewayData}
        setIsLoading={actions.setIsLoading}
        setId={actions.setId}
        showModal={actions.showModal}
        data={actions.data}
      />
    ),
  },
];

function RowAction({ id, setIsLoading, setListCompanyPaymentGatewayData, setId, showModal, data }) {
  const { openNotificationWithIcon } = useNotification();
  const deleteCompanyPaymentGateway = async () => {
    try {
      setIsLoading(true);
      await StoreService.deleteCompanyPaymentGateway(id);
      setListCompanyPaymentGatewayData((prev) => prev.filter((data) => data.id !== id));
      openNotificationWithIcon("success", "Delete CompanyPaymentGateway successfully");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      openNotificationWithIcon("error", "Something went wrong");
    }
  };

  const editCompanyPaymentGateway = () => {
    setId(id);
    showModal(data);
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
                        <DeleteSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: "red" }}>Delete</Typography.Text>
                    </Col>
                  </Row>
                ),
                key: "1",
                onClick: deleteCompanyPaymentGateway,
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
                onClick: editCompanyPaymentGateway,
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
