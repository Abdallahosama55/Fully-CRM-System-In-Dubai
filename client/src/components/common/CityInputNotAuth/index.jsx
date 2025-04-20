import React, { useMemo, useState } from "react";
import { Empty, Flex, Select, Skeleton } from "antd";
import { useDebounce } from "hooks/useDebounce";
import useGetCityInfinityNotAuth from "services/travel/accommodations/common/Queries/useGetCityInfinityNotAuth";
// style
import "./styles.css";
const CityInput = ({ value, onChange, style = {}, ...props }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const citiesList = useGetCityInfinityNotAuth(debouncedSearchTerm);

  const cityOptions = useMemo(() => {
    const cities = citiesList?.data?.pages?.flatMap((page) => page?.rows) ?? [];

    if (cities.find((el) => el?.cityId === value?.id)) {
      return cities?.map((el) => ({
        label: `${el.city}${el.country ? `, ${el.country}` : ""}`,
        value: el.cityId === value.id ? JSON.stringify(value) : JSON.stringify(el),
      }));
    } else {
      if (value?.id) {
        cities.push(value);
      }
      return cities?.map((el) => ({
        label: `${el?.city}${el?.country ? `, ${el?.country}` : ""}`,
        value: JSON.stringify(el),
      }));
    }
  }, [citiesList?.data, value]);

  const localValue = useMemo(() => {
    if (!value || !value.id) return undefined;
    return JSON.stringify(value);
  }, [value]);

  const handleChange = (newValue) => {
    onChange(JSON.parse(newValue));
  };

  return (
    <Select
      {...props}
      showSearch
      className={`${props.className ? props.className : ""} ${
        props["aria-invalid"] ? "error" : ""
      } city_input`}
      onSearch={setSearchTerm}
      value={localValue}
      options={cityOptions}
      placeholder={props.placeholder || "Search for a city"}
      suffixIcon={null}
      filterOption={false}
      onChange={handleChange}
      onClear={props?.allowClear ? () => onChange(null) : undefined}
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
    />
  );
};

export default CityInput;
