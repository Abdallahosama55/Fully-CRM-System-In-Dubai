import { Popover } from "antd";
import CustomButton from "components/common/Button";
// style
import "./styles.css";

function LeadsPopover({ popover, children }) {
  return (
    <>
      {popover.canOpen ? (
        <Popover
          overlayClassName="popover-leads"
          placement="topRight"
          title={<span className="title">Tool Tip</span>}
          content={
            <div>
              <div className="description">
                You Can Drag Lead & Drop It To Change Status Or Delete
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="checkbox">
                  <input
                    checked={popover.isDoNotShowAgainSelected}
                    value={popover.isDoNotShowAgainSelected}
                    onChange={(e) => popover.setIsDoNotShowAgainSelected(e.target.checked)}
                    type="checkbox"
                  />
                  <label>Don’t Show This Hint Again</label>
                </div>

                <CustomButton
                  color="dark"
                  size="small"
                  className="close_btn"
                  onClick={popover.handelClose}>
                  Got It
                </CustomButton>
              </div>
            </div>
          }
        >
          {children}
        </Popover>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default LeadsPopover;
