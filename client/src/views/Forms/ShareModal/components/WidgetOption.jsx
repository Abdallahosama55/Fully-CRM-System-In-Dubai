import "../styles.css";

const WidgetOption = ({ text, description, image }) => {
  return (
    <div className="widget-option">
      <div className="widget-option-image-wrapper">
        <img className="widget-option-image" alt="widget option" src={image} />
      </div>
      <div className="div">
        <div className="heading">{text}</div>
        <p className="paragraph">{description}</p>
      </div>
    </div>
  );
};

export default WidgetOption;
