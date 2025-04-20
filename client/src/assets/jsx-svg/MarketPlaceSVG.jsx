const MarketPlaceSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} {...props}>
    <g data-name="tab bar icons">
      <path
        data-name="Path 1323"
        d="M14.385 0h-6.77A7.627 7.627 0 0 0 0 7.615v6.769A7.627 7.627 0 0 0 7.615 22h6.769a7.627 7.627 0 0 0 7.615-7.615v-6.77A7.627 7.627 0 0 0 14.385 0ZM11 8.462a4.232 4.232 0 0 1-4.231-4.231.846.846 0 0 1 1.692 0 2.538 2.538 0 1 0 5.077 0 .846.846 0 0 1 1.692 0A4.232 4.232 0 0 1 11 8.462Z"
        fill={props.color || "#3A5EE3"}
      />
    </g>
  </svg>
);

export default MarketPlaceSVG;
