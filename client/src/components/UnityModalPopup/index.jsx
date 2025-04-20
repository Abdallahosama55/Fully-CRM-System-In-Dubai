import { useEffect, useState } from "react";
import { Modal } from "antd";

export default function UnityModalPopup({ unityModalOpen, setUnityModalOpen }) {
  const [unityModalRef, setUnityModalRef] = useState(null);

  useEffect(() => {
    if (unityModalRef && unityModalOpen.html) {
      unityModalRef.src =
        "data:text/html;base64," +
        btoa(
          unityModalOpen.html +
            `
            <style>
              ::-webkit-scrollbar {
                  width: 6px;
                  height: 6px;
                  padding: 5px;
              }
              
              ::-webkit-scrollbar-track {
                  background: #b8b9bb;
                  border-radius: 16px;
              }
              
              ::-webkit-scrollbar-thumb {
                  background: #76797c;
                  border-radius: 16px;
              }
              
              ::-webkit-scrollbar-thumb:hover {
                  background: #555;
              }
              
              ::-webkit-scrollbar-corner {
                  background: transparent;
              }
            </style>`,
        );
    }
  }, [unityModalOpen, unityModalRef]);

  return (
    <Modal
      open={unityModalOpen}
      style={{
        top: +unityModalOpen.y === 0 ? unityModalOpen.y : "auto",
        left: +unityModalOpen.x === 0 ? unityModalOpen.x : "auto",
      }}
      className="unity-modal-popup"
      closeIcon={() => false}
      width={
        +unityModalOpen.w === 0
          ? 500
          : +unityModalOpen.w > window.innerWidth
          ? window.innerWidth
          : unityModalOpen.w
      }
      height={
        +unityModalOpen.h === 0
          ? 300
          : +unityModalOpen.h > window.innerHeight
          ? window.innerHeight
          : unityModalOpen.h
      }
      centered={+unityModalOpen.y === 0 && +unityModalOpen.x === 0}
      footer={false}
      onCancel={() => setUnityModalOpen(false)}>
      <iframe
        title="unity-html-popup"
        ref={setUnityModalRef}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}></iframe>
    </Modal>
  );
}
