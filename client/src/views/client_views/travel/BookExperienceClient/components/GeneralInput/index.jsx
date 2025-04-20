import { Checkbox, DatePicker, Input, Radio, Select, TimePicker } from 'antd';
import INPUT_TYPES from 'constants/INPUT_TYPES';
import React from 'react'

const GeneralInput = ({ inputType, ...rest }) => {

    console.log('inputType :>> ', inputType);
    switch (inputType) {
        case INPUT_TYPES.SHORT_TEXT:
            return <Input {...rest} />
        case INPUT_TYPES.LONG_TEXT:
            return <Input.TextArea {...rest} />
        case INPUT_TYPES.DATE:
            return <DatePicker {...rest} />
        case INPUT_TYPES.DATE_AND_TIME:
            return <TimePicker {...rest} />
        case INPUT_TYPES.CHECKBOX:
            return <Checkbox.Group {...rest}>
                {rest.options.map((el, index) => <Checkbox key={index} {...el}>{el.label}</Checkbox>)}
            </Checkbox.Group>
        case INPUT_TYPES.BOOLEAN:
            return <Radio.Group {...rest}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
            </Radio.Group>
        case INPUT_TYPES.INTEGER:
            return <Input type="number" {...rest} precision={0} />
        case INPUT_TYPES.DECIMAL:
            return <Input type="number" {...rest} step={0.1} precision={2} />
        case INPUT_TYPES.LIST_OF_OPTIONS:
            return <Select {...rest} />
        default:
            return <Input {...rest} />
    }
}

export default GeneralInput