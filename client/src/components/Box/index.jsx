// Box.jsx

const Box = ({ children, sx = {}, ...rest }) => {
  return (
    <div className="custom-box" style={sx} {...rest}>
      {children}
    </div>
  );
};
export default Box;
