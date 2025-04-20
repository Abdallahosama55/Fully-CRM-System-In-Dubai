function Title({ title, titleColor, className }) {
  return (
    <span
      style={{ "overflow-wrap": "normal", "word-break": "normal", fontSize: "16px" }}
      className={` ${titleColor} ${className}`}>
      {title}
    </span>
  );
}

export default Title;
