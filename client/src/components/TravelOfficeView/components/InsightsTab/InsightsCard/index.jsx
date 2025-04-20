import React, { useMemo } from 'react'
// style
import "./styles.css"
const InsightsCard = ({ image, title, sections }) => {
    const tempSections = useMemo(() => sections?.filter(el => Boolean(el)), [sections]);

    return (
        <div className='insights_card'>
            {title && <div className='insights_card_header'>
                {image ? image : ""}
                <p className='md_text_medium' style={{ color: "var(--gray-400)" }}>{title}</p>
            </div>}
            {tempSections && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${tempSections.length}, 1fr)`,
                        gap: "16px", // Optional: Adjust the spacing between items
                    }}
                >
                    {tempSections.map((el, index) => (
                        <div
                            key={index}
                            style={{
                                position: "relative",
                            }}
                        >
                            {el}
                            {index < tempSections.length - 1 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: "0px",
                                        height: "64px",
                                        width: "1px",
                                        backgroundColor: "#EAECF2",
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default InsightsCard