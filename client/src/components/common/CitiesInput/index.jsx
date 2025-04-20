import React, { useMemo, useState } from "react";
import { Empty, Flex, Select, Skeleton } from "antd";
import { useDebounce } from "hooks/useDebounce";
import useGetCityInfinity from "services/travel/accommodations/common/Queries/useGetCityInfinity";
import isValidJson from "utils/isValidJson";

const CitiesInput = ({ value = [], onChange, style = {}, ...props }) => {
  console.log("value", value);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const citiesList = useGetCityInfinity(debouncedSearchTerm);
  const cityOptions = useMemo(() => {
    const cities = citiesList?.data?.pages?.flatMap((page) => page?.rows) ?? [];
    const selectedValues = Array.isArray(value) ? value : [];

    const mergedCities = [...new Set([...cities, ...selectedValues])];
    return mergedCities.map((el) => ({
      label: `${el.city}${el.country ? `, ${el.country}` : ""}`,
      value: JSON.stringify(el),
    }));
  }, [citiesList?.data, value]);

  const localValue = useMemo(() => {
    return Array.isArray(value) ? value.map((item) => JSON.stringify(item)) : [];
  }, [value]);

  const handleChange = (newValue) => {
    const parsedValue = newValue.map((el) => (isValidJson(el) ? JSON.parse(el) : el));
    onChange(parsedValue);
  };

  return (
    <Select
      showSearch
      onSearch={setSearchTerm}
      value={localValue}
      options={cityOptions}
      mode="multiple"
      placeholder={props.placeholder || "Search for a city"}
      suffixIcon={null}
      filterOption={false}
      onChange={handleChange}
      onClear={props?.allowClear ? () => onChange([]) : undefined}
      style={{ width: "100%", ...style }}
      notFoundContent={
        citiesList?.isLoading || citiesList?.isFetching ? (
          <Flex vertical gap={6}>
            <Skeleton.Input active style={{ width: "100%" }} />
            <Skeleton.Input active style={{ width: "100%" }} />
          </Flex>
        ) : citiesList?.isError ? (
          "Something went wrong"
        ) : (
          <Empty description="No cities match your search" />
        )
      }
      onPopupScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (
          scrollHeight - scrollTop <= clientHeight &&
          !citiesList.isLoading &&
          !citiesList.isFetching &&
          citiesList?.hasNextPage
        ) {
          citiesList?.fetchNextPage();
        }
      }}
      {...props}
    />
  );
};

export default CitiesInput;
