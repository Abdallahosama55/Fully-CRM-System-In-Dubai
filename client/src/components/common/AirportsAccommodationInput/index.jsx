import { Empty, Flex, Select, Skeleton, Tag, Typography } from "antd";
import { ArrowDownSVG, BuildingSVG, EarthSVG, PlaneSVG } from "assets/jsx-svg";
import { useDebounce } from "hooks/useDebounce";
import React, { useMemo, useState } from "react";
import useAirportsAccommodationList from "services/travel/common/Queries/useAirportsAccommodationList";
import isValidJson from "utils/isValidJson";
// style
import "./styles.css";
import { queryClient } from "services/queryClient";
const PLACES_TYPES = {
  AIRPORT: "AIRPORT",
  TBO_ACCOMODATION: "TBO_ACCOMODATION",
  ACCOMODATION: "LOCAL_ACCOMODATION",
};

const AirportsAccommodationInput = ({ value, onChange, mode, reqParams = {}, ...props }) => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);
  const airportsAccommodationList = useAirportsAccommodationList({
    name: debounceSearch,
    ...reqParams,
  });

  const localValue = useMemo(() => {
    if (!value || !value?.id) return undefined;
    // if the value is not in the list
    if (
      !airportsAccommodationList?.data?.pages
        ?.map((el) => el?.rows)
        ?.flat()
        ?.find((el) => el?.id === value?.id)
    ) {
      queryClient.setQueryData(airportsAccommodationList.key, (oldData) => {
        if (
          !oldData ||
          !oldData?.pages ||
          !Array.isArray(oldData?.pages) ||
          oldData?.pages?.length === 0 ||
          !oldData?.pages[0]?.rows ||
          !Array.isArray(oldData?.pages[0]?.rows)
        ) {
          return oldData;
        } else {
          return {
            ...oldData,
            pages: [
              {
                ...oldData?.pages[0],
                rows: [...oldData?.pages[0]?.rows, value],
              },
            ],
          };
        }
      });
    }

    if (mode === "multiple") {
      if (Array.isArray(value)) {
        return value.map((el) => JSON.stringify(el));
      } else {
        return [];
      }
    } else {
      return JSON.stringify(value);
    }
  }, [value, mode]);

  const handelChange = (newValue) => {
    const newValueParsed = JSON.parse(newValue);
    if (mode === "multiple") {
      if (Array.isArray(value)) {
        onChange([...value, newValueParsed]);
      } else {
        onChange([newValueParsed]);
      }
    } else {
      onChange(newValueParsed);
    }
  };

  return (
    <Select
      className={"airports_accommodation_input " + (props?.className || "")}
      suffixIcon={<ArrowDownSVG />}
      mode={mode}
      onSearch={setSearch}
      placeholder="Select place"
      showSearch
      value={localValue}
      onSelect={handelChange}
      tagRender={(props) => {
        return (
          <Tag
            {...props}
            style={{ marginBottom: "4px" }}
            color={
              isValidJson(props?.value) && JSON.parse(props?.value)?.type === PLACES_TYPES.AIRPORT
                ? "blue"
                : "error"
            }>
            {props?.label}
          </Tag>
        );
      }}
      options={airportsAccommodationList?.data?.pages
        ?.map((el) => el?.rows)
        ?.flat()
        ?.map((el) => ({
          label: (
            <div
              style={{
                display: "inline-grid",
                gridTemplateColumns: "18px 1fr",
                gap: "6px",
                height: "100%",
                padding: "0 4px",
                alignItems: "center",
              }}>
              {el?.type === PLACES_TYPES.TBO_ACCOMODATION ||
              el?.type === PLACES_TYPES.ACCOMODATION ? (
                <BuildingSVG />
              ) : el?.type === PLACES_TYPES.AIRPORT ? (
                <PlaneSVG />
              ) : (
                <EarthSVG color={"#667085"} />
              )}

              <Typography.Paragraph ellipsis={{ tooltip: el?.name }} style={{ margin: 0 }}>
                {el?.name}
              </Typography.Paragraph>
            </div>
          ),
          value: JSON.stringify(el),
        }))}
      loading={airportsAccommodationList?.isLoading}
      filterOption={false}
      notFoundContent={
        airportsAccommodationList?.isLoading || airportsAccommodationList?.isFetching ? (
          <Flex vertical gap={6}>
            <Skeleton.Input active style={{ width: "100%" }} />
            <Skeleton.Input active style={{ width: "100%" }} />
          </Flex>
        ) : (
          <Empty
            description={
              airportsAccommodationList?.isError
                ? "Something went wrong"
                : "No places match your search"
            }
          />
        )
      }
      onPopupScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (
          scrollHeight - scrollTop <= clientHeight &&
          !airportsAccommodationList.isLoading &&
          !airportsAccommodationList.isFetching &&
          airportsAccommodationList?.hasNextPage
        ) {
          airportsAccommodationList?.fetchNextPage();
        }
      }}
      {...props}
      onClear={props?.allowClear ? () => onChange(null) : () => {}}
    />
  );
};

export default AirportsAccommodationInput;
