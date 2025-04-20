import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Box from "components/Box";

const Footer = ({ onNext, onCancel, onSave, isLoading, onPrevious }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 4,
        marginTop: "24px",
      }}>
      <div>
        {onPrevious && (
          <Button
            style={{
              width: 100,
            }}
            icon={<ArrowLeftOutlined></ArrowLeftOutlined>}
            onClick={onPrevious}>
            Back
          </Button>
        )}
      </div>
      <div>
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
            margin: "0 8px",

            width: 100,
          }}
          type="primary"
          onClick={onSave}>
          Save
        </Button>
        {onNext && (
          <Button
            onClick={onNext}
            style={{
              width: 100,
            }}
            icon={<ArrowRightOutlined></ArrowRightOutlined>}>
            Next
          </Button>
        )}
      </div>
    </Box>
  );
};
export default Footer;
