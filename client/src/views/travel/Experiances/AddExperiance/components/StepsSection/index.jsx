import { Col, Row, Steps } from "antd";
// style
import "./styles.css";
import { CheckMarkSVG } from "assets/jsx-svg";

const StepsSection = ({
  stepsItems,
  activeStepIndex,
  currentStepsCount,
  moveToStep,
  doneSteps,
}) => {
  return (
    <div className="experiance_tab">
      <Row gutter={[10, 10]} style={{ height: "100%" }}>
        <Col md={6} xs={24} className="steps_section">
          <Steps
            className="travel-experiances-setp-section-steps"
            direction="vertical"
            current={activeStepIndex}
            items={stepsItems.map((item, index) => {
              return {
                title: (
                  <span
                    style={{
                      display: activeStepIndex < index ? "flex" : "",
                      alignItems: activeStepIndex < index ? "center" : "",
                    }}>
                    {item.title}
                  </span>
                ),
                description:
                  activeStepIndex === index ? (
                    <span className="active_step">In Progress</span>
                  ) : doneSteps?.find((el) => el === item?.stepKey) ? (
                    <span className="finished_step">Completed</span>
                  ) : null,
                icon:
                  doneSteps?.find((el) => el === item?.stepKey) && activeStepIndex !== index ? (
                    <CheckMarkSVG width="23" height="19" color="#FFF" />
                  ) : null,
                onClick: () => {
                  if (doneSteps?.find((el) => el === item?.stepKey)) {
                    moveToStep(index);
                    return;
                  }
                },
              };
            })}
          />
        </Col>
        <Col md={18} xs={24}>
          <div className="experiance_tab_content">
            {activeStepIndex > currentStepsCount
              ? ""
              : activeStepIndex >= stepsItems?.length
              ? stepsItems[0].content
              : stepsItems[activeStepIndex].content}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StepsSection;
