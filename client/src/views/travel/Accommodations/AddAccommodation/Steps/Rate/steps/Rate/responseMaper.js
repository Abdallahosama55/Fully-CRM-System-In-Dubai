export const transformData = (data) => {
    const { accommodationId, seasonId, rateRoomPrices, supplementsOccupations, supplementsRooms } = data;

    // Group rateRoomPrices by seasonRoomId
    const groupedPrices = rateRoomPrices?.reduce((acc, item) => {
        const { seasonRoomId, seasonPensionId, ...rest } = item;
        if (!acc[seasonRoomId]) {
            acc[seasonRoomId] = {
                seasonRoomId,
                pensionsPrices: [],
                supplementsOccupation: [],
                supplementsRoom: [],
            };
        }
        acc[seasonRoomId].pensionsPrices.push({
            seasonRoomId,
            seasonPensionId,
            ...rest,
        });
        return acc;
    }, {});

    // Add supplementsOccupations to the respective seasonRoomId
    supplementsOccupations?.forEach((item) => {
        const { seasonRoomId, ...rest } = item;
        if (groupedPrices[seasonRoomId]) {
            groupedPrices[seasonRoomId].supplementsOccupation.push(rest);
        }
    });

    // Add supplementsRooms to the respective seasonRoomId
    supplementsRooms?.forEach((item) => {
        const { seasonRoomId, ...rest } = item;
        if (groupedPrices[seasonRoomId]) {
            groupedPrices[seasonRoomId].supplementsRoom.push(rest);
        }
    });

    // Convert the grouped data to the required format
    const roomsPrice = Object.keys(groupedPrices).map((seasonRoomId) => {
        return {
            seasonRoomId: parseInt(seasonRoomId, 10),
            ...groupedPrices[seasonRoomId],
        };
    });

    return {
        accommodationId,
        seasonId,
        roomsPrice,
    };
};