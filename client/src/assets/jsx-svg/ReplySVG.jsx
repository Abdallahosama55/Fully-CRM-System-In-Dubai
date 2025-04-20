const ReplySVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 21.098 17.679"
    {...props}
  >
    <path
      data-name="reply-arrow"
      d="M6.132.5a1.111 1.111 0 0 0-.764.336L.924 5.281a1.111 1.111 0 0 0 0 1.571l4.444 4.445a1.111 1.111 0 1 0 1.571-1.571L4.391 7.178h9.54a4.429 4.429 0 0 1 4.444 4.444v4.444a1.111 1.111 0 1 0 2.222 0v-4.444a6.684 6.684 0 0 0-6.667-6.667H4.391L6.939 2.41A1.111 1.111 0 0 0 6.132.5Z"
      fill={props.color || "#c7c7cc"}
      stroke="rgba(0,0,0,0)"
      strokeMiterlimit={10}
    />
  </svg>
);

export default ReplySVG;
