import { Select } from "antd";
import React from "react";
import useGetAllAirlineCompanies from "services/travel/Settings/Queries/useGetAllAirlineCompanies";

const SelectAirlineCompany = ({ onChange, form, ...rest }) => {
  const { isPending, data } = useGetAllAirlineCompanies(
    { size: 400 },
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
    form.setFieldValue(rest.id + "Info", options);
  };
  return (
    <Select
      loading={isPending}
      options={data}
      onChange={handlePostChange}
      {...rest}
      value={rest?.value?.id ?? rest.value}
    />
  );
};
export default SelectAirlineCompany;
