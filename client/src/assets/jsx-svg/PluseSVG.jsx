const PluseSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 24 24"
    {...props}
  >
    <g data-name="Group 50623">
      <path fill="none" d="M0 0h24v24H0z" data-name="Rectangle 4035" />
      <g data-name="Group 50938" opacity={props.color ? 1 : 0.7}>
        <path
          fill={props.color || "#000"}
          d="M12 20.501a1.092 1.092 0 0 1-1.09-1.091v-6.319H4.591a1.092 1.092 0 0 1-1.089-1.09 1.092 1.092 0 0 1 1.089-1.091h6.319V4.591A1.092 1.092 0 0 1 12 3.501a1.093 1.093 0 0 1 1.091 1.09v6.319h6.319a1.092 1.092 0 0 1 1.092 1.091 1.092 1.092 0 0 1-1.092 1.09h-6.319v6.319A1.093 1.093 0 0 1 12 20.501Z"
          data-name="Path 50939"
        />
      </g>
    </g>
  </svg>
);

export default PluseSVG;
