const ColorPickerSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8.001}
    height={7.997}
    viewBox="0 0 8 7.996"
    {...props}>
    <path
      fill={props.color || "#fafafa"}
      d="M7.871 1.169a.443.443 0 0 1 0 .631L6.48 3.186l.853.853-.627.626-.631-.631L2.111 8H0V5.886l3.964-3.962-.631-.631.627-.626.858.848L6.2.13a.443.443 0 0 1 .627 0l1.04 1.039ZM5.324 3.528l-.853-.853-3.582 3.58.853.853Z"
    />
  </svg>
);

export default ColorPickerSVG;
