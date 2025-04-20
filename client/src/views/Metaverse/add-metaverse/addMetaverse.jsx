import { Modal } from "antd";
import React from "react";
import CreateMetaverseForm from ".";

function AddMetaverseForm({ modalOpen, setModalOpen }) {
  return (
    <Modal
      style={{ top: 20 }}
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => {
        setModalOpen(false);
      }}
      destroyOnClose
      width="700px">
      <CreateMetaverseForm setModalOpen={setModalOpen} />
    </Modal>
  );
}

export default AddMetaverseForm;
