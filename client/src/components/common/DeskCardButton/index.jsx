import React from 'react'
import { Typography } from 'antd';
// styles
import './styles.css';
// image
import defaultImage from 'assets/images/house.png';
const DeskCardButton = ({ name, image, onClick = () => { }, isActive }) => {
    return <div className={`desk_card_button ${isActive ? "active" : ""}`} onClick={onClick}>
        <img src={image || defaultImage} alt={name} className='desk_image' />
        <Typography.Paragraph className='fz-12 desk_name'>{name}</Typography.Paragraph>
    </div>
}

export default DeskCardButton