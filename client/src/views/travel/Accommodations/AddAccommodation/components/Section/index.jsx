// style
import "./styles.css";

const Section = ({ children, title = null, icon = null, ...rest }) => {
  return (
    <section {...rest} className="accomdation_section">
      {title && (
        <div className="section_header">
          {icon && (
            <span className="icon" style={{ marginInlineEnd: "6px" }}>
              {icon}
            </span>
          )}
          <span className="title fz-14 fw-600">{title}</span>
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
