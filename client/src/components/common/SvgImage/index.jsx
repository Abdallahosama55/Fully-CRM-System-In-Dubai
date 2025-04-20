const SvgImage = ({ svgContent, width = "auto", height = "auto", ...rest }) => {
  return (
    <div {...rest} dangerouslySetInnerHTML={{ __html: svgContent }} style={{ width, height }} />
  );
};

export default SvgImage;
