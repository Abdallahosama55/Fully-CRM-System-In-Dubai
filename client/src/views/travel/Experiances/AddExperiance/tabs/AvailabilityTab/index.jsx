import { useState } from "react";
import StepsSection from "../../components/StepsSection";
import { AvailabilitySessions, AvailabilityType, Capacity, MinimumNotice } from "./Steps";

// constants
import { AVAILABILITY_TYPES } from "constants/EXPERIENCE";
import { STEPS_KEYS } from "../..";
import PrevForm from "../../components/PrevForm";

const AvailabilityTab = ({ onNextTab, updateDoneSteps, onPrevTab, id, doneSteps }) => {
  const [availabilityType, setAvailabilityType] = useState(AVAILABILITY_TYPES.FREE_SALE);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const getAvailabilitySteps = (availabilityType) => {
    const props = {
      activeStepIndex,
      moveToStep: setActiveStepIndex,
      productId: id,
      setAvailabilityType,
      updateDoneSteps,
      next: () => {
        setActiveStepIndex((prev) => prev + 1);
      },
    };
    switch (availabilityType) {
      case AVAILABILITY_TYPES.PASS: {
        return [
          {
            title: "Availability Type",
            content: <AvailabilityType {...props} />,
            stepKey: STEPS_KEYS.AVAILABILITY_TYPE,
          },
          {
            title: "Capacity",
            content: <Capacity {...props} />,
            stepKey: STEPS_KEYS.CAPACITY,
          },
          {
            title: "Minimum Notice",
            content: <MinimumNotice {...{ ...props, next: onNextTab }} />,
            stepKey: STEPS_KEYS.MINIMUM_NOTICE,
          },
        ];
      }
      case AVAILABILITY_TYPES.DATE_AND_TIME: {
        return [
          {
            title: "Availability Type",
            content: <AvailabilityType {...props} />,
            stepKey: STEPS_KEYS.AVAILABILITY_TYPE,
          },
          {
            title: "Time & Date Range",
            content: <AvailabilitySessions {...props} />,
            stepKey: STEPS_KEYS.TIME_AND_DATE_RANGE,
          },
          {
            title: "Capacity",
            content: <Capacity {...props} />,
            stepKey: STEPS_KEYS.CAPACITY,
          },
          {
            title: "Minimum Notice",
            content: <MinimumNotice {...{ ...props, next: onNextTab }} />,
            stepKey: STEPS_KEYS.MINIMUM_NOTICE,
          },
        ];
      }

      default: {
        return [
          {
            title: "Availability Type",
            content: <AvailabilityType {...{ ...props, next: onNextTab }} />,
            stepKey: STEPS_KEYS.AVAILABILITY_TYPE,
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
        currentTabIndex={1}
        activeStepIndex={activeStepIndex}
        moveToStep={(index) => setActiveStepIndex(index)}
        doneSteps={doneSteps}
        stepsItems={getAvailabilitySteps(availabilityType).map((el) => ({
          title: el?.title,
          content: el?.content,
          stepKey: el?.stepKey,
        }))}
      />
    </>
  );
};

export default AvailabilityTab;
