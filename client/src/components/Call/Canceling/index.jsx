import { Button, Modal, Typography } from "antd";
import { PhoneCallSVG } from "assets/jsx-svg";
import React, { useState } from "react";

import "./styles.css";

function Canceling() {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <div onClick={() => setModal2Open(true)} className="phone-call marginTop">
        <PhoneCallSVG />
      </div>
      <Modal
        width={350}
        centered={true}
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        bodyStyle={{ textAlign: "center" }}
        footer={null}
      >
        <div className="model-body-canceling">
          <Typography.Title className="are-you-sure">
            Are you Sure?
          </Typography.Title>
          <Typography.Text className="text-cancling">
            Hang up on call? please make sure all good before hanging up on
            call.
          </Typography.Text>
          <hr className="line" />

          <Button type="text" className="leave-call">
            Leave call
          </Button>
          <hr className="line" />
          <Button onClick={() => setModal2Open(false)} type="text">
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Canceling;
