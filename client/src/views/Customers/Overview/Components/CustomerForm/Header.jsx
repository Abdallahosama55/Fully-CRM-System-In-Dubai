import { Button } from "antd";
import { EditCustomerTitleSVG, SaveIconSVG } from "assets/jsx-svg";
import Box from "components/Box";

const Header = ({ onCancel, onSave, isLoading, title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 15,
      }}>
      <div style={{ display: "flex", columnGap: 5 }}>
        <EditCustomerTitleSVG />
        <p style={{ color: "#030713", fontSize: 14, fontWeight: 500 }}>{title}</p>
      </div>
      <div style={{ display: "flex" }}>
        {onCancel && (
          <Button
            onClick={onCancel}
            style={{
              width: 100,
            }}
            //   onClick={() => setIsAddNewEmpOpen(false)}
          >
            Cancel
          </Button>
        )}

        <Button
          loading={isLoading}
          style={{
            marginLeft: 8,
            backgroundColor: "#0E7B43",
            width: 100,
            display: "flex",
            columnGap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          type="primary"
          onClick={onSave}>
          <SaveIconSVG />
          Save
        </Button>
      </div>
    </Box>
  );
};
export default Header;
