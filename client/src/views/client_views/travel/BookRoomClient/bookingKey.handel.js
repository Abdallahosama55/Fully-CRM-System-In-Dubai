








const decryptPaxString = (paxString) => {
    const [adultsStr, ...childrenStr] = paxString.split("-");

    const adults = parseInt(adultsStr, 10);
    const children = childrenStr.map((childStr) => parseInt(childStr, 10));

    return {
        adults,
        children,
        childrenNumber: children.length,
    };
};

const getBookingKeyInfo = (bookingKey) => {
    const [
        startDate,
        endDate,
        hotelId,
        roomId,
        pensionId,
        seasonId,
        night,
        pax,
    ] = bookingKey.split("|");

    const { adults, children, childrenNumber } = decryptPaxString(pax);

    return { adults, children, childrenCount: childrenNumber }
}

export default getBookingKeyInfo;