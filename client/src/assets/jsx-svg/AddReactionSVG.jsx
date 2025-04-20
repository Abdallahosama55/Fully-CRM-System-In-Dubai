const AddReactionSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 18 18"
    {...props}
  >
    <circle cx={9} cy={9} r={9} fill="#c7c7cc" />
    <g
      data-name="Icon"
      fill="#c7c7cc"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
    >
      <path d="M9 4v10" />
      <path data-name="Path" d="M4 9h10" />
    </g>
  </svg>
);

export default AddReactionSVG;
