import React from "react";
import { Button, Flex, Modal } from "antd";
export default function WarningModal({
  handleOk,
  handleCancel,
  isWarningModalOpen,
  warningBody,
  warningTitle,
}) {
  return (
    <Modal
      centered={true}
      width={400}
      title={null}
      open={isWarningModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}>
      <h3
        style={{
          textAlign: "center",
        }}>
        Warning
      </h3>
      {warningTitle && <p>{warningTitle}</p>}
      <p
        style={{
          textAlign: "center",
          marginTop: "1rem",
        }}>
        {warningBody}
      </p>
      <Flex
        justify="space-between"
        style={{
          marginTop: "2rem",
        }}>
        <Button size="small" style={{ width: "48%" }} block onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          style={{
            width: "48%",
            backgroundColor: "#e81224",
            color: "#ffffff",
          }}
          size="small"
          onClick={handleOk}>
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
}
