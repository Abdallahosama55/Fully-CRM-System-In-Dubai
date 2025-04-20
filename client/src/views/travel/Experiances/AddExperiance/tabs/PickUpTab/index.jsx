import { useState } from "react";
import StepsSection from "../../components/StepsSection";
import { DropOfServie, MeetingPoints, PickUpService, PickUpTiming, PickUpType } from "./Steps";
import { PICK_UP_TYPES } from "constants/EXPERIENCE";
import PrevForm from "../../components/PrevForm";
import { STEPS_KEYS } from "../..";

const PickUpTab = ({
  id,
  doneSteps,
  onNextTab = () => {},
  updateDoneSteps = () => {},
  onPrevTab = () => {},
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [pickUpType, setPickUpType] = useState(PICK_UP_TYPES.MEET_ON_LOCATION);

  const getPickUpSteps = (pickUpType) => {
    const props = {
      activeStepIndex,
      moveToStep: setActiveStepIndex,
      id,
      setPickUpType,
      updateDoneSteps,
      next: () => {
        setActiveStepIndex((prev) => prev + 1);
      },
    };

    switch (pickUpType) {
      case PICK_UP_TYPES.MEET_ON_LOCATION: {
        return [
          {
            title: "How To Get There?",
            content: <PickUpType {...props} />,
            stepKey: STEPS_KEYS.PICK_UP_TYPE,
          },
          {
            title: "Meeting Points",
            content: <MeetingPoints {...props} />,
            stepKey: STEPS_KEYS.MEETING_POINTS,
          },
          {
            title: "Drop-Off Service",
            content: <DropOfServie {...{ ...props, next: onNextTab }} />,
            stepKey: STEPS_KEYS.DROP_OFF_SERVICE,
          },
        ];
      }
      case PICK_UP_TYPES.PICK_UP_ONLY: {
        return [
          {
            title: "How To Get There?",
            content: <PickUpType {...props} />,
            stepKey: STEPS_KEYS.PICK_UP_TYPE,
          },
          {
            title: "Pick-Up Service",
            content: <PickUpService {...props} />,
            stepKey: STEPS_KEYS.PICK_UP_SERVICE,
          },
          {
            title: "Drop-Off Service",
            content: <DropOfServie {...{ ...props, next: onNextTab }} />,
            stepKey: STEPS_KEYS.DROP_OFF_SERVICE,
          },
        ];
      }
      case PICK_UP_TYPES.MEET_ON_LOCATION_OR_PICK_UP: {
        return [
          {
            title: "How To Get There?",
            content: <PickUpType {...props} />,
            stepKey: STEPS_KEYS.PICK_UP_TYPE,
          },
          {
            title: "Meeting Points",
            content: <MeetingPoints {...props} />,
            stepKey: STEPS_KEYS.MEETING_POINTS,
          },
          {
            title: "Pick-Up Service",
            content: <PickUpService {...props} />,
            stepKey: STEPS_KEYS.PICK_UP_SERVICE,
          },
          {
            title: "Pick-Up Timing",
            content: <PickUpTiming {...props} />,
            stepKey: STEPS_KEYS.PICK_UP_TIMING,
          },
          {
            title: "Drop-Off Service",
            content: <DropOfServie {...{ ...props, next: onNextTab }} />,
            stepKey: STEPS_KEYS.DROP_OFF_SERVICE,
          },
        ];
      }
      default: {
        return [
          {
            title: "How To Get There?",
            content: <PickUpType {...{ ...props, next: onNextTab }} />,
            stepKey: STEPS_KEYS.PICK_UP_TYPE,
          },
        ];
      }
    }
  };

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
        doneSteps={doneSteps}
        activeStepIndex={activeStepIndex}
        moveToStep={(index) => setActiveStepIndex(index)}
        stepsItems={getPickUpSteps(pickUpType).map((el) => ({
          title: el?.title,
          content: el?.content,
          stepKey: el?.stepKey,
        }))}
      />
    </>
  );
};

export default PickUpTab;
