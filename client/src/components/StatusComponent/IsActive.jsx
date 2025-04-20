import React from 'react'
import "./styles.css";
const Active = () => {
    return (
        <div className='active'>Active</div>
    )
}
const InActive = () => {
    return (
        <div className='in-active' >Inactive</div>
    )
}

export default function IsActive({ isActive }) {
    return isActive ? Active() : InActive();
}
