const FailedPaymentSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36.001}
    height={30.001}
    viewBox="0 0 36 30"
    {...props}
  >
    <defs>
      <linearGradient
        id="FailedPaymentSVG"
        x1={0.05}
        x2={3.227}
        y1={0.735}
        y2={-0.98}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#e81224" />
        <stop offset={0.47} stopColor="#cb313e" />
        <stop offset={1} stopColor="#951d27" />
      </linearGradient>
    </defs>
    <path
      fill="url(#FailedPaymentSVG)"
      d="M22.971 27.764A7.631 7.631 0 1 1 28.368 30a7.581 7.581 0 0 1-5.397-2.236Zm5.4-4.224 2.53 2.566a.81.81 0 0 0 .577.243.819.819 0 0 0 .579-.243.838.838 0 0 0 0-1.174l-2.529-2.567 2.528-2.565a.84.84 0 0 0 0-1.175.815.815 0 0 0-.579-.244.8.8 0 0 0-.577.244l-2.53 2.565-2.531-2.565a.808.808 0 0 0-1.157 0 .835.835 0 0 0 0 1.175l2.529 2.563-2.529 2.567a.833.833 0 0 0 0 1.174.809.809 0 0 0 1.157 0l2.529-2.566ZM3 24.108a3.034 3.034 0 0 1-3-3.052V8.839h32.949v3.055h-4.493a10.6 10.6 0 0 0-10.484 10.688v1.526Zm7.488-4.582h4.494v-3.052h-4.498Zm-7.488 0h4.489v-3.052H3ZM0 4.579V3.053A3.034 3.034 0 0 1 3 0h26.954a3.033 3.033 0 0 1 3 3.053v1.526Z"
      data-name="Union 74"
    />
  </svg>
);

export default FailedPaymentSVG;
