import React from 'react'
// style
import './styles.css'
const BorderedCard = ({ className = "", children, width = "auto", style = {},...props }) => {
    return (
        <div className={`bordered_card ${className}`} style={{ width , ...style }} {...props}>
            {children}
        </div>
    )
}

export default BorderedCard