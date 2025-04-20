const ClockSVG3 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16.001}
    height={16.001}
    fill="none"
    viewBox="0 0 16 16"
    {...props}>
    <circle
      cx={8}
      cy={8.667}
      r={4.667}
      stroke="#1355FF"
      style={{
        stroke: "color(display-p3 .0745 .3333 1)",
        strokeOpacity: 1,
      }}
    />
    <path
      stroke="#1355FF"
      strokeLinecap="round"
      d="M3.333 3.333 2 4.667M12.667 3.333 14 4.667M6 7.333 7.81 8.54a.25.25 0 0 0 .333-.052L9.333 7"
      style={{
        stroke: "color(display-p3 .0745 .3333 1)",
        strokeOpacity: 1,
      }}
    />
  </svg>
);

export default ClockSVG3;
