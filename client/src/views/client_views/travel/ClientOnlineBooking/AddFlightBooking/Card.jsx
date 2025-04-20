import Box from "components/Box";
const Card = ({ children }) => {
  return (
    <Box sx={{ borderRadius: "8px", border: "1px solid #E5E5EA", padding: "16px" }}>{children}</Box>
  );
};

export default Card;
