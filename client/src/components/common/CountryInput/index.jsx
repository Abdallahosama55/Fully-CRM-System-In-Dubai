import { Select } from "antd";
import { ArrowDownSVG } from "assets/jsx-svg";
import React from "react";
import useUnAuthCountryList from "services/unauth/useUnAuthCountryList";
import { distance } from "fastest-levenshtein";
const CountryInput = ({ value, onChange, ...rest }) => {
  const countryList = useUnAuthCountryList();
  const filterOptions = (input, option) => {
    if (!input) return true;
    const minLength = Math.min(input.length, option.label.length);
    const distanceToLabel = distance(
      input.substring(0, minLength).toLowerCase(),
      option.label.substring(0, minLength).toLowerCase(),
    );
    return minLength > 5 ? distanceToLabel <= 2 : distanceToLabel <= 1;
  };

  return (
    <Select
      showSearch
      filterOption={filterOptions}
      placeholder={rest?.placeholder || "Select Country"}
      options={countryList?.data?.map((el) => ({ label: el?.name, value: el?.alpha2Code }))}
      value={value}
      onChange={onChange}
      suffixIcon={<ArrowDownSVG color={"#2D6ADB"} />}
      {...rest}
    />
  );
};

export default CountryInput;
