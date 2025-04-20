import { Select } from 'antd';
import { ArrowDownSVG } from 'assets/jsx-svg';
import React from 'react'
import useGetCurrencies from 'services/travel/Currencies/Queries/useGetCurrencies'

const CurrencyInput = ({ value, onChange, ...rest }) => {
    const currenciesList = useGetCurrencies({
        inatialData: []
    });
    return <Select
        suffixIcon={<ArrowDownSVG color={"#2D6ADB"} />}
        value={value}
        filterOption={(input, option) => option?.label?.toLowerCase()?.includes(input?.toLowerCase()) || option?.value?.toLowerCase()?.includes(input?.toLowerCase())}
        onChange={onChange}
        showSearch
        disabled={currenciesList.isLoading}
        options={currenciesList?.data?.map(el => ({ label: `${el.code} / ${el.symbol}`, value: el.code }))}
        {...rest}
    />
}

export default CurrencyInput