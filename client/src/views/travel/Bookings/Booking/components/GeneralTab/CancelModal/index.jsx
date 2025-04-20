import { Modal } from "antd";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import React from "react";

const CancelModal = ({ isOpen, close, type }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={close}
      cancelText="Back"
      cancelButtonProps={{ type: "primary" }}
      okText="Cancel Now"
      okButtonProps={{ danger: true }}>
      {(() => {
        switch (type) {
          case BOOKINGS_TYPES.ACCOMMODATION:
            return <AccommodationCancelForm />;
          default:
            break;
        }
      })()}
    </Modal>
  );
};

const AccommodationCancelForm = () => {
  return <h1>HELLO</h1>;
};
export default CancelModal;
