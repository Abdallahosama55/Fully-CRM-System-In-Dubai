import React from 'react'
// styles
import './styles.css';
const AddressInfo = ({ country, city, street, state, zip_code }) => {
    return (
        <div className='employee_address_info'>
            <div className='space-between address_info_row'>
                <p className='fz-14 gc'>Street</p>
                <p className='fz-14 gc'>{street}</p>
            </div>
            <div className='space-between address_info_row'>
                <p className='fz-14 gc'>City</p>
                <p className='fz-14 gc'>{city}</p>
            </div>
            <div className='space-between address_info_row'>
                <p className='fz-14 gc'>State</p>
                <p className='fz-14 gc'>{state}</p>
            </div>
            <div className='space-between address_info_row'>
                <p className='fz-14 gc'>Country</p>
                <p className='fz-14 gc'>{country}</p>
            </div>
            <div className='space-between address_info_row'>
                <p className='fz-14 gc'>Zip Code</p>
                <p className='fz-14 gc'>{zip_code}</p>
            </div>
        </div>)
}

export default AddressInfo