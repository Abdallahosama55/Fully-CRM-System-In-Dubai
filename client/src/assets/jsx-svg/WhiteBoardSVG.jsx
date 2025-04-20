const WhiteBoardSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 40 39.063"
    {...props}
  >
    <g data-name={2}>
      <g data-name="Group 50525">
        <path
          data-name="Path 50513"
          d="M7.625 39.063h3.906l2.75-12.375h-3.812Zm10.469 0h3.813V26.688h-3.813Zm7.625-12.375 2.844 12.375h3.813l-2.845-12.375ZM24.281 1.906 23.344 0h-6.688l-.937 1.906H0v24.75h40V1.906Zm13.813 22.875H1.906V3.844h36.188Zm-.937-20H2.844v19.063h34.281V4.781Z"
          fill={props.color || "#3A5EE3"}
        />
      </g>
    </g>
  </svg>
);

export default WhiteBoardSVG;
