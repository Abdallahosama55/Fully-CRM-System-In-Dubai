import { useState } from "react";
import { Dropdown, Spin } from "antd";
import { ArrowDownSVG, DateSVG, DeleteSVG, MenuDotsSVG } from "assets/jsx-svg";
import "./styles.css";
const CustomCollapse = ({
  by_label,
  by_icon,
  by,
  Due,
  isWithDueLabel,
  children,
  isWithOutMenu,
  className,
  isLoading,
  onRemove = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`collapse_card ${className ? className : ""}`}>
      <div className="head">
        <div className="left">
          <ArrowDownSVG
            style={{ transform: `rotate(${isOpen ? 0 : -90}deg)` }}
            className="toggle-btn"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          />

          <div className="fz-12 center">
            <span className="collapse_icon">{by_icon}</span>
            <span className="bc">
              <span className="gc">{by_label} </span>
              {by}
            </span>
          </div>
        </div>
        <p className="right">
          {!isWithDueLabel ? <span className="gc fz-12">Due </span> : ""}
          <DateSVG color="#000" />
          <span className="bc fz-12"> {Due}</span>
          {!isWithOutMenu && (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <Spin spinning={isLoading}>
                        <button
                          className="collapse_card_drop_down_menu_btn remove_btn"
                          onClick={onRemove}>
                          <DeleteSVG /> Remove
                        </button>
                      </Spin>
                    ),
                  },
                ],
              }}
              placement="bottomRight">
              <MenuDotsSVG className="menu_btn" />
            </Dropdown>
          )}
        </p>
      </div>
      <div className={`body ${isOpen ? "active" : ""}`}>{children}</div>
    </div>
  );
};

export default CustomCollapse;
