import { Select } from 'antd';
import React from 'react'
import useGetLanguages from 'services/travel/experiance/ExperianceTab/Querys/useGetLanguages';

const LanguageInput = ({ value, onChange, ...rest }) => {
    const languagesList = useGetLanguages({
        inatialData: []
    });

    return <Select
        filterOption={(input, option) => option?.label?.toLowerCase()?.includes(input?.toLowerCase()) || option?.value?.toLowerCase()?.includes(input?.toLowerCase())}
        value={value}
        onChange={onChange}
        showSearch
        disabled={languagesList.isLoading}
        options={languagesList?.data?.map(el => ({ label: el.nativeName, value: el.code }))}
        {...rest}
    />
}

export default LanguageInput