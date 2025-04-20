import StepsSection from "../../components/StepsSection";
import NewRates from "./Steps/NewRates";
import Cancellations from "./Steps/Cancellations";
import ContactInfo from "./Steps/ContactInfo";
// style
import "./styles.css";
import { useState } from "react";
import PrevForm from "../../components/PrevForm";
import { STEPS_KEYS } from "../..";
const PricingTab = ({
  id,
  doneSteps,
  onNextTab = () => {},
  updateDoneSteps = () => {},
  onPrevTab = () => {},
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  return (
    <>
      <PrevForm
        handelPrev={() => {
          if (activeStepIndex === 0) {
            onPrevTab();
          } else {
            setActiveStepIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
          }
        }}
      />
      <StepsSection
        activeStepIndex={activeStepIndex}
        currentTabIndex={3}
        doneSteps={doneSteps}
        moveToStep={(index) => setActiveStepIndex(index)}
        stepsItems={[
          {
            title: "Cancellation policy",
            content: (
              <Cancellations
                productId={id}
                next={() => {
                  setActiveStepIndex(1);
                  updateDoneSteps(STEPS_KEYS.CANCELLATIONS_POLICIES);
                }}
              />
            ),
            stepKey: STEPS_KEYS.CANCELLATIONS_POLICIES,
          },
          {
            title: "Pricing rates",
            content: (
              <NewRates
                productId={id}
                next={() => {
                  setActiveStepIndex(2);
                  updateDoneSteps(STEPS_KEYS.PRICING_RATES);
                }}
              />
            ),
            stepKey: STEPS_KEYS.PRICING_RATES,
          },
          {
            title: "Contact info",
            content: (
              <ContactInfo
                productId={id}
                next={() => {
                  onNextTab();
                  updateDoneSteps(STEPS_KEYS.CONTACT_INFO);
                }}
              />
            ),
            stepKey: STEPS_KEYS.CONTACT_INFO,
          },
        ]}
      />
    </>
  );
};

export default PricingTab;
