import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const useHtmlContent = (initialHtml) => {
    const [sanitizedHtml, setSanitizedHtml] = useState('');
    useEffect(() => {
        if (initialHtml) {
            const sanitized = DOMPurify.sanitize(initialHtml);
            setSanitizedHtml(sanitized);
        }
    }, [initialHtml]);

    // eslint-disable-next-line react/no-danger-with-children
    return <div
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />;
};

export default useHtmlContent;