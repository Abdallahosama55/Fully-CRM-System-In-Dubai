import { Select } from "antd";
import React from "react";
import useGetAllAirports from "services/travel/Settings/Queries/useGetAllAirports";
const SelectAirport = ({ form, onChange, ...rest }) => {
  const { data, isPending } = useGetAllAirports(
    {
      size: 100000000000000,
    },
    {
      select: (data) => {
        return data.data.data.rows.map((item) => {
          return { ...item, value: item.id, label: item.name };
        });
      },
      refetchOnMount: false,
    },
  );
  const handlePostChange = (value, options) => {
    onChange(value);
    form && form.setFieldValue(rest.id + "Info", options);
  };
  return <Select options={data} loading={isPending} {...rest} onChange={handlePostChange} />;
};
export default SelectAirport;
