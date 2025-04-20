import { Col, Dropdown, Row, Typography } from "antd";
import { EyeSVG, MoreSVG } from "assets/jsx-svg";
import { useDrawer } from "context/drawerContext";
import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { statusClass } from "utils/getStatusClass";
import Invoice from "views/InvoicePage";
import EditOrder from "views/Orders/EditOrder";
import userContext from "context/userContext";

function Price({ price }) {
  const { user } = useContext(userContext);
  return (
    <div>
      {user.symbol} {price}
    </div>
  );
}

export const columns = [
  {
    title: "Order Number",
    dataIndex: "orderNumber",
    ellipsis: true,
  },
  {
    title: "Num.of Products",
    dataIndex: "numberOfProducts",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    ellipsis: true,
    align: "center",
    render: (price) => <Price price={price} />,
  },
  // {
  //   title: "Delivery Status",
  //   dataIndex: "deliveryStatus",
  //   align: "center",
  //   render: (deliveryStatus) => (
  //     <Typography.Text className={`${statusClass(deliveryStatus)}-status status`}>
  //       {deliveryStatus}
  //     </Typography.Text>
  //   ),
  //   ellipsis: true,
  //   width: 150,
  // },
  {
    title: "Status",
    dataIndex: "status",
    align: "center",
    render: (status) => (
      <Typography.Text className={`${statusClass(status)}-status status`}>{status}</Typography.Text>
    ),
    ellipsis: true,
    width: 150,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (action) => (
      <RowAction
        action={action.action}
        setTableData={action.setTableData}
        setFilteredData={action.setFilteredData}
      />
    ),
    width: 120,
  },
];

function RowAction({ action, setTableData, setFilteredData }) {
  const DrawerAPI = useDrawer();

  const onClose = () => {
    DrawerAPI.close();
  };
  const deleteRow = async (id) => {
    setTableData((prev) => prev.filter((row) => row.action !== id));
    setFilteredData((prev) => prev.filter((row) => row.action !== id));
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Row wrap={false} justify="center" align="middle" gutter={[6, 0]}>
      <Col>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Link to={`/inventory/order/${action.id}`}>
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

              // {
              //   label: (
              //     <Row
              //       onClick={() => {
              //         DrawerAPI.open("70%");
              //         DrawerAPI.setDrawerContent(<EditOrder />);
              //       }}
              //       align="middle"
              //       gutter={[8, 0]}
              //       wrap={false}>
              //       <Col>
              //         <Row align="middle">
              //           <EditSVG />
              //         </Row>
              //       </Col>
              //       <Col>
              //         <Typography.Text>Edit</Typography.Text>
              //       </Col>
              //     </Row>
              //   ),
              //   key: "2",
              // },
              // {
              //   label: (
              //     <Row onClick={handlePrint} align="middle" gutter={[8, 0]} wrap={false}>
              //       <Col>
              //         <Row align="middle">
              //           <PrintSVG />
              //         </Row>
              //       </Col>
              //       <Col>
              //         <Typography.Text>Print</Typography.Text>
              //       </Col>
              //     </Row>
              //   ),
              //   key: "3",
              // },
              // {
              //   label: (
              //     <Row
              //       onClick={() => deleteRow(action)}
              //       align="middle"
              //       gutter={[8, 0]}
              //       wrap={false}>
              //       <Col>
              //         <Row align="middle">
              //           <DeleteSVG />
              //         </Row>
              //       </Col>
              //       <Col>
              //         <Typography.Text style={{ color: "red" }}>Delete</Typography.Text>
              //       </Col>
              //     </Row>
              //   ),
              //   key: "4",
              // },
            ],
          }}
          trigger={["click"]}
          placement="topRight">
          <div className="more-btn">
            <MoreSVG style={{ rotate: "90deg" }} />
          </div>
        </Dropdown>
      </Col>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <Invoice />
        </div>
      </div>
    </Row>
  );
}
