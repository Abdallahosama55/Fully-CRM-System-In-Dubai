import { Select } from "antd";
import ArrowDownSVG from "assets/jsx-svg/ArrowDownSVG";
import React from "react";
import useGetNationalites from "services/travel/accommodations/common/Queries/useGetNationalites";

const NationalityInput = (props) => {
  const nationalitesQuery = useGetNationalites();
  return (
    <Select
      suffixIcon={<ArrowDownSVG />}
      filterOption={(input, option) => option?.label?.toLowerCase()?.includes(input?.toLowerCase()) || option?.value?.toLowerCase()?.includes(input?.toLowerCase())}
      showSearch={true}
      placeholder="Nationality"
      disabled={nationalitesQuery?.isLoading}
      options={nationalitesQuery?.data}
      {...props}
    />
  );
};

export default NationalityInput;
