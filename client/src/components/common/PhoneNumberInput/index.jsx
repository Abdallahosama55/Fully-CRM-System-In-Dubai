import React, { useMemo } from "react";
import PhoneInput from "react-phone-input-2";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

// style
import "react-phone-input-2/lib/bootstrap.css";
import "./styles.css";
import { Flex, Tooltip } from "antd";
import { InfoSVG } from "assets/jsx-svg";

const isValidPhoneNumber = (formattedValue, country) => {
  console.log({ formattedValue, country });
  if (!formattedValue || !country?.format) return false;

  // Verify starts with correct dial code
  if (!formattedValue.startsWith(`+${country.dialCode}`)) {
    return false;
  }

  // Compare formattedValue against format pattern
  const formatPattern = country.format;

  if (formattedValue.length !== formatPattern.length) {
    return false;
  }

  for (let i = 0; i < formatPattern.length; i++) {
    const formatChar = formatPattern?.[i];
    const valueChar = formattedValue?.[i];

    if (formatChar === ".") {
      // Should be a digit
      if (!valueChar || !/\d/.test(valueChar)) {
        return false;
      }
    } else if (valueChar !== formatChar) {
      // Should match the format character exactly
      return false;
    }
  }

  return true;
};

const PhoneNumberInput = ({ value, initialCountry, className = "", onChange, ...props }) => {
  const form = useFormInstance();
  const inputName = useMemo(
    () =>
      form
        ?.getFieldsError()
        ?.map((el) => ({ name: el?.name, id: el?.name?.join("_") }))
        ?.filter((el) => el?.id === props?.id)?.[0]?.name || props?.id,
    [props?.id, form],
  );

  const countryNameFormatter = React.useMemo(
    () => new Intl.DisplayNames(["en"], { type: "region" }),
    [],
  );

  return (
    <PhoneInput
      country={initialCountry || "uae"}
      value={value}
      placeholder="000 000 0000"
      containerClass={`custom-phone ${className} ${props["aria-invalid"] ? "error" : ""}`}
      onChange={(value, country, e, formattedValue) => {
        const isValid = isValidPhoneNumber(formattedValue, country);
        const countryCode = country?.countryCode?.toUpperCase() || "";

        if (form && !isValid && inputName && value?.length > 0) {
          form.setFields([
            {
              name: inputName,
              value: value,
              errors: [],
              warnings: [
                <Flex key={"warning"} align="center" gap={6} style={{ marginTop: "0.2rem" }}>
                  {country?.format && (
                    <Tooltip
                      title={
                        typeof country?.format === "string"
                          ? `+${country?.dialCode}` +
                            country?.format
                              ?.replaceAll(".", "X")
                              ?.slice(country?.dialCode?.length + 1)
                          : ""
                      }>
                      <InfoSVG />
                    </Tooltip>
                  )}
                  <p style={{ maxWidth: "calc(100% - 40px)" }}>
                    Check{" "}
                    {countryCode ? countryNameFormatter?.of(countryCode)?.toLocaleLowerCase() : ""}{" "}
                    phone number
                  </p>
                </Flex>,
              ],
            },
          ]);
        } else {
          onChange?.(formattedValue);
        }
      }}
      {...props}
    />
  );
};

export default PhoneNumberInput;
