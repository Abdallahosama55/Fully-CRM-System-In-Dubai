const ColorPickerSVG2 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15.001}
    height={15.001}
    fill="none"
    viewBox="0 0 15 15"
    {...props}>
    <path
      fill="#3A5EE3"
      d="M14.25 1.25c-1-1-2.6-1-3.55 0L8.85 3.1c-.55-.25-1.25-.2-1.7.3-.6.6-.6 1.55 0 2.15l-4.3 4.3c-.3.3-.45.7-.45 1.15l-1 1c-.6.6-.6 1.55 0 2.15.35.2.7.35 1.1.35.4 0 .75-.15 1.05-.45l1-1c.4.05.85-.15 1.15-.45L10 8.3c.3.3.7.45 1.05.45.4 0 .75-.15 1.05-.45.45-.45.55-1.15.3-1.7l1.85-1.85c1-.95 1-2.55 0-3.5ZM9.3 7.65 7.45 9.5h-2.9l3.3-3.3L9.3 7.65Z"
      style={{
        fill: props.color || "color(display-p3 .2275 .3686 .8902)",
        fillOpacity: 1,
      }}
    />
  </svg>
);

export default ColorPickerSVG2;
