import React from "react";
// style
import "./styles.css";
/**
 * Badge component for displaying status indicators.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content to be displayed inside the badge. **(required)**
 * @param {'primary' | 'success' | 'warning' | 'error' | 'grey' | 'orange'} [props.status="primary"] - Status of the badge, determining its color. **(optional)**
 * @param {string} [props.className=""] - Additional class names for custom styling. **(optional)**
 * @param {boolean} [props.fullWidth] - Whether the badge should take the full width of its container. **(optional)**
 * @param {'small' | 'medium' | 'large'} [props.size="medium"] - Size of the badge, affecting its dimensions and text size. **(optional)**
 *
 * @returns {React.ReactNode} The rendered Badge component.
 *
 * Example:
 * <Badge status="success" className="custom-badge" fullWidth={true} size="medium">
 *   Success
 * </Badge>
 */

const Badge = ({
  children,
  status = "primary",
  className = "",
  fullWidth,
  size = "medium",
  icon,
  largeIcon = false,
  color,
  backGroundColor,
  ...props
}) => {
  if (icon) {
    return (
      <span
        className={`badge badge_with_icon xs_text_medium ${status} ${
          fullWidth ? "fullWidth w-100" : ""
        } ${className} ${size} ${largeIcon ? "badge_with_icon_large" : ""}`}
        style={color && backGroundColor ? { color: color, backgroundColor: backGroundColor } : {}}
        {...props}>
        {icon}
        {children}
      </span>
    );
  }
  return (
    <span
      className={`badge xs_text_medium ${status} ${
        fullWidth ? "fullWidth w-100" : ""
      } ${className} ${size}`}
      style={color && backGroundColor ? { color: color, backgroundColor: backGroundColor } : {}}
      {...props}>
      {children}
    </span>
  );
};

export default Badge;
