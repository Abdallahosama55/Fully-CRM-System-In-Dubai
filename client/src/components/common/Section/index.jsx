import React from 'react'
// style
import './styles.css';
const Section = ({ title, headerStart = "", headerEnd, children, className = "", noDivider = false, noHeader = false,padding = "24px" ,...rest }) => {
    return (
        <section className={`with_header_section ${className}`} {...rest} style={{padding}}>
            {!noHeader && <><div className={`with_header_section_header space-between ${noDivider ? "no_divider" : ""}`}>
                <div className={`with_header_section_header_start ${title && headerStart ? "complex_header_start" : ""}`}>
                    {title && <p className='xl_text_medium' style={{ color: "var(--gray-700)" }}>{title}</p>}
                    {headerStart}
                </div>
                <div className='with_header_section_header_end'>{headerEnd}</div>
            </div></>}
            <div className='with_header_section_content' style={noHeader ? { marginTop: 0 } : {}}>
                {children}
            </div>
        </section>
    )
}

export default Section