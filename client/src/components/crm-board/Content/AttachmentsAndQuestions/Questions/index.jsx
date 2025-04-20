import React, { useState } from "react";
import "./styles.css";
import { Avatar, Button } from "antd";
import { CommentSVG } from "assets/jsx-svg";
import Editor from "../../Editor";
import newColorFind from "utils/randomColor";

const Questions = () => {
  const [openQuestions, setOpenQuestions] = useState([
    {
      id: "1",
      author: {
        name: "Terry Blackmon",
        avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      },
      question: "What important information needs to dine security review",
      repliesCount: 6,
    },
    {
      id: "2",
      author: {
        name: "Terry Blackmon",
        avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      },
      question: "What important information needs to dine security review",
      repliesCount: 2,
    },
    {
      id: "3",
      author: {
        name: "Terry Blackmon",
        avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      },
      question: "What important information needs to dine security review",
      repliesCount: 0,
    },
    {
      id: "4",
      author: {
        name: "Terry Blackmon",
        avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      },
      question: "What important information needs to dine security review",
      repliesCount: 0,
    },
  ]);

  return (
    <div>
      <Editor
        value=""
        onChange={(val) => {
          console.log(val);
        }}
        placeholder="Question description"
      />
      <div className="add_question">
        <Button size="small" type="primary">
          Add Question
        </Button>
      </div>
      <div className="open_questions">
        <div className="head">
          <p className="fz-14">Open Questions</p>
          <Button type="text" size="small">
            Show ALL
          </Button>
        </div>

        <div className="body">
          {openQuestions.map((item) => {
            return (
              <div className="question_card" key={item.id}>
                <div className="author_image">
                  <Avatar
                    src={item.author.avatar}
                    size={25}
                    icon={<div>{item.author.name?.slice(0, 2)}</div>}
                    style={{
                      backgroundColor: !item.author.avatar && `${newColorFind(item.author.name)}`,
                    }}
                  />
                </div>
                <div className="question">
                  <p className="fz-14">{item.author.name}</p>
                  <p className="fz-12">{item.question}</p>
                  <p className={`replies fz-12 ${item.repliesCount > 0 ? "active" : ""}`}>
                    <CommentSVG
                      color={item.repliesCount > 0 ? "#1131DA" : "#AEAEB2"}
                      width="16px"
                    />
                    {item.repliesCount} replies
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
