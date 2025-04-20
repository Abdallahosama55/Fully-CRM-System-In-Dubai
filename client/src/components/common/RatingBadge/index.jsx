import React from 'react';
// style
import "./styles.css"
const RatingBadge = ({ rate }) => {
    return (
        <div className="rating_badge fz-12 fw-600" style={(() => {
            switch (rate) {
                case 1:
                    return { backgroundColor: "#E41E2D" };
                case 2:
                    return { backgroundColor: "#FF8C00" };
                case 3:
                    return { backgroundColor: "#909B2D" };
                case 4:
                    return { backgroundColor: "#00B0A6" };
                case 5:
                    return { backgroundColor: "#008B42" };
                default:
                    return {};
            }
        })()}>{(() => {
            switch (rate) {
                case 1:
                    return "Bad";
                case 2:
                    return "Fair";
                case 3:
                    return "Good";
                case 4:
                    return "Very good";
                case 5:
                    return "Excellent";
                default:
                    return "No rating";
            }
        })()}</div>
    );
};

export default RatingBadge;
