import { AutoComplete, Input } from 'antd'
import React, { useEffect } from 'react'
import usePlacesAutocomplete from 'use-places-autocomplete';

const AddressInput = ({ onChange, value, ...rest }) => {
  const { value: searchText, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({
    debounce: 300,
    cache: true,
  });

  useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [])
  const options = data.map(({ description }) => ({
    value: description,
    label: description,
  }));

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    onChange(val);
  };

  const handleInputChange = (val) => {
    setValue(val);
    onChange(val);
  };

  return <AutoComplete
    className='location_input'
    value={value}
    onChange={handleInputChange}
    onSelect={handleSelect}
    options={status === 'OK' ? options : []}
  >
    <Input placeholder="Search for location" {...rest} />
  </AutoComplete>
}

export default AddressInput