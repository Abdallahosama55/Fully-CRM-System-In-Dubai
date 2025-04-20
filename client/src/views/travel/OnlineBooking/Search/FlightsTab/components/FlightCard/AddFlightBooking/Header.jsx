import { Divider, Typography } from "antd";
import { AirPlanColoredSVG } from "assets/jsx-svg";
import Box from "components/Box";
const Header = () => {
  return (
    <Box
      sx={{
        paddingBottom: "26px",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className="content">
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className={" fz-16 fw-500"}>
          <AirPlanColoredSVG /> Round Trip - Flight Details
        </Typography>
      </Box>
      <Divider className="divider" />
    </Box>
  );
};
export default Header;
