import { Col, Row, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { ArrowRightSVG } from "assets/jsx-svg";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "utils/firebase.utils";
import ChatForm from "./ChatForm";
import ChatCommentList from "./ChatCommentList";

import "./styles.css";

function Chat({ setActiveBtn, fromContent = false }) {
  const { liveId } = useParams();
  const [comment, setComment] = useState();
  const scrollableRef = useRef();

  const db = getDatabase();

  const scrollToBottom = () => {
    if (scrollableRef.current) {
      const scrollableContainer = scrollableRef.current;
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  };

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [comment]);

  useEffect(() => {
    const referencenew = ref(db, `vverse/${liveId}/chats/massages`);
    onValue(referencenew, (data) => {
      const value = data.val();
      if (value) {
        setComment(Object.entries(value));
      } else {
        setComment([]);
      }
    });
  }, [db, setComment, liveId]);

  return (
    <section
      className="chat"
      style={{
        border: fromContent ? "1px solid #ccc" : "",
      }}>
      {fromContent ? null : (
        <Row
          wrap={false}
          align="middle"
          gutter={[8, 0]}
          style={{ width: "fit-content", marginBottom: "20px" }}
          className="clickable"
          onClick={() => setActiveBtn(null)}>
          <Col>
            <Row align="middle">
              <ArrowRightSVG color="#8E8E93" style={{ rotate: "180deg" }} />
            </Row>
          </Col>
          <Col>
            <Typography.Text className="gc">Back</Typography.Text>
          </Col>
        </Row>
      )}

      <div style={{ marginBottom: "10px" }} className="bc fw-600 fz-14">
        Verse chat
      </div>
      <section
        className="comments-holder"
        style={{
          height: fromContent ? "calc(100vh - 235px)" : "",
        }}
        ref={scrollableRef}>
        <ChatCommentList db={db} liveId={liveId} comment={comment} setComment={setComment} />
      </section>
      <ChatForm scrollToBottom={scrollToBottom} db={db} liveId={liveId} />
    </section>
  );
}

export default Chat;
