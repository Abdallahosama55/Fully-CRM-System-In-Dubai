const SARSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" {...props}>
    <circle cx={19} cy={15} r={1} />
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="M22 19a5 5 0 0 0 5-5v-1"
    />
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 13v1a2 2 0 0 0 4 0v-4m-8 3v1a2 2 0 0 0 4 0m-4-1v3.5A2.5 2.5 0 0 1 5.5 19h0A2.5 2.5 0 0 1 3 16.5V13"
    />
  </svg>
);

export default SARSVG;
