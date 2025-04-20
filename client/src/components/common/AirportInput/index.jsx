import { Select } from "antd";
import ArrowDownSVG from "assets/jsx-svg/ArrowDownSVG";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import useSearchAirports from "services/travel/Settings/Queries/useSearchAirports";

const AirportInput = ({ ...props }) => {
  const [searchAirbort, setSearchAirbort] = useState("");
  const [airbortOption, setAirbortOption] = useState([]);
  const debounceSearchAirbort = useDebounce(searchAirbort, 300);

  const searchAirbortOptions = useSearchAirports(debounceSearchAirbort, {
    initialValue: [],
  });

  useEffect(() => {
    if (searchAirbortOptions?.data?.data?.data) {
      setAirbortOption(
        searchAirbortOptions?.data?.data?.data?.map((el) => ({
          label: el?.name,
          value: el?.id,
        })),
      );
    }
  }, [searchAirbortOptions?.data?.data?.data]);

  return (
    <Select
      onSearch={setSearchAirbort}
      placeholder="Select Airport"
      showSearch
      options={airbortOption}
      loading={searchAirbortOptions.isLoading}
      filterOption={false} // Disable local filtering
      notFoundContent={null} // Optional: Show nothing when no options
      suffixIcon={<ArrowDownSVG />}
      {...props}
    />
  );
};

export default AirportInput;
