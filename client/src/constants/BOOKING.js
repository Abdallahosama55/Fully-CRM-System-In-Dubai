export const BOOKING_STATUS = {
    PENDING: 0,
    CONFIRM: 1,
    CANCELLED: 2
}

export const FLIGHT_REQUEST_STATUS = {
    REQUEST_PENDING: "REQUEST_PENDING",
    FINALIZED: "FINALIZED",
    CANCELLED: "CANCELLED",
    REQUEST_PROCESSING: "REQUEST_PROCESSING",
    CREDIT_CARD_FAILED: "CREDIT_CARD_FAILED",
    AMENDMENT_PROCESSING: "AMENDMENT_PROCESSING",
    CANCELLATION_PROCESSING: "CANCELLATION_PROCESSING",
    PAYMENT_PROCESSING: "PAYMENT_PROCESSING",
    PAYMENT_OUTSTANDING: "PAYMENT_OUTSTANDING",
    CANCELLED_AND_REFUNDED: "CANCELLED_AND_REFUNDED",
    ALTERNATIVE_ADVISED: "ALTERNATIVE_ADVISED",
    RESERVED: "RESERVED",
};

export const getBookingStatusName = (value) => {
    switch (Number(value)) {
        case 0:
            return "Pending"
        case 1:
            return "Confirmed"
        case 2:
            return "Cancelled"
        default:
            break;
    }
}

export const PAYMENT_STATUS = {
    PENDING: 0,
    CONFIRM: 1,
    CANCELLED: 2
}

export const getPaymentStatusName = (value) => {
    switch (Number(value)) {
        case 0:
            return "Pending"
        case 1:
            return "Confirm"
        case 2:
            return "Cancelled"
        default:
            break;
    }
}


