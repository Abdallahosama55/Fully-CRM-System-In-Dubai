import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Button, Col, Form, Input, Row } from "antd";

import userContext from "context/userContext";
import PostsService from "services/posts.service";
import { axiosCatch } from "utils/axiosUtils";
import { stringAvatar } from "utils/string";

import "./styles.css";

export default function CreateTextPost({ setPostsList }) {
  const [form] = Form.useForm();
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const description = Form.useWatch("description", form);
  const { communityId } = useParams();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await PostsService.createPost({
        communityId,
        content: values.description,
      });
      setPostsList((prev) => [
        {
          ...res.data.data,
          communityPostLikes: [],
          account: {
            fullName: user.fullName,
            profileImage: user.profileImage,
          },
          comment: [],
        },
        ...prev,
      ]);
      setLoading(false);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Form form={form} name="send-post" onFinish={onFinish}>
      <Row gutter={[14, 0]} align="top" justify="space-between">
        <Col>
          <Avatar
            size={45}
            style={{ objectFit: "cover" }}
            src={user?.profileImag}
            {...(user?.profileImag ? {} : { ...stringAvatar(user?.fullName) })}
            className="center-items"
          />
        </Col>

        <Col flex="1">
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}>
            <Input.TextArea
              rows={1}
              className={`create-post-text-input ${inputFocused ? "active" : ""}`}
              placeholder="What's in your mind"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={loading}
              style={{
                background: "#3A5EE3 ",
                color: "#fff",
                borderRadius: "14px",
                width: "96px",
                pointerEvents: description ? "auto" : "none",
                opacity: description ? "1" : "0.5",
              }}>
              Post
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
