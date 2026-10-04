import React from 'react';

/**
 * Renders interpreter output with friendly styling:
 * "ದೋಷ:" lines in red, "💡 ಸಲಹೆ:" lines as a yellow hint card.
 */
const OutputText = ({ text, placeholder = '' }) => {
    if (!text) return <>{placeholder}</>;
    const lines = String(text).split('\n');
    return (
        <>
            {lines.map((ln, i) => {
                if (ln.startsWith('ದೋಷ:')) {
                    return <div key={i} className="out-line out-error" role="alert">{ln}</div>;
                }
                if (ln.startsWith('💡')) {
                    return <div key={i} className="out-line out-hint">{ln}</div>;
                }
                return <div key={i} className="out-line">{ln || ' '}</div>;
            })}
        </>
    );
};

export default OutputText;
