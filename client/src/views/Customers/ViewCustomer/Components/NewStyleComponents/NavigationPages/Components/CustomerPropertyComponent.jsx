import { useState, useMemo } from "react";
import "../../../../style.css";
import InvoicesSVG from "assets/jsx-svg/InvoicesSVG";
import { useNotification } from "context/notificationContext";

import { MoreDimentionSVG, ViewOrdersSVG, EyeSVG } from "assets/jsx-svg";
import { Switch, Dropdown, Menu, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import useSetDimensionEditMode from "services/Dimensions/Mutations/useAddCustomer";
import { useParams } from "react-router-dom";

const heightImage = 150;
export default function CustomerPropertyComponent({
  id,
  img,
  propertyName,
  isEnableUpdateChecked,
}) {
  const { id: customerId } = useParams();

  // var widthImage = 160;
  const navigate = useNavigate();
  const [isEnableUpdateCheckedState, setIsEnableUpdateChecked] = useState(isEnableUpdateChecked);
  const myStyle = useMemo(
    () => ({
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage: "url('" + img + "')",
      height: heightImage,
      width: "100%",
      borderRadius: 10,
      cursor: "pointer",
    }),
    [img],
  );
  const onEnableUpdateChecked = (e) => {
    console.log("cc=>", e);
    setDimensionEditModeRequest(id, customerId, e);
  };
  const onViewPropertyClicked = () => {
    navigate("/metaverse/" + propertyName);
  };
  const { openNotificationWithIcon } = useNotification();
  const { setDimensionEditMode, isPending } = useSetDimensionEditMode({
    onError: (data) => {
      var { errors } = data?.response.data;
      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      setIsEnableUpdateChecked(!isEnableUpdateCheckedState);
      openNotificationWithIcon(
        "success",
        payload?.isChecked ? "Enabled successfully" : "Disabled successfully",
        //"Changed successfully",
      );
    },
  });
  const setDimensionEditModeRequest = (dimentionId, customerId, isChecked) => {
    setDimensionEditMode({ dimentionId, customerId, isChecked });
  };
  return (
    <div className="customer-property-card">
      <div onClick={onViewPropertyClicked} title="View Property" style={myStyle}></div>
      <div className="row" style={{ marginTop: 12 }}>
        <div className="col-9">
          <div style={{ fontSize: 11, color: "#202020", opacity: "60%" }}>PROPERTY NAME</div>
          <div style={{ fontSize: 13, color: "#202020", fontWeight: 600 }}>{propertyName}</div>
        </div>
        <div
          className="col-3"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "end",
          }}>
          <div>
            <Dropdown
              dropdownRender={() => (
                <DimMenu
                  isEnableUpdateChecked={isEnableUpdateCheckedState}
                  onEnableUpdateChecked={onEnableUpdateChecked}
                  onViewPropertyClicked={onViewPropertyClicked}
                />
              )}
              trigger={["click"]}
              placement="bottomRight"
              arrow>
              <div style={{ cursor: "pointer" }}>
                <MoreDimentionSVG />
              </div>
            </Dropdown>
            {/* <MoreDimentionSVG /> */}
          </div>
          <div>{/* <button>View Invoice</button> */}</div>
        </div>
      </div>
    </div>
  );
}
const DimMenu = ({ onViewPropertyClicked, onEnableUpdateChecked, isEnableUpdateChecked }) => {
  // const { openMessage } = useNotification();
  return (
    <Menu
      className="profile-menu"
      style={{ width: "200px" }}
      items={[
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <EyeSVG />
                </Row>
              </Col>
              <Col>
                <Typography>View Property</Typography>
              </Col>
            </Row>
          ),
          key: "0",
          onClick: () => onViewPropertyClicked(),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <ViewOrdersSVG />
                </Row>
              </Col>
              <Col>
                <Typography>View Orders</Typography>
              </Col>
            </Row>
          ),
          key: "1",
          // onClick: () => onFolderEditView(),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <InvoicesSVG fill={"black"} />
                </Row>
              </Col>
              <Col>
                <Typography>View Invoices</Typography>
              </Col>
            </Row>
          ),
          key: "2",
          // onClick: () => onDeleteClicked(),
        },
        {
          label: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Enable Update</div>
              <div>
                <Switch
                  checked={isEnableUpdateChecked}
                  size="small"
                  onChange={(e) => onEnableUpdateChecked(e)}
                />
              </div>
            </div>
          ),
          key: "3",
          // onClick: () => onDeleteClicked(),
        },
      ]}
    />
  );
};
