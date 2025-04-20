import React, { useEffect, useState } from "react";
import formatNumber from "utils/formatNumber";

const AnimatedNumber = ({
  value,
  duration = 500,
  isFormated,
  style = {},
  className = "",
  prefix = "",
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  useEffect(() => {
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      console.log("HELLO WORLD");
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      let newValue = Math.floor(progress * value);

      if (isNaN(newValue)) newValue = 0;

      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);

    return () => {
      setCurrentValue(0);
    };
  }, [value, duration]);

  return (
    <p style={style} className={className}>
      {prefix}
      {isFormated
        ? formatNumber(isNaN(currentValue) ? 0 : currentValue)
        : !isNaN(currentValue)
        ? Number.isInteger(currentValue)
          ? currentValue.toLocaleString()
          : currentValue.toFixed(2).toLocaleString()
        : 0}
    </p>
  );
};

export default AnimatedNumber;
