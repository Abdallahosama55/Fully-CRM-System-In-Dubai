import React from 'react'
// style
import "./styles.css";
const Section = ({ children , title , icon , hasPaddingInBody = true , className="",...rest }) => {
    return (
        <div className={`experaince_booking_section ${className}`} {...rest}>
            <div className='section_header'>
                {icon}
                <p className="fz-16 fw-500">{title}</p>
            </div>
            <div className={`${hasPaddingInBody? " padding_in_body" :""}`}>
            {children}
            </div>
        </div>
    )
}

export default Section