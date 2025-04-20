import { Radio, Typography } from "antd";
import Box from "components/Box";
const RadioBox = ({ option = [], children, isActive }) => {
  return (
    <Box
      sx={{
        width: "100%",
        border: `1px solid ${isActive ? "#A4B3ED" : "#E5E5EA"} `,
        padding: "16px",
        borderRadius: "8px",
      }}>
      {option.map((option) => (
        <Radio key={option.value} {...option}>
          <div>
            <Typography.Text className="fz-14 fw-400" style={{ color: "#313343" }}>
              {option.title}
            </Typography.Text>
            {option?.descriptions && (
              <Typography className="fz-12 fw-400" style={{ color: "#697281" }}>
                {option.descriptions}
              </Typography>
            )}
          </div>
        </Radio>
      ))}

      {children}
    </Box>
  );
};
export default RadioBox;
