import React from "react";
import { Button, Modal, Row } from "antd";
import defaultDim from "assets/images/house.png";

export default function JoinMetaversModal({
  handleOk,
  handleCancel,
  isModalOpen,
  data,
  width = 400,
}) {
  return (
    <Modal
      destroyOnClose={true}
      centered={true}
      width={width}
      title={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}>
      <h3 style={{ color: "#030713", fontWeight: 500, fontSize: 14 }}>{data?.title}</h3>
      <hr style={{ borderColor: "#AEAEB23D", marginTop: 7 }} />
      <div
        style={{
          margin: "15px 0px",
          //   backgroundImage: `url(${data?.customerDimension?.image})`,
          backgroundImage: !data?.hoverImage ? `url(${defaultDim})` : `url(${data?.hoverImage})`,
          backgroundSize: "cover",
          height: 184,
          width: "100%",
          borderRadius: 8,
        }}></div>
      {data?.description && (
        <div>
          <h3 style={{ color: "#030713", fontWeight: 500, fontSize: 12 }}>Descrption</h3>
          <p
            style={{ color: "#667085", fontWeight: 400, fontSize: 11, margin: "7px 0px 15px 0px" }}>
            {data?.description}
          </p>
        </div>
      )}
      <Row>
        <Button
          size="large"
          style={{
            width: "100%",
            backgroundColor: "#3A5EE3",
            color: "#FFFFFF",
          }}
          onClick={handleOk}>
          Join Metaverse
        </Button>
      </Row>
    </Modal>
  );
}
