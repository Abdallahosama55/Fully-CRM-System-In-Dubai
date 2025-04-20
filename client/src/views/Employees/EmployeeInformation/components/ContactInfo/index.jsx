import React from 'react'
// styles
import './styles.css';
const ContactInfo = ({ gender, mobile, countryCode, mail }) => {
    return (
        <div className='employee_contact_info'>
            <div className='space-between contact_info_row'>
                <p className='fz-14 gc'>Cellular Number</p>
                <p className='fz-14 gc'>{countryCode} {mobile}</p>
            </div>
            <div className='space-between contact_info_row'>
                <p className='fz-14 gc'>Mail</p>
                <p className='fz-14 gc'>{mail}</p>
            </div>
            <div className='space-between contact_info_row'>
                <p className='fz-14 gc'>Gender</p>
                <p className='fz-14 gc'>{gender}</p>
            </div>
        </div>
    )
}

export default ContactInfo