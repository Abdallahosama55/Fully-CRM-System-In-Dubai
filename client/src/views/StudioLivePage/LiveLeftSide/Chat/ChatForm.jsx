import { useContext, useState } from "react";
import { Col, Dropdown, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { push, ref, set } from "firebase/database";

import userContext from "context/userContext";
import { Send3SVG } from "assets/jsx-svg";
import SmileEmoji from "assets/jsx-svg/SmileEmojiSVG";

import "./styles.css";

function ChatForm({ db, liveId }) {
  const [form] = Form.useForm();
  const { user } = useContext(userContext);
  const [open, setOpen] = useState(false);

  const onFinish = (value) => {
    if (value.comment) {
      const infoRef = ref(db, `vverse/${liveId}/chats/massages`);

      const newPostRef = push(infoRef);

      set(newPostRef, {
        text: value.comment,
        date: dayjs().valueOf(),
        id: user?.id,
        fullName: user?.fullName,
        profileImage: user?.profileImage || "",
      });
      form.setFieldValue("comment", "");
    }
  };

  return (
    <>
      <Form
        form={form}
        requiredMark={false}
        className="form-comment"
        style={{ marginTop: "16px", backgroundColor: "#fff" }}
        onFinish={onFinish}>
        <Row gutter={[16, 0]} wrap={false}>
          <Col style={{ paddingLeft: "17px" }} flex={1}>
            <Row>
              <Form.Item initialValue={""} name="comment" noStyle className="w-100">
                <Input
                  disabled={!user}
                  placeholder="Write a Comment..."
                  className="comment-input"
                />
              </Form.Item>
            </Row>
            <Row className="mt-8" align="middle" justify="space-between">
              <Col>
                <Dropdown
                  open={open}
                  trigger={["click"]}
                  dropdownRender={() => (
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji) => {
                        form.setFieldValue("comment", form.getFieldValue("comment") + emoji.native);
                      }}
                      portal={false}
                      onClickOutside={() => setOpen(false)}
                    />
                  )}>
                  <SmileEmoji
                    onClick={() => {
                      setTimeout(() => {
                        setOpen((prev) => !prev);
                      }, 10);
                    }}
                    className="items-center clickable"
                    color="#8E8E93"
                    style={{ width: "16px", height: "16px" }}
                  />
                </Dropdown>
              </Col>
              <Col>
                <Row gutter={[8, 0]} style={{ flexDirection: "row-reverse" }}>
                  <Col>
                    <button
                      disabled={!user}
                      onClick={() => form.submit()}
                      className="verse-action-btns">
                      <Send3SVG />
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default ChatForm;
