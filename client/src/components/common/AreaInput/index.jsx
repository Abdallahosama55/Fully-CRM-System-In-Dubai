import { Button, Flex, Select, Skeleton } from "antd";
import { ArrowDownSVG, PlusSVG } from "assets/jsx-svg";
import AddArea from "components/AddArea";
import { useDebounce } from "hooks/useDebounce";
import React, { useMemo, useState } from "react";
import useListAreasInfinity from "services/travel/Settings/areas/Query/useListAreasInfinity";

const AreaInput = ({ city, value, onChange, ...props }) => {
  const [textSearch, setTextSearch] = useState("");
  const debouncedSearchText = useDebounce(textSearch, 500);
  const areasList = useListAreasInfinity({ name: debouncedSearchText, cityId: city?.id });
  const [isAddAreaOpen, setIsAddAreaOpen] = useState(false);

  console.log("value", value);
  const areaOptions = useMemo(() => {
    const areas = areasList?.data?.pages?.flatMap((page) => page?.rows) ?? [];
    if (areas.find((el) => el?.id === value?.id)) {
      return areas?.map((el) => ({
        label: el?.name,
        value:
          el.id === value.id ? JSON.stringify({ ...value, name: el?.name }) : JSON.stringify(el),
      }));
    } else {
      if (value?.id) {
        areas.push(value);
      }
      return areas?.map((el) => ({
        label: el?.name,
        value: JSON.stringify(el),
      }));
    }
  }, [areasList?.data, value]);

  const localValue = useMemo(() => {
    if (!value || !value.id) return undefined;
    return JSON.stringify(value);
  }, [value]);

  const handleChange = (newValue) => {
    onChange(JSON.parse(newValue));
  };

  return (
    <>
      <AddArea
        isOpen={isAddAreaOpen}
        city={city}
        close={(data) => {
          onChange(data);
          setIsAddAreaOpen(false);
          areasList.refetch();
        }}
      />
      <Select
        className={"airports_accommodation_input " + (props?.className || "")}
        suffixIcon={<ArrowDownSVG />}
        onSearch={setTextSearch}
        placeholder={props.placeholder || "Select area"}
        showSearch
        value={localValue}
        onSelect={handleChange}
        options={areaOptions}
        loading={areasList?.isLoading}
        filterOption={false}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Flex align="center" justify="center" style={{ padding: "8px" }}>
              <Button
                type="link"
                icon={<PlusSVG fill={"currentColor"} />}
                style={{ width: "100%" }}
                onClick={() => setIsAddAreaOpen(true)}>
                Add New Area
              </Button>
            </Flex>
          </>
        )}
        notFoundContent={
          areasList?.isLoading || areasList?.isFetching ? (
            <Flex vertical gap={6}>
              <Skeleton.Input active style={{ width: "100%" }} />
              <Skeleton.Input active style={{ width: "100%" }} />
            </Flex>
          ) : areasList?.isError ? (
            "Something went wrong"
          ) : (
            <Flex align="center" justify="center" vertical gap={6}>
              <p className="fz-16 mb-1 fw-500">No areas match your search</p>
            </Flex>
          )
        }
        onPopupScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.target;
          if (
            scrollHeight - scrollTop <= clientHeight &&
            !areasList.isLoading &&
            !areasList.isFetching &&
            areasList?.hasNextPage
          ) {
            areasList?.fetchNextPage();
          }
        }}
        {...props}
        onClear={props?.allowClear ? () => onChange(null) : undefined}
      />
    </>
  );
};

export default AreaInput;
