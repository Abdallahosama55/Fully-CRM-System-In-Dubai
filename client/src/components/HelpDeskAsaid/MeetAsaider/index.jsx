import { useContext, useEffect, useState } from "react";
import { Row, Typography } from "antd";
import { EyeInvisibleFilled } from "@ant-design/icons";

import userContext from "context/userContext";
import MeetingCallParticipants from "../MeetingCallParticipants";

import "./styles.css";
import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "utils/firebase.utils";
import { useSearchParams } from "react-router-dom";
import Counter from "../Counter";

export default function MeetAsaider({ activeBtn, setHideSide }) {
  const { user } = useContext(userContext);
  const [employees, setEmployees] = useState([]);
  const [searchParams] = useSearchParams();
  const db = getDatabase();

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    const chatId = searchParams.get("chatId");
    const chatEmployeesRef = ref(db, `Company/${user.companyId}/chats/${chatId}/assignedEmployees`);

    onValue(chatEmployeesRef, (data) => {
      const value = data.val();

      if (value && chatId) {
        setEmployees(Object.keys(value));
      } else {
        setEmployees([]);
      }
    });
  }, [db, searchParams, user.companyId]);

  console.log(activeBtn);

  return (
    <aside className="h-100">
      <Row align="middle" justify="end" className="mb-1">
        <div className="hide-sider clickable" onClick={() => setHideSide(true)}>
          <EyeInvisibleFilled style={{ color: "#8E8E93" }} />
          <Typography.Text className="fw-500 gc">Hide Panel</Typography.Text>
        </div>
      </Row>
      <section className="meet-asider-holder">
        {activeBtn === "participant" && <MeetingCallParticipants employees={employees} />}

        {activeBtn === "counter" && <Counter db={db} />}

        {/* {activeBtn === "files" && <FilesSharing />} */}
      </section>
    </aside>
  );
}
