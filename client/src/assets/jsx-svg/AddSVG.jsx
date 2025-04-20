const AddSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} {...props}>
    <path
      fill={props.color ? props.color : "#272942"}
      d="M1.6 3.2H0v11.2A1.6 1.6 0 0 0 1.6 16h11.2v-1.6H1.6ZM14.4 0H4.8a1.6 1.6 0 0 0-1.6 1.6v9.6a1.6 1.6 0 0 0 1.6 1.6h9.6a1.6 1.6 0 0 0 1.6-1.6V1.6A1.6 1.6 0 0 0 14.4 0Zm-.8 7.2h-3.2v3.2H8.8V7.2H5.6V5.6h3.2V2.4h1.6v3.2h3.2Z"
      data-name="Icon material-queue"
    />
  </svg>
);
export default AddSVG;
