const OpenEmojiSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 128 128" {...props}>
    <defs></defs>
    <title />
    <g id="Layer_2" data-name="Layer 2">
      <g id="Export">
        <path
          d="M64 3A61 61 0 1 1 3 64 61.06 61.06 0 0 1 64 3m0-3a64 64 0 1 0 64 64A64 64 0 0 0 64 0Z"
          className="cls-1"
          fill={props.color ? props.color : "#2e2f42"}
        />
        <path
          d="M85.57 61.33a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 3 0v9a1.51 1.51 0 0 1-1.5 1.5ZM42.43 61.33a1.51 1.51 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 3 0v9a1.5 1.5 0 0 1-1.5 1.5ZM64 94.81c-.93 0-1.87 0-2.84-.1a40.4 40.4 0 0 1-20.23-7.22A1.5 1.5 0 1 1 42.6 85a37.39 37.39 0 0 0 18.72 6.69A37.93 37.93 0 0 0 85.41 85a1.5 1.5 0 1 1 1.7 2.46A41.09 41.09 0 0 1 64 94.81Z"
          className="cls-1"
          fill={props.color ? props.color : "#2e2f42"}
        />
      </g>
    </g>
  </svg>
);
export default OpenEmojiSVG;
