import React from 'react'
// style
import "./styles.css";
const BookRoomSection = ({ title, icon, children }) => {
    return (
        <div className='book_room_section'>
            <div className='book_room_section-header'>
                {icon}
                <p className='fz-16 fw-600'>{title}</p>
            </div>
            <div className='book_room_section-content'>
                {children}
            </div>
        </div>
    )
}

export default BookRoomSection