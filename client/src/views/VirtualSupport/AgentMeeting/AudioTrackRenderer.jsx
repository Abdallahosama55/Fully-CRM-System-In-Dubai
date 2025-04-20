import { useEffect, useState } from "react";

export const AudioTrackRenderer = ({
  state,
  barWidth,
  minBarHeight,
  maxBarHeight,
  accentColor,
  frequencies,
  borderRadius,
  gap,
}) => {
  const summedFrequencies = frequencies.map((bandFrequencies) => {
    const sum = bandFrequencies.reduce((a, b) => a + b, 0);
    return Math.sqrt(sum / bandFrequencies.length);
  });

  const [thinkingIndex, setThinkingIndex] = useState(Math.floor(summedFrequencies.length / 2));
  const [thinkingDirection, setThinkingDirection] = useState("right");

  useEffect(() => {
    if (state !== "thinking") {
      setThinkingIndex(Math.floor(summedFrequencies.length / 2));
      return;
    }
    const timeout = setTimeout(() => {
      if (thinkingDirection === "right") {
        if (thinkingIndex === summedFrequencies.length - 1) {
          setThinkingDirection("left");
          setThinkingIndex((prev) => prev - 1);
        } else {
          setThinkingIndex((prev) => prev + 1);
        }
      } else {
        if (thinkingIndex === 0) {
          setThinkingDirection("right");
          setThinkingIndex((prev) => prev + 1);
        } else {
          setThinkingIndex((prev) => prev - 1);
        }
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [state, summedFrequencies.length, thinkingDirection, thinkingIndex]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        gap: gap + "px",
      }}>
      {summedFrequencies.map((frequency, index) => {
        const isCenter = index === Math.floor(summedFrequencies.length / 2);

        let color = accentColor;
        let shadow = "0px 0px 10px rgba(0,0,0,0.5)";
        let transform = "scale(1.0)";

        if (state === "listening" || state === "idle") {
          color = isCenter ? accentColor : "#1f1f1f"; // gray-950 equivalent
          shadow = isCenter ? shadow : "none";
          transform = isCenter ? "scale(1.2)" : "scale(1.0)";
        } else if (state === "speaking") {
          color = accentColor;
        } else if (state === "thinking") {
          color = index === thinkingIndex ? accentColor : "#1f1f1f";
          shadow = "none";
          transform = thinkingIndex === index ? "scale(1.1)" : "scale(1.0)";
        }

        return (
          <div
            key={"frequency-" + index}
            style={{
              backgroundColor: color,
              boxShadow: shadow,
              height: minBarHeight + frequency * (maxBarHeight - minBarHeight) + "px",
              borderRadius: borderRadius + "px",
              width: barWidth + "px",
              transition: "background-color 0.35s ease-out, transform 0.25s ease-out",
              transform: transform,
              animation: isCenter && state === "listening" ? "pulse 2s infinite" : "none",
            }}></div>
        );
      })}
    </div>
  );
};

export default AudioTrackRenderer;
