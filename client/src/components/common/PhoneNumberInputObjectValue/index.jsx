import React from "react";
import PhoneInput from "react-phone-input-2";

// style
import "react-phone-input-2/lib/bootstrap.css";
import "./styles.css";
const PhoneNumberInputObjectValue = ({
  value,
  initialCountry,
  className = "",
  onChange,
  ...props
}) => {
  const handelOnChange = (value, data) => {
    const prefixLastCharIndex = value.indexOf(data.dialCode) + data.dialCode.length;
    const mobile = value.substring(prefixLastCharIndex);
    onChange({
      mobile,
      prefix: `+${data.dialCode}`,
    });
  };
  return (
    <PhoneInput
      country={initialCountry || "uae"}
      value={value ? value.prefix + value.mobile : "+970"}
      placeholder="000 000 0000"
      containerClass={`custom-phone ${className} ${props["aria-invalid"] ? "error" : ""}`}
      onChange={handelOnChange}
    />
  );
};

export default PhoneNumberInputObjectValue;
