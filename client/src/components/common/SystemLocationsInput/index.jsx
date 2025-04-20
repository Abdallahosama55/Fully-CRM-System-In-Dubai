import { Empty, Flex, Select, Skeleton } from "antd";
import { useDebounce } from "hooks/useDebounce";
import React, { useMemo, useState } from "react";
import useSearchLocation from "services/unauth/useSearchLocation";
// style
import "./styles.css";
const SystemLocationsInput = ({ value, onChange, style = {}, ...props }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const locationsList = useSearchLocation({
    name: debouncedSearchTerm,
    type: ["CITY", "CITY_AREA"],
  });
  const locationsOptions = useMemo(() => {
    const locations = locationsList?.data?.pages?.flatMap((page) => page?.rows) ?? [];

    return locations.map((el) => ({
      label: `${el?.city || el?.areaName} ${el?.country ? ", " + el?.country : ""}`,
      value: JSON.stringify(el),
    }));
  }, [locationsList?.data]);

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
      onSearch={setSearchTerm}
      value={localValue}
      options={locationsOptions}
      placeholder={props.placeholder || "Search for a location"}
      suffixIcon={null}
      filterOption={false}
      onChange={handleChange}
      className={`${props.className ? props.className : ""} ${
        props["aria-invalid"] ? "error" : ""
      } system_locations_input`}
      onClear={props?.allowClear ? () => onChange(null) : undefined}
      style={{ width: "100%", ...style }}
      notFoundContent={
        locationsList?.isLoading || locationsList?.isFetching ? (
          <Flex vertical gap={6}>
            <Skeleton.Input active style={{ width: "100%" }} />
            <Skeleton.Input active style={{ width: "100%" }} />
          </Flex>
        ) : locationsList?.isError ? (
          "Something went wrong"
        ) : (
          <Empty description="No locations match your search" />
        )
      }
      onPopupScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (
          scrollHeight - scrollTop <= clientHeight &&
          !locationsList.isLoading &&
          !locationsList.isFetching &&
          locationsList?.hasNextPage
        ) {
          locationsList?.fetchNextPage();
        }
      }}
    />
  );
};

export default SystemLocationsInput;
