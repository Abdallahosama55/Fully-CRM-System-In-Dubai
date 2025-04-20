const FilterMailSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={8} viewBox="0 0 12 8" {...props}>
    <path
      d="M7.3335 7.99999H4.6665V6.66724H7.3335V7.99999ZM10.0005 4.66699H1.9995V3.33424H10.0005V4.66699ZM12 1.33399H0V0.000488281H12V1.33324V1.33399Z"
      fill={props.color || "#8E8E93"}
    />
  </svg>
);

export default FilterMailSVG;
