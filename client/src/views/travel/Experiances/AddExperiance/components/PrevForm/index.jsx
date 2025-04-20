import { Form } from "antd";
import React from "react";

const PrevForm = ({handelPrev}) => {
  return <Form hidden onFinish={handelPrev} id={"form_previous"} />;
};

export default PrevForm;
