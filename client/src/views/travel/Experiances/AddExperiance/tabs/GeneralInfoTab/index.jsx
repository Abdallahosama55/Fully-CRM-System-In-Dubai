import { useState } from "react";
import StepsSection from "../../components/StepsSection";
import GeneralInfo from "./Steps/GeneralInfo";
import Itinerary from "./Steps/Itinerary";
import Media from "./Steps/Media";
import InclusionsAndExclusions from "./Steps/InclusionsAndExclusions";
import Info from "./Steps/Info";
import Type from "./Steps/Type";
import { STEPS_KEYS } from "../..";
import PrevForm from "../../components/PrevForm";

const GeneralInfoTab = ({
  onNextTab = () => {},
  updateDoneSteps = () => {},
  onPrevTab = () => {},
  id,
  setId,
  doneSteps,
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
        doneSteps={doneSteps}
        moveToStep={(index) => setActiveStepIndex(index)}
        stepsItems={[
          {
            title: "General & Theme",
            content: (
              <GeneralInfo
                next={() => {
                  setActiveStepIndex(1);
                  updateDoneSteps(STEPS_KEYS.GENERAL);
                }}
                id={id}
                setId={setId}
              />
            ),
            stepKey: STEPS_KEYS.GENERAL,
          },
          {
            title: "Itinerary",
            content: (
              <Itinerary
                next={() => {
                  setActiveStepIndex(2);
                  updateDoneSteps(STEPS_KEYS.ITINERARY);
                }}
                id={id}
              />
            ),
            stepKey: STEPS_KEYS.ITINERARY,
          },
          {
            title: "Media",
            content: (
              <Media
                next={() => {
                  setActiveStepIndex(3);
                  updateDoneSteps(STEPS_KEYS.MEDIA);
                }}
                id={id}
              />
            ),
            stepKey: STEPS_KEYS.MEDIA,
          },
          {
            title: "Includes/Excludes",
            content: (
              <InclusionsAndExclusions
                next={() => {
                  setActiveStepIndex(4);
                  updateDoneSteps(STEPS_KEYS.INCLUDES_EXCLUDES);
                }}
                id={id}
              />
            ),
            stepKey: STEPS_KEYS.INCLUDES_EXCLUDES,
          },
          {
            title: "Info",
            content: (
              <Info
                next={() => {
                  setActiveStepIndex(5);
                  updateDoneSteps(STEPS_KEYS.INFO);
                }}
                id={id}
              />
            ),
            stepKey: STEPS_KEYS.INFO,
          },
          {
            title: "Type",
            content: (
              <Type
                next={() => {
                  updateDoneSteps(STEPS_KEYS.TYPE);
                  onNextTab();
                }}
                id={id}
              />
            ),
            stepKey: STEPS_KEYS.TYPE,
          },
        ]}
      />
    </>
  );
};

export default GeneralInfoTab;
