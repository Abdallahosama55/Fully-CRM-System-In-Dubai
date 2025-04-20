import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const BOOKING_BASE = '/accommodation/booking';
// GET BOOKINGS
const getBookings = (page, size, status) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/list-booking`, {
        params: {
            page,
            size,
            status: status === "ALL" ? undefined : status
        }
    })
        .then((res) => {
            return {
                data: res.data.data.rows,
                totalCount: res.data.data.count,
                totalPages: res.data.data.totalPages,
            };
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET BOOKING
const getBooking = (refId) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/get-book-dateils/${refId}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET BOOKING RESERVATION DOCUMENT
const getBookingSummary = (refId, { title, isVoucher }) => {
    return TravelDashboardAPI.post(BOOKING_BASE + `/document/reservation/get-summary/${refId}`,
        { title, isVoucher }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        },
        responseType: 'blob'
    })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}
// SEND HOTEL EMAIL
const sendHotelSummaryEmail = (refId, { title, isVoucher }) => {
    return TravelDashboardAPI.post(BOOKING_BASE + `/document/hotel/get-summary/${refId}`,
        { title, isVoucher }
    )
        .then((res) => {
            return res.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// SEND CLIENT EMAIL 
const sendClientConfirmEmail = (refId, { title, isVoucher }) => {
    return TravelDashboardAPI.put(BOOKING_BASE + `/document/client/confirm/${refId}`,
        { title, isVoucher }
    )
        .then((res) => {
            return res.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const sendClientCancelEmail = (refId, { title, isVoucher }) => {
    return TravelDashboardAPI.put(BOOKING_BASE + `/document/client/cancel/${refId}`,
        { title, isVoucher }
    )
        .then((res) => {
            return res.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const DoocumentsAPI = {
    getBookingSummary,
    sendHotelSummaryEmail,
    sendClientConfirmEmail,
    sendClientCancelEmail
}

// GET BOOKING NOTES
const getBookingNotes = (refId) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/list-booking-notes/${refId}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET BOOKING LOGS
const getBookingLogs = (refId) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/list-booking-logs/${refId}`)
        .then((res) => {
            if (res.data.message === "No Logs Yet") {
                throw new Error(res.data.message);
            } else {
                return res.data.data;
            }
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET HOTELS
const getHotels = (request) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/get-hotel`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET HOTEL INFO
const getHotelInfo = (request) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/get-hotel-rooms`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// RESERVE A ROOM
const reserveRoom = (request) => {
    return TravelDashboardAPI.post(BOOKING_BASE + "/pre-book", { ...request })
        .then((res) => {
            return res
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// UPDATE BOOKING STATUS
const updateBookingStatus = (request) => {
    return TravelDashboardAPI.put(BOOKING_BASE + `/update-booking-status/${request.refId}`, { status: request.status })
        .then((res) => {
            return res
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}
// NOTES
// Edit Booking Notes
const editBookingNote = (request) => {
    return TravelDashboardAPI.put(BOOKING_BASE + `/update-booking-notes/${request.bookingId}`, request.note)
        .then((res) => {
            return res
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// PAYMENTS
// GET PAYMENT INFO
const getPayments = (refId, { page, size }) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/payment/list-payments/${refId}`, { params: { page, size } })
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// ADD PAYMENT
const addPayment = (payment) => {
    return TravelDashboardAPI.post(BOOKING_BASE + `/payment/add-payment`, { ...payment })
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// EDIT PAYMENT
const editPayment = (payment) => {
    return TravelDashboardAPI.put(BOOKING_BASE + `/payment/edit-payment/${payment.id}`, { ...payment })
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// EDIT PAYMENT
const deletePayment = ({ id, refId }) => {
    return TravelDashboardAPI.delete(BOOKING_BASE + `/payment/delete-payment/${id}`, { data: { refId } })
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// PASSENGERS
// EDIT PASSENGER
const editPassenger = ({ refId, passenger }) => {
    return TravelDashboardAPI.put(BOOKING_BASE + `/update-booking-passengers/${refId}`, passenger)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}


const BookingAPI = {
    getBookings,
    DoocumentsAPI,
    getBooking,
    getBookingNotes,
    getBookingLogs,
    getHotels,
    getHotelInfo,
    reserveRoom,
    updateBookingStatus,
    editBookingNote,
    getPayments,
    addPayment,
    editPayment,
    deletePayment,
    editPassenger
}

export default BookingAPI;