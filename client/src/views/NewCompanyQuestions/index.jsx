import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Typography, notification } from "antd";

import CommonService from "services/common.service";
import InviteTeammates from "./InviteTeammates";
import { questionsInfo } from "./Questions";
import { ColoredSmileSVG } from "assets/jsx-svg";
import { axiosCatch } from "utils/axiosUtils";

import "./styles.css";

export default function NewCompanyQuestions() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [activeQuestionPage, setActiveQuestionPage] = useState(1);
  const [questions, setQuestions] = useState(questionsInfo);
  const [loading, setLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);

  const selectAnswer = (data) => {
    setQuestions((prev) => {
      prev[activeQuestionPage - 1].selectedAnswer = data;
      return [...prev];
    });
  };

  const skip = async () => {
    try {
      setSkipLoading(true);
      await CommonService.updateInfo({
        businessType: questions[0].selectedAnswer,
        jobTitle: questions[1].selectedAnswer,
        goal: questions[2].selectedAnswer,
        noOfEmployee: questions[3].selectedAnswer,
      });
      navigate("/");
    } catch (ignore) {
    } finally {
      setSkipLoading(false);
    }
  };

  const onNextClick = async () => {
    if (activeQuestionPage === 4) {
      try {
        setLoading(true);
        await CommonService.updateInfo({
          businessType: questions[0].selectedAnswer,
          jobTitle: questions[1].selectedAnswer,
          goal: questions[2].selectedAnswer,
          noOfEmployee: questions[3].selectedAnswer,
        });
        notification.success({ message: "Your Answers Saved Successfully, Thanks" });
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    }
    if (activeQuestionPage === 5) {
      form.submit();
    }
    setActiveQuestionPage((prev) => {
      if (prev === 5) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  return (
    <Row className="new-company-questions">
      <Col xs={24} lg={16}>
        <Row justify="space-between" className="new-company-questions-main">
          <Col flex={1} className="new-company-questions-main-info">
            <Row gutter={[8, 0]} align="middle" style={{ marginBottom: "12px" }}>
              <Col>
                <Typography.Title level={2} className="fz-20 fw-500">
                  Welcome to Vindo
                </Typography.Title>
              </Col>
              <Col>
                <Row align="middle">
                  <ColoredSmileSVG />
                </Row>
              </Col>
            </Row>
            <Typography.Text className="fz-16 fw-500 gc">
              Here are some questions about your tearn, career, an company
            </Typography.Text>
            <br />
            <Typography.Title level={3} className="fz-20" style={{ marginBlock: "40px 24px" }}>
              {questions[activeQuestionPage - 1].title}
            </Typography.Title>

            <Row gutter={[10, 16]} align="middle">
              {questions[activeQuestionPage - 1].btns?.map((btn) => (
                <Col key={btn}>
                  <button
                    className={`select-btn ${
                      questions[activeQuestionPage - 1].selectedAnswer === btn
                        ? "active-select-btn"
                        : ""
                    }`}
                    onClick={() => selectAnswer(btn)}>
                    {btn}
                  </button>
                </Col>
              ))}
            </Row>

            {activeQuestionPage === 5 && (
              <>
                <Typography.Text className="fz-20 gc fw-500">We’re almost done</Typography.Text>

                <InviteTeammates form={form} setLoading={setLoading} />
              </>
            )}
          </Col>
          <Col>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                <Row align="middle" gutter={[8, 0]}>
                  {questions
                    .map((info) => info.id)
                    .map((data) => (
                      <Col key={data}>
                        <div
                          className={`steps ${data <= activeQuestionPage ? "active-step" : ""}`}
                        />
                      </Col>
                    ))}
                </Row>
              </Col>
              <Col>
                <Row gutter={[8, 8]}>
                  <Col>
                    <Button
                      loading={skipLoading}
                      onClick={skip}
                      type="ghost"
                      style={{ width: "100px" }}>
                      Skip
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      className="next-btn"
                      onClick={onNextClick}
                      loading={loading}>
                      {activeQuestionPage === 5 ? "Invite Members" : "Next"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col
        xs={0}
        lg={8}
        className="new-company-questions-image"
        style={{
          background: `url(${questions[activeQuestionPage - 1].image})`,
        }}></Col>
    </Row>
  );
}
