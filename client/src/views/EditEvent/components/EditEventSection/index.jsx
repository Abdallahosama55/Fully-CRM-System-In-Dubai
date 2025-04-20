import React from 'react'
// style
import './styles.css';
const EditEventSection = ({ title, headerStart = "", headerEnd, children  , className = "" , noDivider = false , ...rest}) => {
    return (
        <section className={`edit_event_section ${className}`} {...rest}>
            <div className={`edit_event_section_header space-between ${noDivider ? "no_divider": ""}`}>
                <div className={`edit_event_section_header_start ${title && headerStart ? "complex_header_start" : ""}`}>
                    {title && <p className='xl_text_medium' style={{ color: "var(--gray-700)" }}>{title}</p>}
                    {headerStart}
                </div>
                <div className='edit_event_section_header_end'>{headerEnd}</div>
            </div>
            <div className='edit_event_section_content'>
                {children}
            </div>
        </section>
    )
}

export default EditEventSection